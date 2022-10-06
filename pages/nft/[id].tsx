import React from "react";
import { useAddress, useMetamask, useDisconnect } from "@thirdweb-dev/react";
import Header from "../../components/user/Header";
import Card from "../../components/collection/Card";
import Content from "../../components/collection/Content";
import MintButton from "../../components/collection/MintButton";
import Address from "../../components/user/Address";
import { GetServerSideProps } from "next";
import { sanityClient } from "../../sanity";
import { Collection } from "../../typings";

interface Props {
  collection: Collection;
}

const NFTDropPage = ({ collection }: Props) => {
  //* Auth
  const address = useAddress();
  const connect = useMetamask();
  const disconnect = useDisconnect();

  const handleConnect = () => {
    address ? disconnect() : connect();
  };

  console.log(collection.nftCollectionName);
  return (
    <div className="flex h-screen flex-col lg:grid lg:grid-cols-12">
      <Card
        image={collection.previewImage}
        name={collection.nftCollectionName}
        description={collection.description}
      />
      <div className="flex flex-1 flex-col p-12 lg:col-span-8">
        <Header address={address} handleConnect={handleConnect} />
        <hr className="my-2 border" />
        {address && <Address address={address} />}
        <Content image={collection.mainImage} title={collection.title} />
        <MintButton />
      </div>
    </div>
  );
};

export default NFTDropPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const query = `*[_type == "collection" && slug.current == $id][0]{
    _id,
    title,
    address,
    description,
    nftCollectionName,
    mainImage{asset},
    previewImage{asset},
  slug{current},
  creator -> {
    _id,
    name,
    address,
    slug{current}
  }
  }`;

  const collection = await sanityClient.fetch(query, {
    id: params?.id,
  });

  if (!collection) {
    return {
      notFound: true,
    };
  }
  return {
    props: { collection },
  };
};
