import { useRouter } from 'next/router';
import { useState } from 'react';

import ModalView from '../../utils/modalView';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Swal from 'sweetalert2';

import { toast } from 'react-toastify';

import axios from 'axios';

const ClientesInsert = (props) => {
  const [formulario, setFormulario] = useState({
    role: 'Cliente',
    nombre: '',
    apellido: '',
    pass: '',
    image: '',
    tipodoc: 2,
    numdoc: '',
    telefono: '',
    email: '',
    fecregistro: '',
    recibe_oferta: 0,
    tipoCliente: ''
  });
  const router = useRouter();

  const handlerChange = (e) => {
    e.preventDefault();
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    if (formulario.numdoc.length !== 11) {
      return toast.error(`CUIT incorrecto`);
    } else if (
      formulario.nombre.length > 0 &&
      formulario.telefono.length > 0 &&
      formulario.email.length > 0 &&
      formulario.tipoCliente.length > 0
    ) {
      const objUser = formulario;
      const resp = await axios.post('/api/user/login?path=SAVE_USER', {
        objUser
      });
      if (resp.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Usuario creado',
          showConfirmButton: false,
          timer: 1500
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        text: 'Something went wrong!',
        showConfirmButton: false
      });
    }
    closeModal();
  };

  const closeModal = (ev) => {
    ev?.preventDefault();
    props.close(false);
    router.push('/admin?s=clientes');
  };
  return (
    <>
      <ModalView
        open={props.open}
        titulo="Alta de producto"
        close={() => closeModal()}
      >
        <article className="h-full">
          <form onSubmit={handlerSubmit} className="grid grid-cols-2 gap-3">
            <div>
              <label className="flex  font-bold text-[15px]" htmlFor="nombre">
                Nombre
                <abbr title="required" className="text-[#ff0000]">
                  *
                </abbr>
              </label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                onChange={handlerChange}
                className="border border-black h-[40px] rounded-lg w-full p-1"
              />
            </div>
            <div>
              <label className="flex  font-bold text-[15px]" htmlFor="nombre">
                Apellido
                <abbr title="required" className="text-[#ff0000]">
                  *
                </abbr>
              </label>
              <input
                type="text"
                name="apellido"
                id="apellido"
                onChange={handlerChange}
                className="border border-black h-[40px] rounded-lg w-full p-1"
              />
            </div>

            <div>
              <label className="flex   font-bold text-[15px]" htmlFor="numdoc">
                CUIT
                <abbr title="required" className="text-[#ff0000]">
                  *
                </abbr>
              </label>

              <input
                type="number"
                name="numdoc"
                onChange={handlerChange}
                className="border border-black h-[40px] rounded-lg w-full p-1"
              />
            </div>
            <div>
              <label
                className="flex   font-bold text-[15px]"
                htmlFor="telefono"
              >
                Telefono
                <abbr title="required" className="text-[#ff0000]">
                  *
                </abbr>
              </label>
              <input
                type="text"
                name="telefono"
                onChange={handlerChange}
                className="border border-black h-[40px] rounded-lg w-full p-1"
              />
            </div>
            <div>
              <label className="flex   font-bold text-[15px]" htmlFor="email">
                Email
                <abbr title="required" className="text-[#ff0000]">
                  *
                </abbr>
              </label>
              <input
                type="text"
                name="email"
                onChange={handlerChange}
                className="border border-black h-[40px] rounded-lg w-full p-1"
              />
            </div>
            <div>
              <label className="  font-bold text-[15px]" htmlFor="tipoCliente">
                Tipo Cliente
                <abbr title="required" className="text-[#ff0000]">
                  *
                </abbr>
              </label>
              <FormControl fullWidth className="formReg">
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formulario.tipoCliente}
                  label="tipoCliente"
                  name="tipoCliente"
                  onChange={handlerChange}
                  className="border border-black"
                >
                  <MenuItem value={'Proveedor'}>Proveedor</MenuItem>
                  <MenuItem value={'Comprador'}>Comprador</MenuItem>
                  <MenuItem value={'Consumidor Final'}>
                    Consumidor Final
                  </MenuItem>
                </Select>
              </FormControl>
            </div>

            <input
              type="submit"
              value="Crear usuario"
              className="col-span-2 text-white bg-primary-500 h-[40px] rounded-lg"
            />
          </form>
        </article>
      </ModalView>
    </>
  );
};
export default ClientesInsert;
