import React from 'react';
import type { emergencyRecieve } from '../../../types/emergency';
import { useCancelEmergencyMutation } from '../../../hooks/useCancelEmergencyMutation';

interface ElderlyData {
  elderlyInfo: emergencyRecieve;
  onClose: () => void;
}
const SupportRequestPopup: React.FC<ElderlyData> = ({
  onClose,
  elderlyInfo,
}: ElderlyData) => {
  const { cancelEmergencyMutate } = useCancelEmergencyMutation();
  const handleAccept = () => {
    alert('긴급 도움 요청을 수락하셨습니다.');
    onClose();
  };
  const handleReject = () => {
    cancelEmergencyMutate(elderlyInfo.id);
    onClose();
  };
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-red-400 bg-opacity-50">
      <div className="w-2/4 p-6 space-y-3 bg-white rounded shadow-lg">
        <h2 className="mb-4 text-3xl font-bold">긴급 도움 요청 정보</h2>
        <p className="font-bold">도움 요청</p>
        <p className="px-3 py-2 mb-3 border">{elderlyInfo.elder.etc}</p>
        <p className="font-bold">고령자정보</p>
        <table className="w-full mb-4 text-left table-auto">
          <thead>
            <tr className="text-sm">
              <th className="px-3 py-2 border">이름 / 나이 / 성별</th>
              <th className="px-3 py-2 border">혈액형</th>
              <th className="px-3 py-2 border">주소</th>
              <th className="px-3 py-2 border">전화번호</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-3 py-2 border">
                {elderlyInfo.elder.name} / {elderlyInfo.elder.idNumber} /{' '}
                {elderlyInfo.elder.gender}
              </td>

              <td className="px-3 py-2 border">
                {elderlyInfo.elder.bloodType}
              </td>

              <td className="px-4 py-2 border">
                {elderlyInfo.elder.nation.name} {elderlyInfo.elder.city.name}{' '}
                {elderlyInfo.elder.detailAddress}{' '}
                {elderlyInfo.elder.nation.name}
              </td>

              <td className="px-4 py-2 border">{elderlyInfo.elder.phone}</td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-end">
          <div className="pr-1">
            <button
              type="button"
              className="px-4 py-2 text-white transition duration-300 bg-green-500 rounded hover:bg-green-600"
              onClick={handleAccept}
            >
              수락
            </button>
          </div>
          <div className="pl-1">
            <button
              type="button"
              className="px-4 py-2 text-white transition duration-300 bg-red-500 rounded hover:bg-red-600"
              onClick={handleReject}
            >
              거절
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportRequestPopup;
