import React from "react";

const Addres = ({ address }) => {
  return (
    <p className="font-extralight text-center text-gray-400">
      You are logged in with address : {address.substring(0, 5)}...
      {address.substring(address.length - 5)}
    </p>
  );
};

export default Addres;
