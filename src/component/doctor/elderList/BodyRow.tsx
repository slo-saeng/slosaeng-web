import React from 'react';
import { elderProfile, intensiceCareProfile } from '../../../types/member';

interface BodyRowProps {
  data: elderProfile | intensiceCareProfile;
  index: number;
  handleAddPopup: (
    open: boolean,
    elder: elderProfile | intensiceCareProfile | null,
  ) => void;
  handleDeletePopup: (
    open: boolean,
    elder: elderProfile | intensiceCareProfile | null,
  ) => void;
  extractBirthdate: (idNumber: string) => string;
}

const BodyRow: React.FC<BodyRowProps> = ({
  data,
  index,
  handleAddPopup,
  handleDeletePopup,
  extractBirthdate,
}) => {
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

  const renderBody = () => {
    if ('elder' in data) {
      const elderData = data as intensiceCareProfile;
      return (
        <>
          <td>
            {elderData.elder.name} / {elderData.elder.gender}
          </td>
          <td>{extractBirthdate(elderData.elder.idNumber)}</td>
          <td>
            {elderData.elder.nation.name} {elderData.elder.city.name}{' '}
            {elderData.elder.district.name} {elderData.elder.detailAddress}
          </td>
          <td>{elderData.elder.phone}</td>
          <td>{elderData.elder.bloodType}</td>
          <td>{elderData.elder.etc}</td>
          {elderData.grade && <td className={gradeColor}>{elderData.grade}</td>}
          <td>
            <button
              type="button"
              className="btn"
              onClick={() => handleDeletePopup(true, elderData)}
            >
              삭제
            </button>
          </td>
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
        <td>
          <button
            type="button"
            className="btn"
            onClick={() => handleAddPopup(true, basicData)}
          >
            추가
          </button>
        </td>
      </>
    );
  };

  return (
    <tr className="hover:bg-main-base">
      <th>{index + 1}</th>
      {renderBody()}
    </tr>
  );
};

export default BodyRow;
