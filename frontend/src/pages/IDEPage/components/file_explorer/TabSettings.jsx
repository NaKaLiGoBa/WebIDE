export default function TabSettings({createModal, projectBtnHandler}) {
  const handleCreateModal = () => {
    projectBtnHandler(true);
    createModal();
  };
  return (
    <div style={{width : '440px', border: '0.5px solid black'}} className='bg-[#0E1525]  text-white flex '>
       <div className=' font-medium pl-1 pr-2 pt-1'>
      Settings
        <button className="flex text-sm leading-3 pl-2 pt-2 items-center " onClick={handleCreateModal}> 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 pr-1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          Project Information  
        </button>
        </div>
    </div>
  )
}
