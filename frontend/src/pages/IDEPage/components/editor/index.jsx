import React, { useState, useRef } from "react";
import Tab from "./components/Tab";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { java } from "@codemirror/lang-java";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import "./index.css";

//탭
const Index = () => {
  const [activeTab, setActiveTab] = useState("Main.java");
  const [tabs, setTabs] = useState([
    {title: "Main.java", content: "console.log('Hello World!'); 111 abcd"},
    {title: "index.jsx", content: "console.log('Hello World!'); 111 abcd"},
    {title: "index.css", content: "222222" },
    {title: "index1.jsx", content: "3" },
    {title: "index2.jsx", content: "4" },
    {title: "index3.jsx", content: "5" },
    {title: "index4.jsx", content: "6" },
    {title: "index5.jsx", content: "7" },
    {title: "index6.jsx", content: "8" },
    {title: "index7.jsx", content: "9" },
    {title: "index8.jsx", content: "10" },
    {title: "index9.jsx", content: "11111" },
    {title: "index0.jsx", content: "1222222" },
  ]);

  const handleTabClick = (tabTitle) => {
    setActiveTab(tabTitle);
    const newTabContent = tabs.find(tab => tab.title === tabTitle)?.content || "";
    setValue(newTabContent);
  };

  //탭 유형에 따른 에디터 설정
  const getExtensionForTab = (tabTitle) => {
    if (tabTitle.endsWith(".java")) {
      return java();
    } else if (tabTitle.endsWith(".html")) {
      return html();
    } else if (tabTitle.endsWith(".jsx") || tabTitle.endsWith(".js")) {
      return javascript({ jsx: true });
    } else if (tabTitle.endsWith(".css")) {
      return css();
    }
  };
  const activeExtension = getExtensionForTab(activeTab);
  

  //닫기 버튼
  const handleCloseTab = (tabTitleToClose) => {
    setTabs(tabs.filter((tab) => tab.title !== tabTitleToClose));
    if (activeTab === tabTitleToClose && tabs.length > 0) {
      setActiveTab(tabs[0].title);
    }
  };

  //스크롤
  const tabsRef = useRef(null);
  const handleWheel = (e) => {
    e.stopPropagation();
    const container = tabsRef.current;
    const containerScrollPosition = container.scrollLeft;
    container.scrollLeft = containerScrollPosition + e.deltaY;
  };

  //스크롤 숨김, 스크롤 동시에 작동 안 하게
  const handleMouseEnter = () => {
    document.body.classList.add("no-scroll");
  };
  const handleMouseLeave = () => {
    document.body.classList.remove("no-scroll");
  };

  // CodeMirror 적용
  const activeTabContent = tabs.find(tab => tab.title === activeTab)?.content || "";
  const [value, setValue] = React.useState(activeTabContent);
  
  const onChange = React.useCallback((val, viewUpdate) => {
    console.log("val:", val);
    setTabs(tabs.map(tab => {
      if (tab.title === activeTab) {
        return { ...tab, content: val };
      }
      return tab;
    }));
    setValue(val);
  }, [activeTab, tabs]);

  return (
    <div id="inner_layout_top" className="bg-[#0E1525] ">
      <ul
        ref={tabsRef}
        onWheel={handleWheel}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        id="north_tab"
        className="nav nav_tabs"
        style={{ display: "flex" }}
      >

        {tabs.map((tab, index) => (
          <Tab
            key={index}
            isActive={activeTab === tab.title}
            label={tab.title}
            onClick={() => handleTabClick(tab.title)}
            onClose={() => handleCloseTab(tab.title)}
          />
        ))}
      </ul>
      <div className="text-gray-400">
        <CodeMirror
          key={activeTab}
          value={value}
          height="calc(60vh - 81px)" // 왜 header와 north_tab 을 합친 56+47=103 이 아니라 81을 빼야 외관상 올바른지?
          extensions={[activeExtension]}
          onChange={onChange}
          theme={tokyoNight} // 테마 
        />
      </div>
    </div>
  );
};

export default Index;