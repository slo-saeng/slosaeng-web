import React, { useState } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import SupportRequestPopup from './SupportRequestPopup';

type Grade = '관심' | '주의' | '심각';

const Notification: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);

  // 임시 고령자
  const elderlyInfo = {
    id: 1,
    name: '홍길동',
    gender: '남성',
    birth: '010231',
    age: 70,
    residence: '서울시 강남구 ㅇㅇㅇ',
    bloodType: 'A',
    otherInfo: '고혈압',
    phone: '010-1234-5678',
    grade: '관심' as Grade,
  };

  const requestHelp = {
    requestHelp:
      '보호자가 요청한 도움 요청입니다.보호자가 요청한 도움 요청입니다.보호자가 요청한 도움 요청입니다.',
  };

  return (
    <>
      <div className="fixed bottom-4 right-4">
        <button
          type="button"
          className="items-center flex bg-red-500 text-white px-28 py-16 rounded-3xl shadow-lg hover:bg-red-600 transition duration-300"
          onClick={() => setShowPopup(true)}
        >
          <FaExclamationTriangle className="mr-2" />
          긴급 도움 요청이 들어왔습니다!
        </button>
      </div>
      {showPopup && (
        <SupportRequestPopup
          onClose={() => setShowPopup(false)}
          help={requestHelp}
          elderlyInfo={elderlyInfo}
        />
      )}
    </>
  );
};

export default Notification;
