import { useEffect, useState } from 'react';
import type { doctorProfile } from '../types/member';
import Sidebar from '../component/common/Sidebar/Sidebar';
import Button from '../component/common/Button/Button';
import { useMember } from '../hooks/useMember';
import { useInstitutionDoctor } from '../hooks/useInstitutionDoctor';

const items = [
  { id: 'approve', text: '승인 관리' },
  { id: 'doctor', text: '닥터 관리' },
];

const MasterPage = () => {
  const [detail, setDetail] = useState<string>('approve');
  const { data: loginData } = useMember();
  const { data: doctorList } = useInstitutionDoctor(
    loginData?.data.institutionNumber,
  );
  const notApprovedDoctorList = doctorList?.data.filter(
    (doctor: doctorProfile) => doctor.role === 'NOT_APPROVED',
  );
  const approvedDoctorList = doctorList?.data.filter(
    (doctor: doctorProfile) => doctor.role === 'DOCTOR',
  );
  const [tableData, setTableData] = useState<doctorProfile[]>([]);

  const handleManageTable = (role: string) => {
    setDetail(role);
  };

  const onClickApprove = () => {
    alert('승인되었습니다.');
  };

  const onClickDelete = () => {
    alert('삭제되었습니다.');
  };

  useEffect(() => {
    if (detail === 'approve') setTableData(notApprovedDoctorList);
    else if (detail === 'doctor') setTableData(approvedDoctorList);
  }, [detail, doctorList]);

  return (
    <div className="flex">
      <Sidebar
        sort="Master"
        detail={detail}
        handleTable={handleManageTable}
        items={items}
      />
      <div className="w-4/5 p-8 mt-12">
        <h1 className="mb-6 text-2xl font-bold">
          {items.find((data) => data.id === detail)?.text}
        </h1>
        <table className="table text-center">
          <thead>
            <tr>
              <th> </th>
              <th>아이디</th>
              <th>이름</th>
              <th>핸드폰</th>
              <th>직급</th>
              <th>상태 관리</th>
            </tr>
          </thead>
          <tbody>
            {tableData?.map((data, index) => (
              <tr className="hover:bg-main-base" key={data.id}>
                <th>{index + 1}</th>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.phone}</td>
                <td>{data.position}</td>
                {detail === 'approve' ? (
                  <td className="flex space-x-1">
                    <Button
                      text="승인"
                      className="text-white bg-green-500 hover:bg-green-600"
                      onClick={() => onClickApprove()}
                    />
                    <Button
                      text="거절"
                      className="text-white bg-red-500 hover:bg-red-600"
                      onClick={() => onClickDelete()}
                    />
                  </td>
                ) : (
                  <td>
                    <Button
                      text="삭제"
                      className="text-white bg-red-500 hover:bg-red-600"
                      onClick={() => onClickDelete()}
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MasterPage;
