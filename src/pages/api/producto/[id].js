import ctrlProducto from '../../../controllers/producto.control';

export default async function handler(req, res) {
  return new Promise((resolve) => {
    switch (req.method) {
      case 'POST':
        switch (req.query.path) {
          case 'COLORXPROD_ADD':
            return ctrlProducto.COLORXPROD_ADD(req, res, resolve);
          case 'MEDIDAXCOLOR_ADD':
            return ctrlProducto.MEDIDAXCOLOR_ADD(req, res, resolve);
          case 'MEDIDAXPROD_ADD':
            return ctrlProducto.MEDIDAXPROD_ADD(req, res, resolve);
        }
        break;
      case 'DELETE':
        switch (req.query.path) {
          case 'COLORXPROD_DELETE':
            return ctrlProducto.COLORXPROD_DELETE(req, res, resolve);
        }
        break;
      case 'PUT':
        switch (req.query.path) {
          case 'PRODUCTO_UPDATE':
            return ctrlProducto.PRODUCTO_UPDATE(req, res, resolve);
          case 'COLOR_UPDATE':
            return ctrlProducto.COLOR_UPDATE(req, res, resolve);
          case 'MEDIDAXCOLOR_UPDATE':
            return ctrlProducto.MEDIDAXCOLOR_UPDATE(req, res, resolve);
        }
        break;
      case 'GET':
        switch (req.query.path) {
          case 'PRODUCTO_GET_XID':
            return ctrlProducto.PRODUCTO_GET_XID(req, res, resolve);
          case 'MEDIDAXPROD_GET':
            return ctrlProducto.MEDIDAXPROD_GET(req, res, resolve);
        }
        break;
    }
  });
}
