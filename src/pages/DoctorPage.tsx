import { useState } from 'react';

const DoctorPage = () => {
  const [selectedPage, setSelectedPage] = useState('고령자관리');
  const renderContent = () => {
    switch (selectedPage) {
      case '고령자관리':
        return <div>고령자 관리내용</div>;
      case '주요대상관리':
        return <div>주요대상관리내용</div>;
      default:
        return <div>고령자관리 내용</div>;
    }
  };
  return (
    <div className="flex min-h-screen">
      <div className="w-1/5 bg-main-point flex flex-col items-start justify-left p-12 pt-28">
        <div className="text-4xl text-black font-bold pb-14">DoctorPage</div>
        <button
          type="button"
          className={`text-2xl text-black rounded ${selectedPage === '고령자관리' ? 'font-bold' : ''}`}
          onClick={() => setSelectedPage('고령자관리')}
        >
          고령자관리
        </button>
        <button
          type="button"
          className={`text-2xl text-black rounded ${selectedPage === '주요대상관리' ? 'font-bold' : ''}`}
          onClick={() => setSelectedPage('주요대상관리')}
        >
          주요대상관리
        </button>
      </div>
      <div className="w-4/5 flex items-center justify-center">
        {renderContent()}
      </div>
    </div>
  );
};

export default DoctorPage;
