import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import backImage from "../../../background.png";
import logoImage from "../../../네카라쿠배.png";
// import MockAdapter from "axios-mock-adapter";

const index = () => {
  const navigate = useNavigate();

//   //테스트
//   const mock = new MockAdapter(axios);
//   mock
//     .onPost("http://50.19.246.89:8080/api/v1/auth/password/reset/check")
//     .reply(200, {
//         code: 200,
//         message: "비밀번호 재설정이 완료되었습니다.",
//     });

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleNewPassword = (e) => setNewPassword(e.target.value);
  const handleConfirmNewPassword = (e) => setConfirmNewPassword(e.target.value);

  const handlePasswordReset = async () => {
    // 비밀번호 확인
    if (newPassword !== confirmNewPassword) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      const response = await axios.post(
        "http://50.19.246.89:8080/api/v1/auth/password/reset/check",
        {
          token, // 서버로 URL에서 추출한 토큰 전달
          newPassword, // 새로운 비밀번호 전달
        }
      );

      if (response.data.code === "200") {
        setMessage("비밀번호 재설정이 완료되었습니다.");
        navigate("/");
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error("Failed to reset password:", error);
      setMessage("비밀번호 재설정 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // 뒤로가기 함수
  const goBack = () => {
    navigate(-1);
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
                    새 비밀번호를 입력 후
                  </span>
                </div>
                <div className="mt-1 mb-7 text-center">
                  <span className="text-sm font-medium">
                    완료 버튼을 눌러주세요.
                  </span>
                </div>
                <div>
                  <input
                    className="w-full bg-gray-200 border border-gray-300  py-3 mb-2 pl-2 shadow-lg hover:shadow-xl"
                    type="password"
                    value={newPassword}
                    onChange={handleNewPassword}
                    placeholder="새 비밀번호"
                  />
                  <input
                    className="w-full bg-gray-200 border border-gray-300 py-3 mt-5 mb-2 pl-2 shadow-lg hover:shadow-xl"
                    type="password"
                    value={confirmNewPassword}
                    onChange={handleConfirmNewPassword}
                    placeholder="새 비밀번호 확인"
                  />
                  <button
                    className="mt-10 w-full flex-shrink-0 bg-white border border-blue-600 rounded-2xl hover:bg-blue-200 text-blue-600 px-4 shadow-lg hover:shadow-xl h-12 "
                    onClick={handlePasswordReset}
                  >
                    완료
                  </button>
                </div>
                {message && (
                  <div className="mt-12 text-center">
                    <span>{message}</span>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center my-5">
                <div className="h-px w-full bg-gray-400"></div>
              </div>
              <div className="flex flex-row justify-center mt-10">
                <span
                  className="text-sm font-bold text-blue-800 cursor-pointer ml-3"
                  onClick={goBack}
                >
                  돌아가기
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
