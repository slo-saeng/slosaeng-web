import { useState, ChangeEvent, KeyboardEvent, useEffect } from 'react';
import {
  FaHospital,
  FaUser,
  FaUserMd,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa';
import ButtonCardWithClick from '../component/signup/ButtonCardWithClick/ButtonCardWithClick';
import Button from '../component/common/Button/Button';

const PasswordInput = ({
  value,
  onChange,
  placeholder,
  name,
}: {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  name: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      togglePasswordVisibility();
    }
  };

  return (
    <div className="relative">
      <input
        type={showPassword ? 'text' : 'password'}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="block w-full px-4 py-4 mt-2 border rounded focus:outline-none"
      />
      <div
        className="absolute inset-y-0 right-2 flex items-center px-3 cursor-pointer text-gray-400"
        onClick={togglePasswordVisibility}
        onKeyPress={handleKeyPress}
        tabIndex={0}
        role="button"
        aria-label="Toggle password visibility"
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </div>
    </div>
  );
};

const HospitalForm = () => {
  const [formValues, setFormValues] = useState({
    id: '',
    password: '',
    hospitalName: '',
    institutionNumber: '',
  });

  const [isValidId, setIsValidId] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isFormComplete, setIsFormComplete] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const isValid = /^[^\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3]*$/.test(
      value,
    );

    if (name === 'id') {
      setIsValidId(isValid);
    } else if (name === 'password') {
      setIsValidPassword(isValid);
    }

    if (isValid || name === 'hospitalName' || name === 'institutionNumber') {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };
  useEffect(() => {
    const { id, password, hospitalName, institutionNumber } = formValues;
    const isValidForm =
      id !== '' &&
      password !== '' &&
      hospitalName !== '' &&
      institutionNumber !== '';
    setIsFormComplete(isValidForm);
  }, [formValues]);

  const handleSubmit = () => {
    alert('회원가입이 완료되었습니다.');
  };

  return (
    <div className="space-y-3 w-3/4">
      <input
        type="text"
        name="id"
        value={formValues.id}
        onChange={handleChange}
        placeholder="아이디"
        className="block w-full px-4 py-4 mt-2 border rounded focus:outline-none"
      />
      {!isValidId && (
        <p className="text-red-500">아이디에 한글은 입력할 수 없습니다.</p>
      )}
      <PasswordInput
        name="password"
        value={formValues.password}
        onChange={handleChange}
        placeholder="비밀번호"
      />
      {!isValidPassword && (
        <p className="text-red-500">비밀번호에 한글은 입력할 수 없습니다.</p>
      )}
      <input
        type="text"
        name="hospitalName"
        value={formValues.hospitalName}
        onChange={handleChange}
        placeholder="병원이름"
        className="block w-full px-4 py-4 mt-2 border rounded focus:outline-none"
      />
      <input
        type="text"
        name="institutionNumber"
        value={formValues.institutionNumber}
        onChange={handleChange}
        placeholder="요양기관번호(의료기관코드)"
        className="block w-full px-4 py-4 mt-2 border rounded focus:outline-none"
      />
      <p className="text-lg">
        관련 서류는 메일에 첨부해주세요. (slosaeng@gmail.com)
      </p>
      <div className="pt-5">
        {!isFormComplete && (
          <p className="text-red-500">필수 입력사항들을 입력해주세요.</p>
        )}
        <Button
          className={`py-4 text-black w-full rounded-md focus:outline-none ${
            isFormComplete
              ? 'bg-main-point hover:bg-main-point-dark'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
          text="회원가입하기"
          onClick={handleSubmit}
          disabled={!isFormComplete}
        />
      </div>
    </div>
  );
};

const DoctorForm = () => {
  const [formValues, setFormValues] = useState({
    id: '',
    password: '',
    ssnFront: '',
    ssnBack: '',
    contact: '',
    hospitalName: '',
    agreement: '',
    agreed: false,
  });

  const [isValidId, setIsValidId] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isFormComplete, setIsFormComplete] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const isValid = /^[^\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3]*$/.test(
      value,
    );

    if (name === 'id') {
      setIsValidId(isValid);
    } else if (name === 'password') {
      setIsValidPassword(isValid);
    }

    if (isValid || name === 'hospitalName') {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    const { id, password, ssnFront, contact, hospitalName, agreed } =
      formValues;
    const isValidForm =
      id !== '' &&
      password !== '' &&
      ssnFront !== '' &&
      contact !== '' &&
      hospitalName !== '' &&
      agreed;
    setIsFormComplete(isValidForm);
  }, [formValues]);
  const handleCheckboxChange = () => {
    setFormValues((prevValues) => ({
      ...prevValues,
      agreed: !prevValues.agreed,
    }));
  };

  const handleSubmit = () => {
    alert('회원가입이 완료되었습니다.');
  };

  return (
    <div className="space-y-3 w-3/4">
      <input
        type="text"
        name="id"
        value={formValues.id}
        onChange={handleChange}
        placeholder="아이디"
        className="block w-full px-4 py-4 mt-2 border rounded focus:outline-none"
      />
      {!isValidId && (
        <p className="text-red-500">아이디에 한글은 입력할 수 없습니다.</p>
      )}
      <PasswordInput
        name="password"
        value={formValues.password}
        onChange={handleChange}
        placeholder="비밀번호"
      />
      {!isValidPassword && (
        <p className="text-red-500">비밀번호에 한글은 입력할 수 없습니다.</p>
      )}
      <div className="flex">
        <input
          type="number"
          name="ssnFront"
          value={formValues.ssnFront}
          onChange={handleChange}
          placeholder="주민번호"
          className="block w-full px-4 py-4 mt-2 border rounded focus:outline-none"
        />
      </div>
      <input
        type="number"
        name="contact"
        value={formValues.contact}
        onChange={handleChange}
        placeholder="연락처"
        className="block w-full px-4 py-4 mt-2 border rounded focus:outline-none"
      />
      <input
        type="text"
        name="hospitalName"
        value={formValues.hospitalName}
        onChange={handleChange}
        placeholder="소속병원명"
        className="block w-full px-4 py-4 mt-2 border rounded focus:outline-none"
      />
      <div className="mt-2 py-4">
        <p>약관동의</p>
        <textarea
          name="agreement"
          value={formValues.agreement}
          onChange={handleChange}
          placeholder="약관 동의 내용을 입력하세요."
          rows={5}
          className="block w-full px-3 py-2 mt-2 border rounded focus:border-blue-500 focus:outline-none"
        />
        <input
          type="checkbox"
          name="checked"
          checked={formValues.agreed}
          onChange={handleCheckboxChange}
          className="mr-2"
        />
      </div>
      <div className="">
        {!isFormComplete && (
          <p className="text-red-500">필수 입력사항들을 입력해주세요.</p>
        )}
        <Button
          className={`py-4 text-black w-full rounded-md focus:outline-none ${
            isFormComplete
              ? 'bg-main-point hover:bg-main-point-dark'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
          text="회원가입하기"
          onClick={handleSubmit}
          disabled={!isFormComplete}
        />
      </div>
    </div>
  );
};

const GuardianForm = () => {
  const [formValues, setFormValues] = useState({
    id: '',
    password: '',
    ssnFront: '',
    ssnBack: '',
    contact: '',
    agreement: '',
    agreed: false,
  });

  const [isValidId, setIsValidId] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isFormComplete, setIsFormComplete] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const isValid = /^[^\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3]*$/.test(
      value,
    );

    if (name === 'id') {
      setIsValidId(isValid);
    } else if (name === 'password') {
      setIsValidPassword(isValid);
    }

    if (isValid) {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    const { id, password, ssnFront, contact, agreed } = formValues;
    const isValidForm =
      id !== '' &&
      password !== '' &&
      ssnFront !== '' &&
      contact !== '' &&
      agreed;
    setIsFormComplete(isValidForm);
  }, [formValues]);
  const handleCheckboxChange = () => {
    setFormValues((prevValues) => ({
      ...prevValues,
      agreed: !prevValues.agreed,
    }));
  };

  const handleSubmit = () => {
    alert('회원가입이 완료되었습니다.');
  };
  return (
    <div className="space-y-3 w-3/4">
      <input
        type="text"
        name="id"
        value={formValues.id}
        onChange={handleChange}
        placeholder="아이디"
        className="block w-full px-4 py-4 mt-2 border rounded focus:outline-none"
      />
      {!isValidId && (
        <p className="text-red-500">아이디에 한글은 입력할 수 없습니다.</p>
      )}
      <PasswordInput
        name="password"
        value={formValues.password}
        onChange={handleChange}
        placeholder="비밀번호"
      />
      {!isValidPassword && (
        <p className="text-red-500">비밀번호에 한글은 입력할 수 없습니다.</p>
      )}
      <div className="flex">
        <input
          type="number"
          name="ssnFront"
          value={formValues.ssnFront}
          onChange={handleChange}
          placeholder="주민번호"
          className="block w-full px-4 py-4 mt-2 border rounded focus:outline-none"
        />
      </div>
      <input
        type="number"
        name="contact"
        value={formValues.contact}
        onChange={handleChange}
        placeholder="연락처"
        className="block w-full px-4 py-4 mt-2 border rounded focus:outline-none"
      />
      <div className="mt-2 py-4">
        <p>약관동의</p>
        <textarea
          name="agreement"
          value={formValues.agreement}
          onChange={handleChange}
          placeholder="약관 동의 내용을 입력하세요."
          rows={5}
          className="block w-full px-3 py-2 mt-2 border rounded focus:border-blue-500 focus:outline-none"
        />
        <input
          type="checkbox"
          checked={formValues.agreed}
          onChange={handleCheckboxChange}
          className="mr-2"
        />
      </div>
      <div className="">
        {!isFormComplete && (
          <p className="text-red-500">필수 입력사항들을 입력해주세요.</p>
        )}
        <Button
          className={`py-4 text-black w-full rounded-md focus:outline-none ${
            isFormComplete
              ? 'bg-main-point hover:bg-main-point-dark'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
          text="회원가입하기"
          onClick={handleSubmit}
          disabled={!isFormComplete}
        />
      </div>
    </div>
  );
};

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
          회원가입
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
