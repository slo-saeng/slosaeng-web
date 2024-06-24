import React from 'react';
import { elderProfile, majorElderProfile } from '../../../types/member';

interface DeletePopupProps {
  handleClose: () => void;
  handleDeleteElder: () => void;
  selectedElder: elderProfile | majorElderProfile;
  reason: string;
  setReason: React.Dispatch<React.SetStateAction<string>>;
  renderHeader: () => JSX.Element | null;
  renderBody: (data: elderProfile | majorElderProfile) => JSX.Element;
}

const DeletePopup: React.FC<DeletePopupProps> = ({
  handleClose,
  handleDeleteElder,
  selectedElder,
  reason,
  setReason,
  renderHeader,
  renderBody,
}) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="w-1/2 p-8 space-y-6 bg-white rounded shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">주요대상 삭제</h2>
        <button
          type="button"
          className="text-xl font-bold"
          onClick={handleClose}
        >
          &times;
        </button>
      </div>
      <table className="table text-center">
        <thead>
          <tr>{renderHeader()}</tr>
        </thead>
        <tbody>
          <tr className="hover:bg-main-base">
            <td>{selectedElder.id}</td>
            {renderBody(selectedElder)}
          </tr>
        </tbody>
      </table>
      <textarea
        placeholder="삭제 사유를 입력해주세요."
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
      <button type="button" className="w-full btn" onClick={handleDeleteElder}>
        삭제
      </button>
    </div>
  </div>
);

export default DeletePopup;
