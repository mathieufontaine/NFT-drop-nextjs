import React, { useEffect, useState } from "react";
import {
  useAddress,
  useMetamask,
  useDisconnect,
  useContract,
} from "@thirdweb-dev/react";
import Header from "../../components/user/Header";
import Card from "../../components/collection/Card";
import Content from "../../components/collection/Content";
import MintButton from "../../components/collection/MintButton";
import Address from "../../components/user/Address";
import { GetServerSideProps } from "next";
import { sanityClient } from "../../sanity";
import { Collection } from "../../typings";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  collection: Collection;
}

const NFTDropPage = ({ collection }: Props) => {
  const nftDrop = useContract(collection.address, "nft-drop").contract;

  //* State
  const [supply, setSupply] = useState<number>(0);
  const [claimedSupply, setClaimedSupply] = useState<number>(0);
  const [isSoldOut, setIsSoldOut] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [priceInEth, setPriceInEth] = useState<string>();

  //* Auth
  const address = useAddress();
  const connect = useMetamask();
  const disconnect = useDisconnect();

  useEffect(() => {
    if (!nftDrop) return;
    const fetchPrice = async () => {
      const claimedSupply = await nftDrop.claimConditions.getAll();
      const price = claimedSupply?.[0].currencyMetadata.displayValue;
      setPriceInEth(price);
    };
    fetchPrice();
  }, [nftDrop]);

  useEffect(() => {
    if (!nftDrop) return;
    const fetchNFTDropData = async () => {
      setIsLoading(true);
      const claimed = await nftDrop.getAllClaimed();
      const totalHex = await nftDrop.totalSupply();
      const total = parseInt(totalHex._hex, 16);
      claimed.length === total ? setIsSoldOut(true) : setIsSoldOut(false);
      setClaimedSupply(claimed.length);
      setSupply(total);
      setIsLoading(false);
    };
    fetchNFTDropData();
  }, [nftDrop]);

  const mintNft = () => {
    if (!nftDrop || !address) return;
    setIsLoading(true);
    const notification = toast.loading("Minting You NFT...", {
      style: getNotifStyle("loading"),
    });
    const quantity = 1;
    nftDrop
      .claimTo(address, quantity)
      .then(async (tx) => {
        const receipt = tx[0].receipt;
        const claimedTokenId = tx[0].id;
        const claimedNFT = await tx[0].data;
        console.log(tx[0]);
        toast("Congrats! You minted 1 Kodao Ape", {
          style: getNotifStyle("success"),
        });
      })
      .catch((err) => {
        console.log(err);
        toast("Oups! Something went wrong", {
          style: getNotifStyle("failure"),
        });
      })
      .finally(() => {
        setIsLoading(false);
        toast.dismiss(notification);
      });
  };
  const handleConnect = () => {
    address ? disconnect() : connect();
  };

  console.log(collection.nftCollectionName);
  return (
    <>
      <Toaster position="top-right" />
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
          <Content
            image={collection.mainImage}
            title={collection.title}
            supply={supply}
            claimedSupply={claimedSupply}
            isLoading={isLoading}
          />
          <MintButton
            isLoading={isLoading}
            isSoldOut={isSoldOut}
            priceInEth={priceInEth}
            mintNft={mintNft}
            address={address}
          />
        </div>
      </div>
    </>
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

const getNotifStyle = (state: string) => {
  const color =
    state === "success" ? "green" : state === "loading" ? "blue" : "red";
  return {
    background: color,
    color: "white",
    fontWeight: "bolder",
    fontSize: "17px",
    padding: " 20px",
  };
};
