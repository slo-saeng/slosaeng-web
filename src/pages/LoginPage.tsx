import React, { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../component/common/Button/Button';

const LoginPage = () => {
  const [userId, setUserId] = useState('');
  const [userPwd, setUserPwd] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUserId = (e: ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const handleUserPwd = (e: ChangeEvent<HTMLInputElement>) => {
    setUserPwd(e.target.value);
  };

  const handleLogin = () => {
    if (!userId || !userPwd) {
      setErrorMessage('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }
    // 임시 콘솔 출력
    console.log('userId:', userId);
    console.log('userPwd:', userPwd);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-3/4 px-96 py-48 space-y-3">
        <div className="pb-4">
          <p className="font-bold text-5xl pb-3">슬로생</p>
          <p className="text-2xl"> 슬기로운 노후 생활로 가는 한 걸음</p>
        </div>
        <div className="">
          <input
            type="text"
            placeholder="아이디를 입력해주세요."
            className="block w-full px-4 py-4 border rounded"
            onChange={handleUserId}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            className="block w-full px-4 py-4 border rounded"
            onChange={handleUserPwd}
          />
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <div className="pt-5">
          <Button
            className="py-4 text-black"
            onClick={handleLogin}
            text="로그인"
          />
        </div>
        <div className="flex justify-center items-center space-x-2">
          <p>회원이 아니신가요?</p>
          <Link className="hover:underline text-main-point" to="/signUp">
            회원가입 하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
