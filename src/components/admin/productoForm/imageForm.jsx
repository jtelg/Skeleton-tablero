import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import APIConsultas from '../../../services/consultas';
import ModalList from '../../utils/modalList';
const ImageForm = (props) => {
  const [arrImgs, setArrImgs] = useState([]);
  const [modalMedida, setModalMedida] = useState(false);
  const [arrMedidaSel, setArrMedidaSel] = useState([]);
  const [inpMedida, setInpMedida] = useState([]);
  useEffect(() => {
    setInpMedida(
      props.formulario.arrmedidasIndiv
        ?.filter((e) => e.valor && e.valor)
        .map((e) => e.valor)
        .join(', ') || []
    );
    setArrImgs(props.formulario.arrimagesIndiv || []);
    setArrMedidaSel(props.formulario.arrmedidasIndiv || []);
  }, [props.formulario.arrimagesIndiv, props.formulario.arrmedidasIndiv]);

  const onFileChange = () => (ev) => {
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
          setImageServer(canvas.toDataURL('image/png', 0.7), file.name);
          // canvas.toDataURL('image/png');
        };
        image.src = e.target.result;
      };
      if (file !== 'length' && file !== 'item') {
        reader.readAsDataURL(file);
      }
    }

    async function setImageServer(image, filename) {
      const arrim = [...arrImgs];
      arrim.push(image);
      setArrImgs(arrim);
      const re = await APIConsultas.color.ADD_IMAGE_PHP(
        `${process.env.NEXT_PUBLIC_URL_IMG_GET}${props.formulario.idart}/images/`,
        image,
        filename
      );
      if (re.data.success) {
        const obj = {
          preventDefault: () => {},
          target: {
            name: 'arrimagesIndiv',
            value: arrim
          }
        };
        props.setUpdate(obj);
        return toast.success(`Dato actualizado!`, {
          autoClose: 1000
        });
      }

      return toast.error(`Error al agregar imagen.`);
    }
  };
  const deleteImage = async (img, indeximg) => {
    const re = await APIConsultas.color.DEL_IMAGE_PHP(img);
    if (re.data.success) {
      const arrim = [...arrImgs];
      arrim.splice(indeximg, 1);
      setArrImgs(arrim);

      const obj = {
        preventDefault: () => {},
        target: {
          name: 'arrimagesIndiv',
          value: arrim
        }
      };
      props.setUpdate(obj);

      return toast.success(`Dato actualizado!`, {
        autoClose: 1000
      });
    }
    return toast.error(`Error al eliminar imagen por color`);
  };
  const onChange = (index) => (ev) => {
    ev.preventDefault();
  };
  const setMedida = (item) => {
    setArrMedidaSel(item);
    setInpMedida(item.map((e) => e.valor).join(', '));
    if (props.formulario.idart) {
      newMedidaServer(item);
    }
  };

  const newMedidaServer = async (medidas) => {
    medidas.forEach((item) => {
      item.idart = props.formulario.idart;
    });
    const re = await APIConsultas.producto.MEDIDAXPROD_ADD(
      medidas.length > 0 ? medidas : [{ idart: props.formulario.idart }]
    );
    if (re) {
      const obj = {
        preventDefault: () => {},
        target: {
          name: 'arrmedidasIndiv',
          value: medidas
        }
      };
      props.setUpdate(obj);
      // const obj = {
      //   preventDefault: () => {},
      //   target: {
      //     name: 'visible',
      //     value: medidas.length === 0 ? 1 : 0
      //   }
      // };
      // props.setUpdate(obj);
      return toast.success(`Dato actualizado!`, {
        autoClose: 1000
      });
    }
    return toast.error(`Error al agregar la medida`);
  };
  return (
    <>
      <div className="rounded py-2   mt-4 mb-4 ">
        <h1 className="font-bolder text-lg font-commuter !lowercase text-secondary font-bold ">
          Imagenes y medidas
        </h1>
        <p className="text-[13px] text-black border-2 border-secondary rounded-[20px] mt-1  p-2  ">
          Tiene la posibilidad de agregar imagenes ilimitadas, asi tambien, como
          podra seleccionar entre las medidas cargadas.
        </p>
      </div>
      <div className="w-full flex items-center pl-1">
        <div className="btn-addimg group flex justify-center relative cursor-pointer w-[73px]">
          <button
            className="flex items-center justify-center rounded  mr-2 shadow border 
                                px-2 py-1 text-white outline-none hover:shadow-none transition-all bg-primary-500"
            title="Agregar imagen al color"
          >
            <span className="material-icons-outlined text-2xl">
              add_photo_alternate
            </span>
          </button>
          <label
            className="btnimage block absolute top-0 h-12 w-12 cursor-pointer"
            title="Agregar imagen al color"
          >
            <input
              type="file"
              accept="image/*"
              name="Imgcarga"
              onChange={onFileChange()}
              multiple
              className="hidden"
            />
          </label>
        </div>
        <div className="overflow-x-auto min-h-[56px] max-h-[345px] flex w-full items-center border-transparent border-l-2 relative">
          <div className="flex">
            {arrImgs.map((img, indeximg) => (
              <div
                key={indeximg}
                className="flex relative justify-center items-center p-1 w-14 h-14 hover:bg-primary-100 cursor-pointer"
              >
                <span
                  aria-hidden
                  className="material-icons-outlined z-10 absolute top-[2px] right-[5px] text-sm cursor-pointer text-red-600"
                  title="Eliminar imagen del color"
                  onClick={() => deleteImage(img, indeximg)}
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
      </div>
      <div className="w-full flex flex-col mt-1 justify-center">
        <label
          className="uppercase text-sm text-gray-500 font-bold md:text-sm text-light"
          htmlFor="nomcolor"
        >
          Medidas
        </label>
        <input
          className="w-full px-3 h-[42px]  border-2 border-secondary rounded-[20px] mt-1"
          type="text"
          placeholder="Medidas disponibles"
          id="medida"
          name="medida"
          readOnly
          onClick={(ev) => setModalMedida(true)}
          value={inpMedida}
          onChange={onChange()}
        />
        <ModalList
          nomlist="Medidas"
          data={props.arr_medidas}
          keyuse="valor"
          open={modalMedida}
          setdata={(item) => setMedida(item)}
          close={(ev) => setModalMedida(false)}
          multiple={true}
          arr_select={arrMedidaSel}
        />
      </div>
    </>
  );
};

export default ImageForm;
