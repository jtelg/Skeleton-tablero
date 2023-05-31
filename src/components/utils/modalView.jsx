import { Box, Modal, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};
const ModalView = (props) => {
  const [open, setOpen] = useState(props.open);
  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const closemodal = (ev) => {
    ev.preventDefault();
    setOpen(false);
    return props.close(ev);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={(ev) => closemodal(ev)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="flex flex-col items-center rounded-xl border-2 border-secondary px-5 py-4 w-auto "
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h3"
            className={`font-commuter uppercase pt-1 pb-5 font-bold  text-xl flex w-full justify-between text-secondary Outfit`}
          >
            {props.titulo}
            <div
              className="text-red-500 cursor-pointer"
              onClick={(ev) => closemodal(ev)}
              aria-hidden
            >
              <span className="material-icons text-2xl">close</span>
            </div>
          </Typography>
          {props.children}
        </Box>
      </Modal>
    </>
  );
};
export default ModalView;
