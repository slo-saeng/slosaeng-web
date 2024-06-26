import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { elderProfile, intensiceCareProfile } from '../types/member';
import Sidebar from '../component/common/Sidebar/Sidebar';
import { useMember } from '../hooks/useMember';
import AddPopup from '../component/doctor/popup/AddPopup';
import DeletePopup from '../component/doctor/popup/DeletePopup';
import BodyRow from '../component/doctor/elderList/BodyRow';
import { useIntensiveCareMutation } from '../hooks/useIntensiveCareMutation';
import { useElder } from '../hooks/useElder';
import { useIntensiveCare } from '../hooks/useIntensiveCare';
import { useCancelIntensiveMutation } from '../hooks/useCancelIntensiveMutation';
import { useEmergency } from '../hooks/useEmergency';
import SupportRequestPopup from '../component/doctor/emergency/SupportRequestPopup';

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
    elderProfile | intensiceCareProfile | null
  >(null);
  const [selectedGrade, setSelectedGrade] = useState<string>('관심');
  const { data: elderData } = useElder();
  const { data: intensiveData } = useIntensiveCare();
  const { cancelIntensiveMutate } = useCancelIntensiveMutation();
  const { data: loginData } = useMember();
  const { intensiveCareMutate } = useIntensiveCareMutation();
  const [elderListData, setElderListData] = useState<elderProfile[]>([]);
  const [intensiveListData, setIntensiveListData] = useState<
    intensiceCareProfile[]
  >([]);
  const { data: emergencyData } = useEmergency();
  const [emergencyPopup, setEmergencyPopup] = useState<boolean>(false);
  const handleManageTable = (role: string) => {
    setDetail(role);
  };
  useEffect(() => {
    setEmergencyPopup(true);
  }, [emergencyData]);

  useEffect(() => {
    if (detail === 'elder') {
      setElderListData(elderData?.data);
    } else if (detail === 'majorElder') {
      setIntensiveListData(intensiveData?.data);
    }
  }, [detail, elderData, intensiveData]);

  useEffect(() => {
    if (
      !loginData?.data &&
      (loginData?.data.role !== 'DOCTOR' || loginData?.data.role === 'SUPER')
    ) {
      navigate('/forbidden');
    }
  }, [loginData]);

  const renderHeader = (): JSX.Element | null => {
    switch (detail) {
      case 'elder':
        return (
          <>
            <th> </th>
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
            <th> </th>
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
    if (!idNumber) return '';
    const year = idNumber.substring(0, 2);
    const month = idNumber.substring(2, 4);
    const day = idNumber.substring(4, 6);
    return `${year}-${month}-${day}`;
  };

  const handleAddPopup = (
    open: boolean,
    elder: elderProfile | intensiceCareProfile | null,
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

    intensiveCareMutate({
      id: selectedElder.id!,
      info: reason,
      grade: selectedGrade,
    });
    setShowAddPopup(false);
    setReason('');
  };

  const handleDeletePopup = (
    open: boolean,
    elder: elderProfile | intensiceCareProfile | null,
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

    cancelIntensiveMutate(selectedElder.id as number);
    setShowDeletePopup(false);
    setReason('');
  };

  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    setSearchQuery(value);

    if (detail === 'elder') {
      if (Array.isArray(elderData?.data)) {
        const filteredElderList = elderData.data.filter((item: elderProfile) =>
          item.name.includes(value),
        );
        setElderListData(filteredElderList);
      }
    } else if (detail === 'majorElder') {
      if (Array.isArray(intensiveData?.data)) {
        const filteredIntensiveList = intensiveData.data.filter(
          (item: intensiceCareProfile) => item.elder.name.includes(value),
        );
        setIntensiveListData(filteredIntensiveList);
      }
    }
  };

  const renderBody = (data: elderProfile | intensiceCareProfile) => {
    if ('elder' in data) {
      const selectedElderData = data as intensiceCareProfile;
      return (
        <>
          <td>
            {selectedElderData.elder.name} / {selectedElderData.elder.gender}
          </td>
          <td>{extractBirthdate(selectedElderData.elder.idNumber)}</td>
          <td>
            {selectedElderData.elder.nation.name}{' '}
            {selectedElderData.elder.city.name}{' '}
            {selectedElderData.elder.district.name}{' '}
            {selectedElderData.elder.detailAddress}
          </td>
          <td>{selectedElderData.elder.phone}</td>
          <td>{selectedElderData.elder.bloodType}</td>
          <td>{selectedElderData.elder.etc}</td>
          <td>{selectedElderData.grade ?? ''}</td>
        </>
      );
    }
    const basicData = data as elderProfile;
    return (
      <>
        <td>
          {basicData.name} / {basicData.gender}
        </td>
        <td>{extractBirthdate(basicData.idNumber)}</td>
        <td>
          {basicData.nationId} {basicData.cityId ?? ''} {basicData.districtId}{' '}
          {basicData.detailAddress}
        </td>
        <td>{basicData.phone}</td>
        <td>{basicData.bloodType}</td>
        <td>{basicData.etc ?? ''}</td>
      </>
    );
  };

  return (
    <>
      {emergencyPopup && emergencyData?.data.length > 0 && (
        <SupportRequestPopup
          elderlyInfo={emergencyData?.data[0]}
          onClose={() => setEmergencyPopup(false)}
        />
      )}
      <div className="flex">
        <Sidebar
          sort="Doctor"
          items={items}
          detail={detail}
          handleTable={handleManageTable}
        />
        <div className="w-full p-20 space-y-6">
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
              {(detail === 'elder' ? elderListData : intensiveListData)?.map(
                (elder, index) => (
                  <BodyRow
                    key={elder.id}
                    data={elder}
                    index={index}
                    handleAddPopup={handleAddPopup}
                    handleDeletePopup={handleDeletePopup}
                    extractBirthdate={extractBirthdate}
                  />
                ),
              )}
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
    </>
  );
};

export default DoctorPage;
