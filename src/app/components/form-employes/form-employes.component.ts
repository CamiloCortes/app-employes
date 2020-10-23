import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Employe, Role } from '../../shared/employe';
import { EmployesService } from '../../services/employes.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-form-employes',
  templateUrl: './form-employes.component.html',
  styleUrls: ['./form-employes.component.css']
})
export class FormEmployesComponent implements OnInit {
employe: Employe = new Employe() ;
roles: Role[] = [];
bossList: Employe[] = [];
title: 'empleados';
errors: string[];
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private employesService: EmployesService) { }

  ngOnInit(): void {
    this.employe.role = new Role();
    this.employe.boss = new Employe();
    this.loadEmploye();
    this.loadAllroles();
    this.loadBosses();
  }
  loadEmploye(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      const id = params[1];
      if (id) {
        this.employesService.getEmploye(id).subscribe(employe => this.employe = employe);
      }

    });

  }

  public loadAllroles(): any {

    this.employesService.getallRoles().subscribe(response => this.roles = response);
  }

  public loadBosses(): any {
    this.employesService.getallBoss().subscribe(response => this.bossList = response);
  }
  public create(): void {
    this.employesService.create(this.employe)
      .subscribe(json => {
        this.router.navigate(['/employes']);
        swal.fire('Nuevo Empleado', `Empleado ${json.employe.fullname} creado con exito`, 'success');
      }, err => {
        this.errors = err.error.errors as string[];
        console.error(err.error.errors);
      }
      );
  }

  public Update(): any {

    this.employesService.update(this.employe).subscribe(employe => {
      this.router.navigate(['/clientes']);
      swal.fire('Empleado Actualizado', `Empleado ${employe.fullname} actualizado con exito`, 'success');
    }, err => {
      this.errors = err.error.errors as string[];
      console.error(err.error.errors);
    }
  );
  }
}
