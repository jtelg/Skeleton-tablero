import ctrlVenta from '../../../controllers/venta.control';

export default async function handler(req, res) {
  return new Promise((resolve) => {
    switch (req.method) {
      case 'POST':
        switch (req.query.path) {
          case 'VENTA_ADD':
            return ctrlVenta.VENTA_ADD(req, res, resolve);
        }
        break;
      case 'GET':
        switch (req.query.path) {
          case 'VENTA_GET_LIST':
            return ctrlVenta.VENTA_GET_LIST(req, res, resolve);
          case 'VENTA_GET_XID':
            return ctrlVenta.VENTA_GET_XID(req, res, resolve);
          case 'VENTA_GET_PROD_XID':
            return ctrlVenta.VENTA_GET_PROD_XID(req, res, resolve);
        }
        break;
      case 'PUT':
        switch (req.query.path) {
          case 'UPDATE_ESTADO':
            return ctrlVenta.UPDATE_ESTADO(req, res, resolve);
          case 'UPDATE_SEGUIMIENTO':
            return ctrlVenta.UPDATE_SEGUIMIENTO(req, res, resolve);
          case 'UPDATE_XCAMPO':
            return ctrlVenta.UPDATE_XCAMPO(req, res, resolve);
        }
        break;
    }
    res.status(405).end();
    return resolve();
  });
}
