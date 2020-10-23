import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { of, Observable, throwError } from 'rxjs';
import { Employe, Role } from '../shared/employe';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployesService {
  private urlEndpoint = 'http://localhost:8080/api';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) { }


  getEmployes(): Observable<Employe[]> {
    return this.http.get(this.urlEndpoint + '/allEmployes').pipe(map(response => response as Employe[]));
  }

  getEmploye(id): Observable<Employe> {
    return this.http.get(`${this.urlEndpoint + '/getById'}/${id}`).pipe(map(response => response as Employe
    ),
      catchError(e => {
        this.router.navigate(['/employes']);
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  create(employe: Employe): any {
    return this.http.post(this.urlEndpoint + '/createEmploye', employe, { headers: this.httpHeaders }).pipe(map(response => response as any,

    ),
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  update(employe: Employe): any {

    return this.http.put(`${this.urlEndpoint}/${employe.id}`, employe, { headers: this.httpHeaders })
    .pipe(map((response: any) => response.cliente as Employe),
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      }));
  }

  getallRoles(): Observable<Role[]>{

    return this.http.get(this.urlEndpoint + '/allRoles').pipe(map(response => response as Role[]));
  }

  getallBoss(): Observable<Employe[]>{
    return this.http.get(this.urlEndpoint + '/allBoss').pipe(map(response => response as Employe[]));
  }

  delete(id: number): any {
    return this.http.delete(`${this.urlEndpoint + '/deleteEmploye'}/${id}`, { headers: this.httpHeaders })
    .pipe(map(response => response as Employe),
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

}
