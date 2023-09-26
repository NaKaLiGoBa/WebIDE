import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1300,
    height: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Index({onProjClick}) {
    const [open, setOpen] = React.useState(true);
    // const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen((prev)=>!prev);
        onProjClick(false)
    }


    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" className='flex' onClick={()=>{handleClose();}}>
                        <button className='bg-[#FF524E] rounded-full px-1 py-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        </button>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                    이 부분
                </Box>
            </Modal>
        </div>
    );
}