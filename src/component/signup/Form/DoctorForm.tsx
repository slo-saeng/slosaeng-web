import { ChangeEvent, useEffect, useState } from 'react';
import Button from '../../common/Button/Button';
import { PasswordInput } from '../PasswordInput/PasswordInput';

export const DoctorForm = () => {
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
      <div className="py-4 mt-2">
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
