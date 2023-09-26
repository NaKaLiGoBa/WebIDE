import Chatroom from "./components/chatroom";
import Console from "./components/console";
import Editor from "./components/editor";
import FileExplorer from "./components/file_explorer";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Modal from "./components/modal";
import { useState } from "react";

const index = () => {
  const [onModalClick, setOnModalClick] = useState(false);
  const projectBtnHandler = (isOn) => {
    setOnModalClick(isOn);
  };

  return (
    <div>
           {onModalClick && <Modal onProjClick={projectBtnHandler}/>}
      <div className="flex flex-col h-screen relative">
        <Header onProjClick={projectBtnHandler} />
        <div className="flex flex-row h-full">
          <div className="flex flex-row w-1/4">
            <Sidebar />
            <FileExplorer />
          </div>
          <div className="flex flex-col w-3/4 h-full">
            <Editor />
            <Console />
          </div>
        </div>
        <Chatroom className="absolute bottom-0 right-0 z-50" />
      </div>
    </div>
  );
};

export default index;