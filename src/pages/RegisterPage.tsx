import { ChangeEvent, useState } from 'react';
import classNames from 'classnames';
import Input from '../component/common/Input/Input';
import Button from '../component/common/Button/Button';
import {
  hyphensPhoneNumber,
  idNumberValidCheck,
  maskingIdNumber,
  phoneValidCheck,
} from '../utils/privacy';

interface City {
  id: number;
  name: string;
}
interface Address {
  id: number;
  name: string;
  city: City[];
}

const defaultInfo = {
  id: 0,
  name: '',
  idNumber: '',
  phone: '',
  gender: '',
  bloodType: 'RH_PLUS_A',
  nationId: 1,
  cityId: 1,
  districtId: 1,
  detailAddress: '',
  etc: '',
};

const bloodTypeList = [
  { id: 1, type: 'RH_PLUS_A' },
  { id: 2, type: 'RH_MINUS_A' },
  { id: 3, type: 'RH_PLUS_B' },
  { id: 4, type: 'RH_MINUS_B' },
  { id: 5, type: 'RH_PLUS_O' },
  { id: 6, type: 'RH_MINUS_O' },
  { id: 7, type: 'RH_PLUS_AB' },
  { id: 8, type: 'RH_MINUS_AB' },
];

const RegisterPage = () => {
  const [info, setInfo] = useState<elderProfile>(defaultInfo);
  const [rawIdNumber, setRawIdNumber] = useState<string>('');
  const [fill, setFill] = useState<boolean>(true);

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

  const handleIdNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRawIdNumber(value);

    setInfo((prevInfo) => ({
      ...prevInfo,
      [name]: maskingIdNumber(value),
    }));
  };

  const cityList = addressList.find(
    (address: Address) => address.name === info.nation,
  );

  const onClickSubmit = () => {
    if (
      !info.name ||
      !info.idNumber ||
      !info.phone ||
      !info.gender ||
      !info.bloodType ||
      !info.nation ||
      !info.city
    )
      setFill(false);
    else {
      info.idNumber = rawIdNumber;
      alert('등록되었어요!');
      setInfo(defaultInfo);
    }
  };

  return (
    <div className="px-40 py-24 space-y-4">
      <h1 className="mb-12 text-4xl font-bold">고령자 등록하기</h1>
      <div className="space-y-4">
        <Input
          name="name"
          onChange={handleInfoChange}
          label="이름"
          placeholder="이름을 입력해주세요"
          option
        />
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
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            {/* api 연동 후 수정 예정 */}
            <label className="text-sm" htmlFor="bloodType">
              혈액형<span className="text-red-500 ">*</span>{' '}
            </label>
            <select
              id="bloodType"
              name="bloodType"
              className="p-2 mt-2 border rounded-md"
              value={info.bloodType}
              onChange={handleInfoChange}
            >
              <option disabled selected>
                혈액형
              </option>
              {bloodTypeList.map(({ id, type }) => (
                <option key={id} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-sm" htmlFor="gender">
              성별<span className="text-red-500 ">*</span>{' '}
            </label>
            <div className="grid grid-cols-2 gap-2 mt-2" id="gender">
              <button
                id="male"
                name="gender"
                onClick={() =>
                  handleInfoChange({
                    target: { name: 'gender', value: '남성' },
                  } as ChangeEvent<HTMLButtonElement>)
                }
                type="button"
                className={classNames(
                  'w-full py-2 text-gray-400 border rounded-md hover:bg-gray-100',
                  { 'bg-gray-100 text-black': info.gender === '남성' },
                )}
              >
                남
              </button>
              <button
                id="female"
                name="gender"
                onClick={() =>
                  handleInfoChange({
                    target: { name: 'gender', value: '여성' },
                  } as ChangeEvent<HTMLButtonElement>)
                }
                type="button"
                className={classNames(
                  'w-full py-2 text-gray-400 border rounded-md hover:bg-gray-100',
                  { 'bg-gray-100 text-black': info.gender === '여성' },
                )}
              >
                여
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-sm" htmlFor="residence">
            거주지<span className="text-red-500 ">*</span>
            <div className="grid grid-cols-3 gap-2" id="residence">
              <select
                id="nation"
                name="nation"
                className="p-2 mt-2 border rounded-md"
                value={info.nation}
                onChange={handleInfoChange}
              >
                <option disabled selected>
                  도
                </option>
                {addressList.map(({ id, name }) => (
                  <option key={id} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              <select
                id="city"
                name="city"
                className="p-2 mt-2 border rounded-md"
                value={info.city}
                onChange={handleInfoChange}
              >
                <option disabled selected>
                  시
                </option>
                {cityList?.city.map(({ id, name }) => (
                  <option key={id} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              <select
                id="district"
                name="district"
                className="p-2 mt-2 border rounded-md"
                value={info.district}
                onChange={handleInfoChange}
              >
                <option selected>거주지</option>
                {/* api 연동 후 처리 예정 */}
              </select>
            </div>{' '}
          </label>
          <Input
            name="detailAddress"
            onChange={handleInfoChange}
            placeholder="상세주소를 입력해주세요"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm" htmlFor="etc">
            특이 사항{' '}
          </label>
          <textarea
            id="etc"
            name="etc"
            onChange={handleInfoChange}
            placeholder="지병, 다니는 병원, 평소 먹는 약, 알레르기 약물, 수술내역 등을 적어주세요"
            className="p-4 border rounded-md"
          />{' '}
        </div>
      </div>
      {!fill && (
        <p className="text-sm text-red-500">필수 요소들을 전부 입력해주세요</p>
      )}
      <Button
        text="고령자 등록하기"
        className="text-sm text-center"
        onClick={onClickSubmit}
      />
    </div>
  );
};

export default RegisterPage;
