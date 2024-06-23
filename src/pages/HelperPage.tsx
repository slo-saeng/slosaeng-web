import { useState } from 'react';
import Button from '../component/common/Button/Button';
import Sidebar from '../component/common/Sidebar/Sidebar';
import { useMember } from '../hooks/useMember';
import { elderProfile } from '../types/member';
import { useCancelElderMutation } from '../hooks/useCancelElderMutation';

const items = [{ id: 'elder', text: '고령자 관리' }];

const HelperPage = () => {
  const [detail, setDetail] = useState<string>('elder');
  const { data: loginData } = useMember();
  const { cancelElderMutate } = useCancelElderMutation();

  const handleManageTable = (role: string) => {
    setDetail(role);
  };
  const onClickDelete = (doctorId: number = 0) => {
    cancelElderMutate(doctorId);
  };

  return (
    <div className="flex">
      <Sidebar
        sort="Helper"
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
              <th>이름</th>
              <th>주민등록번호</th>
              <th>핸드폰</th>
              <th>성별</th>
              <th>상태 관리</th>
            </tr>
          </thead>
          <tbody>
            {loginData?.data.elders.map(
              ({ id, name, idNumber, phone, gender }: elderProfile) => (
                <tr className="hover:bg-main-base" key={id}>
                  <th>{id}</th>
                  <td>{name}</td>
                  <td>{idNumber}</td>
                  <td>{phone}</td>
                  <td>{gender}</td>
                  <td>
                    <Button
                      text="삭제"
                      className="text-white bg-red-500 hover:bg-red-600"
                      onClick={() => onClickDelete(id)}
                    />
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HelperPage;
