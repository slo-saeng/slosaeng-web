import { useState } from 'react';

const DoctorPage = () => {
  const [selectedPage, setSelectedPage] = useState('고령자관리');

  // 임시데이터 - 고령자 관리 목록
  const elderlyData = [
    {
      id: 1,
      name: '홍길동',
      gender: '남성',
      age: 70,
      residence: '서울시 강남구 ㅇㅇㅇ',
      bloodType: 'A',
      otherInfo: '고혈압',
    },
    {
      id: 2,
      name: '김영희',
      gender: '여성',
      age: 75,
      residence: '경기도 고양시 ㅇㅇㅇ',
      bloodType: 'B',
      otherInfo: '당뇨',
    },
    {
      id: 3,
      name: '이철수',
      gender: '남성',
      age: 68,
      residence: '부산시 해운대구 ㅇㅇㅇ',
      bloodType: 'O',
      otherInfo: '심장병',
    },
    {
      id: 4,
      name: '김영희',
      gender: '여성',
      age: 75,
      residence: '경기도 고양시 ㅇㅇㅇ',
      bloodType: 'B',
      otherInfo: '당뇨',
    },
    {
      id: 5,
      name: '이철수',
      gender: '남성',
      age: 68,
      residence: '부산시 해운대구 ㅇㅇㅇ',
      bloodType: 'O',
      otherInfo: '심장병',
    },
  ];

  const renderContent = () => {
    switch (selectedPage) {
      case '고령자관리':
        return (
          <div className="w-full">
            <h2 className="text-2xl font-bold mb-4">고령자 관리</h2>
            <table className="w-full max-w-screen-xl border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="border border-gray-300 px-4 py-2">
                    이름/성별
                  </th>
                  <th className="border border-gray-300 px-4 py-2">나이</th>
                  <th className="border border-gray-300 px-4 py-2">거주지역</th>
                  <th className="border border-gray-300 px-4 py-2 ">혈액형</th>
                  <th className="border border-gray-300 px-4 py-2 ">
                    기타사항
                  </th>
                </tr>
              </thead>
              <tbody>
                {elderlyData.map((elderly) => (
                  <tr key={elderly.id}>
                    <td className="border border-gray-300 px-4 py-2 ">
                      {elderly.name} / {elderly.gender}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 ">
                      {elderly.age}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 ">
                      {elderly.residence}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 ">
                      {elderly.bloodType}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 ">
                      {elderly.otherInfo}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
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
      <div className="w-full flex  p-32 pt-52 ">{renderContent()}</div>
    </div>
  );
};

export default DoctorPage;
