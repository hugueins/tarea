export interface IFactura {
  idFactura?: number;
  Fecha: string;
  Sub_total: number;
  Sub_total_iva: number;
  Valor_IVA: number;
  Clientes_idClientes?: number;
  Nombres?: string;
  total?: number;
}
// src/app/Interfaces/ifactura.ts
/*
export interface IFactura {
  idFactura?: number;
  Fecha: string;
  Sub_total: number;
  Sub_total_iva: number;
  Valor_IVA: number;
  Clientes_idClientes: number;
  Nombres?: string;
  total: number;
  productos: IProductoFactura[]; // Add this line
}

// You may need to create this interface if it doesn't exist
export interface IProductoFactura {
  idProductos: number;
  Codigo_Barras: string;
  Nombre_Producto: string;
  Cantidad: number;
  Valor_Venta: number;
  Subtotal: number;
  IVA: number;
  Total: number;
  Graba_IVA: number;
}*/
