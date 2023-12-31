import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./component/ChatInput";
import Message from "./component/Message";

const index = (props) => {
  const [openChatroom, setOpenChatroom] = useState(false);
  const [messages, setMessages] = useState([]);
  const messageListRef = useRef(null); // Create a ref

  const clickHandler = () => setOpenChatroom((prev) => !prev);

  // 웹소켓
  const [ws, setWs] = useState(null);

  // 메시지 형식을 작성하는 별도의 함수
  const createMessageForm = (message, name, type = "MESSAGE") => {
    const lastMessageId = messages[messages.length - 1]?.messageId || 0;
    const newMessageId = lastMessageId + 1;

    const formatAMPM = (date) => {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? '오후' : '오전';
      const formattedHours = hours % 12 || 12; // 12-hour format
      return ampm + ' ' + formattedHours + ':' + (minutes < 10 ? '0' : '') + minutes;
    }

    const currentDateTime = formatAMPM(new Date());

    return {
      roomId: 0,
      sender: name,
      type: type,
      message: message,
      createdAt: currentDateTime
    };
  };


// 웹소켓 관련 코드
  useEffect(() => {
    if (openChatroom) {
      const websocket = new WebSocket("ws://50.19.246.89:8080/ws/chat");
      setWs(websocket);

      websocket.onmessage = (event) => {
        const receivedMessage = JSON.parse(event.data);
        const messageForm = createMessageForm(receivedMessage.message, receivedMessage.sender);
        setMessages((prev) => [...prev, messageForm]);
      };

      websocket.onopen = () => {
        const enterMessage = createMessageForm("User entered the chat", props.userName, "ENTER");
        websocket.send(JSON.stringify(enterMessage));
      };

      // beforeunload 이벤트 핸들러 추가
      const handleBeforeUnload = (event) => {
        if (websocket && websocket.readyState === WebSocket.OPEN) {
          const exitMessage = createMessageForm("User left the chat", props.userName, "EXIT");
          websocket.send(JSON.stringify(exitMessage));
        }
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      // 클린업 함수에서 beforeunload 이벤트 리스너 제거 및 웹소켓 종료 로직
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);

        if (websocket && websocket.readyState === WebSocket.OPEN) {
          const exitMessage = createMessageForm("User left the chat", props.userName, "EXIT");
          websocket.send(JSON.stringify(exitMessage));

          const confirmClose = setTimeout(() => {
            websocket.close();
          }, 1000);

          websocket.onclose = () => {
            clearTimeout(confirmClose);
          };
        } else if (websocket) {
          websocket.close();
        }
      };
    }
  }, [openChatroom, props.userName]);



// 메시지 전송 로직
  const enterHandler = (newMessage) => {
    const messageForm = createMessageForm(newMessage, props.userName, "MESSAGE"); // 함수를 사용하여 메시지 형식 생성
    // setMessages((prev) => [...prev, messageForm]);

    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(messageForm));
    }
  };


  // 메시지 수신시에 스크롤을 아래로 자동 이동
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight; // Scroll to bottom
    }
  }, [messages]); // Trigger whenever messages array updates

  return (
    <div className="relative">
      {openChatroom && (
        <div className="absolute bottom-24 right-10 bg-[#2B3244] border-2 border-[#8E9DC7] rounded-xl p-2 w-[400px] h-[500px] shadow-md flex flex-col justify-between">
          <div className="flex-none text-center text-white">
          </div>
          <div className="flex-grow overflow-auto" ref={messageListRef}>
            <ul className="message-list p-0 m-0">
              {messages.map((message, index) => (
                <li className="list-none mb-2">
                  <Message
                      key={index}
                    type={message.type}
                    sender={message.sender}
                    message={message.message}
                    createdAt={message.createdAt}
                  />
                </li>
              ))}
            </ul>
          </div>
          <ChatInput onEnter={enterHandler} />
        </div>
      )}
      <button
        className={`text-black rounded-full bg-white w-14 h-12 flex items-center justify-center ${props.className} m-5`}
        onClick={clickHandler}
      >
        {openChatroom ? "x" : "Chat"}
      </button>
    </div>
  );
};

export default index;
