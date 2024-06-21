import { ChangeEvent, useEffect, useState } from 'react';
import Button from '../../common/Button/Button';
import { PasswordInput } from '../PasswordInput/PasswordInput';
import { forbiddenKorean } from '../../../utils/privacy';
import type { masterProfile } from '../../../types/member';
import { useMasterMutation } from '../../../hooks/useMasterMutation';

export const HospitalForm = () => {
  const [formValues, setFormValues] = useState<masterProfile>({
    id: '',
    password: '',
    name: '',
    institutionNumber: '',
  });
  const [isValidId, setIsValidId] = useState<boolean>(true);
  const [isValidPassword, setIsValidPassword] = useState<boolean>(true);
  const [isFormComplete, setIsFormComplete] = useState<boolean>(false);
  const { masterMutate } = useMasterMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

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
    const { id, password, name, institutionNumber } = formValues;
    const isValidForm =
      id !== '' && password !== '' && name !== '' && institutionNumber !== '';
    setIsFormComplete(isValidForm);
  }, [formValues]);

  const handleSubmit = () => {
    const { id, password, institutionNumber, name } = formValues;
    if (isFormComplete) masterMutate({ id, password, name, institutionNumber });
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
        placeholder="병원 이름"
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
      <p>관련 서류 제출은 문의 바랍니다.</p>
      <div className="pt-5">
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
