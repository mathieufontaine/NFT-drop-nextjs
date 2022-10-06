import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/user/Header";
import Title from "../components/common/Title";
import { sanityClient } from "../sanity";
import { Collection } from "../typings";
import CollectionList from "../components/home/CollectionList";
interface Props {
  collections: Collection[];
}

const Home = ({ collections }: Props) => {
  return (
    <div className="flex min-h-screen max-w-7xl flex-col items-center justify-center py-20 px-10 2xl:px-0">
      <Head>
        <title>NFT Drop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Title large={true} />
      <main>
        <CollectionList collections={collections} />
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `*[_type == "collection"]{
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
  const collections = await sanityClient.fetch(query);
  console.log(collections);

  // const collections = await data.json();

  return {
    props: { collections },
  };
};
