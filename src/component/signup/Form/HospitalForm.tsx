import { ChangeEvent, useEffect, useState } from 'react';
import Button from '../../common/Button/Button';
import { PasswordInput } from '../PasswordInput/PasswordInput';

export const HospitalForm = () => {
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
