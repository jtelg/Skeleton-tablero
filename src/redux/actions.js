export const ARR_NAV = (payload) => async (dispatch) => {
  try {
    return dispatch({
      type: 'ARR_NAV',
      payload: payload
    });
  } catch (error) {
    console.error(error);
  }
};

export const CARRITO_ADD = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: 'CARRITO_ADD',
      payload: payload
    });
  } catch (error) {
    console.error(error);
  }
};

export const CARRITO_DELETE = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: 'CARRITO_DELETE',
      payload: payload
    });
  } catch (error) {
    console.error(error);
  }
};

export const CARRITO_DELETE_ALL = (payload) => async (dispatch) => {
  try {
    return dispatch({
      type: 'CARRITO_DELETE_ALL'
    });
  } catch (error) {
    console.error(error);
  }
};

// export const CARRITO_SHOW = () => (dispatch) => {
//   return dispatch({
//     type: 'CARRITO_SHOW'
//   });
// };

export const SESSION_SET = (payload) => async (dispatch) => {
  try {
    return dispatch({
      type: 'SESSION_SET',
      payload: payload
    });
  } catch (error) {
    console.error(error);
  }
};

export const GLOBAL_VARS = (payload) => async (dispatch) => {
  try {
    return dispatch({
      type: 'GLOBAL_VARS',
      payload: payload
    });
  } catch (error) {
    console.error(error);
  }
};

export const VENTAS_SET = (payload) => async (dispatch) => {
  try {
    return dispatch({
      type: 'VENTAS_SET',
      payload: payload
    });
  } catch (error) {
    console.error(error);
  }
};

export const RELOAD_TABLERO = (payload) => async (dispatch) => {
  try {
    return dispatch({
      type: 'RELOAD_TABLERO',
      payload: payload
    });
  } catch (error) {
    console.error(error);
  }
};

export const RELOAD_CAJA = (payload) => async (dispatch) => {
  try {
    return dispatch({
      type: 'RELOAD_CAJA',
      payload: payload
    });
  } catch (error) {
    console.error(error);
  }
};

export const BOTWPP_SET = (payload) => async (dispatch) => {
  try {
    return dispatch({
      type: 'BOTWPP_SET',
      payload: payload
    });
  } catch (error) {
    console.error(error);
  }
};
