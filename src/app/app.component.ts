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
  
  allpaginas: any[] | null = [];
  paginas: any[] | null = [];
  ejemplares: any[] | null = [];
  allEjemplares: any[] | null = [];
  search:string = "";
  title = 'BusquedaAservo';
  paginacion:number = 0;
  inicio:number=0;
  final:number=10;
  pinicio:number=0;
  pfinal:number=30;
  salto:number = 30;


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
    this.ejemplares = this.allEjemplares?.slice(this.pinicio,this.pfinal);
    this.paginacion = (EJEMPLARES?.length ?? 0) / 30;
    for(let i = 1; i <= this.paginacion;i++)
    {
      this.allpaginas?.push(i)
    }
    this.paginas=this.allpaginas?.slice(this.inicio,this.final)??[];
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

   // Opcional: Limita los resultados a los primeros 10 registros
   this.ejemplares = this.allEjemplares?.slice(this.inicio,this.final);

   // Maneja el error si existe
   if (error) {
      console.error('Error al buscar ejemplares:', error);
   }
    }
    else {
      this.obtenerData();
    }

   }

  next() {
    if(this.final+1<this.paginacion){
      this.inicio+=1
      this.final+=1
      this.paginas = this.allpaginas?.slice(this.inicio,this.final)??[];
    }
  }

  before() {
    if(this.inicio-1>0){
      this.inicio-=1
      this.final-=1
      this.paginas = this.allpaginas?.slice(this.inicio,this.final)??[];
    }
  }

  showpagina(p:number) {
    this.pinicio == 0?
        this.pinicio = 1:this.pinicio

    this.ejemplares=this.allEjemplares?.slice(this.pinicio+(p*this.salto),this.pfinal+(p*this.salto))??[];
  }
}
