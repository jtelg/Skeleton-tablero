import { useEffect, useState } from 'react';
import APIConsultas from '../../../services/consultas';
import { toast } from 'react-toastify';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';

const style = {
  position: 'absolute',
  top: '50%',
  left: '55%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

const Accionesfull = (
  sub_categ,
  categ,
  setCateg_sub_categ,
  setSelectSub_categ
) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [rows, setRows] = useState([]);
  const [name, setName] = useState('');
  const columns = [
    { field: 'idsubc', headerName: 'ID', flex: 0.5 },
    {
      field: 'nombre',
      headerName: 'Nombre',
      flex: 2,
      editable: true
    },
    {
      headerName: 'Actions',
      field: 'actions',
      flex: 0.5,
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem
          key={2}
          label="Eliminar articulo"
          onClick={(e) => onClickAction(e, 'delete', params)}
          icon={
            <span className="material-icons-outlined text-red-600">
              delete_forever
            </span>
          }
        />
      ]
    }
  ];

  useEffect(() => {
    setRows(sub_categ);
  }, [sub_categ]);

  const getData = async () => {
    const subCategs = (
      await APIConsultas.subCategorias.GET_XID(categ.idcateg, true)
    ).filter((c) => c.nombre !== 'No definido');
    setRows(subCategs);
  };
  const onClickAction = async (e, ind, params) => {
    e.stopPropagation(); // don't select this row after clicking
    if (ind === 'delete') {
      const res = await APIConsultas.subCategorias.DELETE(params.id);
      if (res) {
        getData();
        return toast.success(`Campo eliminado`);
      } else {
        return toast.error(`Error al eliminar el campo.`);
      }
    } else if (ind === 'subcateg') {
      const res = await APIConsultas.subCategorias.GET_CATEG_XID(
        params.id,
        true
      );
      setSelectSub_categ(params.row);
      setCateg_sub_categ(res.filter((c) => c.nombre !== 'No definido'));
    }
  };

  const edit = async (value) => {
    const res = await APIConsultas.subCategorias.UPDATE(value.id, value.value);
    if (res) return toast.success(`Campo actualizado con exito!`);
    return toast.error(`Error al modificar el campo.`);
  };

  const addCateg = async (e) => {
    e.preventDefault();
    if (name.length > 1) {
      const resp = await APIConsultas.subCategorias.ADD(name, categ.idcateg);
      if (resp) {
        getData();
        handleClose();
        return toast.success(`Campo creado con exito!`);
      } else {
        return toast.error(`Error al modificar el campo.`);
      }
    }
  };
  const handleEvent = (
    params, // GridRowParams
    e
  ) => {
    onClickAction(e, 'subcateg', params);
  };
  return {
    addCateg,
    edit,
    onClickAction,
    handleClose,
    handleOpen,
    rows,
    open,
    columns,
    name,
    setName,
    setRows,
    handleEvent
  };
};

const SubCategorias = ({
  sub_categ,
  categ,
  setCateg_sub_categ,
  setSelectSub_categ
}) => {
  const {
    addCateg,
    edit,
    handleClose,
    handleOpen,
    rows,
    open,
    columns,
    name,
    setName,
    handleEvent
  } = Accionesfull(sub_categ, categ, setCateg_sub_categ, setSelectSub_categ);

  return (
    <>
      <article className="w-full px-2">
        <div className="flex flex-col gap-4 justify-center px-5 py-6 shadow-sm rounded bg-primary-500">
          <div className="flex justify-between">
            <h1 className="text-white text-lg uppercase text-left font-bold w-full flex gap-1 font-commuter">
              Sub Categorias
            </h1>
            {categ.idcateg && (
              <button
                className="rounded shadow-md px-2 py-1 font-bold bg-white transition-colors whitespace-pre"
                onClick={handleOpen}
              >
                + AGREGAR NUEVO
              </button>
            )}
          </div>

          <div className="w-full h-96 bg-white">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
              disableSelectionOnClick
              getRowId={(row) => row.idsubc}
              onCellEditCommit={(values) => edit(values)}
              showCellRightBorder={true}
              showColumnRightBorder={true}
              onRowClick={handleEvent}
            />
          </div>
        </div>
      </article>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-between">
            <h3 className="uppercase text-secondary-500 font-bold text-center text-[16px]">
              Agregando Sub cat.
            </h3>
            <button
              onClick={handleClose}
              className="font-bold text-[18px] text-red-500"
            >
              X
            </button>
          </div>

          <form onSubmit={addCateg} className="pt-4">
            <div className="grid grid-cols-1 w-full">
              <label
                htmlFor={name}
                className="uppercase text-sm text-gray-500 font-bold text-light md:text-sm"
              >
                Nombre
              </label>
              <input
                className="px-3 h-10 rounded-lg border-2 border-primary-300 mt-1 focus:border-primary-600  outline-none"
                id={name}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-full text-center pt-6">
              <input
                className="px-8 py-1 bg-primary-500 rounded text-black font-bold w-full cursor-pointer"
                type="submit"
                value="Confirmar"
              />
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default SubCategorias;
