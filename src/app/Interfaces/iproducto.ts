/*export interface IProducto {
    idProductos?: number;
    Codigo_Barras: string;
    Nombre_Producto: string;
    Graba_IVA: number;
    Unidad_Medida_idUnidad_Medida: number; //tabla unidadmedida
    IVA_idIVA: number; //tabla   IVA
    Cantidad: number;
    Valor_Compra: number;
    Valor_Venta: number;
    Proveedores_idProveedores: number; // tabla  proveedor
  }*/
  export interface IProducto{
    idProductos: number; 
    Codigo_Barras: string;
    Nombre_Producto: string;
    Graba_IVA: number;
    Cantidad?: number;
    Valor_Compra?: number;
    Valor_Venta?: number;
    idUnidad_Medida?: number;
    idIVA?: number;
    idProveedores?: number;
    Unidad_Medida?: string;
    IVA_Detalle?: string;
    Fecha_Transaccion?: string;
    Tipo_Transaccion?: string;
    idKardex?: number;
    IVA_idIVA?: number;
    Unidad_Medida_idUnidad_Medida?: number;
    Proveedores_idProveedores?: number;
  }