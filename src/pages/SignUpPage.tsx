import { useState } from 'react';
import { FaHospital, FaUser, FaUserMd } from 'react-icons/fa';
import ButtonCardWithClick from '../component/signup/ButtonCardWithClick/ButtonCardWithClick';
import Button from '../component/common/Button/Button';

const HospitalForm = () => (
  <div className="space-y-3 w-3/4">
    <input
      type="text"
      placeholder="아이디"
      className="block w-full px-4 py-4 mt-2 border rounded focus:outline-none"
    />
    <input
      type="password"
      placeholder="비밀번호"
      className="block w-full px-4 py-4 mt-2 border rounded focus:outline-none"
    />
    <input
      type="text"
      placeholder="병원이름"
      className="block w-full px-4 py-4 mt-2 border rounded focus:outline-none"
    />
    <input
      type="text"
      placeholder="요양기관번호(의료기관코드)"
      className="block w-full px-4 py-4 mt-2 border rounded focus:outline-none"
    />
    <p className="text-lg">
      관련 서류는 메일에 첨부해주세요. (slosaeng@gmail.com)
    </p>
  </div>
);

const DoctorForm = () => (
  <div className="space-y-3 w-3/4">
    <input
      type="text"
      placeholder="아이디"
      className="block w-full px-4 py-4 mt-2 border rounded focus:outline-none"
    />
    <input
      type="password"
      placeholder="비밀번호"
      className="block w-full px-4 py-4 mt-2 border rounded focus:outline-none"
    />
    <div className="flex">
      <input
        type="text"
        placeholder="주민번호"
        className="block w-full px-4 py-4 mt-2 border rounded focus:outline-none"
      />
      <p className="text-xl px-4 py-3 mt-2">ㅡ</p>
      <input
        type="password"
        placeholder=""
        className="block w-full px-4 py-4 mt-2 border rounded focus:outline-none"
      />
    </div>
    <input
      type="text"
      placeholder="연락처"
      className="block w-full px-4 py-4 mt-2 border rounded focus:outline-none"
    />
    <input
      type="text"
      placeholder="소속병원명"
      className="block w-full px-4 py-4 mt-2 border rounded focus:outline-none"
    />
    <div className="mt-2 py-10">
      <p>약관동의</p>
      <textarea
        placeholder="약관 동의 내용을 입력하세요."
        rows={5}
        className="block w-full px-3 py-2 mt-2 border rounded focus:border-blue-500 focus:outline-none"
      />
      <input type="checkbox" className="mr-2" />
    </div>
    <div className="pt-5">
      <Button className="py-4 text-black" text="회원가입하기" />
    </div>
  </div>
);

const GuardianForm = () => (
  <div className="space-y-3 w-3/4">
    <input
      type="text"
      placeholder="아이디"
      className="block w-full px-4 py-4 mt-2 border rounded focus:outline-none"
    />
    <input
      type="password"
      placeholder="비밀번호"
      className="block w-full px-4 py-4 mt-2 border rounded focus:outline-none"
    />
    <div className="flex">
      <input
        type="text"
        placeholder="주민번호"
        className="block w-full px-4 py-4 mt-2 border rounded focus:outline-none"
      />
      <p className="text-xl px-4 py-3 mt-2">ㅡ</p>
      <input
        type="password"
        placeholder=""
        className="block w-full px-4 py-4 mt-2 border rounded focus:outline-none"
      />
    </div>
    <input
      type="text"
      placeholder="연락처"
      className="block w-full px-4 py-4 mt-2 border rounded focus:outline-none"
    />
    <div className="mt-2 py-10">
      <p>약관동의</p>
      <textarea
        placeholder="약관 동의 내용을 입력하세요."
        rows={5}
        className="block w-full px-3 py-2 mt-2 border rounded focus:border-blue-500 focus:outline-none"
      />
      <input type="checkbox" className="mr-2" />
    </div>

    <div className="pt-5">
      <Button className="py-4 text-black" text="회원가입하기" />
    </div>
  </div>
);

const SignUpPage = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const renderForm = () => {
    switch (selectedRole) {
      case 'hospital':
        return <HospitalForm />;
      case 'doctor':
        return <DoctorForm />;
      case 'guardian':
        return <GuardianForm />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="py-40">
        <p className="flex font-bold text-5xl w-2/3 items-center justify-left px-32">
          회원가입 페이지
        </p>
        <div className="grid grid-cols-3 gap-10 transform scale-75 translate-x-0 transition-all duration-500'">
          <ButtonCardWithClick
            icon={<FaHospital size="64" color="white" />}
            text="병원"
            isSelected={selectedRole === 'hospital'}
            onClick={() => setSelectedRole('hospital')}
          />
          <ButtonCardWithClick
            icon={<FaUserMd size="64" color="white" />}
            text="의사"
            isSelected={selectedRole === 'doctor'}
            onClick={() => setSelectedRole('doctor')}
          />
          <ButtonCardWithClick
            icon={<FaUser size="64" color="white" />}
            text="보호자"
            isSelected={selectedRole === 'guardian'}
            onClick={() => setSelectedRole('guardian')}
          />
        </div>
        <div className="flex mt-10 items-center justify-center">
          {renderForm()}
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
