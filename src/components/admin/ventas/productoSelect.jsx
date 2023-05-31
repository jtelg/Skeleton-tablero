import React from 'react';

import ContadorProd from '../../utils/contadorProd';
class ProductoSelect extends React.Component {
  state = {
    arrProductos: []
  };

  static getDerivedStateFromProps(props) {
    return { arrProductos: props.productos };
  }

  // componentDidMount() {
  //   this.setState({ arrProductos: this.props.productos });
  // }

  changeData(data) {
    const indexProd = this.state.arrProductos.findIndex(
      (prod) => prod.idart === data.idart
    );
    const newarr = this.state.arrProductos;
    newarr[indexProd] = data;
    // setArrProductos([...newarr]);
    this.setState({ arrProductos: [...newarr] });
  }

  totalProd(prod) {
    return (prod.cantidadForm * prod.precioventa).toLocaleString('de');
  }

  render() {
    return (
      <>
        {this.state.arrProductos && (
          <div className="w-full mt-4">
            <ul className="flex flex-col gap-4 rounded mb-4 w-full">
              {this.state.arrProductos.map((prod, index) => (
                <li
                  key={index}
                  className="flex gap-4 items-center pr-2 bg-white py-1 px-1 border-b-[1px] w-full"
                >
                  <div className="w-full">
                    <div className="flex justify-between items-center gap-6">
                      <ContadorProd
                        prod={prod}
                        actualizaProd={(data) => this.changeData(data)}
                      />
                      <span className="uppercase font-bold text-sm w-full">
                        <b>{prod.modelo}</b>
                      </span>
                      <span className=" justify-end flex font-bold text-[14px] w-1/4 whitespace-pre">
                        {/* <b>{prod.cantidad} x</b> */}
                        <b className="pl-1">$ {this.totalProd(prod)}</b>
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </>
    );
  }
}
// const ProductoSelect = (props) => {
//   const [arrProductos, setArrProductos] = useState(null);
//   // const [data, setData] = useState(ventas);

//   const changeData = (data) => {
//     const indexProd = arrProductos.findIndex(
//       (prod) => prod.idart === data.idart
//     );
//     const newarr = arrProductos;
//     newarr[indexProd] = data;
//     setArrProductos([...newarr]);
//   };
//   useEffect(() => {
//     setArrProductos(props.productos);
//   }, [props]);

//   // const addProd = (e, prod) => {
//   //   e.preventDefault();
//   //   const filter = data.filter((v) => v.idart === prod.idart);
//   //   if (filter.length === 0) {
//   //     setData([...data, prod]);
//   //   } else {
//   //     setData(data.filter((v) => v.idart !== prod.idart));
//   //   }
//   // };
//   const totalProd = (prod) => {
//     return (prod.cantidadForm * prod.precioventa).toLocaleString('de');
//   };
//   // const agregar = () => {
//   //   setVentas(data);
//   // };

//   return (
//     <>
//       {arrProductos && (
//         <div className="w-full mt-4">
//           <ul className="flex flex-col gap-4 rounded mb-4 w-full">
//             {arrProductos?.map((prod, index) => (
//               <li
//                 key={index}
//                 className="flex gap-4 items-center pr-2 bg-white py-1 px-1 border-b-[1px] w-full"
//               >
//                 <div className="w-full">
//                   <div className="flex justify-between items-center gap-6">
//                     <ContadorProd
//                       prod={prod}
//                       actualizaProd={(data) => changeData(data)}
//                     />
//                     <span className="uppercase font-bold text-sm w-full">
//                       <b>{prod.modelo}</b>
//                     </span>
//                     <span className=" justify-end flex font-bold text-[14px] w-1/4 whitespace-pre">
//                       {/* <b>{prod.cantidad} x</b> */}
//                       <b className="pl-1">$ {totalProd(prod)}</b>
//                     </span>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </>
//   );
// };

export default ProductoSelect;
