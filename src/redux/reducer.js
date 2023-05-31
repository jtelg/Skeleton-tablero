import { HYDRATE } from 'next-redux-wrapper';
import localStorage from '../utils/localstorage.utils';

const initialState = {};
let nextState = {};
let index_exist = -1;
let data = [];
const postReducer = (state = initialState, action) => {
  switch (action.type) {
    // #region Carrito
    case 'ARR_NAV':
      return {
        ...state,
        arr_nav: action.payload
      };
    case 'CARRITO_ADD':
      if (state.CART_DATA) {
        index_exist = state.CART_DATA.findIndex((d) => {
          return d.numPedido === action.payload.numPedido;
        });
      }

      if (index_exist > -1) {
        // state.CART_DATA[index_exist].cantidad += action.payload.cantidadForm;
        state.CART_DATA[index_exist].cantidadForm = action.payload.cantidadForm;
        state.CART_DATA[index_exist].comentario = action.payload.comentario;
        data = state.CART_DATA;
      } else {
        action.payload.cantidad = action.payload.cantidadForm;
        data = [...(state.CART_DATA ? state.CART_DATA : []), action.payload];
      }
      localStorage.setToStorage('arr_carro', data);
      return {
        ...state,
        CART_RELOAD: !state.CART_RELOAD,
        CART_DATA: data
      };
    case 'CARRITO_DELETE':
      data = state.CART_DATA.filter((d) => {
        return d.numPedido !== action.payload.numPedido;
      });
      localStorage.setToStorage('arr_carro', data);
      return {
        ...state,
        CART_RELOAD: !state.CART_RELOAD,
        CART_DATA: data
      };
    // case 'CARRITO_SHOW':
    //   return {
    //     ...state,
    //     CARRITO_SHOW: !state.CARRITO_SHOW
    //   };
    case 'CARRITO_DELETE_ALL':
      localStorage.setToStorage('arr_carro', []);
      return {
        ...state,
        CART_DATA: []
      };
    case 'SESSION_SET':
      localStorage.setToStorage('session', action.payload);
      return {
        ...state,
        session: action.payload
      };
    case 'GLOBAL_VARS':
      return {
        ...state,
        globalVars: action.payload
      };
    case 'VENTAS_SET':
      return {
        ...state,
        arrVentas: action.payload
      };
    case 'RELOAD_CAJA':
      return {
        ...state,
        reloadCaja: action.payload
      };
    case 'RELOAD_TABLERO':
      return {
        ...state,
        reloadTablero: action.payload
      };
    case 'BOTWPP_SET':
      return {
        ...state,
        botState: action.payload
      };
    case HYDRATE:
      nextState = {
        ...state,
        ...action.payload
      };
      if (state.count) nextState.count = state.count;
      return nextState;
    default:
      return state;
  }
};

export default postReducer;
