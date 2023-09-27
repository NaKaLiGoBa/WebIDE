import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ModalMenu_Btn from './ModalMenu_Btn';

const style = {
   
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1300,
    height: 600,
    bgcolor: '#25283D',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color: 'white' ,
    borderRadius:'21px',

};
const projects = [
    {
        id: 1,
        name: "네카라쿠배 webIDE Project",
        date: "2023-09-25",
        collaborators: ["김지민", "장원영","안유진"]
    },
    {
        id: 2,
        name: "New Project",
        date: "2023-08-20",
        collaborators: ["박지영", "김민수", "최하늘"]
    },
    {
        id: 3,
        name: "프로젝트 C",
        date: "2023-07-15",
        collaborators: ["정태영", "황미나"]
    }

];


export default function Index({onProjClick}) {
    const [open, setOpen] = React.useState(true);
    const [modal,setModal] =React.useState('');
    // const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen((prev)=>!prev);
        onProjClick(false)
    }

    // const LanguageIcon = (fileName) => {
    //     if (fileName.endsWith('.js')) return 'js';
    //     if (fileName.endsWith('.css')) return 'css';
    //     if (fileName.endsWith('.html')) return 'html';
    //     if (fileName.endsWith('.java')) return 'java';
    //     if (fileName.endsWith('.python')) return 'python';   
    //     return 'unknown'; 
    //   }


    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title"  variant="h6" component="div" className='flex pr-1' onClick={()=>{handleClose();}}>
                        <button className='bg-[#FF524E] my-1 grow-0' style={{padding : '5px',borderRadius:'50%'}}> 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        </button>
                        <div className='flex grow justify-around mr-9'>
                            <span>Project Title</span>
                            <span>Updated Date</span>
                            <span>Collaborator</span>
                        </div>
                    </Typography>
                    <hr className='mt-3'/>
                    <Typography id="modal-modal-description" component="div"  sx={{ my: 2}} style={{height : '430px'}}>
                     {projects.map((project)=>(
                        <div key={project.id} className='flex  py-4 hover:bg-[#46425e] ' style={{paddingLeft:'30px',fontSize:'22px'}}>
                                <div style={{width:'70px'}}>icon</div>
                                <span style={{width:'460px'}}>{project.name}</span>
                                <span style={{width:'150px'}} className='flex justify-center' >{project.date}</span>
                                <span style={{width:'360px', marginLeft:'150px'}}>{project.collaborators}</span>
                                <ModalMenu_Btn/>
                        </div>
                            ))}
                    </Typography>
                    <div className='w-full flex justify-center '>
                    <button className='bg-white px-5 py-1 rounded-2xl'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#000000" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    </button>
                    </div>
                </Box>
                
            </Modal>
        </div>
    );
}
