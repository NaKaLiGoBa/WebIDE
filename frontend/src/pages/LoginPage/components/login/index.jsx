import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "../../네카라쿠배.png";
import backImage from "../../background.png";
import kakaoImage from "../../kakao.png";
import facebookImage from "../../facebook.png";
import githubImage from "../../github.png";
import axios from "axios";

const index = () => {
  const navigate = useNavigate();

  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  // 로그인 에러 상태 관리
  const [errorMessage, setErrorMessage] = useState("");

  // // 테스트
  // const testEmail = "asd";
  // const testPassword = "asd";

  const checkLogin = async () => {
    if (!loginValues.email && !loginValues.password) {
      setErrorMessage("이메일을 입력해주세요");
      return;
    } else if (!loginValues.email) {
      setErrorMessage("이메일을 입력해주세요");
      return;
    } else if (!loginValues.password) {
      setErrorMessage("비밀번호를 입력해주세요");
      return;
    }
    try {
      const response = await axios.post(
        "http://50.19.246.89:8080/api/v1/auth/signin",
        {
          email: loginValues.email,
          password: loginValues.password,
        }
      );
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        setErrorMessage(""); // 에러 상태 초기화
        navigate("/idepage");
      } else {
        setErrorMessage("로그인에 실패했습니다. 다시 시도해 주세요.");
      }
    } catch (error) {
      //로그인 에러 표시
      console.error("Login Error:", error);
      setErrorMessage("로그인에 실패했습니다. 다시 시도해 주세요.");
    }
    // //테스트
    // if (
    //   loginValues.email === testEmail &&
    //   loginValues.password === testPassword
    // ) {
    //   setErrorMessage(""); // 에러 상태 초기화
    //   navigate("/idepage");
    // } else {
    //   setErrorMessage("이메일이나 비밀번호가 틀립니다"); // 로그인 에러 표시
    // }
  };

  const handleKakaoLogin = () => {
    // 카카오 로그인 로직 추가하기
    console.log("Kakao login clicked");
  };

  const handleFacebookLogin = () => {
    // 페이스북 로그인 로직 추가하기
    console.log("Facebook login clicked");
  };

  const handleGithubLogin = () => {
    // 깃허브 로그인 로직 추가하기
    console.log("Github login clicked");
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
          {/* 입력 */}
          <div className=" w-96 h-full">
            <div className="border border-gray-300 p-12 rounded-2xl">
              <div className="pb-10">
                <img
                  className="w-full h-16 "
                  src={logoImage}
                  alt="로고 이미지"
                />
                <input
                  className="w-full bg-gray-200 border border-gray-300 py-3 mt-10 mb-2 pl-2 shadow-lg hover:shadow-xl"
                  type="text"
                  name="email"
                  placeholder="이메일"
                  onChange={handleInputChange}
                />
                <input
                  className="w-full bg-gray-200 border border-gray-300 py-3 mt-5 pl-2 shadow-lg hover:shadow-xl"
                  type="password"
                  name="password"
                  placeholder="비밀번호"
                  onChange={handleInputChange}
                />
              </div>
              {/* 로그인 에러 메시지 출력 */}
              {errorMessage && (
                <p className="text-red-600 mb-4 text-center">{errorMessage}</p>
              )}
              <div
                className="flex items-center justify-center w-full h-8 mb-4 bg-blue-400 rounded-2xl cursor-pointer hover:bg-blue-600 shadow-lg hover:shadow-xl"
                onClick={checkLogin}
              >
                <span className="text-white text-sm font-bold">로그인</span>
              </div>
              <div className="my-2 text-center"
              onClick={() => navigate("password")}>
                <span className="text-sm font-bold text-blue-600 cursor-pointer ">
                  비밀번호 찾기
                </span>
              </div>
              <div className="flex justify-between items-center my-5">
                <div className="h-px w-2/5 bg-gray-400"></div>
                <span className="mx-3 text-sm font-semibold text-gray-500">
                  또는
                </span>
                <div className="h-px w-2/5 bg-gray-400"></div>
              </div>
              <div className="flex flex-row justify-center my-3">
                <span className="text-sm font-medium">
                  SNS 계정으로 로그인하기
                </span>
              </div>
              <div className="flex flex-row my-5 justify-center items-center">
                <button
                  className="w-14 h-14 mx-5 p-0 border-none rounded-full overflow-hidden shadow-lg hover:shadow-xl"
                  onClick={handleKakaoLogin}
                >
                  <img
                    className="w-14 h-14"
                    src={kakaoImage}
                    alt="카카오 로그인"
                  />
                </button>
                <button
                  className="w-14 h-14 mx-5 p-0 border-none rounded-full overflow-hidden shadow-lg hover:shadow-xl"
                  onClick={handleFacebookLogin}
                >
                  <img
                    className="w-14 h-14"
                    src={facebookImage}
                    alt="페이스북 로그인"
                  />
                </button>
                <button
                  className="w-14 h-14 mx-5 p-0 border-none rounded-full overflow-hidden shadow-lg hover:shadow-xl"
                  onClick={handleGithubLogin}
                >
                  <img
                    className="w-14 h-14"
                    src={githubImage}
                    alt="깃헙 로그인"
                  />
                </button>
              </div>
              <div
                className="flex items-center justify-center w-full h-8 bg-white border border-blue-600 rounded-2xl cursor-pointer hover:bg-blue-200 mt-9 shadow-lg hover:shadow-xl"
                onClick={() => navigate("signup")} // 상대 경로를 사용
              >
                <span className="text-blue-600 text-sm font-bold">
                  계정 만들기
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
