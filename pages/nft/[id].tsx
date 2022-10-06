import React from "react";
import { useAddress, useMetamask, useDisconnect } from "@thirdweb-dev/react";
import Card from "../../components/Card";
import Header from "../../components/Header";
import Collection from "../../components/Collection";
import MintButton from "../../components/MintButton";
import Address from "../../components/Address";

const NFTDropPage = () => {
  //* Auth
  const address = useAddress();
  const connect = useMetamask();
  const disconnect = useDisconnect();

  const handleConnect = () => {
    address ? disconnect() : connect();
  };

  return (
    <div className="flex h-screen flex-col lg:grid lg:grid-cols-12">
      <Card />
      <div className="flex flex-1 flex-col p-12 lg:col-span-8">
        <Header address={address} handleConnect={handleConnect} />
        <hr className="my-2 border" />
        {address && <Address address={address} />}
        <Collection />
        <MintButton />
      </div>
    </div>
  );
};

export default NFTDropPage;
