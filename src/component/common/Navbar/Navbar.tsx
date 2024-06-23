import { useEffect, useState } from 'react';
import { CiLogout } from 'react-icons/ci';

const Navbar = () => {
  const [logout, setLogout] = useState<boolean>(
    Boolean(localStorage.getItem('refreshToken')),
  );

  const onClickLogout = () => {
    localStorage.clear();
    alert('로그아웃 되었습니다.');
    setLogout(false);
  };

  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    setLogout(Boolean(refreshToken));
  }, [setLogout]);

  return (
    <nav className="fixed top-0 left-0 z-10 flex justify-between w-full px-12 py-3 bg-white border-b text-main-point">
      <p className="text-lg font-bold">슬로생 Slo-saeng</p>
      {logout && (
        <CiLogout
          size="32"
          onClick={() => onClickLogout()}
          className="p-1 rounded-md hover:cursor-pointer hover:bg-gray-200"
        />
      )}
    </nav>
  );
};
export default Navbar;
