import ctrlProducto from '../../../controllers/producto.control';

export default async function handler(req, res) {
  return new Promise((resolve) => {
    switch (req.method) {
      case 'GET':
        switch (req.query.path) {
          case 'PRODUCTO_GET_LIST':
            return ctrlProducto.PRODUCTO_GET_LIST(req, res, resolve);
          case 'MEDIDA_GET_TODOLIST':
            return ctrlProducto.MEDIDA_GET_TODOLIST(req, res, resolve);
          case 'PRODUCTO_SEARCH':
            return ctrlProducto.PRODUCTO_SEARCH(req, res, resolve);
        }
        break;
      case 'POST':
        switch (req.query.path) {
          case 'PRODUCTO_ADD':
            return ctrlProducto.PRODUCTO_ADD(req, res, resolve);
        }
        break;
    }
    res.status(405).end();
    return resolve();
  });
}
