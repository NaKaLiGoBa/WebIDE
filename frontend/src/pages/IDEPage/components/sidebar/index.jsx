import { useState } from "react";
import Explorer from "../file_explorer/index";



const Index = () => {
  const [selectedTab, setSelectedTab] = useState(null);

  const tabHandleClick = (tabName) => {
    setSelectedTab((prevTab) => {
      if (prevTab !== tabName) {
        return tabName;
      } else {
        return "";
      }
    });
  };

  return (
    <>
   <div className="w-11 pr-2  bg-[#0E1525] z-10 flex items-center flex-col">
      <div className="pt-2 pb-2 flex">
        <div style={{ backgroundColor: selectedTab === 'tabFiles'?'#609AE2':' #0E1525', width:selectedTab === 'tabFiles'? '4px' : '4px',marginRight :selectedTab === 'tabFiles'? '3px' : '3px' }}></div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}  className="w-7 h-7"
        style={{ stroke: selectedTab === 'tabFiles'?'white': '#666B75'}} 
        onClick={()=>tabHandleClick('tabFiles')}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
        </svg>

      </div>
      <div className="flex">  
      <div style={{ backgroundColor: selectedTab === 'tabSetting'?'#609AE2':' #0E1525', width:selectedTab === 'tabSetting'? '4px' : '4px', 
        marginRight :selectedTab === 'tabSetting'? '3px' : '3px' }}></div>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}  className="w-7 h-7 hover:stroke-white" style={{ stroke: selectedTab === 'tabSetting'?'white': '#666B75'}}
      onClick={()=>tabHandleClick('tabSetting')}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  </div>
</div>
<Explorer selectedTab={selectedTab} />
</>
)
}

export default Index
