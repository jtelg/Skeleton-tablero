const ordenCol = {
  descrip: 'Lista de ordenes por clientes finales.',
  buttonTitle: 'Nueva Orden',
  icon: 'sell',
  count: 0,
  color: 'green',
  text_use: 'ordenes',
  indrow: 'idventa',
  ind_use: 0,
  path: ''
};
const prodCol = {
  descrip:
    'Lista de todos los productos cargados listos para mostrar en el catalogo.',
  buttonTitle: 'Nuevo Producto',
  icon: 'inventory_2',
  count: 0,
  color: 'primary',
  text_use: 'productos',
  indrow: 'idart',
  ind_use: 1,
  path: `/api/producto?path=PRODUCTO_GET_LIST&offset=0&limit=100&idcateg=0&idsubc=0&muestratodo=true`
};
const cliCol = {
  descrip:
    'En esta lista encontrará todos los clientes que realizaron alguna compra.',
  buttonTitle: 'Nuevo Cliente',
  icon: 'group',
  count: 0,
  color: 'indigo',
  text_use: 'clientes',
  indrow: 'iduser',
  ind_use: 2,
  path: `/api/user?path=USUARIO_GET_LIST`
};
const configCol = {
  titulo: '',
  descrip: '',
  icon: 'settings',
  count: '',
  color: 'indigo',
  text_use: '',
  indrow: '',
  ind_use: 3,
  path: `/admin/configuracion`
};

const egresoCol = {
  descrip: 'En esta lista encontrara todos los egresos registrados en caja',
  buttonTitle: 'Nuevo Egreso',
  icon: 'sell',
  count: 0,
  color: 'green',
  text_use: 'ordenes',
  indrow: 'idegreso',
  ind_use: 0,
  path: ''
};

const selectorColumns = { configCol, cliCol, prodCol, ordenCol, egresoCol };

export default selectorColumns;
