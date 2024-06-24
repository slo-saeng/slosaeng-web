import React from 'react';

type Grade = '관심' | '주의' | '심각';

interface ElderlyData {
  onClose: () => void;
  elderlyInfo: {
    id: number;
    name: string;
    gender: string;
    birth: string;
    age: number;
    residence: string;
    bloodType: string;
    otherInfo: string;
    phone: string;
    grade?: Grade;
  };
  help: {
    requestHelp: string;
  };
}
const SupportRequestPopup: React.FC<ElderlyData> = ({
  onClose,
  help,
  elderlyInfo,
}) => {
  const handleAccept = () => {
    console.log('긴급 도움 요청을 수락하셨습니다.');
    onClose();
  };
  const handleReject = () => {
    console.log('긴급 도움 요청을 거절했습니다.');
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-red-400 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-2/4 space-y-3">
        <h2 className="text-3xl font-bold mb-4">긴급 도움 요청 정보</h2>
        <p className="font-bold">도움 요청</p>
        <p className="mb-3 border px-3 py-2">{help.requestHelp}</p>
        <p className="font-bold">고령자정보</p>
        <table className="table-auto w-full mb-4 text-left">
          <thead>
            <tr className="text-sm">
              <th className="border px-3  py-2">이름 / 나이 / 성별</th>
              <th className="border px-3  py-2">혈액형</th>
              <th className="border px-3  py-2">주소</th>
              <th className="border px-3  py-2">전화번호</th>
              {elderlyInfo.grade && (
                <th className="border px-3  py-2">주요관리 등급</th>
              )}
              {!elderlyInfo.grade && (
                <th className="border px-3  py-2">주요관리 대상</th>
              )}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-3 py-2">
                {elderlyInfo.name} / {elderlyInfo.age} / {elderlyInfo.gender}
              </td>

              <td className="border px-3 py-2">{elderlyInfo.bloodType}</td>

              <td className="border px-4 py-2">{elderlyInfo.residence}</td>

              <td className="border px-4 py-2">{elderlyInfo.phone}</td>

              {elderlyInfo.grade && (
                <td className="border px-4 py-2 border-gray-300">
                  {elderlyInfo.grade}
                </td>
              )}
              {!elderlyInfo.grade && (
                <td className="border px-4 py-2 border-gray-300">X</td>
              )}
            </tr>
          </tbody>
        </table>
        <div className="flex justify-end">
          <div className="pr-1">
            <button
              type="button"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
              onClick={handleAccept}
            >
              수락
            </button>
          </div>
          <div className="pl-1">
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
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
