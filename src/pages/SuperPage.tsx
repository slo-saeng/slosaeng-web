import { useState } from 'react';
import Sidebar from '../component/common/Sidebar/Sidebar';
import memberList from '../mocks/memberList.json';
import type {
  doctorProfile,
  elderProfile,
  helperProfile,
  masterProfile,
} from '../types/member';
import Button from '../component/common/Button/Button';

interface RoleData {
  id: number;
  role: string;
  list: helperProfile[] | doctorProfile[] | masterProfile[] | elderProfile[];
}

const items = [
  { id: 'elder', text: '고령자 관리' },
  { id: 'helper', text: '보호자 관리' },
  { id: 'doctor', text: '닥터 관리' },
  { id: 'master', text: '마스터 관리' },
];

const SuperPage = () => {
  const [detail, setDetail] = useState<string>('elder');

  const handleManageTable = (role: string) => {
    setDetail(role);
  };

  const tableData: RoleData | undefined = memberList.find(
    (data) => data.role === detail,
  );

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
            {tableData?.list.map((data, index) => (
              <tr className="hover:bg-main-base" key={data.id}>
                <th>{index + 1}</th>
                {renderBody(data)}
                <td>
                  <Button
                    text="삭제"
                    className="text-white bg-red-500 hover:bg-red-600"
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
