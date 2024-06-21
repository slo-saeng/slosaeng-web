import { ChangeEvent, useEffect, useState } from 'react';
import { PasswordInput } from '../PasswordInput/PasswordInput';
import Button from '../../common/Button/Button';
import {
  forbiddenKorean,
  hyphensPhoneNumber,
  idNumberValidCheck,
  maskingIdNumber,
} from '../../../utils/privacy';
import type { helperProfile } from '../../../types/member';

export const GuardianForm = () => {
  const [formValues, setFormValues] = useState<helperProfile>({
    id: '',
    password: '',
    idNumber: '',
    phone: '',
    name: '',
  });
  const [agree, setAgree] = useState<boolean>(false);
  const [isValidId, setIsValidId] = useState<boolean>(true);
  const [isValidPassword, setIsValidPassword] = useState<boolean>(true);
  const [isFormComplete, setIsFormComplete] = useState<boolean>(false);
  const [rawIdNumber, setRawIdNumber] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const handleIdNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRawIdNumber(value);

    setFormValues((prevInfo) => ({
      ...prevInfo,
      [name]: maskingIdNumber(value),
    }));
  };

  useEffect(() => {
    const { id, password, idNumber, phone, name } = formValues;
    const isValidForm =
      id !== '' &&
      password !== '' &&
      name !== '' &&
      idNumber !== '' &&
      phone !== '' &&
      rawIdNumber !== '' &&
      agree;
    setIsFormComplete(isValidForm);
  }, [formValues, agree]);

  const handleSubmit = () => {
    alert('회원가입이 완료되었습니다.');
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
        name="idNumber"
        value={formValues.idNumber}
        onChange={handleIdNumber}
        placeholder="주민등록번호"
        className="block w-full px-4 py-4 mt-2 border rounded focus:outline-none"
      />
      {rawIdNumber && !idNumberValidCheck(rawIdNumber) && (
        <p className="mt-1 text-sm text-red-500">
          올바른 주민등록번호를 입력해주세요.
        </p>
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
