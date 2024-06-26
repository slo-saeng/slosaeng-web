import { useState } from 'react';
import { FaHospital, FaUser, FaUserMd } from 'react-icons/fa';
import ButtonCardWithClick from '../component/signup/ButtonCardWithClick/ButtonCardWithClick';
import { HospitalForm } from '../component/signup/Form/HospitalForm';
import { DoctorForm } from '../component/signup/Form/DoctorForm';
import { GuardianForm } from '../component/signup/Form/GuardianForm';

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
      <div className="py-40 space-y-2">
        <p className="flex items-center text-5xl font-bold px-44 justify-left">
          회원가입
        </p>
        <div className="grid grid-cols-3 gap-4 px-44">
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
        <div className="flex items-center justify-center mt-10">
          {renderForm()}
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
