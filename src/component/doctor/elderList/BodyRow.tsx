import React from 'react';
import { elderProfile, majorElderProfile } from '../../../types/member';

interface BodyRowProps {
  data: elderProfile | majorElderProfile;
  detail: string;
  index: number;
  handleAddPopup: (
    open: boolean,
    elder: elderProfile | majorElderProfile | null,
  ) => void;
  handleDeletePopup: (
    open: boolean,
    elder: elderProfile | majorElderProfile | null,
  ) => void;
  extractBirthdate: (idNumber: string) => string;
}

const BodyRow: React.FC<BodyRowProps> = ({
  data,
  detail,
  index,
  handleAddPopup,
  handleDeletePopup,
  extractBirthdate,
}) => {
  const birthdate = extractBirthdate(data.idNumber);
  let gradeColor = '';
  if ('grade' in data) {
    switch (data.grade) {
      case '관심':
        gradeColor = 'bg-green-200';
        break;
      case '주의':
        gradeColor = 'bg-yellow-200';
        break;
      case '심각':
        gradeColor = 'bg-red-200';
        break;
      default:
        gradeColor = '';
        break;
    }
  }

  return (
    <tr className="hover:bg-main-base">
      <th>{index + 1}</th>
      <td>
        {data.name} / {data.gender}
      </td>
      <td>{birthdate}</td>
      <td>
        {data.nationId} {data.cityId} {data.districtId} {data.detailAddress}
      </td>
      <td>{data.phone}</td>
      <td>{data.bloodType}</td>
      <td>{data.etc}</td>
      {'grade' in data && <td className={gradeColor}>{data.grade}</td>}
      {detail === 'elder' && (
        <td>
          <button
            type="button"
            className="btn"
            onClick={() => handleAddPopup(true, data)}
          >
            추가
          </button>
        </td>
      )}
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
  );
};

export default BodyRow;
