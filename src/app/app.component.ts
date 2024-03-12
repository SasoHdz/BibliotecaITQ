import { Component } from '@angular/core';
import { createClient } from '@supabase/supabase-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  supabase = createClient(
    'https://rwzkmxzbedqnbubbuypl.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3emtteHpiZWRxbmJ1YmJ1eXBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4NjU1MTcsImV4cCI6MjAyNTQ0MTUxN30.xq8M4iTvO51wQbnm70Sdffx7_7RolG7nnOlUXD90A30'
  );

  ejemplares: any[] | null = [];
  allEjemplares: any[] | null = [];
  search:string = "";
  title = 'BusquedaAservo';
  paginacion:number = 0;



  ngOnInit() {
    this.obtenerData();
  }

  async obtenerData() {
    let { data: EJEMPLARES, error } = await this.supabase
      .from('EJEMPLARES')
      .select('*');
    console.log(EJEMPLARES);
    console.log(error);
    this.allEjemplares = EJEMPLARES ?? []; // Asegura que sea un arreglo vacío si EJEMPLARES es undefined
    this.ejemplares = this.allEjemplares?.slice(0,30);
    this.paginacion = (EJEMPLARES?.length ?? 0) / 30;
  }

  async buscarEjemplares() {
    // Prepara la consulta para buscar en las columnas 'autor', 'titulo' y 'isbn'
    if(this.search!=""){
      let { data: EJEMPLARES, error } = await this.supabase
      .from('EJEMPLARES')
      .select('*')
      .or(`autor.ilike.%${this.search}%,titulo.ilike.%${this.search}%,isbn.ilike.%${this.search}%`);

   // Asegura que EJEMPLARES sea un arreglo vacío si es undefined
   this.allEjemplares = EJEMPLARES ?? [];

   // Opcional: Limita los resultados a los primeros 30 registros
   this.ejemplares = this.allEjemplares?.slice(0, 30);

   // Maneja el error si existe
   if (error) {
      console.error('Error al buscar ejemplares:', error);
   }
    }
    else {
      this.obtenerData();
    }

   }


  async obtenerAutor(searchString: string) {
    let { data: EJEMPLARES, error } = await this.supabase
      .from('EJEMPLARES')
      .select('*')
      .ilike('autor', `%${searchString}%`);
      this.allEjemplares = EJEMPLARES ?? []; // Asegura que sea un arreglo vacío si EJEMPLARES es undefined
      this.ejemplares = this.allEjemplares?.slice(0,10);
  }

  async obtenerTitulo(searchString: string) {
    let { data: EJEMPLARES, error } = await this.supabase
      .from('EJEMPLARES')
      .select('*')
      .ilike('titulo', `%${searchString}%`);
      this.allEjemplares = EJEMPLARES ?? []; // Asegura que sea un arreglo vacío si EJEMPLARES es undefined
      this.ejemplares = this.allEjemplares?.slice(0,10);

  }

  async obtenerISBN(searchString: string) {
    let { data: EJEMPLARES, error } = await this.supabase
      .from('isbn')
      .select('*')
      .ilike('autor', `%${searchString}%`);
      this.allEjemplares = EJEMPLARES ?? []; // Asegura que sea un arreglo vacío si EJEMPLARES es undefined
      this.ejemplares = this.allEjemplares?.slice(0,10);

  }
}
