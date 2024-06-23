import { useState, ChangeEvent } from 'react';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { useMember } from '../../../hooks/useMember';
import { elderProfile } from '../../../types/member';
import { useEmergencyMutation } from '../../../hooks/useEmergencyMutation';

interface HelpModalProps {
  closeModal: () => void;
}

const HelpModal = ({ closeModal }: HelpModalProps) => {
  const { data } = useMember();
  const [elder, setElder] = useState<number>(data?.data.elders[0].id);
  const [info, setInfo] = useState<string>('');
  const [request, setRequest] = useState<boolean>(false);
  const { emergencyMutate } = useEmergencyMutation();

  const onChangeReason = (e: ChangeEvent<HTMLInputElement>) => {
    setInfo(e.target.value);
  };

  const onClickRequest = () => {
    if (info) {
      emergencyMutate(
        { info, elderId: elder },
        {
          onSuccess: () => {
            setRequest(true);
          },
          onError: () => {
            setRequest(false);
          },
        },
      );
    }
  };

  return (
    <div className="fixed z-20 flex items-center justify-center w-full h-full align-middle bg-black bg-opacity-60">
      <div className="w-3/5 p-8 text-center bg-white rounded-md">
        {request ? (
          <div className="flex flex-col space-y-8">
            <p className="text-center break-words whitespace-normal">
              <span className="font-bold underline">
                {data?.data.elders[elder - 1].name}
              </span>
              님에 대한 긴급 도움 요청을 완료하였습니다. <br />
              거주 중인 {data?.data.elders[elder - 1].district.name} 내 병원으로
              요청되었습니다. <br />
              수락한 병원 측에서 연락드릴 예정입니다.
            </p>
            <Button text="닫기" onClick={closeModal} />
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            <select
              className="p-2 border rounded-md"
              value={elder}
              onChange={(e) => setElder(parseInt(e.target.value, 10))}
            >
              <option disabled>고령자를 선택해주세요</option>
              {data?.data.elders.map(({ id, name }: elderProfile) => {
                return (
                  <option key={id} value={id}>
                    {name}
                  </option>
                );
              })}
            </select>
            <Input
              placeholder="사유를 간단히 입력해주세요"
              name="info"
              onChange={onChangeReason}
            />
            {!info && (
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
