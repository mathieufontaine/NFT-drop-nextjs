import React from "react";

const Header = ({ address, handleConnect }) => {
  return (
    <header className="flex items-center justify-between">
      <h1 className="cursor-pointer text-xl font-extralight sm:w-80">
        The{" "}
        <span className="font-extrabold underline decoration-pink-500/50">
          Kodao.io
        </span>{" "}
        NFT Market Place
      </h1>
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
