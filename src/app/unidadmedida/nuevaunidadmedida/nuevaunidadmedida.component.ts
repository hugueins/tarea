import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Iunidadmedida } from 'src/app/Interfaces/iunidadmedida';
import { UnidadmedidaService } from '../../Services/unidadmedida.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  route: any;
  constructor(
    private UnidadmedidaService: UnidadmedidaService,
    private navegacion: Router,
    private ruta: ActivatedRoute
    
  ) {}

  ngOnInit(): void {
    this.idUnidad_Medida =parseInt(this.ruta.snapshot.paramMap.get('idUnidad_Medida') || '0');
    this.frm_UnidadMedida = new FormGroup({
      Detalle: new FormControl('', [Validators.required]),
      Tipo: new FormControl(0, [Validators.required])
    });
    if (this.idUnidad_Medida>0){
      this.UnidadmedidaService.uno(this.idUnidad_Medida).subscribe((unidadmedida)=> {
          console.log(unidadmedida);
          this.frm_UnidadMedida.controls['Detalle'].setValue(unidadmedida.Detalle);
          this.frm_UnidadMedida.controls['Tipo'].setValue(unidadmedida.Tipo);
          this.titulo = 'Actualizar Unidad de Medida';
        });
     }
  //this.frm_UnidadMedida.controls['Detalle'].setValue()
  }


cambio(objetoSleect: any) {
  this.frm_UnidadMedida.get('Tipo')?.setValue(objetoSleect.target.value);
}
grabar (){
  let iunidadmedida:Iunidadmedida ={
    idUnidad_Medida: 0,
    Detalle:this.frm_UnidadMedida.controls['Detalle'].value,
    Tipo:this.frm_UnidadMedida.controls['Tipo'].value 
    
  };
console.log(this.idUnidad_Medida);
if (this.idUnidad_Medida==0 || isNaN(this.idUnidad_Medida)) {
  this.UnidadmedidaService.insertar(iunidadmedida).subscribe((respuesta)=> {
//parseInt (respuesta)> 1 ? alert ("Grabado con exito"): alert ("Error al grabar");
if (parseInt (respuesta) > 1 ){
  alert ("Grabado con exito");
  this.navegacion.navigate(['/unidadmedida']);
}  else{
  alert ("Error al grabar");
  }
});
} else{
 iunidadmedida.idUnidad_Medida=this.idUnidad_Medida;
  this.UnidadmedidaService.actualizar(iunidadmedida).subscribe((respuesta)=>{
  if (parseInt (respuesta)> 0 ){
    this.idUnidad_Medida=0;
    alert ("Actualizado con exito");
    this.navegacion.navigate(['/unidadmedida']);
  }else{
    alert ("Error al Actualizar");
  }
});
}
}
  }


/*import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Iunidadmedida } from 'src/app/Interfaces/iunidadmedida';
import { UnidadmedidaService } from '../../Services/unidadmedida.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  frm_UnidadMedida: FormGroup;
  idUnidad_Medida = 0;
  Tipo: any;

  constructor(
    private UnidadmedidaService: UnidadmedidaService,
    private navegacion: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.frm_UnidadMedida = new FormGroup({
      Detalle: new FormControl('', [Validators.required]),
      Tipo: new FormControl('', [Validators.required])
    });

    this.route.params.subscribe(params => {
      this.idUnidad_Medida = +params['id'] || 0;
      if (this.idUnidad_Medida !== 0) {
        this.titulo = 'Editar Unidad de Medida';
        this.cargarDatos();
      }
    });
  }

  cargarDatos() {
    this.UnidadmedidaService.uno(this.idUnidad_Medida).subscribe((unidad: Iunidadmedida) => {
      this.frm_UnidadMedida.patchValue({
        Detalle: unidad.Detalle,
        Tipo: unidad.Tipo.toString()
      });
    });
  }

  cambio(objetoSelect: any) {
    this.frm_UnidadMedida.get('Tipo')?.setValue(objetoSelect.target.value);
  }

  grabar() {
    let unidadmedida: Iunidadmedida = {
      Detalle: this.frm_UnidadMedida.get('Detalle')?.value,
      Tipo: this.frm_UnidadMedida.get('Tipo')?.value.toString(),
    };

    if (this.idUnidad_Medida == 0) {
      this.UnidadmedidaService.insertar(unidadmedida).subscribe((x) => {
        Swal.fire('Registro Exitoso', 'La unidad de medida fue registrada con éxito', 'success');
        this.navegacion.navigate(['/unidadmedida']);
      });
    } else {
      unidadmedida.idUnidad_Medida = this.idUnidad_Medida;
      this.UnidadmedidaService.actualizar(unidadmedida).subscribe((x) => {
        Swal.fire('Actualización Exitosa', 'La unidad de medida fue actualizada con éxito', 'success');
        this.navegacion.navigate(['/unidadmedida']);
      });
    }
  }
}
  */