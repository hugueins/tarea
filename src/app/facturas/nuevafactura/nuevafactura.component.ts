
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IFactura } from 'src/app/Interfaces/ifactura';
import { ICliente } from 'src/app/Interfaces/icliente';
import { IProducto } from 'src/app/Interfaces/iproducto';
import { ClientesService } from 'src/app/Services/clientes.service';
import { FacturaService } from 'src/app/Services/factura.service';
import { ProductoService } from 'src/app/Services/productos.service';

@Component({
  selector: 'app-nuevafactura',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './nuevafactura.component.html',
  styleUrl: './nuevafactura.component.scss'
})
export class NuevafacturaComponent implements OnInit {
  titulo = 'Nueva Factura';
  listaClientes: ICliente[] = [];
  listaClientesFiltrada: ICliente[] = [];
  listaProductos: IProducto[] = [];
  totalapagar: number = 0;
  frm_factura: FormGroup;  
  idFactura: number = 0;
  clienteSeleccionado: ICliente | null = null;
  productoelejido: any[] = [];

  constructor(
    private clientesServicios: ClientesService,
    private facturaService: FacturaService,
    private productoService: ProductoService,
    private navegacion: Router,
    private ruta: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.frm_factura = new FormGroup({
      Fecha: new FormControl('', Validators.required),
      Sub_total: new FormControl('', Validators.required),
      Sub_total_iva: new FormControl('', Validators.required),
      Valor_IVA: new FormControl('0.15', Validators.required),
      Clientes_idClientes: new FormControl('', Validators.required)
    });

    this.clientesServicios.todos().subscribe({
      next: (data) => {
        this.listaClientes = data;
        this.listaClientesFiltrada = data;
      },
      error: (e) => {
        console.log(e);
      }
    });

    this.productoService.todos().subscribe({
      next: (data) => {
        this.listaProductos = data;
      },
      error: (e) => {
        console.log(e);
      }
    });

    this.idFactura = parseInt(this.ruta.snapshot.paramMap.get('idFacturas') || '0');
    if (this.idFactura > 0) {
      this.cargarUno();
    }
  }

  cargarUno() {
    this.facturaService.uno(this.idFactura).subscribe({
      next: (data) => {
        this.frm_factura.patchValue(data);
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  grabar() {
    let factura: IFactura = this.frm_factura.value;

    if (this.idFactura === 0) {
      this.facturaService.insertar(factura).subscribe((respuesta) => {
        if (parseInt(respuesta) > 0) {
          alert('Factura grabada');
          this.idFactura = parseInt(respuesta);
          this.navegacion.navigate(['/facturas']);
        }
      });
    } else {
      this.facturaService.actualizar(this.idFactura, factura).subscribe((respuesta) => {
        if (parseInt(respuesta) > 0) {
          alert('Factura actualizada');
          this.navegacion.navigate(['/facturas']);
        }
      });
    }
  }

  imprimirFactura() {
    if (this.idFactura > 0) {
      window.open(`http://localhost/tarea/sexto/Proyectos/03MVC/reports/facturas.report.php?id=${this.idFactura}`, '_blank');
    } else {
      alert('Por favor, guarde la factura antes de intentar imprimirla.');
    }
  }

  calculos() {
    let sub_total = this.frm_factura.get('Sub_total')?.value;
    let iva = this.frm_factura.get('Valor_IVA')?.value;
    let sub_total_iva = sub_total * iva;
    this.frm_factura.get('Sub_total_iva')?.setValue(sub_total_iva);
    this.totalapagar = parseInt(sub_total) * 1.15;
  }

  cambio(objetoSelect: any) {
    let idCliente = objetoSelect.target.value;
    this.frm_factura.get('Clientes_idClientes')?.setValue(idCliente);
    this.clienteSeleccionado = this.listaClientes.find(cliente => cliente.idClientes === parseInt(idCliente)) || null;
  }

  openModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
  }

  agregarProducto(producto: IProducto) {
    const productoExistente = this.productoelejido.find(p => p.idProductos === producto.idProductos);
    if (productoExistente) {
      productoExistente.Cantidad++;
    } else {
      this.productoelejido.push({
        ...producto,
        Cantidad: 0,
        Subtotal: producto.Valor_Venta,
        IVA: producto.Graba_IVA ? producto.Valor_Venta * 0.15 : 0,
        //Total: producto.Graba_IVA ? producto.Valor_Venta * 1.15 : producto.Valor_Venta
      });
    }
    this.calcularTotales();
  }

  eliminarProducto(index: number) {
    this.productoelejido.splice(index, 1);
    this.calcularTotales();
  }

  actualizarCantidad(index: number, event: any) {
    const cantidad = event.target.value;
    const producto = this.productoelejido[index];
    producto.Cantidad = cantidad;
    producto.Subtotal = producto.Valor_Venta * cantidad;
    producto.IVA = producto.Graba_IVA ? producto.Subtotal * 1.15 : 0;
    //producto.Total = producto.Subtotal + producto.IVA;
    this.calcularTotales();
  }

  calcularTotales() {
    let subtotal = 0;
    let iva = 0;
    let total = 0;

    this.productoelejido.forEach(producto => {
      subtotal += producto.Subtotal;
      iva += producto.IVA;
      total += producto.Total;
    });

    this.frm_factura.patchValue({
      Sub_total: subtotal,
      Sub_total_iva: iva,
      Valor_IVA: iva / subtotal
    });

    this.totalapagar = total;
    this.calculos();
  }
}
