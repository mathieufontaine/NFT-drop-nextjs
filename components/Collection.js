import React from "react";

const Collection = () => {
  return (
    <div
      className="flex flex-auto flex-col p-10 items-center text-center space-y-2 
  lg:space-y-0 justify-center"
    >
      <img
        src="https://s2.qwant.com/thumbr/0x380/d/7/d96ec1f73bc4ee67e427977193f54a462c47a8dfe277673dd800932f7a6cea/BAYC.jpeg?u=https%3A%2F%2Fcontent.cryptonews.com.au%2Fwp-content%2Fuploads%2F2021%2F08%2FBAYC.jpeg&q=0&b=1&p=0&a=0"
        alt=""
        className="w-80 object-cover pb-10"
      />
      <h1 className="text-3xl font-bold lg:text-4xl lg:font-extrabold">
        Kodao.io Web3 codig club
      </h1>
      <p className="pt-2 text-xl text-green-600">12/25 NFT's claimed</p>
    </div>
  );
};

export default Collection;
