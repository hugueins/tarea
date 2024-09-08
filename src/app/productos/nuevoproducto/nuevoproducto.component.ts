import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Iiva } from 'src/app/Interfaces/Iiva';
import { Iproveedor } from 'src/app/Interfaces/iproveedor';
import { Iunidadmedida } from 'src/app/Interfaces/iunidadmedida';
import { ProveedorService } from 'src/app/Services/proveedores.service';
import { UnidadmedidaService } from 'src/app/Services/unidadmedida.service';
import {IvaService} from 'src/app/Services/iva.service'
import { IProducto } from 'src/app/Interfaces/iproducto';
import { privateDecrypt, publicDecrypt } from 'crypto';

@Component({
  selector: 'app-nuevoproducto',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './nuevoproducto.component.html',
  styleUrl: './nuevoproducto.component.scss'
})
export class NuevoproductoComponent implements OnInit {
  titulo = 'Nuevo Producto';
  listaUnidadMedida: Iunidadmedida[] = [];
  listaProveedores: Iproveedor[] = [];
  listaIva:Iiva []=[];
  frm_Producto: FormGroup;
  idProductos: number=0;
  constructor(
    private uniadaServicio: UnidadmedidaService,
    private fb: FormBuilder,
    private proveedoreServicio: ProveedorService,
    private ivaServicio:IvaService,
    ) {}
  ngOnInit(): void {
    this.uniadaServicio.todos().subscribe((data) => (this.listaUnidadMedida = data));
    this.proveedoreServicio.todos().subscribe((data) => (this.listaProveedores = data));
    this.ivaServicio.todos().subscribe((data) => (this.listaIva = data));
    this.crearFormulario();

    /*
1.- Modelo => Solo el procedieminto para realizar un select
2.- Controador => Solo el procedieminto para realizar un select
3.- Servicio => Solo el procedieminto para realizar un select
4.-  realizar el insertar y actualizar

*/
  }
  crearFormulario() {
     this.frm_Producto = new FormGroup({
      Codigo_Barras: new FormControl('', Validators.required),
      Nombre_Producto: new FormControl('', Validators.required),
      Graba_IVA: new FormControl('', Validators.required),
      Unidad_Medida_idUnidad_Medida: new FormControl('', Validators.required),
      IVA_idIVA: new FormControl('', Validators.required),
      Cantidad: new FormControl('', [Validators.required, Validators.min(1)]),
      Valor_Compra: new FormControl('', [Validators.required, Validators.min(0)]),
      Valor_Venta: new FormControl('', [Validators.required, Validators.min(0)]),
      Proveedores_idProveedores: new FormControl('', Validators.required)
    });
  }

  grabar() {
    let producto:IProducto ={
    idProductos: this.idProductos,
    Codigo_Barras: this.frm_Producto.controls['Codigo_Barras'].value,
    Nombre_Producto: this.frm_Producto.controls['Nombre_Producto'].value,
    Graba_IVA: this.frm_Producto.controls['Graba_IVA'].value,
    Unidad_Medida_idUnidad_Medida: this.frm_Producto.controls['Unidad_Medida_idUnidad_Medida'].value,
    IVA_idIVA: this.frm_Producto.controls['IVA_idIVA'].value,
    Cantidad: this.frm_Producto.controls['Cantidad'].value,
    Valor_Compra: this.frm_Producto.controls['Valor_Compra'].value,
    Valor_Venta: this.frm_Producto.controls['Valor_Venta'].value,
    Proveedores_idProveedores: this.frm_Producto.controls['Proveedores_idProveedores'].value  
    }
  }
}
