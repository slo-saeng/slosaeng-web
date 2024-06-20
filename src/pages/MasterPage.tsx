import { useState } from 'react';
import type { doctorProfile } from '../types/member';
import Sidebar from '../component/common/Sidebar/Sidebar';
import Button from '../component/common/Button/Button';
import doctorList from '../mocks/doctorList.json';

interface RoleData {
  id: number;
  state: string;
  list: doctorProfile[];
}

const items = [
  { id: 'approve', text: '승인 관리' },
  { id: 'doctor', text: '닥터 관리' },
];

const MasterPage = () => {
  const [detail, setDetail] = useState<string>('approve');

  const handleManageTable = (role: string) => {
    setDetail(role);
  };

  const tableData: RoleData | undefined = doctorList.find(
    (data) => data.state === detail,
  );

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
            {tableData?.list.map((data, index) => (
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
                    />
                    <Button
                      text="삭제"
                      className="text-white bg-red-500 hover:bg-red-600"
                    />
                  </td>
                ) : (
                  <td>
                    <Button
                      text="삭제"
                      className="text-white bg-red-500 hover:bg-red-600"
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

MasterPage.propTypes = {};

export default MasterPage;
