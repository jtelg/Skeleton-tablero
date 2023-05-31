import React, { Component } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import OrderModals from './columns/caja/cellEstadoVenta/actions/ventaModal';
export class GridConfig extends Component {
  state = {
    pedidoSelect: null,
    pageSize: 10
  };

  openOrder(dataRow) {
    if (
      dataRow.field !== 'estadoOrder' &&
      dataRow.field !== 'ViewProds' &&
      dataRow.field !== 'anular'
    )
      return;
    this.setState({ pedidoSelect: { field: dataRow.field, row: dataRow.row } });
  }

  closeOrder() {
    this.setState(null);
  }

  render() {
    return (
      <div>
        <DataGrid
          className="bg-white w-full"
          density="compact"
          autoHeight
          rows={this.props.arr_use}
          columns={this.props.col_use}
          pageSize={this.state.pageSize}
          rowsPerPageOptions={[10, 20, 50, 75, 100]}
          getRowId={(row) => row.id}
          onCellClick={(row) => this.openOrder(row)}
          onPageSizeChange={(size) => this.setState({ pageSize: size })}
          loading={this.props.loading}
          showCellRightBorder={true}
          showColumnRightBorder={true}
          components={{ Toolbar: QuickSearchToolbar }}
        />
        <OrderModals
          data={this.state.pedidoSelect}
          close={() => this.closeOrder()}
          props={this.props}
        />
      </div>
    );
  }
}

export default GridConfig;

function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0
      }}
    >
      <GridToolbarQuickFilter placeholder="Buscar " />
    </Box>
  );
}
