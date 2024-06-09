import { Link, useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <div className="px-40 py-20 space-y-20">
      <div className="flex flex-col px-20 py-10 space-y-4 border rounded-md place-items-center decoration-gray-400">
        <p>
          도움을 받을 수 있는 고령자부터,
          <br /> 도움을 줄 수 있는 의료 종사자까지
        </p>
        <button
          type="button"
          className="w-full p-2 text-white rounded-md bg-main-point hover:bg-main-point-dark"
          onClick={() => navigate('/login')}
        >
          로그인 하러 가기
        </button>
        <Link className="text-sm hover:underline" to="/signUp">
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
