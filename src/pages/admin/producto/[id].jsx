import ProductoUpdate from '../../../components/admin/productoForm/productoUpdate';
// import APIConsultas from '../../../services/consultas';
const ProductoPageID = (props) => {
  return (
    <>
      <ProductoUpdate {...props} />
    </>
  );
};
ProductoPageID.auth = {
  role: 'Admin'
};
export default ProductoPageID;

export const getServerSideProps = async (ctx) => {
  return {
    props: {
      idPage: ctx.query.id
    }
  };
};
