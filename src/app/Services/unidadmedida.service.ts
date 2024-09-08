import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iunidadmedida } from '../Interfaces/iunidadmedida';

@Injectable({
  providedIn: 'root'
})
export class UnidadmedidaService {
  apiurl ='http://localhost/tarea/sexto/Proyectos/03MVC/controllers/unidadmedida.controller.php?op=';

  constructor(private lector:HttpClient) { }
  todos():Observable<Iunidadmedida[]>{
    return this.lector.get<Iunidadmedida[]>(this.apiurl +'todos');
    }
    uno(idunidadmedida:number):Observable<Iunidadmedida>{
      const formData = new FormData();
      formData.append('idUnidad_medida',idunidadmedida.toString());
      return this.lector.post<Iunidadmedida>(this.apiurl+'uno',formData);
    }
    eliminar(idunidadmedida:number):Observable<number>{
      const formData = new FormData();
      formData.append('idUnidad_medida', idunidadmedida.toString());
      return this.lector.post<number>(this.apiurl+'eliminar', formData);
    }
    insertar(unidadmedida:Iunidadmedida):Observable<string>{
      const formData = new FormData();
      formData.append('Detalle', unidadmedida.Detalle);
      formData.append('Tipo', unidadmedida.Tipo);
      return this.lector.post<string>(this.apiurl+'insertar', formData);
    }
    actualizar(unidadmedida:Iunidadmedida):Observable<string>{
    const formData = new FormData();
    formData.append('idUnidad_medida', unidadmedida.idUnidad_Medida.toString());
    formData.append('Detalle', unidadmedida.Detalle);
    formData.append('Tipo', unidadmedida.Tipo);
    return this.lector.post<string>(this.apiurl+'actualizar', formData);
  }
}

/*


  constructor(private lector: HttpClient) {}

  todos(): Observable<Iproveedor[]> {
    return this.lector.get<Iproveedor[]>(this.apiurl + 'todos');
  }
  uno(idProveedor: number): Observable<Iproveedor> {
    const formData = new FormData();
    formData.append('idProveedores', idProveedor.toString());
    return this.lector.post<Iproveedor>(this.apiurl + 'uno', formData);
  }
  eliminar(idProveedor: number): Observable<number> {
    const formData = new FormData();
    formData.append('idProveedores', idProveedor.toString());
    return this.lector.post<number>(this.apiurl + 'eliminar', formData);
  }
  insertar(proveedor: Iproveedor): Observable<string> {
    const formData = new FormData();
    formData.append('Nombre_Empresa', proveedor.Nombre_Empresa);
    formData.append('Direccion', proveedor.Direccion);
    formData.append('Telefono', proveedor.Telefono);
    formData.append('Contacto_Empresa', proveedor.Contacto_Empresa);
    formData.append('Teleofno_Contacto', proveedor.Teleofno_Contacto);
    return this.lector.post<string>(this.apiurl + 'insertar', formData);
  }
  actualizar(proveedor: Iproveedor): Observable<string> {
    const formData = new FormData();
    formData.append('idProveedores', proveedor.idProveedores.toString());
    formData.append('Nombre_Empresa', proveedor.Nombre_Empresa);
    formData.append('Direccion', proveedor.Direccion);
    formData.append('Telefono', proveedor.Telefono);
    formData.append('Contacto_Empresa', proveedor.Contacto_Empresa);
    formData.append('Teleofno_Contacto', proveedor.Teleofno_Contacto);
    return this.lector.post<string>(this.apiurl + 'actualizar', formData);
  }
}
*/
