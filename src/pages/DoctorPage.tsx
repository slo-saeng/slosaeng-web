import React, { useState } from 'react';
// import Notification from '../component/doctor/Notification';
import elderList from '../mocks/elderList.json';
import { elderProfile, majorElderProfile } from '../types/member';
import Sidebar from '../component/common/Sidebar/Sidebar';
// type Grade = '관심' | '주의' | '심각';

interface RoleData {
  id: number;
  role: string;
  list: elderProfile[] | majorElderProfile[];
}

const items = [
  { id: 'elder', text: '고령자 관리' },
  { id: 'majorElder', text: '주요대상 관리' },
];

const DoctorPage = () => {
  const [detail, setDetail] = useState<string>('elder');
  const [showPopup, setShowPopup] = useState<boolean>(false);
  // const [showAddPopup, setShowAddPopup] = useState<boolean>(false);
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleManageTable = (role: string) => {
    setDetail(role);
  };

  const tableData: RoleData | undefined = elderList.find(
    (data) => data.role === detail,
  );

  const renderHeader = () => {
    switch (detail) {
      case 'elder':
        return (
          <>
            <th>이름/성별</th>
            <th>생년월일</th>
            <th>거주지역</th>
            <th>전화번호</th>
            <th>혈액형</th>
            <th>기타사항</th>
          </>
        );
      case 'majorElder':
        return (
          <>
            <th>이름/성별</th>
            <th>생년월일</th>
            <th>거주지역</th>
            <th>전화번호</th>
            <th>혈액형</th>
            <th>기타사항</th>
            <th>등급</th>
          </>
        );
      default:
        return null;
    }
  };
  const extractBirthdate = (idNumber: string) => {
    const yearPrefix = parseInt(idNumber[6], 10) <= 2 ? '19' : '20';
    const year = yearPrefix + idNumber.substring(0, 2);
    const month = idNumber.substring(2, 4);
    const day = idNumber.substring(4, 6);
    return `${year}-${month}-${day}`;
  };

  const handlePopup = (open: boolean) => {
    setShowPopup(open);
    if (!open) {
      setSearchQuery('');
    }
  };

  const handleDeletePopup = (open: boolean) => {
    setShowDeletePopup(open);
    if (!open) {
      setSearchQuery('');
    }
  };

  const searchElderByName = (query: string) => {
    return tableData?.list.filter((elder) => elder.name.includes(query.trim()));
  };

  const filteredElders = searchQuery
    ? searchElderByName(searchQuery)
    : tableData?.list;

  const renderBody = (data: elderProfile | majorElderProfile) => {
    const birthdate = extractBirthdate(data.idNumber);
    if ('grade' in data)
      return (
        <>
          <td>
            {data.name} / {data.gender}
          </td>
          <td>{birthdate}</td>
          <td>
            {data.nation} {data.city} {data.district} {data.detailAddress}
          </td>
          <td>{data.phone}</td>
          <td>{data.bloodType}</td>
          <td>{data.etc}</td>
          <td>{data.grade}</td>
        </>
      );
    return (
      <>
        <td>
          {data.name} / {data.gender}
        </td>
        <td>{birthdate}</td>
        <td>
          {data.nation} {data.city} {data.district} {data.detailAddress}
        </td>
        <td>{data.phone}</td>
        <td>{data.bloodType}</td>
        <td>{data.etc}</td>
      </>
    );
  };

  return (
    <div className="flex">
      <Sidebar
        sort="Doctor"
        detail={detail}
        handleTable={handleManageTable}
        items={items}
      />
      <div className="w-4/5 p-8 mt-12">
        <div className="flex justify-between">
          <h1 className="mb-6 text-2xl font-bold">
            {items.find((data) => data.id === detail)?.text}
          </h1>
          <div className="flex justify-end mb-4">
            {detail === 'elder' && (
              <button
                type="button"
                className="btn"
                onClick={() => handlePopup(true)}
              >
                주요대상 추가
              </button>
            )}
            {detail === 'majorElder' && (
              <button
                type="button"
                className="btn"
                onClick={() => handleDeletePopup(true)}
              >
                주요대상 삭제
              </button>
            )}
          </div>
        </div>
        <table className="table text-center">
          <thead>
            <tr>
              <th> </th>
              {renderHeader()}
            </tr>
          </thead>
          <tbody>
            {tableData?.list.map((data, index) => (
              <tr className="hover:bg-main-base" key={data.id}>
                <th>{index + 1}</th>
                {renderBody(data)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-lg w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">주요대상 추가</h2>
              <button
                type="button"
                className="text-xl font-bold"
                onClick={() => handlePopup(false)}
              >
                &times;
              </button>
            </div>
            <input
              type="text"
              placeholder="이름 검색"
              className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <table className="table text-center">
              <thead>
                <tr>
                  <th> </th>
                  {renderHeader()}
                </tr>
              </thead>
              <tbody>
                {filteredElders?.map((data, index) => (
                  <tr className="hover:bg-main-base" key={data.id}>
                    <th>{index + 1}</th>
                    {renderBody(data)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {showDeletePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-lg w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">주요대상 삭제</h2>
              <button
                type="button"
                className="text-xl font-bold"
                onClick={() => handleDeletePopup(false)}
              >
                &times;
              </button>
            </div>
            <input
              type="text"
              placeholder="이름 검색"
              className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <table className="table text-center">
              <thead>
                <tr>
                  <th> </th>
                  {renderHeader()}
                </tr>
              </thead>
              <tbody>
                {filteredElders?.map((data, index) => (
                  <tr className="hover:bg-main-base" key={data.id}>
                    <th>{index + 1}</th>
                    {renderBody(data)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {/* <Notification /> */}
    </div>
  );
};

export default DoctorPage;
