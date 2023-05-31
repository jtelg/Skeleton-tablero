import Image from 'next/image';
import { useState } from 'react';
import ModalList from '../../utils/modalList';
import { toast } from 'react-toastify';
import APIConsultas from '../../../services/consultas.js';
const ColorForm = (props) => {
  const [arr_inpscolor, setArr_inpscolor] = useState(
    props.formulario.arrcolor || []
  );
  const [timer, setTimer] = useState(null);
  const onChange = (index) => (ev) => {
    ev.preventDefault();
    const newArr = [...arr_inpscolor];
    newArr[index][ev.target.name] = ev.target.value;
    setArr_inpscolor(newArr);

    updateData(ev.target.name, ev.target.value, newArr[index].idcolor);
  };
  const updateData = (campo, valor, idcolor) => {
    clearTimeout(timer);
    setTimer(
      setTimeout(async () => {
        const res = await APIConsultas.color.UPDATE(
          props.formulario.idart,
          idcolor,
          campo,
          valor
        );
        if (res) {
          const obj = {
            preventDefault: () => {},
            target: {
              name: 'visible',
              value: ctrlVisible(null)
            }
          };
          props.setUpdate(obj);
          return toast.success(`Campo modificado con exito!`);
        }

        return toast.error(`Error al modificar el campo.`);
      }, 800)
    );
  };
  const setData = (item, name, index, DB) => {
    const newArr = [...arr_inpscolor];
    newArr[index][name] = item.map((e) => e.valor).join(', ');
    if (name === 'medida') {
      newArr[index].arrmedidas = item;
    }
    setArr_inpscolor(newArr);
    if (props.formulario.idart && DB) {
      newMedidaServer(item, newArr[index]);
    }
  };
  const newMedidaServer = async (medidas, color) => {
    medidas = medidas.length > 0 ? medidas : [{}];
    medidas.forEach((item) => {
      item.idart = color.idart;
      item.idcolor = color.idcolor;
    });
    const re = await APIConsultas.medida.XCOLOR_ADD(medidas);
    if (re) {
      const obj = {
        preventDefault: () => {},
        target: {
          name: 'visible',
          value: ctrlVisible(null)
        }
      };
      props.setUpdate(obj);
      return toast.success(`Medida agregada con exito`);
    }
    return toast.error(`Error al agregar la medida`);
  };
  const setValue = (ev, value, index, name) => {
    ev.preventDefault();
    const newArr = [...arr_inpscolor];
    newArr[index][name] = value;
    setArr_inpscolor(newArr);
  };
  const setNewColor = async (e) => {
    e.preventDefault();
    const objcarga = {
      idcolor: 0,
      idart: props.formulario.idart,
      code: '#000000',
      nomcolor: '',
      medida: '',
      arrimages: [],
      visible: false,
      viewmodal: false
    };
    const re = await APIConsultas.color.ADD(objcarga);
    if (re) {
      toast.success(`Color agregado al listado`);
      objcarga.idcolor = re.insertId;
      const newArr = [...arr_inpscolor];
      newArr.push(objcarga);
      setArr_inpscolor(newArr);

      const obj = {
        preventDefault: () => {},
        target: {
          name: 'arrcolor',
          value: newArr
        }
      };
      props.setUpdate(obj);

      return;
    }
    return toast.error(`error al agregar el Color`);
  };

  const deleteColor = async (e, index) => {
    e.preventDefault();
    const newArr = [...arr_inpscolor];
    const arr = JSON.stringify(newArr[index]);
    newArr.splice(index, 1);
    setArr_inpscolor(newArr);
    await deletecolorServer(JSON.parse(arr));

    const obj_arr = {
      preventDefault: () => {},
      target: {
        name: 'arrcolor',
        value: newArr
      }
    };
    props.setUpdate(obj_arr);
  };
  const deletecolorServer = async (data) => {
    const re = await APIConsultas.color.DELETE(data);
    if (re) {
      return toast.success(`Color eliminado del listado`);
    }
    return toast.error(`Error al eliminar el Color`);
  };

  const onFileChange = (index) => (ev) => {
    if (!ev.target.files) return;
    const arrfiles = ev.target.files;
    // setImageServer(index, arrfiles[0]);
    for (const file of arrfiles) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = document.createElement('img');
        image.onload = function () {
          // Resize the image
          const canvas = document.createElement('canvas');
          const max_size = 1450; // TODO : pull max size from a site config
          let width = image.width;
          let height = image.height;
          if (width > height) {
            if (width > max_size) {
              height *= max_size / width;
              width = max_size;
            }
          } else {
            if (height > max_size) {
              width *= max_size / height;
              height = max_size;
            }
          }
          canvas.width = width;
          canvas.height = height;
          canvas.getContext('2d').drawImage(image, 0, 0, width, height);
          // const img = dataURLtoBlob(canvas.toDataURL('image/png', 0.7));
          setImageServer(index, canvas.toDataURL('image/png', 0.7), file.name);
          // canvas.toDataURL('image/png');
        };
        image.src = e.target.result;
      };
      if (file !== 'length' && file !== 'item') {
        reader.readAsDataURL(file);
      }
    }
  };

  const setImageServer = async (index, image, filename) => {
    const newArr = [...arr_inpscolor];
    newArr[index].arrimages = [
      ...(newArr[index].arrimages ? newArr[index].arrimages : []),
      image
    ];
    setArr_inpscolor(newArr);
    const re = await APIConsultas.color.ADD_IMAGE_PHP(
      `${process.env.NEXT_PUBLIC_URL_IMG_GET}${newArr[index].idart}/idcolor-${newArr[index].idcolor}/`,
      image,
      filename
    );
    if (re.data.success)
      return toast.success(`Imagen por color agregada con exito`);
    return toast.error(`Error al agregar imagen por color`);
  };
  const deleteImage = async (img, indexcol, indeximg) => {
    const re = await APIConsultas.color.DEL_IMAGE_PHP(img);
    if (re.data.success) {
      const newArr = [...arr_inpscolor];
      newArr[indexcol].arrimages.splice(indeximg, 1);
      setArr_inpscolor(newArr);
      return toast.success(`Imagen por color eliminada con exito`);
    }
    return toast.error(`Error al eliminar imagen por color`);
  };

  const visibleMedida = async (ev, index, indexmed) => {
    ev.preventDefault();
    const newArr = [...arr_inpscolor];
    const med = newArr[index].arrmedidas[indexmed];
    med.visible = med.visible === 0 ? 1 : 0;
    setArr_inpscolor(newArr);
    const re = await APIConsultas.medida.XCOLOR_UPDATE(med);
    if (re) return toast.success(`Color visible!`);
    return toast.error(`Error al agregar imagen por color`);
  };

  const ctrlVisible = (arr) => {
    arr = arr !== null ? arr : arr_inpscolor;
    let ocultar = 0;
    arr.forEach((c) => {
      if (c.nomcolor === '' || !c.arrmedidas || c.arrmedidas.length === 0) {
        ocultar = 1;
      }
    });
    if (arr.length === 0) ocultar = 1;
    return ocultar;
  };

  return (
    <>
      <div className="cont-imgs w-full md:mt-0 my-4">
        <div className="flex flex-col gap-4 mb-2">
          <div className="rounded py-2  mt-4 mb-4">
            <h1 className="font-bold text-lg  font-commuter !lowercase text-secondary">
              COLORES, IMAGENES Y MEDIDAS
            </h1>
            <p className="text-xs text-black border-2 border-secondary  p-2 rounded-[20px]">
              Cada color tendrá la posibilidad de agregar imagenes ilimitadas, a
              su vez, se le permitira asignar medidas para mostrar en el
              catalogo al cliente. Cuando el cliente haga click sobre un color
              en la tarjeta del catalogo, se desplegaran las imagenes
              pre-cargadas junto a las medidas seleccionadas en este paso.
            </p>
          </div>
        </div>
        <div className="w-full relative">
          <div className="my-1 flex justify-end">
            <button
              onClick={setNewColor}
              className="text-primary-400 hover:text-primary-500 text-sm font-semibold m-0 cursor-pointer"
            >
              Añadir nuevo color
            </button>
          </div>
          <div className="md:max-h-[435px] md:overflow-y-auto fullScroll ">
            {arr_inpscolor?.map((col, index) => (
              <div
                key={index}
                className="py-6 px-2 m-[0.5rem] flex flex-col gap-4 shadow-[0_0px_4px_rgba(0,0,0,0.5)] bg-white z-40 max-w-[95%] left-0 overflow-y-auto rounded-xl"
              >
                <div className="w-full flex items-center pl-1">
                  <div className="btn-addimg group flex justify-center relative cursor-pointer w-[73px]">
                    <button
                      className="flex items-center justify-center rounded  mr-2 shadow border 
                                px-2 py-1 text-white   hover:shadow-none transition-all bg-primary-500"
                      title="Agregar imagen al color"
                    >
                      <span className="material-icons-outlined text-2xl">
                        add_photo_alternate
                      </span>
                    </button>
                    <label
                      className="btnimage block absolute top-0 h-6 w-6 cursor-pointer"
                      title="Agregar imagen al color"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        name="Imgcarga"
                        onChange={onFileChange(index)}
                        multiple
                      />
                    </label>
                  </div>
                  <div className="overflow-x-auto min-h-[56px] max-h-[345px] flex w-full items-center border-transparent border-l-2 relative">
                    <div className="flex">
                      {col.arrimages?.map((img, indeximg) => (
                        <div
                          key={indeximg}
                          className="flex relative justify-center items-center p-1 w-14 h-14 hover:bg-primary-100 cursor-pointer"
                        >
                          <span
                            aria-hidden
                            className="material-icons-outlined z-10 absolute top-[2px] right-[5px] text-sm cursor-pointer text-red-600"
                            title="Eliminar imagen del color"
                            onClick={() => deleteImage(img, index, indeximg)}
                          >
                            close
                          </span>
                          <Image
                            src={img}
                            alt="A"
                            width="85"
                            height="85"
                            className="rounded"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    title="Eliminar item del catalogo, todas las imagenes se borraran"
                    className="whitespace-pre uppercase text-xs px-2 py-[2px] h-[50px] rounded-lg text-red-500"
                    onClick={(ev) => deleteColor(ev, index)}
                  >
                    <span className="material-icons-outlined text-3xl">
                      delete_forever
                    </span>
                  </button>
                </div>

                <div className="flex items-center">
                  <div className="flex items-center flex-col pr-4 pl-2 relative">
                    <label
                      className="uppercase text-sm h-4 text-gray-500 font-bold md:text-sm text-light"
                      htmlFor="code"
                    >
                      {''}
                    </label>
                    <input
                      type="color"
                      id="code"
                      name="code"
                      className="cursor-pointer h-[50px] w-[50px] rounded-xl"
                      title="Codigo del color"
                      value={arr_inpscolor[index].code}
                      onChange={onChange(index)}
                    />
                  </div>
                  <div className="w-full">
                    <label
                      className="uppercase text-sm text-gray-500 font-bold md:text-sm text-light"
                      htmlFor="nomcolor"
                    >
                      Nombre
                      <abbr className="text-red-400 pl-1" title="required">
                        *
                      </abbr>
                    </label>
                    <input
                      className="w-full px-3 h-8 rounded-lg border-2 border-primary-300 focus:border-primary-600 "
                      type="text"
                      placeholder="Nombre del color"
                      id="nomcolor"
                      name="nomcolor"
                      value={arr_inpscolor[index].nomcolor}
                      onChange={onChange(index)}
                    />
                  </div>
                </div>
                <div className="flex">
                  <div className="btn-addimg flex justify-center items-end relative cursor-pointer w-[73px]">
                    <button
                      className="flex items-center justify-center rounded  mr-2 shadow border 
                      px-2 py-1 text-black   hover:shadow-none transition-all bg-primary-500"
                      title="Agregar imagen al color"
                      onClick={(ev) => setValue(ev, true, index, 'viewmodal')}
                    >
                      <span className="material-icons-outlined text-2xl">
                        square_foot
                      </span>
                    </button>
                  </div>
                  <div className="w-full flex flex-col mt-1 justify-center ">
                    <label
                      className="uppercase text-sm text-gray-500 font-bold md:text-sm text-light "
                      htmlFor="nomcolor"
                    >
                      Medidas
                      <abbr className="text-red-400 pl-1" title="required">
                        *
                      </abbr>
                    </label>
                    {/* <input
                        className="w-full px-3 h-8 rounded-lg border-2 border-primary-300 focus:border-primary-600 text-right"
                        type="text"
                        placeholder="Medidas disponibles"
                        id="medida"
                        name="medida"
                        readOnly
                        onClick={(ev) => setValue(ev, true, index, 'viewmodal')}
                        value={arr_inpscolor[index].medida}
                        onChange={onChange(index)}
                      /> */}
                    <ModalList
                      nomlist="Medidas"
                      data={props.arr_medidas}
                      keyuse="valor"
                      open={arr_inpscolor[index].viewmodal}
                      setdata={(item) => setData(item, 'medida', index, true)}
                      close={(ev) => setValue(ev, false, index, 'viewmodal')}
                      multiple={true}
                      arr_select={arr_inpscolor[index].arrmedidas}
                    />
                    <div className="flex gap-4">
                      {arr_inpscolor[index].arrmedidas?.map((med, indexmed) => (
                        <button
                          key={indexmed}
                          value={med.valor}
                          name="medida"
                          className={`rounded py-1 border-2 border-primary-500 transition-all text-sm
                                        font-medium cursor-pointer w-[30%] shadow ${
                                          med.visible === 0
                                            ? 'bg-secondary-500 text-white border-0'
                                            : 'bg-white'
                                        }`}
                          onClick={(ev) => visibleMedida(ev, index, indexmed)}
                        >
                          {med.valor}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                {/* <div className="flex mt-4">
                  <button
                    title="Eliminar item del catalogo, todas las imagenes se borraran"
                    className="whitespace-pre uppercase text-xs px-4 py-[2px]  text-gray-100 bg-red-400"
                    onClick={(ev) => deleteColor(ev, index)}
                  >
                    <span className="material-icons-outlined">
                      delete_forever
                    </span>
                  </button>
                  {col.visible === 1 ? (
                    <button
                      title="Ocultar color en el catalogo"
                      className="w-full uppercase text-xs bg-gray-400 text-gray-100"
                      onClick={(ev) => {
                        setValue(ev, 0, index, 'visible');
                        updateData('visible', 0, arr_inpscolor[index].idcolor);
                      }}
                    >
                      Ocultar de catalogo
                    </button>
                  ) : (
                    <button
                      title="Mostrar color en el catalogo"
                      className="w-full uppercase text-xs bg-secondary-600 text-white font-bold"
                      onClick={(ev) => {
                        setValue(ev, 1, index, 'visible');
                        updateData('visible', 1, arr_inpscolor[index].idcolor);
                      }}
                    >
                      Mostrar en catalogo
                    </button>
                  )}
                </div> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ColorForm;
