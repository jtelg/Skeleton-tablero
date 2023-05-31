import { DataGrid } from '@mui/x-data-grid';
import React, { Component } from 'react';

export default class ListTotal extends Component {
  // col_use_pedidos = [
  //   { field: 'resumenp', headerName: '-', flex: 1 },
  //   {
  //     field: 'cantidad',
  //     headerName: 'Cantidad',
  //     flex: 1,
  //     type: 'number',
  //     headerAlign: 'center'
  //   }
  // ];

  col_use_egresos = [
    { field: 'resumenp', headerName: '-', flex: 1 },
    {
      field: 'cantidad',
      headerName: 'Cantidad',
      flex: 1,
      type: 'number',
      headerAlign: 'center'
    },
    {
      field: 'total',
      headerName: 'Total',
      flex: 1,
      type: 'number',
      headerAlign: 'center',
      renderCell: (params) => (
        <>
          <div>{this.formatpeso.format(params.row.total)}</div>
        </>
      )
    }
  ];

  col_use_totales = [
    { field: 'resumenp', headerName: '-', flex: 1 },
    {
      field: 'cantidad',
      headerName: 'Cantidad',
      flex: 1,
      type: 'number',
      headerAlign: 'center'
    },
    {
      field: 'total',
      headerName: 'Total',
      flex: 1,
      type: 'number',
      headerAlign: 'center',
      renderCell: (params) => (
        <>
          <div>{this.formatpeso.format(params.row.total)}</div>
        </>
      )
    }
  ];

  arruseTotales = [
    { id: 0, resumenp: 'EFECTIVO', total: 0, cantidad: 0 },
    { id: 1, resumenp: 'TRANSF.', total: 0, cantidad: 0 },
    { id: 2, resumenp: 'TARJETA', total: 0, cantidad: 0 },
    { id: 3, resumenp: 'TOTAL', total: 0, cantidad: 0 }
  ];

  arruseEgresos = [
    { id: 0, resumenp: 'EFECTIVO', total: 0, cantidad: 0 },
    { id: 1, resumenp: 'TRANSF.', total: 0, cantidad: 0 },
    { id: 2, resumenp: 'TARJETA', total: 0, cantidad: 0 },
    { id: 3, resumenp: 'TOTAL', total: 0, cantidad: 0 }
  ];

  state = {
    arr_use_totales: this.arruseTotales,
    arr_egresos: this.arruseEgresos
  };

  formatpeso = new Intl.NumberFormat('nl-BE', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: 0
  });

  componentDidMount() {
    const arrventas = this.props.dataCaja.arrventas;
    const arrEfectivo = arrventas.filter((v) => v.tipo_pago === 'Efectivo');
    const arrTransf = arrventas.filter((v) => v.tipo_pago === 'Transferencia');
    const arrTarjeta = arrventas.filter((v) => v.tipo_pago === 'Tarjeta');
    const totalesData = this.arruseTotales;
    const totEgresos = this.arruseEgresos;
    totalesData[0].total = arrEfectivo.reduce((a, b) => a + b.total, 0) || 0;
    totalesData[0].cantidad = arrEfectivo.length || 0;
    totalesData[1].total = arrTransf.reduce((a, b) => a + b.total, 0) || 0;
    totalesData[1].cantidad = arrTransf.length;
    totalesData[2].total = arrTarjeta.reduce((a, b) => a + b.total, 0) || 0;
    totalesData[2].cantidad = arrTarjeta.length || 0;
    totalesData[3].total = arrventas.reduce((a, b) => a + b.total, 0) || 0;
    totalesData[3].cantidad = arrventas.length || 0;

    if (this.props.dataCaja.arrEgresos) {
      const arrEgresos = this.props.dataCaja.arrEgresos;
      const arrEfectivoEgre = arrEgresos.filter(
        (v) => v.tipo_pago === 'Efectivo'
      );
      const arrTransfEgre = arrEgresos.filter(
        (v) => v.tipo_pago === 'Transferencia'
      );
      totEgresos[0].total =
        arrEfectivoEgre.reduce((a, b) => a + b.monto, 0) || 0;
      totEgresos[0].cantidad = arrEfectivoEgre.length || 0;
      totEgresos[1].total = arrTransfEgre.reduce((a, b) => a + b.monto, 0) || 0;
      totEgresos[1].cantidad = arrTransfEgre.length || 0;
      totEgresos[3].total = arrEgresos.reduce((a, b) => a + b.monto, 0) || 0;
      totEgresos[3].cantidad = arrEgresos.length || 0;
    }

    this.setState({
      arr_use_totales: totalesData,
      arr_egresos: totEgresos
    });
  }

  render() {
    return (
      <article className="flex gap-4 pt-8">
        <section className="w-full">
          <h1 className="text-secondary-500 mb-2 font-bold uppercase">
            Resumen de tipo de pago de Pedidos
          </h1>
          <DataGrid
            className="bg-white w-full tableResumenPedidos"
            density="compact"
            autoHeight
            rows={this.state.arr_egresos}
            columns={this.col_use_egresos}
            pageSize={this.state.pageSize}
            rowsPerPageOptions={[10, 20, 50, 75, 100]}
            getRowId={(row) => row.id}
            onPageSizeChange={(size) => this.setState({ pageSize: size })}
            loading={false}
            showCellRightBorder={true}
            showColumnRightBorder={true}
            getRowClassName={(params) =>
              params.row.id === 3 && `bg-green-100 font-bold`
            }
          />
        </section>
        <section className="w-full">
          <h1 className="text-secondary-500 mb-2 font-bold uppercase">
            Resumen Total
          </h1>
          <DataGrid
            className="bg-white w-full tableResumenPedidos"
            density="compact"
            autoHeight
            rows={this.state.arr_use_totales}
            columns={this.col_use_totales}
            pageSize={this.state.pageSize}
            rowsPerPageOptions={[10, 20, 50, 75, 100]}
            getRowId={(row) => row.id}
            onPageSizeChange={(size) => this.setState({ pageSize: size })}
            loading={false}
            showCellRightBorder={true}
            showColumnRightBorder={true}
            getRowClassName={(params) =>
              params.row.id === 3 && `bg-green-100 font-bold`
            }
          />
        </section>
      </article>
    );
  }
}
