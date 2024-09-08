import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Iunidadmedida } from 'src/app/Interfaces/iunidadmedida';
import { UnidadmedidaService } from '../../Services/unidadmedida.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevaunidadmedida',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './nuevaunidadmedida.component.html',
  styleUrl: './nuevaunidadmedida.component.scss'
})
export class NuevaunidadmedidaComponent implements OnInit {
  titulo = 'Nueva Unidad de Medida';
  frm_UnidadMedida : FormGroup;

  idUnidad_Medida = 0;
Tipo: any;
  constructor(
    private UnidadmedidaService: UnidadmedidaService,
    private navegacion: Router
  ) {}

  ngOnInit(): void {
    this.frm_UnidadMedida = new FormGroup({
      Detalle: new FormControl('', [Validators.required]),
      Tipo: new FormControl('', [Validators.required])
    });
  }

cambio(objetoSleect: any) {
  this.frm_UnidadMedida.get('Tipo')?.setValue(objetoSleect.target.value);
}
grabar(){
  let unidadmedida: Iunidadmedida ={
    Detalle: this.frm_UnidadMedida.get('Detalle')?.value,
    Tipo: this.frm_UnidadMedida.get('Tipo')?.value,
  };
  if (this.idUnidad_Medida==0) {
    this.UnidadmedidaService.insertar(unidadmedida).subscribe((x)=> {
      Swal.fire('Registro Exitoso', 'La unidad de medida fue registrada con éxito', 'success');
      this.navegacion.navigate(['/unidadmedida']);
    });
  }else{
    unidadmedida.idUnidad_Medida = this.idUnidad_Medida;
    this.UnidadmedidaService.actualizar(unidadmedida).subscribe((x)=> {
      Swal.fire('Actualización Exitosa', 'La unidad de medida fue actualizada con éxito', 'success');
      this.navegacion.navigate(['/unidadmedida']);
  });
  }
}
  }