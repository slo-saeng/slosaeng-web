import { Link } from 'react-router-dom';
import Button from '../component/common/Button/Button';

const LoginPage = () => {
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
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            className="block w-full px-4 py-4 border rounded"
          />
        </div>
        <div className="pt-5">
          <Button className="py-4 text-black" text="로그인" />
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
