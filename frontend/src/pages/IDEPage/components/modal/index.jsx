import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ModalMenu_Btn from './ModalMenu_Btn';
import {BiLogoJavascript, BiLogoPython, BiLogoJava } from 'react-icons/bi';
import * as projectService from '../../../../service/projectService';
import ProfileBadge from "../../../../components/ProfileBadge.jsx";

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



export default function Index({onProjClick,modal,setModal, handlePjtClick, projects,setProjects,isEditing,selectedProject,handleCreateButtonClick,setCreateId,projectBtnHandler,setSelectedProject}) {
    const [open, setOpen] = React.useState(true);
    const [editingId, setEditingId] = React.useState(null);
    const [pjtName, setPjtName] = React.useState('');
    const [pjtTextAreaValue, setPjtTextAreaValue] = React.useState('');
    const [template, setTemplate] = React.useState('');
    
 
    const fetchProjects = async () => {
        try {
          const response = await projectService.getProjects();
          if (response.success) {
            setProjects(response.data);
          } else {
            console.error(response.error);
          }
        } catch (error) {
          console.error(error);
        }
      };
      
      React.useEffect(() => {
        fetchProjects();
      }, []); // add dependencies if needed
      
    
      React.useEffect(() => {
        if (isEditing) {
          setPjtName(selectedProject.name);
          setPjtTextAreaValue(selectedProject.description);
        } else {
          setPjtName('');
          setPjtTextAreaValue('');
        }
      }, [isEditing, selectedProject]);
    
    
    const handleClose = () => {
        setOpen((prev)=>!prev);
        onProjClick(false)
    }



const renameProject = async () => {
    try {
        const currentProject = projects.find(project => project.id === editingId);
        const currentDescription = currentProject.description; 
        const response = await projectService.putProject(editingId, pjtName, currentDescription);
        
        if (response.success) {
            setProjects(projects => projects.map(
                project => project.id === editingId ? { ...project, name: pjtName } : project
            ))
            setEditingId(null);
        } else {
            console.error('Project update failed:', response);
        }
    } catch (error) {
        console.error('Error during project update:', error);
    }
}

const updateProject = async () => {
    try {
        const response = await projectService.putProject(selectedProject.id, pjtName, pjtTextAreaValue);
        if (response.success) {
            const updatedProject = { ...selectedProject, name: pjtName, description: pjtTextAreaValue };
            setProjects(projects.map(
                project => project.id === selectedProject.id ? updatedProject : project));
                setSelectedProject(updatedProject);
                projectBtnHandler(false)
        } else {
            console.error('Project update failed:', response);
        }
    } catch (error) {
        console.error('Error during project update:', error);
    }
};



    const deleteProject = async (projectId) => {
        try {
            const response = await projectService.deleteProject(projectId); 
            if (response.success){ 
                const deletedProjects = projects.filter(project => project.id !== projectId);
                setProjects(deletedProjects);
            } else {
                console.error('Project deletion failed:', response);
            }
        } catch (error) {
            console.error('Error during project deletion:', error);
        }

    };
  
    
    const createClose = ()=>{
        setModal(false);
          onProjClick(false)
    } 

    const handleBack = () =>{
        setModal(false);
    }

    const handleTemplateClick=(language)=>{
        setTemplate(language)
    }

    const handlePjtNameChange = (e)=>{
        setPjtName(e.target.value)
    }


    const nameSubmit = (e) =>{
        e.preventDefault();
        renameProject(editingId);
        setPjtName('');
        setEditingId(null);
    }
    const handleTextAreachange = (e) =>{
        setPjtTextAreaValue(e.target.value)
    }

    const pjtDescriptionSubmit = (e) => {
         e.preventDefault();
    } 
 

    const createProject = async () =>{
        const newProject ={
            template: template,
            name: pjtName ,
            description : pjtTextAreaValue, 
        }
        try {
            const response= await projectService.createProject(newProject);
            if(response.success){
                await fetchProjects(); 
                handlePjtClick(response.data.id);
                setCreateId(response.data.id);
            } else {
                console.error(response.error)
            }          
         } catch (error){
            console.error(error);  
        }
    };


    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-template"
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
                    <Typography id="modal-modal-template" component="div"  sx={{ my: 2}} style={{height : '430px', overflow:'auto'}}>
                     {projects.map((project)=>(
                        <div key={project.id} className='flex  py-4 hover:bg-[#46425e] ' style={{paddingLeft:'30px',fontSize:'22px'}} >
                            <div className='flex' onClick={editingId !== project.id ? () => handlePjtClick(project.id) : undefined} >
                                <div style={{width:'70px'}}>
                                    {/* {templateIcon(project.template)} */}
                                </div>
                                <div style={{ width: '430px' }}>
                                    {editingId === project.id ? (
                                        <form onSubmit={nameSubmit}>
                                            <input 
                                             className='bg-[#1D2332] focus:outline-none hover:bg-[#2B3245] h-8 rounded-md  my-0.5 placeholder:pl-2 text-white' 
                                                type="text"
                                                value={pjtName}
                                                onChange={handlePjtNameChange}
                                            />
                                        </form>
                                     ) : (
                                        project.name
                                    )}
                                </div>
                                <span style={{width:'150px'}} className='flex justify-center' >{project.updatedAt.slice(0,10)}</span>
                                <span className="flex" style={{width:'300px', marginLeft:'150px'}}>{project.collaborators.map(c => (
                                <ProfileBadge key={c.id} name={c.name.slice(-1)} />
                                    ))}
                                </span>
                            </div>
                                <ModalMenu_Btn 
                                    editingId={project.id}  
                                    setEditingId={setEditingId}  
                                    renameProject={renameProject} 
                                    projectId={project.id}
                                    deleteProject={deleteProject} />
                        </div>
                            ))}
                    </Typography>
                    <div className='w-full flex justify-center '>
                    <button className='bg-white px-5 py-1 rounded-2xl' onClick={()=>handleCreateButtonClick()} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#000000" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    </button>
                        {modal && 
                        <div>
                             <Modal
                                open={modal}
                                onClose={createClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-template"
                            >
                                <Box sx={style}>
                                    <Typography id="modal-modal-title" variant="h6" component="div" className='flex' style={{height:'500px'}} >
                                        <div className=' bg-white text-black rounded-2xl p-4 flex flex-col' style={{width : '230px', height:'475px'}}>
                                            <button disabled={isEditing} className={`flex p-1 ${template === 'Java' ? 'bg-slate-200' : 'hover:bg-slate-200'}`}  onClick={() => handleTemplateClick('Java')}>Java</button>
                                            <button disabled={isEditing} className={`flex p-1 ${template === 'JavaScript' ? 'bg-slate-200' : 'hover:bg-slate-200'}`}   onClick={() => handleTemplateClick('JavaScript')}>JavaScript</button>
                                            <button disabled={isEditing} className={`flex p-1 ${template === 'Python' ? 'bg-slate-200' : 'hover:bg-slate-200'}`}   onClick={() => handleTemplateClick('Py')}>Python</button>
                                        </div>
                                        <div style={{width:'1000px', color:'black', display:'flex', flexDirection:'column', alignItems:'center'}}>
                                            <form onSubmit={nameSubmit} >
                                                <input
                                                className='bg-[#D9D9D9] mb-10 pl-3 rounded-xl focus:outline-none' style={{width:'500px'}} 
                                                    type="text" 
                                                    value={pjtName} 
                                                    onChange={handlePjtNameChange} 
                                                    placeholder="프로젝트 이름" 
                                                    required
                                                />
                                            </form>
                                            <form onSubmit={pjtDescriptionSubmit} >
                                                <textarea 
                                                className='bg-[#D9D9D9] mb-10 pl-3 rounded-xl focus:outline-none' style={{width:'500px',height: '400px'}}
                                                    value={pjtTextAreaValue} 
                                                    onChange={handleTextAreachange} 
                                                    placeholder="프로젝트 설명 " 
                                                    required
                                                />
                                            </form>
                                         </div>
                                    </Typography>
                                   
                                    <div className='w-full flex justify-between'>
                                    <button className='py-1 px-5 bg-white text-black rounded-2xl' onClick={handleBack}>
                                        Back
                                    </button>
                                    {isEditing ? (
                                    <button className='py-1 px-4 bg-white text-black rounded-2xl' onClick={updateProject}>
                                    Update
                                    </button>
                                    ) : (
                                    <button className='py-1 px-4 bg-white text-black rounded-2xl' onClick={createProject}>
                                    Create
                                    </button>
                                    )}
                                    </div>
                                </Box>
                            </Modal>
                        </div>
                         }
                    </div>
                </Box>
                
            </Modal>
        </div>
    );
}