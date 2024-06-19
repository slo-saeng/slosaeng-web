import React, { useState } from 'react';

type Grade = '관심' | '주의' | '심각';

interface ElderlyData {
  id: number;
  name: string;
  gender: string;
  birth: string;
  age: number;
  residence: string;
  bloodType: string;
  otherInfo: string;
  grade?: Grade;
}

const DoctorPage: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState<
    '고령자관리' | '주요대상관리'
  >('고령자관리');
  const [showPopup, setShowPopup] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [searchResults, setSearchResults] = useState<ElderlyData[]>([]);
  const [elderlyData, setElderlyData] = useState<ElderlyData[]>([
    {
      id: 1,
      name: '홍길동',
      gender: '남성',
      birth: '010231',
      age: 70,
      residence: '서울시 강남구 ㅇㅇㅇ',
      bloodType: 'A',
      otherInfo: '고혈압',
    },
    {
      id: 2,
      name: '김영희',
      gender: '여성',
      birth: '010231',
      age: 75,
      residence: '경기도 고양시 ㅇㅇㅇ',
      bloodType: 'B',
      otherInfo: '당뇨',
    },
    {
      id: 3,
      name: '이철수',
      gender: '남성',
      birth: '010231',
      age: 68,
      residence: '부산시 해운대구 ㅇㅇㅇ',
      bloodType: 'O',
      otherInfo: '심장병',
    },
  ]);
  const [majorTargetsData, setMajorTargetsData] = useState<ElderlyData[]>([
    {
      id: 4,
      name: '남도일',
      gender: '남성',
      birth: '010231',
      age: 70,
      residence: '서울시 강남구 ㅇㅇㅇ',
      bloodType: 'A',
      otherInfo: '고혈압',
      grade: '관심',
    },
    {
      id: 5,
      name: '하영노',
      gender: '여성',
      birth: '010231',
      age: 75,
      residence: '경기도 고양시 ㅇㅇㅇ',
      bloodType: 'B',
      otherInfo: '당뇨',
      grade: '주의',
    },
    {
      id: 6,
      name: '자영주',
      gender: '남성',
      birth: '010231',
      age: 68,
      residence: '부산시 해운대구 ㅇㅇㅇ',
      bloodType: 'O',
      otherInfo: '심장병',
      grade: '심각',
    },
  ]);
  const [selectedElderly, setSelectedElderly] = useState<ElderlyData | null>(
    null,
  );
  const [selectedElderlyAdd, setSelectedElderlyAdd] =
    useState<ElderlyData | null>(null);
  const [deleteReason, setDeleteReason] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<Grade>('관심');
  const [reasonInput, setReasonInput] = useState('');

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

  const handleConfirmAdd = () => {
    if (selectedElderlyAdd && reasonInput.trim() !== '') {
      const updatedTarget = { ...selectedElderlyAdd, grade: selectedGrade };
      const updatedMajorTargets = [...majorTargetsData, updatedTarget];
      const updatedElderlyData = elderlyData.filter(
        (t) => t.id !== selectedElderlyAdd.id,
      );

      setMajorTargetsData(updatedMajorTargets);
      setElderlyData(updatedElderlyData);

      setShowAddPopup(false);
      setSelectedGrade('관심');
      setReasonInput('');
      setSelectedElderlyAdd(null);
    } else {
      alert('사유를 입력해야 주요 관리 대상으로 추가할 수 있습니다.');
    }
  };
  const handelAddClick = (target: ElderlyData) => {
    setSelectedElderlyAdd(target);
    setShowAddPopup(true);
  };

  const handleDeleteClick = (target: ElderlyData) => {
    setSelectedElderly(target);
    setShowDeletePopup(true);
  };
  const handleConfirmDelete = () => {
    if (selectedElderly && deleteReason.trim() !== '') {
      const updatedMajorTargets = majorTargetsData.filter(
        (t) => t.id !== selectedElderly.id,
      );
      setMajorTargetsData(updatedMajorTargets);
      setShowDeletePopup(false);
      setSelectedElderly(null);
      setDeleteReason('');
      setElderlyData([...elderlyData, selectedElderly]);
    }
  };
  const handleSearch = (searchTerm: string) => {
    setSearchResults(
      elderlyData.filter((elderly) => elderly.name.includes(searchTerm)),
    );
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
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold">주요대상 관리</h2>
              <div className="flex justify-end mb-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={() => setShowPopup(true)}
                >
                  주요관리대상 추가
                </button>
              </div>
            </div>
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
                  <th className="border border-gray-300 px-4 py-2">관리</th>
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
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        type="button"
                        className="px-2 py-1 bg-red-500 text-white rounded"
                        onClick={() => handleDeleteClick(target)}
                      >
                        삭제
                      </button>
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
          className={`text-2xl text-black rounded ${
            selectedPage === '고령자관리' ? 'font-bold' : ''
          }`}
          onClick={() => setSelectedPage('고령자관리')}
        >
          고령자관리
        </button>
        <button
          type="button"
          className={`text-2xl text-black rounded ${
            selectedPage === '주요대상관리' ? 'font-bold' : ''
          }`}
          onClick={() => setSelectedPage('주요대상관리')}
        >
          주요대상관리
        </button>
      </div>
      <div className="w-full flex p-32 pt-52">{renderContent()}</div>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-lg w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">주요대상 추가</h2>
              <button
                type="button"
                className="text-xl font-bold"
                onClick={() => setShowPopup(false)}
              >
                &times;
              </button>
            </div>
            <input
              type="text"
              placeholder="이름 검색"
              className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
              onChange={(e) => handleSearch(e.target.value)}
            />
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="border border-gray-300 px-4 py-2">이름</th>
                  <th className="border border-gray-300 px-4 py-2">생년월일</th>
                  <th className="border border-gray-300 px-4 py-2">전화번호</th>
                  <th className="border border-gray-300 px-4 py-2">거주지역</th>
                  <th className="border border-gray-300 px-4 py-2">
                    주요관리대상여부
                  </th>
                  <th className="border border-gray-300 px-4 py-2">관리</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((result) => (
                  <tr key={result.id}>
                    <td className="border border-gray-300 px-4 py-2">
                      {result.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {result.birth}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {result.bloodType}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {result.residence}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {majorTargetsData.some((t) => t.id === result.id)
                        ? 'O'
                        : 'X'}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {majorTargetsData.some((t) => t.id === result.id) ? (
                        <button
                          type="button"
                          className="px-2 py-1 bg-red-500 text-white rounded"
                          onClick={() => handleDeleteClick(result)}
                        >
                          삭제
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="px-2 py-1 bg-blue-500 text-white rounded"
                          onClick={() => handelAddClick(result)}
                        >
                          추가
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {searchResults.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="border border-gray-300 px-4 py-2 text-center"
                    >
                      검색 결과가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {showAddPopup && selectedElderlyAdd && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-lg w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">주요대상 추가 사유</h2>
              <button
                type="button"
                className="text-xl font-bold"
                onClick={() => setShowAddPopup(false)}
              >
                &times;
              </button>
            </div>
            <div className="mb-4">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="border border-gray-300 px-4 py-2">이름</th>
                    <th className="border border-gray-300 px-4 py-2">
                      생년월일
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      전화번호
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      거주지역
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      {selectedElderlyAdd.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {selectedElderlyAdd.birth}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {selectedElderlyAdd.bloodType}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {selectedElderlyAdd.residence}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mb-4">
              <p className="block text-sm font-medium text-gray-700 p-1">
                등급
              </p>
              <select
                id="gradeSelect"
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value as Grade)}
                className="block border border-gray-300 rounded px-2 py-1"
              >
                <option value="관심">관심</option>
                <option value="주의">주의</option>
                <option value="심각">심각</option>
              </select>
              <p className="block text-sm font-medium text-gray-700 pt-4 p-1">
                사유
              </p>
              <input
                type="text"
                id="reasonInput"
                value={reasonInput}
                onChange={(e) => setReasonInput(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 w-full mb-4 h-32"
                placeholder="사유를 입력하세요"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
                onClick={handleConfirmAdd}
              >
                추가
              </button>
            </div>
          </div>
        </div>
      )}
      {showDeletePopup && selectedElderly && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-lg w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">주요대상 삭제</h2>
              <button
                type="button"
                className="text-xl font-bold"
                onClick={() => setShowDeletePopup(false)}
              >
                &times;
              </button>
            </div>
            <div className="mb-4">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="border border-gray-300 px-4 py-2">이름</th>
                    <th className="border border-gray-300 px-4 py-2">
                      생년월일
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      전화번호
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      거주지역
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      {selectedElderly.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {selectedElderly.birth}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {selectedElderly.bloodType}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {selectedElderly.residence}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <input
              type="text"
              className="border border-gray-300 rounded px-3 py-1 w-full mb-4 h-32"
              placeholder="삭제 이유를 입력하세요"
              value={deleteReason}
              onChange={(e) => setDeleteReason(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                type="button"
                className={`px-4 py-2 rounded ${
                  selectedElderly && deleteReason.trim() !== ''
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-300 text-black cursor-not-allowed opacity-50'
                } hover:bg-red-400`}
                onClick={handleConfirmDelete}
                disabled={!selectedElderly || deleteReason.trim() === ''}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorPage;
