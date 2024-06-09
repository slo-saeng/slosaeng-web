import { Link, useNavigate } from 'react-router-dom';
import { FaAmbulance } from 'react-icons/fa';
import { CiPill } from 'react-icons/ci';
import { MdElderly } from 'react-icons/md';
import ButtonCard from '../component/main/ButtonCard/ButtonCard';
import Button from '../component/common/Button/Button';

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <div className="px-40 py-20 space-y-10">
      <div className="flex flex-col px-20 py-10 space-y-4 text-center border rounded-md place-items-center decoration-gray-400">
        <p>
          도움을 받을 수 있는 고령자부터,
          <br /> 도움을 줄 수 있는 의료 종사자까지
        </p>
        <Button text="로그인 하러 가기" onClick={() => navigate('/login')} />
        <Link className="text-sm hover:underline" to="/signUp">
          회원가입
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-10">
        <ButtonCard
          icon={<FaAmbulance size={72} color="white" />}
          text="긴급 도움 요청 서비스"
        />
        <ButtonCard
          icon={<CiPill size={72} color="white" />}
          text="주변 의료기관 확인하기"
          onClick={() => navigate('/find')}
        />
        <ButtonCard
          icon={<MdElderly size={72} color="white" />}
          text="고령자 등록하기"
          onClick={() => navigate('/register')}
        />
      </div>
    </div>
  );
};

export default MainPage;
