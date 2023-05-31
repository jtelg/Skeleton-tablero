import { DataGrid } from '@mui/x-data-grid';
import React, { Component } from 'react';
import APIConsultas from '../../../../../services/consultas';
export default class GridProductos extends Component {
  state = {
    arrProdsTotales: [],
    pageSize: 10,
    loading: true
  };

  formatpeso = new Intl.NumberFormat('nl-BE', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: 0
  });

  col_use = [
    { field: 'idart', headerName: 'ID', width: 100 },
    { field: 'modelo', headerName: 'Nombre', flex: 1 },
    { field: 'cantidad', headerName: 'Cantidad', width: 100, type: 'number' },
    {
      field: 'precioventa',
      headerName: 'Precio',
      flex: 1,
      type: 'number',
      renderCell: (params) => (
        <>
          <div>{this.formatpeso.format(params.row.precioventa)}</div>
        </>
      )
    }
  ];

  async componentDidMount() {
    const re = await APIConsultas.caja.GET_REPORTE_XID(
      this.props.dataCaja.idcaja
    );
    this.setState({ arrProdsTotales: re, loading: false });
  }

  render() {
    return (
      <>
        <div className="relative">
          <DataGrid
            className="bg-white w-full tableResumenCaja"
            density="compact"
            autoHeight
            rows={this.state.arrProdsTotales}
            columns={this.col_use}
            pageSize={this.state.pageSize}
            rowsPerPageOptions={[10, 20, 50, 75, 100]}
            getRowId={(row) => row.idart}
            onPageSizeChange={(size) => this.setState({ pageSize: size })}
            loading={this.state.loading}
            showCellRightBorder={true}
            showColumnRightBorder={true}
          />
          {!this.state.loading && (
            <div className="flex absolute -bottom-[-54px] h-9 items-center border-1 bg-gray-100">
              <div className="w-[101px] h-full  border-r-[1px] border-black"></div>
              <div className="w-[347px] h-full flex items-center px-[10px] text-[15px] font-bold uppercase border-r-[1px] border-black">
                Total
              </div>
              <div className="w-[100px] h-full flex justify-end items-center px-[10px] text-[15px] font-bold border-r-[1px] border-black">
                14
              </div>
              <div className="w-[347px] h-full flex justify-end items-center px-[10px] text-[15px] font-bold">
                $ 18.090
              </div>
            </div>
          )}
        </div>
        {/* <style jsx>{`
          .MuiDataGrid-footerContainer {
            background: var(--primary);
          }
        `}</style> */}
      </>
    );
  }
}
