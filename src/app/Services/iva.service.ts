import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iiva } from '../Interfaces/Iiva';

@Injectable({
  providedIn: 'root'
})
export class IvaService {
apiurl= 'http://localhost/tarea/sexto/Proyectos/03MVC/controllers/iva.controller.php?op=';
constructor(private lector: HttpClient) { }
todos (): Observable<Iiva[]>{
  return this.lector.get<Iiva[]>(this.apiurl+'todos');
}
uno (idIVA:number): Observable<number>{
  const formData = new FormData();
  formData.append('idIVA', idIVA.toString());
  return this.lector.post<number>(this.apiurl+'uno', formData);
}
eliminar (idIVA:number): Observable<number>{
  const formData = new FormData();
  formData.append('idIVA', idIVA.toString());
  return this.lector.post<number>(this.apiurl+'eliminar', formData);
}
insertar (iva:Iiva): Observable<number>{
  const formData = new FormData();
  formData.append('Detalle',iva.Detalle);
  formData.append('Estado',iva.Estado.toString());
  formData.append('Valor', iva.Valor.toString());
  return this.lector.post<number>(this.apiurl+'insertar', formData);

}
actualizar (iva:Iiva): Observable<number>{
  const formData = new FormData();
  formData.append('Detalle',iva.Detalle);
  formData.append('Estado',iva.Estado.toString());
  formData.append('Valor', iva.Valor.toString());
  return this.lector.post<number>(this.apiurl+'actualizar', formData);

}
}
