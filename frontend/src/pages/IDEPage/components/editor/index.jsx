import React, { useState } from "react";
import Tab from "./components/Tab";
import "./index.css";

const Index = () => {
  const [activeTab, setActiveTab] = useState("Main.java");
  const [tabs, setTabs] = useState(["Main.java", "index.jsx", "index.css"]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleCloseTab = (tabToClose) => {
    setTabs(tabs.filter((tab) => tab !== tabToClose));
    if (activeTab === tabToClose) {
      setActiveTab(tabs[0]);
    }
  };

  return (
    <div
      id="inner_layout_top"
      className="bg-[#0E1525] overflow-hidden"
    >
      <ul id="north_tab" className="nav nav_tabs" style={{ display: "flex" }}>
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            isActive={activeTab === tab}
            label={tab}
            onClick={() => handleTabClick(tab)}
            onClose={() => handleCloseTab(tab)}
          />
        ))}
      </ul>
      <div className="text-white">{activeTab} 내용 </div>
    </div>
  );
};

export default Index;
