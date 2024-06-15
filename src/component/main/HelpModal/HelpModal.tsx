import { useState, ChangeEvent } from 'react';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';

interface HelpModalProps {
  closeModal: () => void;
}

const HelpModal = ({ closeModal }: HelpModalProps) => {
  const [elder, setElder] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [request, setRequest] = useState<boolean>(false);
  const [fill, setFill] = useState<boolean>(false);

  const onChangeReason = (e: ChangeEvent<HTMLInputElement>) => {
    setReason(e.target.value);
  };

  const onClickRequest = () => {
    if (elder && reason) {
      setRequest(true);
      setFill(true);
    }
  };

  return (
    <div className="fixed z-20 flex items-center justify-center w-full h-full align-middle bg-black bg-opacity-60">
      <div className="w-3/5 p-8 text-center bg-white rounded-md">
        {request && fill ? (
          <div className="flex flex-col space-y-8">
            <p className="text-center break-words whitespace-normal">
              <span className="font-bold underline">{elder}</span>님에 대한 긴급
              도움 요청을 완료하였습니다. <br />
              거주 중인 수원시 장안구 내 병원으로 요청되었습니다. <br />
              수락한 병원 측에서 연락드릴 예정입니다.
            </p>
            <Button text="닫기" onClick={closeModal} />
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            <select
              className="p-2 border rounded-md"
              value={elder}
              onChange={(e) => setElder(e.target.value)}
            >
              <option disabled>고령자를 선택해주세요</option>
              <option value="김정은" selected>
                김정은
              </option>
              <option value="이한음">이한음</option>
              <option value="최수인">최수인</option>
            </select>
            <Input
              placeholder="사유를 간단히 입력해주세요"
              name="reason"
              onChange={onChangeReason}
            />
            {!fill && (
              <p className="text-sm text-red-500 text-start">
                ⚠️ 모든 내용을 작성해주세요
              </p>
            )}
            <p className="font-bold">
              해당 고령자에 대한 긴급 서비스를 요청하시겠습니까?
            </p>
            <div className="flex space-x-2">
              <Button
                text="네"
                onClick={() => onClickRequest()}
                className="bg-red-500 hover:bg-red-600"
              />
              <Button
                text="아니요"
                onClick={closeModal}
                className="bg-blue-500 hover:bg-blue-600"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpModal;
