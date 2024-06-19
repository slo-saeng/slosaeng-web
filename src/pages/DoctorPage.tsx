import { useState } from 'react';

type Grade = '관심' | '주의' | '심각';

interface ElderlyData {
  id: number;
  name: string;
  gender: string;
  age: number;
  residence: string;
  bloodType: string;
  otherInfo: string;
  grade?: Grade;
}

const DoctorPage = () => {
  const [selectedPage, setSelectedPage] = useState('고령자관리');

  // 임시데이터 - 고령자 관리 목록
  const elderlyData: ElderlyData[] = [
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
  ];

  // 임시데이터 - 주요대상 관리 목록 (+등급)
  const majorTargetsData: ElderlyData[] = [
    {
      id: 1,
      name: '홍길동',
      gender: '남성',
      age: 70,
      residence: '서울시 강남구 ㅇㅇㅇ',
      bloodType: 'A',
      otherInfo: '고혈압',
      grade: '관심',
    },
    {
      id: 2,
      name: '김영희',
      gender: '여성',
      age: 75,
      residence: '경기도 고양시 ㅇㅇㅇ',
      bloodType: 'B',
      otherInfo: '당뇨',
      grade: '주의',
    },
    {
      id: 3,
      name: '이철수',
      gender: '남성',
      age: 68,
      residence: '부산시 해운대구 ㅇㅇㅇ',
      bloodType: 'O',
      otherInfo: '심장병',
      grade: '심각',
    },
  ];

  const getGradeStyle = (grade: Grade) => {
    switch (grade) {
      case '관심':
        return 'bg-green-200';
      case '주의':
        return 'bg-yellow-200';
      case '심각':
        return 'bg-red-200';
      default:
        return '';
    }
  };

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
                  <th className="border border-gray-300 px-4 py-2">혈액형</th>
                  <th className="border border-gray-300 px-4 py-2">기타사항</th>
                </tr>
              </thead>
              <tbody>
                {elderlyData.map((elderly) => (
                  <tr key={elderly.id}>
                    <td className="border border-gray-300 px-4 py-2">
                      {elderly.name} / {elderly.gender}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {elderly.age}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {elderly.residence}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {elderly.bloodType}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {elderly.otherInfo}
                    </td>
                  </tr>
                ))}
                {elderlyData.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="border border-gray-300 px-4 py-2 text-center"
                    >
                      고령자 데이터가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        );
      case '주요대상관리':
        return (
          <div className="w-full">
            <h2 className="text-2xl font-bold mb-4">주요대상 관리</h2>
            <table className="w-full max-w-screen-xl border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="border border-gray-300 px-4 py-2">
                    이름/성별
                  </th>
                  <th className="border border-gray-300 px-4 py-2">나이</th>
                  <th className="border border-gray-300 px-4 py-2">거주지역</th>
                  <th className="border border-gray-300 px-4 py-2">혈액형</th>
                  <th className="border border-gray-300 px-4 py-2">기타사항</th>
                  <th className="border border-gray-300 px-4 py-2">등급</th>
                </tr>
              </thead>
              <tbody>
                {majorTargetsData.map((target) => (
                  <tr key={target.id}>
                    <td className="border border-gray-300 px-4 py-2">
                      {target.name} / {target.gender}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {target.age}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {target.residence}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {target.bloodType}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {target.otherInfo}
                    </td>
                    <td
                      className={`border border-gray-300 px-4 py-2 ${getGradeStyle(target.grade!)}`}
                    >
                      {target.grade}
                    </td>
                  </tr>
                ))}
                {majorTargetsData.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="border border-gray-300 px-4 py-2 text-center"
                    >
                      주요대상 데이터가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        );
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
      <div className="w-full flex p-32 pt-52">{renderContent()}</div>
    </div>
  );
};

export default DoctorPage;
