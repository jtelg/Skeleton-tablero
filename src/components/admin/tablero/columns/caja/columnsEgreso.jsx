const columns_egreso = [
  { field: 'idegreso', headerName: 'CODE', width: 70, type: 'number' },
  { field: 'tipo', headerName: 'Tipo', flex: 1 },
  { field: 'monto', headerName: 'Monto', flex: 1, type: 'number' },
  { field: 'numFactura', headerName: 'Nº de factura', flex: 1, type: 'number' },
  { field: 'descripcion', headerName: 'Descripcion', flex: 1, type: 'text' },
  {
    field: 'fechaIngreso',
    headerName: 'Fecha de egreso',
    flex: 1,
    type: 'text'
  }
];

export default columns_egreso;
