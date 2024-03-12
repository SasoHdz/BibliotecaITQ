import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class LibroModule {
  idbiblioteca: string;
  numadqui: string;
  ficha_no: string;
  titulo: string;
  autor: string;
  editorial: string;
  isbn: string;
  clasificacion: string;
  fecha: string;
  fechaingreso: string;

  constructor(){}
 }
