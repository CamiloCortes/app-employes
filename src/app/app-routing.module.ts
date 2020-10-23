import { importType } from '@angular/compiler/src/output/output_ast';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { EmployesComponent } from './components/employes/employes.component';
import { HomeComponent } from './components/home/home.component';
import { FormEmployesComponent } from './components/form-employes/form-employes.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'employes', component: EmployesComponent},
  {path: 'employe/form', component:  FormEmployesComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
