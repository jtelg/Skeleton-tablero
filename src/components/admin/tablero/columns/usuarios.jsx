import { useState } from 'react';
import APIConsultas from '../../../../services/consultas';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import ButtonEdit from '../buttonEdit';

const UsuarioColumnsConfig = () => {
  const columns_user = [
    { field: 'iduser', headerName: 'Code', width: 100 },
    { field: 'role', headerName: 'Role', width: 120 },
    { field: 'tipo_cliente', headerName: 'Tipo', width: 120 },
    { field: 'nombre', headerName: 'Nombre', flex: 1 },
    { field: 'apellido', headerName: 'Apellido', flex: 1 },
    { field: 'telefono', headerName: 'Telefono', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'numdoc', headerName: 'CUIT', type: 'number', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      type: 'actions',
      renderCell: (params) => <ButtonEdit params={params} />
    }
  ];

  return { columns_user };
};
export default UsuarioColumnsConfig;
