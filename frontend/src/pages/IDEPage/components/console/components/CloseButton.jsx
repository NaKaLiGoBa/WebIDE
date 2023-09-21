import React from 'react';
import CloseIcon from "@mui/icons-material/Close";

const CloseButton = ({ onClose }) => {
  return (
    <button
      type="button"
      id="south_tab_close_btn"
      className="btn"
      data-container="body"
      onClick={onClose} // 클릭 이벤트 핸들러 추가
    >
      <CloseIcon />
    </button>
  );
};

export default CloseButton;

