import React from "react";

const commonStyle = "bg-[#565F7A] rounded-xl my-2 text-white px-3 py-2";

// const Message = ({
//   messageType,
//   memberName,
//   message,
//   systemMessage,
//   createdAt,
// }) => {
//   if (messageType === "ENTER") {
//     return (
//       <div className={`message enter ${commonStyle}`}>
//         {memberName}님이 입장하셨습니다.<br /> ({createdAt})
//       </div>
//     );
//   } else if (messageType === "MESSAGE") {
//     return (
//       <div className={`message text ${commonStyle}`}>
//         <span className="name">{memberName}:</span> {message} <br /> ({createdAt})
//       </div>
//     );
//   } else if (messageType === "EXIT") {
//     return (
//       <div className={`message exit ${commonStyle}`}>
//         {memberName}님이 나가셨습니다.<br /> ({createdAt})
//       </div>
//     );
//   } else {
//     return null; // Unknown messageType
//   }
// };


const Message = ({
                   type,
                   sender,
                   message,
                   createdAt,
                   roomId,
                 }) => {
  return (
      <div className={`message text ${commonStyle}`}>
        <span className="name">{sender}:</span> {message} <br/> ({createdAt})
      </div>
  );
};

export default Message;
