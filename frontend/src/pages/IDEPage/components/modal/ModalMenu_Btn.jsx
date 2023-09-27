import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './ModalMenu_Btn.css'
import {GoPencil}  from 'react-icons/go' 
import {RiDeleteBinLine} from 'react-icons/ri' 
import { useState } from 'react';

export default function ModalMenu_Btn() {
  const [pjtBtnMenu, setPjtBtnMenu] = useState(null);
  const open = Boolean(pjtBtnMenu);
  
  const handleClick = (event) => {
    setPjtBtnMenu(event.currentTarget);
  };
  
  const handleClose = () => {
    setPjtBtnMenu(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
      </svg>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={pjtBtnMenu}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}><GoPencil size='21' className="pr-2"/>Rename</MenuItem>
        <hr className='text-xl' />
        <MenuItem onClick={handleClose}><RiDeleteBinLine size='22' color="#c22424" className="pr-2" />Delete</MenuItem>
      </Menu>
    </div>
  );
}