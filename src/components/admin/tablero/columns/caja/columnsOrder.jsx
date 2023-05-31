import { GridActionsCellItem } from '@mui/x-data-grid';
import CellEstadoVenta from './cellEstadoVenta/cellEstadoVenta';
import CellTipoPago from './cellTipopago';

const VentaColumnConfig = () => {
  const columns_venta = [
    {
      // Estado
      width: 100,
      field: 'estadoOrder',
      headerName: 'Estado',
      cellClassName: 'padding-margin-0 relative cellEstadoVenta',
      renderCell: (params) => <CellEstadoVenta data={params.row} />
    },
    {
      // Code
      field: 'idventa',
      headerName: 'Code',
      width: 70
    },
    {
      // Hs. Pedido
      field: 'fecha_tablero',
      headerName: 'Hs. Pedido',
      flex: 1
    },
    {
      // Nombre
      field: 'retira_nombre',
      headerName: 'Nombre',
      flex: 1,
      type: 'text'
    },
    {
      // Whatsapp
      field: 'tel_muestra',
      headerName: 'Whatsapp',
      flex: 1,
      type: 'text'
    },
    { field: 'entrega', headerName: 'Envio', flex: 1 },
    {
      // Tipo Pago
      field: 'tipo_pago',
      headerName: 'Tipo Pago',
      flex: 1,
      cellClassName: 'padding-margin-0 relative cellEstadoVenta',
      renderCell: (params) => (
        <>
          <CellTipoPago data={params.row} />
        </>
      )
    },
    { field: 'montototal', headerName: 'Valor', flex: 1 },
    {
      // Datos
      field: 'ViewProds',
      headerName: 'Datos',
      type: 'actions',
      flex: 1,
      getActions: (params) => [
        <GridActionsCellItem
          key={1}
          label="Listado de Productos"
          icon={
            <span className="material-icons-outlined text-secondary-700">
              inventory
            </span>
          }
        />
      ]
    },
    {
      // Anular
      field: 'anular',
      headerName: 'Anular',
      type: 'actions',
      flex: 1,
      getActions: (params) => [
        <GridActionsCellItem
          key={2}
          label="Anular pedido"
          icon={<i className="bx bx-trash text-red-500 text-[22px]"></i>}
        />
      ]
    }
  ];

  return { columns_venta };
};

export default VentaColumnConfig;
