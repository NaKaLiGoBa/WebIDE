import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "../../네카라쿠배.png";
import backImage from "../../background.png";
import axios from "axios";
// import MockAdapter from "axios-mock-adapter";

const index = () => {
  const navigate = useNavigate();

  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
    checkpassword: "",
    name: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  // //테스트
  // const mock = new MockAdapter(axios);
  // mock.onPost("http://localhost:8080/api/v1/auth/email").reply(200, {
  //   message: "인증번호를 전송하였습니다.",
  // });
  // mock.onPost("http://localhost:8080/api/v1/auth/email/verify").reply(200, {
  //   message: "인증 완료되었습니다.",
  // });
  // mock.onPost("http://localhost:8080/api/v1/auth/signup").reply(200, {
  //   message: "회원가입이 완료되었습니다.",
  // });

  //이메일 인증
  const [verificationCode, setVerificationCode] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  //타이머
  const [isTimeOut, setIsTimeOut] = useState(false);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);

  const handleVerificationClick = async () => {
    try {
      // 이메일 인증번호 발송 API 호출
      const response = await axios.post(
        "http://50.19.246.89:8080/api/v1/auth/email",
        { email: loginValues.email }
      );
      if (response.data && response.data.message) {
        // 인증번호가 성공적으로 발송된 경우
        alert(response.data.message);
        setIsEmailVerified(true); // 이메일이 인증되었음을 상태로 설정
        setSuccessEmail(true); // 이메일 인증 성공
        setIsTimeOut(false); // 다시 인증버튼 누를 시 리셋
        setMinutes(5); // 제한 시간 리셋
        setSeconds(0); // 초 리셋
      } else {
        // API 호출은 성공했지만 인증번호 발송에 실패한 경우
        alert("인증번호를 전송하는 데 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      // API 호출 자체가 실패한 경우
      console.error("Email verification error!", error);
      alert("이메일 인증 중 오류가 발생하였습니다.");
    }
  };

  const handleVerifyClick = async () => {
    try {
      // 인증 코드 확인 API 호출
      const response = await axios.post(
        "http://50.19.246.89:8080/api/v1/auth/email/verify",
        {
          email: loginValues.email,
          authNumber: verificationCode,
        }
      );
      if (response.data.code === "200") {
        alert(response.data.message);
        setIsEmailVerified(false); // 인증에 성공하면 UI 숨김
        setSuccessCode(true); // 코드 인증 성공
        // 추가적인 로직 (예: 인증 성공 시 처리 등)
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Code verification error!", error);
      alert("인증 코드 확인 중 오류가 발생하였습니다.");
    }
  };

  //인증 여부 확인
  const [successEmail, setSuccessEmail] = useState(false);
  const [successCode, setSuccessCode] = useState(false);

  //전체 필드 확인
  const checkSignup = async () => {
    //비밀번호 일치 확인
    if (loginValues.password !== loginValues.checkpassword) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }
    //모든 필드가 채워져 있는지 확인
    if (!loginValues.email || !loginValues.password || !loginValues.name) {
      alert("입력하지 않은 사항이 있습니다.");
      return;
    }
    //이메일, 인증번호 확인
    if (!successEmail || !successCode) {
      alert("이메일 및 코드를 인증해주세요");
      return;
    }
    try {
      const response = await axios.post(
        "http://50.19.246.89:8080/api/v1/auth/signup",
        {
          email: loginValues.email,
          password: loginValues.password,
          name: loginValues.name,
        }
      );
      if (response.data && response.data.message) {
        alert(response.data.message);
        navigate("/");
      } else {
        alert("회원가입에 실패하였습니다.");
      }
    } catch (error) {
      console.error("Signup error!", error);
      alert("회원가입 중 오류가 발생하였습니다.");
    }
    // 서버 요청 추가 할 사항 있으면 할 것
  };

  //타이머 로직
  useEffect(() => {
    let timer;
    if (isEmailVerified) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            if (minutes === 0) {
              clearInterval(timer);
              setIsEmailVerified(false); // 인증 시간 초과
              setIsTimeOut(true); // 타임아웃 상태를 true로 설정
              return 0;
            } else {
              setMinutes((prevMinutes) => prevMinutes - 1);
              return 59;
            }
          } else {
            return prevSeconds - 1;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isEmailVerified, seconds, minutes]);

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
          <div className="w-96 h-full">
            <div className="border border-gray-300 p-12 rounded-2xl">
              <div className="pb-10 w-full">
                <img
                  className="w-full h-16"
                  src={logoImage}
                  alt="로고 이미지"
                />
                <div className="flex mt-10 mb-2">
                  <input
                    className="flex-1 bg-gray-200 border border-gray-300 py-3 pl-2 shadow-lg hover:shadow-xl"
                    type="text"
                    name="email"
                    placeholder="이메일"
                    onChange={handleInputChange}
                  />
                  <button
                    className="flex-shrink-0 bg-white border border-blue-600 rounded-2xl hover:bg-blue-200 text-blue-600 px-4 ml-2 shadow-lg hover:shadow-xl"
                    onClick={handleVerificationClick}
                  >
                    인증
                  </button>
                </div>
                {isEmailVerified && ( // isEmailVerified가 true일 때만 보이게 적용
                  <>
                    <div className="flex mt-5 mb-2 relative">
                      <input
                        className="flex-1 bg-gray-200 border border-gray-300 py-3 pl-2 shadow-lg hover:shadow-xl"
                        type="text"
                        name="verificationCode"
                        placeholder="인증 코드"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                      />
                      <button
                        className="flex-shrink-0 bg-white border border-blue-600 rounded-2xl hover:bg-blue-200 text-blue-600 px-4 ml-2 shadow-lg hover:shadow-xl"
                        onClick={handleVerifyClick}
                      >
                        확인
                      </button>
                    </div>
                    <p className=" text-blue-600 mt-4">
                      남은 인증 시간: {minutes}:{seconds}
                    </p>
                  </>
                )}
                {isTimeOut && (
                  <p className="text-red-600 mt-4">인증 시간이 초과했습니다.</p>
                )}
                <input
                  className="w-full bg-gray-200 border border-gray-300 py-3 mt-5 mb-2 pl-2 shadow-lg hover:shadow-xl"
                  type="password"
                  name="password"
                  placeholder="비밀번호"
                  onChange={handleInputChange}
                />
                <input
                  className="w-full bg-gray-200 border border-gray-300 py-3 mt-5 mb-2 pl-2 shadow-lg hover:shadow-xl"
                  type="password"
                  name="checkpassword"
                  placeholder="비밀번호 확인"
                  onChange={handleInputChange}
                />
                <input
                  className="w-full bg-gray-200 border border-gray-300 py-3 mt-5 mb-2 pl-2 shadow-lg hover:shadow-xl"
                  type="text"
                  name="name"
                  placeholder="닉네임"
                  onChange={handleInputChange}
                />
              </div>
              <div
                className="flex items-center justify-center w-full mb-10 h-8 bg-blue-400 rounded-2xl cursor-pointer hover:bg-blue-600 shadow-lg hover:shadow-xl"
                onClick={() => checkSignup()}
              >
                <span className="text-white text-sm font-bold">가입하기</span>
              </div>
              <div className="flex justify-between items-center my-5">
                <div className="h-px w-full bg-gray-400"></div>
              </div>
              <div className="flex flex-row justify-center mt-10">
                <span className="mr-1.5 text-sm font-medium">
                  이미 계정이 있습니까?
                </span>
                <span
                  className="text-sm font-bold text-blue-800 cursor-pointer ml-3"
                  onClick={() => navigate("/")}
                >
                  로그인
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
