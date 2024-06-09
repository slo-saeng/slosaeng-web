import { Link, useNavigate } from 'react-router-dom';
import { FaAmbulance } from 'react-icons/fa';
import { CiPill } from 'react-icons/ci';
import { MdElderly } from 'react-icons/md';

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <div className="px-40 py-20 space-y-10">
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
      <div className="grid grid-cols-3 gap-10">
        <div className="flex flex-col p-20 space-y-4 border rounded-md p-30 place-items-center decoration-gray-400">
          <div className="flex flex-col items-center justify-center p-8 rounded-full w-44 h-44 bg-main-point hover:bg-main-point-dark">
            <FaAmbulance size={72} color="white" />
            <p className="font-bold text-center break-keep">
              긴급 도움 요청 서비스
            </p>
          </div>
        </div>
        <div className="flex flex-col p-20 space-y-4 border rounded-md p-30 place-items-center decoration-gray-400">
          <div className="flex flex-col items-center justify-center p-8 rounded-full w-44 h-44 bg-main-point hover:bg-main-point-dark">
            <CiPill size={72} color="white" />
            <p className="font-bold text-center break-keep">
              주변 의료기관 확인하기
            </p>
          </div>
        </div>
        <div className="flex flex-col p-20 space-y-4 border rounded-md p-30 place-items-center decoration-gray-400">
          <div className="flex flex-col items-center justify-center p-8 rounded-full w-44 h-44 bg-main-point hover:bg-main-point-dark">
            <MdElderly size={72} color="white" />
            <p className="mt-1 font-bold text-center break-keep">
              고령자 등록하기
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
