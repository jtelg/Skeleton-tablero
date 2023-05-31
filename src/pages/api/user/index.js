import ctrlUser from '../../../controllers/user.control';

export default async function handler(req, res) {
  return new Promise((resolve) => {
    switch (req.method) {
      case 'POST':
        return null;
      case 'GET':
        switch (req.query.path) {
          case 'VARIABLES_GET':
            return ctrlUser.VARIABLES_GET(req, res, resolve);
          case 'USUARIO_GET_LIST':
            return ctrlUser.USUARIO_GET_LIST(req, res, resolve);
          case 'CATEGSVIEW_GET_COUNT':
            return ctrlUser.CATEGSVIEW_GET_COUNT(req, res, resolve);
        }
        break;
      case 'PUT':
        switch (req.query.path) {
          case `SP_variables_put`:
            return ctrlUser.SP_variables_put(req, res, resolve);
        }
        break;
    }
    res.status(405).end();
    return resolve();
  });
}
