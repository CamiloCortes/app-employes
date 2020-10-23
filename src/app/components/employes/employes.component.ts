import { Component, OnInit } from '@angular/core';
import { EmployesService } from '../../services/employes.service';
import { Employe } from '../../shared/employe';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-employes',
  templateUrl: './employes.component.html',
  styleUrls: ['./employes.component.css']
})
export class EmployesComponent implements OnInit {
  employes: Employe[] = [];
  constructor( private employesService: EmployesService) { }

  ngOnInit(): void {
    this.employesService.getEmployes().subscribe(
      employesReturn => this.employes = employesReturn
      );
  }

  delete(employe: Employe): void{

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: 'Esta Seguro?',
      text: `seguro desea eliminar al Empleado ${employe.fullname} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.employesService.delete(employe.id).subscribe(
          response => {
            this.employesService.getEmployes().subscribe(
              (employes) => this.employes = employes
            );
            swalWithBootstrapButtons.fire(
              'Clinte Eliminado!',
              `cliente ${employe.fullname} eliminado con exito` ,
              'success'
            );
          }
        );
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        );
      }
    });
  }
}
