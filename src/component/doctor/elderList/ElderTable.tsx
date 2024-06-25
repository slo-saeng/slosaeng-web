import React from 'react';
import { elderProfile, majorElderProfile } from '../../../types/member';
import Header from './Header';
import BodyRow from './BodyRow';

interface ElderTableProps {
  detail: string;
  elderList: (elderProfile | majorElderProfile)[];
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

const ElderTable: React.FC<ElderTableProps> = ({
  detail,
  elderList,
  handleAddPopup,
  handleDeletePopup,
  extractBirthdate,
}) => (
  <table className="table text-center">
    <thead>
      <tr>
        <th> </th>
        <Header detail={detail} />
      </tr>
    </thead>
    <tbody>
      {elderList.map((data, index) => (
        <BodyRow
          key={data.id}
          data={data}
          index={index}
          handleAddPopup={handleAddPopup}
          handleDeletePopup={handleDeletePopup}
          extractBirthdate={extractBirthdate}
        />
      ))}
    </tbody>
  </table>
);

export default ElderTable;
