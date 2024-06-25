import Button from '../../common/Button/Button';

interface DetailModalProps {
  closeModal: () => void;
  addr: string;
  telno: string;
  name: string;
  type: string;
}

const detailModal = ({
  closeModal,
  addr,
  telno,
  name,
  type,
}: DetailModalProps) => {
  return (
    <div className="fixed z-20 flex items-center justify-center w-full h-full align-middle bg-black bg-opacity-60">
      <div className="w-3/5 p-8 text-center bg-white rounded-md">
        <div className="flex flex-col space-y-8">
          <p>이름: {name}</p>
          <p>주소: {addr}</p>
          <p>분류: {type}</p>
          <p>전화번호: {telno}</p>
          <Button text="닫기" onClick={closeModal} />
        </div>
      </div>
    </div>
  );
};

detailModal.propTypes = {};

export default detailModal;
