import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iunidadmedida } from '../Interfaces/iunidadmedida';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnidadmedidaService {
  apiurl = 'http://localhost/tarea/sexto/Proyectos/03MVC/controllers/unidadmedida.controller.php?op=';

  constructor(private lector: HttpClient) {}

  todos(): Observable<Iunidadmedida[]> {
    return this.lector.get<Iunidadmedida[]>(this.apiurl + 'todos');
  }

  uno(idUnidad_Medida: number): Observable<Iunidadmedida> {
    const formData = new FormData();
    formData.append('idUnidad_Medida', idUnidad_Medida.toString());
    return this.lector.post<Iunidadmedida>(this.apiurl + 'uno', formData);
  }

  eliminar(idUnidad_Medida: number): Observable<number> {
    const formData = new FormData();
    formData.append('idUnidad_Medida', idUnidad_Medida.toString());
    return this.lector.post<number>(this.apiurl + 'eliminar', formData);
  }

  insertar(unidad: Iunidadmedida): Observable<string> {
    const formData = new FormData();
    formData.append('Descripcion', unidad.Detalle);
    formData.append('Tipo', unidad.Tipo.toString());
    return this.lector.post<string>(this.apiurl + 'insertar', formData);
  }

  actualizar(unidad: Iunidadmedida): Observable<string> {
    const formData = new FormData();
    formData.append('idUnidad_Medida', unidad.idUnidad_Medida.toString());
    formData.append('Detalle', unidad.Detalle);
    formData.append('Tipo', unidad.Tipo.toString());
    return this.lector.post<string>(this.apiurl + 'actualizar', formData);
  }
}

////TODO: DEBER OK


