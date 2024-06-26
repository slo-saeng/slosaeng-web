import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaAmbulance, FaHospital } from 'react-icons/fa';
import { CiPill } from 'react-icons/ci';
import { MdElderly } from 'react-icons/md';
import { FaStethoscope } from 'react-icons/fa6';
import { GiGalaxy } from 'react-icons/gi';
import ButtonCard from '../component/main/ButtonCard/ButtonCard';
import Button from '../component/common/Button/Button';
import HelpModal from '../component/main/HelpModal/HelpModal';
import { useMember } from '../hooks/useMember';

interface RenderItemData {
  role: string;
  text: string;
  url: string;
}

const MainPage = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [renderItemData, setRenderItemData] = useState<RenderItemData>();

  const { data: loginData } = useMember();

  const renderText = [
    {
      role: 'HELPER',
      text: '고령자 확인하기',
      url: '/helper',
    },
    {
      role: 'MASTER',
      text: '의료진 관리하기',
      url: '/master',
    },
    {
      role: 'DOCTOR',
      text: '환자 관리하기',
      url: '/doctor',
    },
  ];
  useEffect(() => {
    setRenderItemData(
      renderText.find((item) => item.role === loginData?.data.role),
    );
  }, [loginData]);

  return (
    <>
      {openModal && <HelpModal closeModal={() => setOpenModal(false)} />}
      <div className="h-full px-20 py-24 space-y-10">
        <div className="flex flex-col px-20 py-8 space-y-4 text-center bg-white border rounded-md place-items-center decoration-gray-400">
          <p>
            도움을 받을 수 있는 <span className="underline">고령자</span>부터,
            <br /> 도움을 줄 수 있는{' '}
            <span className="underline">의료 종사자</span>까지
          </p>
          {loginData?.data.role !== 'SUPER' &&
            (renderItemData ? (
              <Button
                text={renderItemData?.text}
                onClick={() => navigate(renderItemData.url)}
              />
            ) : (
              <>
                <Button
                  text="로그인 하러 가기"
                  onClick={() => navigate('/login')}
                />
                <Link className="text-sm hover:underline" to="/signUp">
                  회원가입
                </Link>
              </>
            ))}
        </div>
        {loginData?.data.role === 'SUPER' && (
          <div className="grid grid-cols-3 gap-10">
            <ButtonCard
              icon={<FaStethoscope size={72} color="white" />}
              onClick={() => navigate('/doctor')}
              text="환자 관리 페이지"
            />
            <ButtonCard
              icon={<FaHospital size={72} color="white" />}
              text="의료진 관리 페이지"
              onClick={() => navigate('/master')}
            />
            <ButtonCard
              icon={<GiGalaxy size={72} color="white" />}
              text="슬로생 관리하기"
              onClick={() => navigate('/super')}
            />
          </div>
        )}
        <div className="grid grid-cols-3 gap-10">
          <ButtonCard
            icon={<FaAmbulance size={72} color="white" />}
            onClick={() => setOpenModal(true)}
            text="긴급 도움 요청 서비스"
          />
          <ButtonCard
            icon={<CiPill size={72} color="white" />}
            text="주변 의료기관 확인하기"
            onClick={() => navigate('/hospital')}
          />
          <ButtonCard
            icon={<MdElderly size={72} color="white" />}
            text="고령자 등록하기"
            onClick={() => navigate('/register')}
          />
        </div>
      </div>
    </>
  );
};

export default MainPage;
