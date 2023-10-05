import Chatroom from "./components/chatroom";
import Console from "./components/console";
import Editor from "./components/editor";
import FileExplorer from "./components/file_explorer";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Modal from "./components/modal";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../service/axiosInstance";

const index = () => {
  const [onModalClick, setOnModalClick] = useState(true);
  const [modal, setModal] = React.useState(false);

  const projectBtnHandler = (isOn) => {
    setOnModalClick(isOn);
  };

  const createModal = () => {
    setModal((prev) => !prev);
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("projects");
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div>
      {onModalClick && (
        <Modal
          onProjClick={projectBtnHandler}
          modal={modal}
          setModal={setModal}
          createModal={createModal}
          user={user} // 사용자 데이터를 prop으로 전달
        />
      )}
      <div className="flex flex-col h-screen relative">
        <Header onProjClick={projectBtnHandler} />
        <div className="flex flex-row h-full">
          <div className="flex flex-row w-1/4">
            <Sidebar
              createModal={createModal}
              projectBtnHandler={projectBtnHandler}
            />
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
