import { Link } from 'react-router-dom';
import { FaBan } from 'react-icons/fa';

const ForbiddenPage = () => {
  return (
    <div className="z-40 flex flex-col items-center justify-center w-screen h-screen space-y-4 text-center">
      <FaBan size={96} />
      <h1 className="mb-4 text-3xl font-bold">
        접근하실 수 없는 페이지입니다.
      </h1>
      <Link
        className="text-xl font-bold hover:underline text-main-point"
        to="/"
      >
        메인으로 가기
      </Link>
    </div>
  );
};

export default ForbiddenPage;
