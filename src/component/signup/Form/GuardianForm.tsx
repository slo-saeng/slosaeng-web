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
import { useHelperMutation } from '../../../hooks/useHelperMutation';

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
  const { helperMutate } = useHelperMutation();

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
    const { id, password, phone, name } = formValues;
    if (isFormComplete)
      helperMutate({ id, password, idNumber: rawIdNumber, phone, name });
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
      <div className="w-full py-4 mt-2 space-y-2">
        <div className="block h-40 px-3 py-2 mt-2 overflow-scroll text-sm text-gray-400 border rounded ">
          <p>
            <strong>제1장 총칙</strong>
          </p>

          <p>
            <strong>제1조 (목적)</strong>
            <br />본 약관은 슬기로운 노후생활(이하 &apos;서비스&apos;)의 이용과
            관련하여 서비스 제공자와 정보이용자 간의 권리, 의무 및 책임 사항을
            규정함으로써 온라인 회원의 권익을 보호하는 것을 목적으로 합니다.
          </p>

          <p>
            <strong>제2조 (정의)</strong>
            <br />
            ① 이용자란 서비스에 접속하여 이 약관에 따라 슬기로운 노후생활이
            제공하는 서비스를 받는 회원을 말합니다.
            <br />② 회원이라 함은 서비스에 개인이나 병원 정보를 제공하여 회원
            등록을 완료한 자를 말합니다.
          </p>

          <p>
            <strong>제3조 (약관의 효력과 개정)</strong>
            <br />
            ① 이 약관은 이용자에게 공시함으로써 효력이 발생됩니다.
            <br />
            ② 슬기로운 노후생활은 이 약관의 내용을 이용자가 알 수 있도록 서비스
            홈페이지에 게시합니다.
            <br />③ 약관 변경 시 개정 약관 적용일 전 최소 7일 전부터 회원에게
            고지하며, 불리한 변경인 경우 최소 30일 전부터 고지합니다.
          </p>

          <p>
            <strong>제2장 회원 가입</strong>
          </p>

          <p>
            <strong>제4조 (회원 가입)</strong>
            <br />
            ① 회원으로 등록하여 서비스를 이용하고자 하는 자는 개발자가 요청하는
            개인 신상 정보를 제공해야 합니다.
            <br />
            ② 이용자는 슬기로운 노후생활이 정한 가입 양식에 따라 회원 정보를
            기입하고, 이 약관에 동의함으로써 회원 가입을 신청합니다.
            <br />
            ③ 슬기로운 노후생활은 다음 각 호에 해당하지 않는 한 회원으로
            등록합니다.
            <br />
            1. 등록 내용에 허위, 기재누락, 오기가 있는 경우
            <br />
            2. 기타 회원으로 등록하는 것이 서비스 제공에 기술상 현저히 지장이
            있다고 판단되는 경우
            <br />
            3. 만 14세 미만인 자<br />
            ④ 회원가입의 성립 시기는 슬기로운 노후생활의 승낙이 회원에게 도달한
            시점으로 합니다.
            <br />⑤ 회원은 등록사항에 변경이 있는 경우, 즉시 전자우편 및 기타
            방법으로 그 변경 사항을 슬기로운 노후생활에 알려야 합니다.
          </p>

          <p>
            <strong>제5조 (회원 탈퇴 및 자격 상실 등)</strong>
            <br />
            ① 회원은 언제든지 탈퇴를 요청할 수 있으며 슬기로운 노후생활은 즉시
            회원 탈퇴를 처리합니다.
            <br />
            ② 다음 각 호의 사유에 해당하는 경우, 슬기로운 노후생활은 회원 자격을
            제한 및 정지시킬 수 있습니다.
            <br />
            1. 가입 신청 시 허위 내용을 등록한 경우
            <br />
            2. 다른 사람의 서비스 이용을 방해하거나 그 정보를 도용하는 등 정보
            이용 규칙을 위협하는 경우
            <br />
            3. 불량 이용 회원의 강제 탈퇴 조치 시 일정한 소명 기간(7일 이상)을
            부여합니다.
          </p>

          <p>
            <strong>제6조 (회원에 대한 통지)</strong>
            <br />
            ① 슬기로운 노후생활은 회원이 제공한 전자우편 주소로 통지할 수
            있습니다.
            <br />② 불특정 다수 회원에 대한 통지는 1주일 이상 서비스 홈페이지에
            게시함으로써 개별 통지에 갈음할 수 있습니다.
          </p>

          <p>
            <strong>제3장 서비스 제공 및 이용</strong>
          </p>

          <p>
            <strong>제7조 (서비스 제공)</strong>
            <br />
            ① 슬기로운 노후생활이 제공하는 서비스는 기본적으로 무료입니다.
            <br />
            ② 서비스 내용의 변경이 필요할 경우, 변경 내용을 추가 또는 변경할 수
            있습니다.
            <br />③ 서비스 내용이 변경될 경우, 이용자에게 사전에 공지합니다.
          </p>

          <p>
            <strong>제8조 (서비스 이용 및 제한)</strong>
            <br />
            ① 서비스 제공자는 업무상 또는 기술상 특별한 지장이 없는 한, 중단
            없이 서비스를 제공함을 원칙으로 합니다.
            <br />② 정보통신시설의 보수 점검, 교체 및 고장, 통신의 두절 등의
            사유가 발생하거나, 시스템 장애, 서비스 이용의 폭주 등 불가항력으로
            인해 서비스 이용에 지장이 있는 경우 서비스 이용의 전부 또는 일부를
            제한할 수 있습니다.
          </p>

          <p>
            <strong>제9조 (서비스 이용 요금)</strong>
            <br />
            서비스는 무료로 이용하는 것이 원칙이나, 일부 서비스는 유료로 전환될
            수 있습니다. 유료 서비스 전환 시 사전에 홈페이지를 통해 공지합니다.
          </p>

          <p>
            <strong>제4장 서비스 제공자와 이용자의 의무사항</strong>
          </p>

          <p>
            <strong>제10조 (서비스 제공자의 의무)</strong>
            <br />
            ① 서비스 제공자는 이 약관이 정하는 바에 따라 지속적이고 안정적으로
            서비스를 제공하는 데 최선을 다합니다.
            <br />
            ② 회원의 정보가 분실, 도난, 변조, 누출 또는 훼손되지 않도록 보안 및
            안정성 확보에 필요한 조치를 취합니다.
            <br />③ 이용자가 원하지 않는 영리 목적의 광고성 전자우편을 발송하지
            않습니다.
          </p>

          <p>
            <strong>제11조 (회원의 의무)</strong>
            <br />
            ① ID와 비밀번호에 대한 관리 책임은 회원에게 있습니다.
            <br />
            ② 회원은 자신의 ID 및 비밀번호를 제3자에게 이용하게 해서는 안
            됩니다.
            <br />③ 회원은 자신의 ID 및 비밀번호를 도난당한 것을 인지한 경우,
            즉시 슬기로운 노후생활에 통보하고 안내에 따라야 합니다.
          </p>

          <p>
            <strong>제5장 기타</strong>
          </p>

          <p>
            <strong>제12조 (약관 외 준칙)</strong>
            <br />이 약관에 명시되지 않은 사항은 관련 법령의 규정에 따릅니다.
          </p>

          <p>
            <strong>제13조 (분쟁 해결)</strong>
            <br />
            ① 서비스 제공자는 이용자로부터 제출되는 불만 사항 및 의견을
            우선적으로 처리합니다. 단, 처리가 곤란한 경우에는 그 사유와 처리
            일정을 지체 없이 통보합니다.
            <br />② 서비스 제공자와 이용자 간에 발생한 분쟁은 관련 법에 따른
            조정에 따를 수 있습니다.
          </p>

          <p>
            <strong>제14조 (저작권의 귀속 및 이용 제한)</strong>
            <br />
            ① 이용자는 서비스를 통해 얻은 정보를 서비스 제공자의 사전 승낙 없이
            복제, 송신, 출판, 배포, 방송 기타 방법으로 영리 목적으로 이용하거나
            제3자에게 이용하게 해서는 안 됩니다.
            <br />② 서비스 제공자와 이용자 간에 제기된 소송에는 대한민국 법을
            적용합니다.
          </p>

          <p>
            <strong>---</strong>
          </p>

          <p>
            <strong>제1조 (개인정보의 수집 및 이용 목적)</strong>
            <br />
            슬기로운 노후생활은 다음의 목적을 위해 개인정보를 수집 및
            이용합니다:
          </p>

          <p>
            - 서비스 제공 및 회원관리
            <br />
            - 고령자의 의료 지원 및 관리
            <br />- 서비스 개선 및 맞춤형 서비스 제공
          </p>

          <p>
            <strong>제2조 (수집하는 개인정보의 항목)</strong>
          </p>

          <p>
            - <strong>보호자</strong>:<br />
            이름, 주민등록번호, 연락처
          </p>

          <p>
            - <strong>고령자</strong>:<br />
            이름, 주민등록번호, 연락처, 성별, 혈액형, 주소
          </p>

          <p>
            - <strong>병원</strong>:<br />
            병원명, 요양기관번호
          </p>

          <p>
            - <strong>의사</strong>:<br />
            이름, 직급, 연락처, 생년월일
          </p>

          <p>
            <strong>제3조 (개인정보의 보유 및 이용 기간)</strong>
            <br />
            수집된 개인정보는 회원 탈퇴 시까지 보유 및 이용됩니다. 단, 법령에
            따라 보관이 필요한 경우 해당 기간 동안 보관합니다.
          </p>

          <p>
            <strong>제4조 (개인정보의 제3자 제공)</strong>
            <br />
            슬기로운 노후생활은 회원의 동의 없이 개인정보를 제3자에게 제공하지
            않습니다. 단, 법령에 따라 요구되는 경우 예외로 합니다.
          </p>

          <p>
            <strong>제5조 (개인정보의 안전성 확보 조치)</strong>
          </p>

          <p>
            - 개인정보는 암호화되어 저장 및 관리됩니다.
            <br />- 개인정보 접근 권한을 최소화하고, 개인정보 보호를 위한 내부
            관리 계획을 수립합니다.
          </p>

          <p>
            <strong>제6조 (이용자의 권리)</strong>
          </p>

          <p>
            - 이용자는 언제든지 자신의 개인정보를 조회하거나 수정할 수 있습니다.
            <br />- 이용자는 개인정보 처리에 동의하지 않을 권리가 있으며, 동의
            거부 시 서비스 이용에 제한이 있을 수 있습니다.
          </p>

          <p>
            <strong>제7조 (문의처)</strong>
            <br />
            개인정보와 관련된 문의는 슬기로운 노후생활 고객센터로 연락해주시기
            바랍니다.
          </p>

          <p>
            이 약관과 개인정보처리방침은 서비스 이용을 위한 기본 안내사항입니다.
            회원가입 시 상세한 내용을 확인하고 동의해 주시기 바랍니다.
          </p>
        </div>
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
