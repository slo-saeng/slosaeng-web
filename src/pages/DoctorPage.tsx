import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import elderList from '../mocks/elderList.json';
import { elderProfile, majorElderProfile } from '../types/member';
import Sidebar from '../component/common/Sidebar/Sidebar';
import Notification from '../component/doctor/emergency/Notification';
import { useMember } from '../hooks/useMember';
import AddPopup from '../component/doctor/popup/AddPopup';
import DeletePopup from '../component/doctor/popup/DeletePopup';
import BodyRow from '../component/doctor/elderList/BodyRow';

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
  const navigate = useNavigate();
  const [detail, setDetail] = useState<string>('elder');
  const [showAddPopup, setShowAddPopup] = useState<boolean>(false);
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [selectedElder, setSelectedElder] = useState<
    elderProfile | majorElderProfile | null
  >(null);
  const [selectedGrade, setSelectedGrade] = useState<string>('관심');
  const [elderListData, setElderListData] = useState<RoleData[]>(elderList);
  const { data: loginData } = useMember();

  const handleManageTable = (role: string) => {
    setDetail(role);
  };

  const elderListDataFiltered = elderListData.filter(
    (data) => data.role === 'elder',
  );
  const majorElderListDataFiltered = elderListData.filter(
    (data) => data.role === 'majorElder',
  );

  useEffect(() => {
    if (!loginData?.data && loginData?.data.role !== 'DOCTOR') {
      navigate('/forbidden');
    }
  }, [loginData]);

  const renderHeader = (): JSX.Element | null => {
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

  const handleAddPopup = (
    open: boolean,
    elder: elderProfile | majorElderProfile | null,
  ) => {
    setShowAddPopup(open);
    if (open && elder) {
      setSelectedElder(elder);
    } else {
      setSelectedElder(null);
      setSearchQuery('');
      setReason('');
      setSelectedGrade('관심');
    }
  };

  const handleAddElder = () => {
    if (!selectedElder) return;

    if (!reason.trim()) {
      alert('추가 사유를 입력해주세요.');
      return;
    }

    const updatedList: RoleData[] = elderListData.map((roleData) => {
      if (roleData.role === 'elder') {
        return {
          ...roleData,
          list: roleData.list.filter((elder) => elder.id !== selectedElder.id),
        };
      }
      return roleData;
    });

    const majorElderRoleData = updatedList.find(
      (roleData) => roleData.role === 'majorElder',
    );

    if (majorElderRoleData) {
      majorElderRoleData.list.push({
        ...selectedElder,
        grade: selectedGrade,
      } as majorElderProfile);
    }

    setElderListData(updatedList);
    setShowAddPopup(false);
    setReason('');
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
      setReason('');
    }
  };

  const handleDeleteElder = () => {
    if (!selectedElder) return;

    if (!reason.trim()) {
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

    const elderRoleData = updatedList.find(
      (roleData) => roleData.role === 'elder',
    );

    if (elderRoleData) {
      elderRoleData.list.push({
        ...selectedElder,
        grade: undefined,
      });
    }

    setElderListData(updatedList);
    setShowDeletePopup(false);
    setReason('');
  };

  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchQuery(event.target.value);
  };

  const filterData = (data: (elderProfile | majorElderProfile)[]) =>
    data.filter((item) => item.name.includes(searchQuery));

  const filteredElderList = filterData(elderListDataFiltered[0].list);
  const filteredMajorElderList = filterData(majorElderListDataFiltered[0].list);

  const renderBody = (data: elderProfile | majorElderProfile) => (
    <>
      <td>
        {data.name} / {data.gender}
      </td>
      <td>{extractBirthdate(data.idNumber)}</td>
      <td>
        {data.nationId} {data.cityId} {data.districtId} {data.detailAddress}
      </td>
      <td>{data.phone}</td>
      <td>{data.bloodType}</td>
      <td>{data.etc}</td>
      {'grade' in data && <td>{data.grade}</td>}
    </>
  );

  return (
    <div className="flex">
      <Sidebar
        sort="Doctor"
        items={items}
        detail={detail}
        handleTable={handleManageTable}
      />
      <div className="w-full p-16 space-y-6">
        <Notification />
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {detail === 'elder' ? '고령자 관리' : '주요대상 관리'}
          </h2>
          <input
            type="text"
            placeholder="검색"
            value={searchQuery}
            onChange={handleSearchQueryChange}
            className="px-4 py-2 border border-gray-300 rounded"
          />
        </div>
        <table className="table text-center">
          <thead>
            <tr>{renderHeader()}</tr>
          </thead>
          <tbody>
            {(detail === 'elder'
              ? filteredElderList
              : filteredMajorElderList
            ).map((elder, index) => (
              <BodyRow
                key={elder.id}
                data={elder}
                detail={detail}
                index={index}
                handleAddPopup={handleAddPopup}
                handleDeletePopup={handleDeletePopup}
                extractBirthdate={extractBirthdate}
              />
            ))}
          </tbody>
        </table>
      </div>
      {showAddPopup && selectedElder && (
        <AddPopup
          handleClose={() => setShowAddPopup(false)}
          handleAddElder={handleAddElder}
          selectedElder={selectedElder}
          reason={reason}
          setReason={setReason}
          selectedGrade={selectedGrade}
          setSelectedGrade={setSelectedGrade}
          renderHeader={renderHeader}
          renderBody={renderBody}
        />
      )}
      {showDeletePopup && selectedElder && (
        <DeletePopup
          handleClose={() => setShowDeletePopup(false)}
          handleDeleteElder={handleDeleteElder}
          selectedElder={selectedElder}
          reason={reason}
          setReason={setReason}
          renderHeader={renderHeader}
          renderBody={renderBody}
        />
      )}
    </div>
  );
};

export default DoctorPage;
