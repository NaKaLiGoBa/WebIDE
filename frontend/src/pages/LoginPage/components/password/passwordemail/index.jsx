import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backImage from "../../../background.png";
import logoImage from "../../../네카라쿠배.png";
import axios from "axios";
// import MockAdapter from "axios-mock-adapter";

const index = () => {
  const navigate = useNavigate();

  // //테스트
  // const mock = new MockAdapter(axios);
  // mock
  //   .onPost("http://50.19.246.89:8080/api/v1/auth/password/reset/email")
  //   .reply(200, {
  //     code: 200,
  //     message: "비밀번호 재설정 요청 성공",
  //   });

  const [email, setEmail] = useState(""); // 이메일 상태 관리
  const [message, setMessage] = useState(""); // 메시지 상태 관리

  const handleEmailChange = (e) => {
    setEmail(e.target.value); // 이메일 상태 업데이트
  };

  // 비밀번호 재설정 요청 핸들링 함수
  const handlePasswordResetRequest = async () => {
    try {
      const response = await axios.post(
        "http://50.19.246.89:8080/api/v1/auth/password/reset/email",
        {
          email,
        }
      );
      if (response.data && response.status === 200) {
        // 성공적인 응답을 처리
        setMessage(response.data.message);
      } else {
        // 에러 응답을 처리
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error("Failed to fetch:", error);
      setMessage(
        "비밀번호 재설정 요청 중 오류가 발생했습니다. 다시 시도해주세요."
      );
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-transparent"
      style={{
        backgroundImage: `url(${backImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div>
        <div className="flex flex-row bg-white rounded-2xl">
          <div className="w-96 h-full">
            <div className="border border-gray-300 p-12 rounded-2xl">
              <div className="pb-10 w-full">
                <img
                  className="w-full h-16"
                  src={logoImage}
                  alt="로고 이미지"
                />
                <div className="mt-8 text-center">
                  <span className="text-2xl font-bold">
                    비밀번호를 재설정합니다.
                  </span>
                </div>
                <div className="mt-4 text-center">
                  <span className="text-sm font-medium">
                    비밀번호를 재설정할
                  </span>
                </div>
                <div className="mb-7 text-center">
                  <span className="text-sm font-medium">
                    계정의 이메일을 입력해 주세요.
                  </span>
                </div>
                <div>
                  <input
                    className="w-full flex-1 bg-gray-200 border border-gray-300 py-3 pl-2 shadow-lg hover:shadow-xl"
                    type="text"
                    name="email"
                    placeholder="이메일"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  <button
                    className="mt-10 w-full flex-shrink-0 bg-white border border-blue-600 rounded-2xl hover:bg-blue-200 text-blue-600 px-4 shadow-lg hover:shadow-xl h-12 "
                    onClick={handlePasswordResetRequest}
                  >
                    비밀번호 재설정
                  </button>
                  {message && (
                    <div className="mt-12 text-center">
                      <p>{message}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center my-5">
                <div className="h-px w-full bg-gray-400"></div>
              </div>
              <div className="flex flex-row justify-center mt-10">
                <span className="mr-1.5 text-sm font-medium">
                로그인 화면으로
                </span>
                <span
                  className="text-sm font-bold text-blue-800 cursor-pointer ml-3"
                  onClick={() => navigate("/")}
                >
                  이동하기
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
