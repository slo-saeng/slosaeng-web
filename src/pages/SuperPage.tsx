import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../component/common/Sidebar/Sidebar';
import type {
  doctorProfile,
  elderProfile,
  helperProfile,
  masterProfile,
} from '../types/member';
import Button from '../component/common/Button/Button';
import { useElder } from '../hooks/useElder';
import { useMaster } from '../hooks/useMaster';
import { useDoctor } from '../hooks/useDoctor';
import { useHelper } from '../hooks/useHelper';
import { useCancelDoctorMutation } from '../hooks/useCancelDoctorMutation';
import { useCancelElderMutation } from '../hooks/useCancelElderMutation';
import { useCancelMasterMutation } from '../hooks/useCancelMasterMutation';
import { useCancelHelperMutation } from '../hooks/useCancelHelperMutation';
import { useMember } from '../hooks/useMember';

const items = [
  { id: 'elder', text: '고령자 관리' },
  { id: 'helper', text: '보호자 관리' },
  { id: 'doctor', text: '닥터 관리' },
  { id: 'master', text: '마스터 관리' },
];

const SuperPage = () => {
  const navigate = useNavigate();
  const [detail, setDetail] = useState<string>('elder');
  const [tableData, setTableData] = useState<
    helperProfile[] | doctorProfile[] | masterProfile[] | elderProfile[]
  >([]);
  const { data: elderData } = useElder();
  const { data: hospitalData } = useMaster();
  const { data: doctorData } = useDoctor();
  const { data: helperData } = useHelper();
  const { cancelDoctorMutate } = useCancelDoctorMutation();
  const { cancelElderMutate } = useCancelElderMutation();
  const { cancelMasterMutate } = useCancelMasterMutation();
  const { cancelHelperMutate } = useCancelHelperMutation();
  const { data: loginData } = useMember();

  const handleManageTable = (role: string) => {
    setDetail(role);
  };

  const onClickMemberDelete = (
    data: elderProfile | doctorProfile | masterProfile | helperProfile,
  ) => {
    if (detail === 'elder') cancelElderMutate(data.id as number);
    else if (detail === 'master') cancelMasterMutate(data.id as string);
    else if (detail === 'doctor') cancelDoctorMutate(data.id as string);
    else if (detail === 'helper') cancelHelperMutate(data.id as string);
  };

  useEffect(() => {
    if (detail === 'elder') setTableData(elderData?.data);
    else if (detail === 'master') setTableData(hospitalData?.data);
    else if (detail === 'doctor') setTableData(doctorData?.data);
    else if (detail === 'helper') setTableData(helperData?.data);
  }, [detail, elderData, hospitalData, doctorData, hospitalData]);

  useEffect(() => {
    if (!loginData?.data && loginData?.data.role !== 'SUPER') {
      navigate('/forbidden');
    }
  }, [loginData]);

  const renderHeader = () => {
    switch (detail) {
      case 'elder':
        return (
          <>
            <th>이름</th>
            <th>핸드폰</th>
            <th>성별</th>
          </>
        );
      case 'doctor':
        return (
          <>
            <th>아이디</th>
            <th>이름</th>
            <th>핸드폰</th>
            <th>직급</th>
          </>
        );
      case 'master':
        return (
          <>
            <th>아이디</th>
            <th>이름</th>
            <th>의료 기관 코드</th>
          </>
        );
      case 'helper':
        return (
          <>
            <th>아이디</th>
            <th>이름</th>
            <th>핸드폰</th>
          </>
        );
      default:
        return null;
    }
  };

  const renderBody = (
    data: elderProfile | helperProfile | doctorProfile | masterProfile,
  ) => {
    if ('gender' in data)
      return (
        <>
          <td>{data.name}</td>
          <td>{data.phone}</td>
          <td>{data.gender}</td>
        </>
      );
    if ('position' in data)
      return (
        <>
          <td>{data.id}</td>
          <td>{data.name}</td>
          <td>{data.phone}</td>
          <td>{data.position}</td>
        </>
      );
    if ('institutionNumber' in data)
      return (
        <>
          <td>{data.id}</td>
          <td>{data.name}</td>
          <td>{data.institutionNumber}</td>
        </>
      );
    return (
      <>
        <td>{data.id}</td>
        <td>{data.name}</td>
        <td>{data.phone}</td>
      </>
    );
  };

  return (
    <div className="flex">
      <Sidebar
        sort="Super"
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
              {renderHeader()}
            </tr>
          </thead>
          <tbody>
            {tableData?.map((data, index) => (
              <tr className="hover:bg-main-base" key={data.id}>
                <th>{index + 1}</th>
                {renderBody(data)}
                <td>
                  <Button
                    text="삭제"
                    className="text-white bg-red-500 hover:bg-red-600"
                    onClick={() => onClickMemberDelete(data)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SuperPage;
