import { ChangeEvent, useEffect, useState } from 'react';
import Button from '../../common/Button/Button';
import { PasswordInput } from '../PasswordInput/PasswordInput';
import { useDoctorMutation } from '../../../hooks/useDoctorMutation';
import { forbiddenKorean, hyphensPhoneNumber } from '../../../utils/privacy';
import type { doctorProfile } from '../../../types/member';

export const DoctorForm = () => {
  const [formValues, setFormValues] = useState<doctorProfile>({
    id: '',
    password: '',
    name: '',
    phone: '',
    position: '',
    birth: '',
    institutionNumber: '',
  });
  const [agree, setAgree] = useState<boolean>(false);
  const [isValidId, setIsValidId] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const { doctorMutate } = useDoctorMutation();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      setFormValues((prevInfo) => ({
        ...prevInfo,
        [name]: hyphensPhoneNumber(value),
      }));
      return;
    }
    if (name === 'id') {
      setIsValidId(forbiddenKorean(value));
    } else if (name === 'password') {
      setIsValidPassword(forbiddenKorean(value));
    }
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  useEffect(() => {
    const { id, password, phone, institutionNumber, name, position, birth } =
      formValues;
    const isValidForm =
      id !== '' &&
      password !== '' &&
      phone !== '' &&
      institutionNumber !== '' &&
      name !== '' &&
      position !== '' &&
      birth !== '' &&
      agree !== false;
    setIsFormComplete(isValidForm);
  }, [formValues, agree]);

  const handleSubmit = () => {
    const { id, password, phone, institutionNumber, name, position, birth } =
      formValues;
    if (isFormComplete)
      doctorMutate({
        id,
        password,
        name,
        phone,
        position,
        birth,
        institutionNumber,
      });
  };

  return (
    <div className="w-3/4 space-y-3">
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
        name="name"
        value={formValues.name}
        onChange={handleChange}
        placeholder="이름"
        className="block w-full px-4 py-4 mt-2 border rounded focus:outline-none"
      />
      <input
        name="phone"
        value={formValues.phone}
        onChange={handleChange}
        placeholder="연락처"
        className="block w-full px-4 py-4 mt-2 border rounded focus:outline-none"
      />
      <input
        name="birth"
        value={formValues.birth}
        onChange={handleChange}
        placeholder="생년월일 ex)19991010"
        className="block w-full px-4 py-4 mt-2 border rounded focus:outline-none"
      />
      <input
        name="institutionNumber"
        value={formValues.institutionNumber}
        onChange={handleChange}
        placeholder="소속병원코드"
        className="block w-full px-4 py-4 mt-2 border rounded focus:outline-none"
      />
      <input
        name="position"
        value={formValues.position}
        onChange={handleChange}
        placeholder="직급"
        className="block w-full px-4 py-4 mt-2 border rounded focus:outline-none"
      />
      <div className="py-4 mt-2 space-y-2">
        <p className="block w-full h-40 px-3 py-2 mt-2 text-sm text-gray-400 border rounded">
          약관 안내
        </p>
        <div className="flex">
          <input
            type="checkbox"
            name="checked"
            checked={agree}
            onChange={() => setAgree(!agree)}
            className="mr-2"
          />
          <p>약관에 동의합니다.</p>
        </div>
      </div>
      <div>
        {!isFormComplete && (
          <p className="mb-2 text-red-500">필수 입력사항들을 입력해주세요.</p>
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
