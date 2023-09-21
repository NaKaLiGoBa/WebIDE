import React from 'react';

const Tab = ({ isActive, label, onClick }) => {
  return (
    <li>
      <a
        onClick={onClick}
        className={`nav_link text-sm font-bold ${isActive ? "active" : ""}`}
      >
        <span className="tab_title">{label}</span>
      </a>
    </li>
  );
};

export default Tab;
