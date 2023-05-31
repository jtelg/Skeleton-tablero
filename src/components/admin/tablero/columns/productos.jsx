// import { useState } from 'react';
// import { toast } from 'react-toastify';
// import Swal from 'sweetalert2';

import ButtonEdit from '../buttonEdit';

// import APIConsultas from '../../../../services/consultas';
// import servusos from '../../../../utils/usos.utils';
const ProductoColumnConfig = (router) => {
  const columns_prods = [
    {
      width: 100,
      field: 'visible',
      headerName: 'Visible',
      cellClassName: 'padding-margin-0',
      renderCell: (params) => (
        <button
          className={`h-full w-full group relative text-white
          ${params.row.visible === 0 ? 'bg-green-500' : 'bg-red-400'}`}
          id="btnAction"
        >
          <div
            className={`group-hover:flex hidden fixed -mt-[12px] ml-[113px] rounded 
            ${
              params.row.visible === 0 ? 'bg-green-500' : 'bg-red-400'
            } py-1 px-4 capitalize text-xs font-bold`}
          >
            <div
              className={`${
                params.row.visible === 0 ? 'bg-green-500' : 'bg-red-400'
              } w-3 h-3 absolute top-[6px] -left-[6px] rotate-[45deg]`}
            ></div>
            {params.row.visible === 0 ? 'Producto visible' : 'Producto oculto'}
          </div>
        </button>
      )
      // renderCell: (params) => (
      //   <div
      //     className={`h-full w-full ${
      //       params.row.visible === 0 ? 'bg-green-500' : 'bg-red-400'
      //     }`}
      //     title={`${
      //       params.row.visible === 0
      //         ? 'Producto visible en catalogo'
      //         : 'Producto oculto en catalogo'
      //     }`}
      //   ></div>
      // )
    },
    { field: 'idart', headerName: 'ID', width: 100 },
    { field: 'codart', headerName: 'Code', width: 100 },
    { field: 'modelo', headerName: 'Modelo', flex: 1 },
    { field: 'categ', headerName: 'Categoria', flex: 1 },
    {
      field: 'precioventa',
      headerName: 'Precio Venta',
      type: 'number',
      flex: 1
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      type: 'actions',
      renderCell: (params) => <ButtonEdit params={params} />
    }
    // {
    //   field: 'actions',
    //   type: 'actions',
    //   getActions: (params) => [
    //     <GridActionsCellItem
    //       key={1}
    //       onClick={(e) => onClickAction(e, 'editar', params)}
    //       icon={
    //         <i className="bx bxs-pencil text-secondary-500 text-[22px]"></i>
    //       }
    //       label="Editar"
    //     />,
    //     <GridActionsCellItem
    //       key={2}
    //       label="Eliminar articulo"
    //       onClick={(e) => onClickAction(e, 'eliminar', params)}
    //       icon={<i className="bx bxs-trash text-red-500 text-[22px]"></i>}
    //     />
    //   ]
    // }
  ];
  // const [dataChange, setDataChange] = useState(false);
  // useEffect(() => {
  //   setDataChange(Date.now());
  // }, []);

  // const onClickAction = (e, ind, params) => {
  //   e.stopPropagation(); // don't select this row after clicking
  //   if (ind === 'editar') row_data(params.row);
  //   if (ind === 'eliminar') deleteProducto(params.row);
  // };

  // const deleteProducto = (prod) => {
  //   Swal.fire({
  //     icon: 'question',
  //     title: '¿Desea eliminar el articulo?',
  //     showDenyButton: true,
  //     confirmButtonText: 'Aceptar',
  //     denyButtonText: 'Cancelar',
  //     customClass: {
  //       actions: 'my-actions',
  //       denyButton: 'order-2',
  //       confirmButton: 'order-3 !bg-primary-500'
  //     }
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       await APIConsultas.producto.UPDATE(prod.idart, 'eliminado', 1);
  //       setDataChange(true);
  //       toast.success(`Articulo eliminado`);
  //     }
  //   });
  // };

  // const row_data = (data) => {
  //   router.push(
  //     `admin/producto/${servusos.convertUrl(data.modelo, 'convert')}`
  //   );
  // };

  return { columns_prods };
};

export default ProductoColumnConfig;
