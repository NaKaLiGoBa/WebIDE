import React, { useState } from "react";
import "./index.css";
import Tab from "./components/Tab";
import CloseButton from "./components/CloseButton";

const Index = () => {
  const [activeTab, setActiveTab] = useState("terminal");
  const [isVisible, setIsVisible] = useState(true); // 새로운 상태 변수

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleCloseClick = () => {
    setIsVisible(false); // 창을 숨기기
  };

  if (!isVisible) {
    return null; // 창이 숨겨진 경우 아무것도 렌더링하지 않음
  }

  return (
    <div id="inner_layout_bottom" className="bg-[rgb(14,21,37)] overflow-hidden">
      <ul id="south_tab" className="flex nav_tabs border-b-0 text-center pl-0 list-none" >
        <Tab
          isActive={activeTab === "terminal"}
          label="터미널"
          onClick={() => handleTabClick("terminal")}
        />
        <Tab
          isActive={activeTab === "문제"}
          label="문제"
          onClick={() => handleTabClick("문제")}
        />
        <CloseButton onClose={handleCloseClick} />
      </ul>
    </div>
  );
};

export default Index;

