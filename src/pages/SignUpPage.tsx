import { useState, ChangeEvent, KeyboardEvent } from 'react';
import {
  FaHospital,
  FaUser,
  FaUserMd,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa';
import ButtonCardWithClick from '../component/signup/ButtonCardWithClick/ButtonCardWithClick';
import Button from '../component/common/Button/Button';
import Input from '../component/common/Input/Input';
import {
  hyphensPhoneNumber,
  idNumberValidCheck,
  maskingIdNumber,
  phoneValidCheck,
} from '../utils/privacy';
import {
  doctorProfile,
  guardianProfile,
  hospitalProfile,
} from '../types/signup';

const defaultHospitalInfo = {
  id: '',
  password: '',
  hospitalName: '',
  institutionNumber: '',
};

const defaultDoctorInfo = {
  id: '',
  password: '',
  idNumber: '',
  phone: '',
  affiliatedHospital: '',
  agreement: '',
  agreed: false,
};

const defaultGuardianInfo = {
  id: '',
  password: '',
  idNumber: '',
  phone: '',
  agreement: '',
  agreed: false,
};

const HospitalForm = () => {
  const [info, setInfo] = useState<hospitalProfile>(defaultHospitalInfo);
  const [showPassword, setShowPassword] = useState(false);
  const [isValidId, setIsValidId] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [showError, setShowError] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      togglePasswordVisibility();
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    const isValid = /^[^\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]*$/.test(value);

    if (name === 'id') {
      setIsValidId(isValid);
    } else if (name === 'password') {
      setIsValidPassword(isValid);
    }

    if (isValid || (name !== 'id' && name !== 'password')) {
      setInfo((prevInfo) => ({
        ...prevInfo,
        [name]: value,
      }));
    }
  };

  const isFormValid = () => {
    return (
      info.id &&
      isValidId &&
      info.password &&
      isValidPassword &&
      info.hospitalName &&
      info.institutionNumber
    );
  };

  const onClickSubmit = () => {
    if (isFormValid()) {
      alert('등록되었어요!');
      setInfo(defaultHospitalInfo);
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="space-y-4 w-3/4">
      <Input
        placeholder="아이디"
        name="id"
        value={info.id}
        onChange={handleChange}
        label="아이디"
        option
      />
      {!isValidId && (
        <p className="text-red-500">아이디에 한글은 입력할 수 없습니다.</p>
      )}
      <div className="relative">
        <Input
          placeholder="비밀번호"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={info.password}
          onChange={handleChange}
          label="비밀번호"
          option
        />
        <div
          className="absolute inset-y-0 right-2 flex items-center px-3 cursor-pointer text-gray-400 pt-6"
          onClick={togglePasswordVisibility}
          onKeyPress={handleKeyPress}
          tabIndex={0}
          role="button"
          aria-label="Toggle password visibility"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </div>
      </div>
      {!isValidPassword && (
        <p className="text-red-500">비밀번호에 한글은 입력할 수 없습니다.</p>
      )}
      <Input
        placeholder="병원 이름"
        name="hospitalName"
        value={info.hospitalName}
        onChange={handleChange}
        label="병원 이름"
        option
      />
      <Input
        placeholder="요양기관번호(의료기관코드)"
        name="institutionNumber"
        value={info.institutionNumber}
        onChange={handleChange}
        label="요양기관번호(의료기관코드)"
        option
      />
      <p className="text-lg">
        관련 서류는 메일에 첨부해주세요. (slosaeng@gmail.com)
      </p>
      <div className="pt-5">
        {showError && (
          <p className="text-red-500">필수 입력사항들을 입력해주세요.</p>
        )}
        <Button
          className={`py-4 text-black w-full rounded-md focus:outline-none ${
            isFormValid()
              ? 'bg-main-point hover:bg-main-point-dark'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
          text="회원가입하기"
          onClick={onClickSubmit}
        />
      </div>
    </div>
  );
};

const DoctorForm = () => {
  const [info, setInfo] = useState<doctorProfile>(defaultDoctorInfo);
  const [rawIdNumber, setRawIdNumber] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [isValidId, setIsValidId] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [showError, setShowError] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      togglePasswordVisibility();
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    const isValid = /^[^\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]*$/.test(value);

    if (name === 'id') {
      setIsValidId(isValid);
    } else if (name === 'password') {
      setIsValidPassword(isValid);
    }

    if (isValid || (name !== 'id' && name !== 'password')) {
      setInfo((prevInfo) => ({
        ...prevInfo,
        [name]: value,
      }));
    }
  };

  const handleInfoChange = (
    e: ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLButtonElement
      | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      setInfo((prevInfo) => ({
        ...prevInfo,
        [name]: hyphensPhoneNumber(value),
      }));
    } else setInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleCheckboxChange = () => {
    setInfo((prevInfo) => ({
      ...prevInfo,
      agreed: !prevInfo.agreed,
    }));
  };
  const handleIdNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRawIdNumber(value);

    setInfo((prevInfo) => ({
      ...prevInfo,
      [name]: maskingIdNumber(value),
    }));
  };

  const isFormValid = () => {
    return (
      info.id &&
      isValidId &&
      info.password &&
      isValidPassword &&
      info.idNumber &&
      idNumberValidCheck(rawIdNumber) &&
      info.phone &&
      phoneValidCheck(info.phone) &&
      info.affiliatedHospital &&
      info.agreement &&
      info.agreed
    );
  };

  const onClickSubmit = () => {
    if (isFormValid()) {
      info.idNumber = rawIdNumber;
      alert('등록되었어요!');
      setInfo(defaultDoctorInfo);
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="space-y-4 w-3/4">
      <Input
        placeholder="아이디"
        name="id"
        value={info.id}
        onChange={handleChange}
        label="아이디"
        option
      />
      {!isValidId && (
        <p className="text-red-500">아이디에 한글은 입력할 수 없습니다.</p>
      )}
      <div className="relative">
        <Input
          placeholder="비밀번호"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={info.password}
          onChange={handleChange}
          label="비밀번호"
          option
        />
        <div
          className="absolute inset-y-0 right-2 flex items-center px-3 cursor-pointer text-gray-400 pt-6"
          onClick={togglePasswordVisibility}
          onKeyPress={handleKeyPress}
          tabIndex={0}
          role="button"
          aria-label="Toggle password visibility"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </div>
      </div>
      {!isValidPassword && (
        <p className="text-red-500">비밀번호에 한글은 입력할 수 없습니다.</p>
      )}
      <div>
        <label className="text-sm" htmlFor="phoneNumber">
          주민등록번호
          <span className="text-red-500">*</span>
          <input
            id="idNumber"
            name="idNumber"
            placeholder="주민등록번호를 입력해주세요"
            className="w-full p-2 mt-1 text-sm border rounded-md"
            value={info.idNumber}
            onChange={handleIdNumber}
          />
          {rawIdNumber && !idNumberValidCheck(rawIdNumber) && (
            <p className="mt-1 text-sm text-red-500">
              올바른 주민등록번호를 입력해주세요.
            </p>
          )}
        </label>
      </div>
      <div>
        <label className="text-sm" htmlFor="phoneNumber">
          전화번호
          <span className="text-red-500">*</span>
          <input
            id="phone"
            name="phone"
            placeholder="연락처를 입력해주세요"
            className="w-full p-2 mt-1 text-sm border rounded-md"
            value={info.phone}
            onChange={handleInfoChange}
          />
          {info.phone && !phoneValidCheck(info.phone) && (
            <p className="mt-1 text-sm text-red-500">
              올바른 전화번호를 입력해주세요.
            </p>
          )}
        </label>
      </div>
      <Input
        placeholder="소속병원명"
        name="affiliatedHospital"
        value={info.affiliatedHospital}
        onChange={handleInfoChange}
        label="소속병원명"
        option
      />
      <div>
        <div className="flex">
          <p className="text-sm pr-2">약관동의</p>
          <input
            type="checkbox"
            name="checked"
            checked={info.agreed}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <span className="text-red-500">*</span>
        </div>
        <textarea
          name="agreement"
          value={info.agreement}
          onChange={handleInfoChange}
          placeholder="약관 동의 내용을 입력하세요."
          rows={5}
          className="block w-full px-3 py-2 mt-2 border rounded focus:border-blue-500 focus:outline-none"
        />
      </div>
      <div className="">
        {showError && (
          <p className="text-red-500">필수 입력사항들을 입력해주세요.</p>
        )}
        <Button
          className={`py-4 text-black w-full rounded-md focus:outline-none ${isFormValid() ? 'bg-main-point hover:bg-main-point-dark' : 'bg-gray-300 cursor-not-allowed'}`}
          text="회원가입하기"
          onClick={onClickSubmit}
        />
      </div>
    </div>
  );
};

const GuardianForm = () => {
  const [info, setInfo] = useState<guardianProfile>(defaultGuardianInfo);
  const [rawIdNumber, setRawIdNumber] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [isValidId, setIsValidId] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [showError, setShowError] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      togglePasswordVisibility();
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    const isValid = /^[^\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]*$/.test(value);

    if (name === 'id') {
      setIsValidId(isValid);
    } else if (name === 'password') {
      setIsValidPassword(isValid);
    }

    if (isValid || (name !== 'id' && name !== 'password')) {
      setInfo((prevInfo) => ({
        ...prevInfo,
        [name]: value,
      }));
    }
  };

  const handleInfoChange = (
    e: ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLButtonElement
      | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      setInfo((prevInfo) => ({
        ...prevInfo,
        [name]: hyphensPhoneNumber(value),
      }));
    } else setInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleCheckboxChange = () => {
    setInfo((prevInfo) => ({
      ...prevInfo,
      agreed: !prevInfo.agreed,
    }));
  };
  const handleIdNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRawIdNumber(value);

    setInfo((prevInfo) => ({
      ...prevInfo,
      [name]: maskingIdNumber(value),
    }));
  };

  const isFormValid = () => {
    return (
      info.id &&
      isValidId &&
      info.password &&
      isValidPassword &&
      info.idNumber &&
      idNumberValidCheck(rawIdNumber) &&
      info.phone &&
      phoneValidCheck(info.phone) &&
      info.agreement &&
      info.agreed
    );
  };

  const onClickSubmit = () => {
    if (isFormValid()) {
      info.idNumber = rawIdNumber;
      alert('등록되었어요!');
      setInfo(defaultDoctorInfo);
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="space-y-4 w-3/4">
      <Input
        placeholder="아이디"
        name="id"
        value={info.id}
        onChange={handleChange}
        label="아이디"
        option
      />
      {!isValidId && (
        <p className="text-red-500">아이디에 한글은 입력할 수 없습니다.</p>
      )}
      <div className="relative">
        <Input
          placeholder="비밀번호"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={info.password}
          onChange={handleChange}
          label="비밀번호"
          option
        />
        <div
          className="absolute inset-y-0 right-2 flex items-center px-3 cursor-pointer text-gray-400 pt-6"
          onClick={togglePasswordVisibility}
          onKeyPress={handleKeyPress}
          tabIndex={0}
          role="button"
          aria-label="Toggle password visibility"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </div>
      </div>
      {!isValidPassword && (
        <p className="text-red-500">비밀번호에 한글은 입력할 수 없습니다.</p>
      )}
      <div>
        <label className="text-sm" htmlFor="phoneNumber">
          주민등록번호
          <span className="text-red-500">*</span>
          <input
            id="idNumber"
            name="idNumber"
            placeholder="주민등록번호를 입력해주세요"
            className="w-full p-2 mt-1 text-sm border rounded-md"
            value={info.idNumber}
            onChange={handleIdNumber}
          />
          {rawIdNumber && !idNumberValidCheck(rawIdNumber) && (
            <p className="mt-1 text-sm text-red-500">
              올바른 주민등록번호를 입력해주세요.
            </p>
          )}
        </label>
      </div>
      <div>
        <label className="text-sm" htmlFor="phoneNumber">
          전화번호
          <span className="text-red-500">*</span>
          <input
            id="phone"
            name="phone"
            placeholder="연락처를 입력해주세요"
            className="w-full p-2 mt-1 text-sm border rounded-md"
            value={info.phone}
            onChange={handleInfoChange}
          />
          {info.phone && !phoneValidCheck(info.phone) && (
            <p className="mt-1 text-sm text-red-500">
              올바른 전화번호를 입력해주세요.
            </p>
          )}
        </label>
      </div>
      <div>
        <div className="flex">
          <p className="text-sm pr-2">약관동의</p>
          <input
            type="checkbox"
            name="checked"
            checked={info.agreed}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <span className="text-red-500">*</span>
        </div>
        <textarea
          name="agreement"
          value={info.agreement}
          onChange={handleInfoChange}
          placeholder="약관 동의 내용을 입력하세요."
          rows={5}
          className="block w-full px-3 py-2 mt-2 border rounded focus:border-blue-500 focus:outline-none"
        />
      </div>
      <div className="">
        {showError && (
          <p className="text-red-500">필수 입력사항들을 입력해주세요.</p>
        )}
        <Button
          className={`py-4 text-black w-full rounded-md focus:outline-none ${
            isFormValid()
              ? 'bg-main-point hover:bg-main-point-dark'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
          text="회원가입하기"
          onClick={onClickSubmit}
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
