import React, { useState } from 'react';
import elderList from '../mocks/elderList.json';
import { elderProfile, majorElderProfile } from '../types/member';
import Sidebar from '../component/common/Sidebar/Sidebar';

interface RoleData {
  id: number;
  role: string;
  list: (elderProfile | majorElderProfile)[];
}

const items = [
  { id: 'elder', text: '고령자 관리' },
  { id: 'majorElder', text: '주요대상 관리' },
];

const DoctorPage = () => {
  const [detail, setDetail] = useState<string>('elder');
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [deleteReason, setDeleteReason] = useState<string>('');
  const [selectedElder, setSelectedElder] = useState<
    elderProfile | majorElderProfile | null
  >(null);
  const [elderListData, setElderListData] = useState<RoleData[]>(elderList);

  const handleManageTable = (role: string) => {
    setDetail(role);
  };

  const elderListDataFiltered = elderListData.filter(
    (data) => data.role === 'elder',
  );
  const majorElderListDataFiltered = elderListData.filter(
    (data) => data.role === 'majorElder',
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
    const yearPrefix = parseInt(idNumber[6], 10) <= 2 ? '20' : '19';
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

  const handleDeletePopup = (
    open: boolean,
    elder: elderProfile | majorElderProfile | null,
  ) => {
    setShowDeletePopup(open);
    if (open && elder) {
      setSelectedElder(elder);
    } else {
      setSelectedElder(null);
      setSearchQuery('');
      setDeleteReason('');
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const searchElderByName = (
    query: string,
    list: (elderProfile | majorElderProfile)[],
  ) => {
    return list.filter((elder) => elder.name.includes(query.trim()));
  };

  const handleDeleteElder = () => {
    if (!selectedElder) return;

    if (!deleteReason.trim()) {
      alert('삭제 사유를 입력해주세요.');
      return;
    }

    const updatedList: RoleData[] = elderListData.map((roleData) => {
      if (roleData.role === 'majorElder') {
        return {
          ...roleData,
          list: roleData.list.filter((elder) => elder.id !== selectedElder.id),
        };
      }
      return roleData;
    });

    const updatedElderList: RoleData[] = updatedList.map((roleData) => {
      if (roleData.role === 'elder') {
        // 주요대상 고령자의 등급 정보 제거
        const updatedElder = { ...selectedElder, grade: undefined };
        return {
          ...roleData,
          list: [...roleData.list, updatedElder],
        };
      }
      return roleData;
    });

    setElderListData(updatedElderList);
    setShowDeletePopup(false);
    setSearchQuery('');
    setDeleteReason('');
    setSelectedElder(null);
  };

  const getFilteredElders = () => {
    if (searchQuery) {
      if (detail === 'elder') {
        return searchElderByName(searchQuery, elderListDataFiltered[0]?.list);
      }
      if (detail === 'majorElder') {
        return searchElderByName(
          searchQuery,
          majorElderListDataFiltered[0]?.list,
        );
      }
    }
    if (detail === 'elder') return elderListDataFiltered[0]?.list;
    if (detail === 'majorElder') return majorElderListDataFiltered[0]?.list;

    return [];
  };

  const filteredElders = getFilteredElders();

  const renderBody = (data: elderProfile | majorElderProfile) => {
    const birthdate = extractBirthdate(data.idNumber);
    if ('grade' in data) {
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
    }
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
              <input
                type="text"
                placeholder="검색"
                className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
                value={searchQuery}
                onChange={handleSearch}
              />
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
            {filteredElders?.map((data, index) => (
              <tr className="hover:bg-main-base" key={data.id}>
                <th>{index + 1}</th>
                {renderBody(data)}
                {detail === 'majorElder' && (
                  <td>
                    <button
                      type="button"
                      className="btn"
                      onClick={() => handleDeletePopup(true, data)}
                    >
                      삭제
                    </button>
                  </td>
                )}
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

      {showDeletePopup && selectedElder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-lg w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">주요대상 삭제</h2>
              <button
                type="button"
                className="text-xl font-bold"
                onClick={() => handleDeletePopup(false, null)}
              >
                ×
              </button>
            </div>

            <table className="table text-center">
              <thead>
                <tr>{renderHeader()}</tr>
              </thead>
              <tbody>
                <tr className="hover:bg-main-base">
                  {renderBody(selectedElder)}
                </tr>
              </tbody>
            </table>
            <textarea
              placeholder="삭제 사유를 입력해주세요."
              className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
              value={deleteReason}
              onChange={(e) => setDeleteReason(e.target.value)}
            />
            <button
              type="button"
              className="btn w-full"
              onClick={handleDeleteElder}
            >
              삭제
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorPage;
