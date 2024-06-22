import { useMember } from '../../../hooks/useMember';

const Navbar = () => {
  const { data } = useMember();

  return (
    <nav className="fixed top-0 left-0 z-10 flex justify-between w-full px-12 py-3 text-center bg-white border-b text-main-point">
      <p className="text-lg font-bold">슬로생 Slo-saeng</p>
      {data && (
        <p className="text-black">
          안녕하세요{' '}
          <span className="font-extrabold text-main-point-dark">
            {data?.data.name}
          </span>
          님!
        </p>
      )}
    </nav>
  );
};
export default Navbar;
