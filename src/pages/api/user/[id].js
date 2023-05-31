import ctrlUser from '../../../controllers/user.control';

export default async function handler(req, res) {
  return new Promise((resolve) => {
    switch (req.method) {
      case 'PUT':
        switch (req.query.path) {
          case 'UPD_CLIENTE':
            return ctrlUser.UPD_CLIENTE(req, res, resolve);
        }
        break;
    }
  });
}
