import Title from "../common/Title";

const Header = ({ address, handleConnect }) => {
  return (
    <header className="flex items-center justify-between">
      <Title />
      <button
        onClick={handleConnect}
        className="rounded-full bg-rose-400 text-white px-4 py-2 text-xs font-bold 
    lg-px-5 lg:py-3 lg:text-base"
      >
        {address ? "Sign Out" : "Sign In"}
      </button>
    </header>
  );
};

export default Header;
