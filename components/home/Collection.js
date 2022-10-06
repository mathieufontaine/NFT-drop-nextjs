import Link from "next/link";
import { urlFor } from "/sanity";

const Collection = ({ collection }) => {
  return (
    <Link href={`/nft/${collection.slug.current}`}>
      <div className="flex cursor-pointer flex-col items-center transition-all duration-200 hover:scale-105">
        <img
          className="h-96 w-60 rounded-xl object-cover my-4"
          src={urlFor(collection?.mainImage.asset).url()}
          alt="kodao ape"
        />
        <div>
          <h2 className="text-3xl">{collection?.title}</h2>
          <p className="mt-2 text-sm">{collection?.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default Collection;
