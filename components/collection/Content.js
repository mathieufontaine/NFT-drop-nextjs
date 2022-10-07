import { urlFor } from "/sanity";

const Content = ({ image, title, supply, claimedSupply, isLoading }) => {
  return (
    <div
      className="flex flex-auto flex-col p-10 items-center text-center space-y-2 
  lg:space-y-0 justify-center"
    >
      <img
        src={urlFor(image?.asset).url()}
        alt=""
        className="w-80 object-cover pb-10"
      />
      <h1 className="text-3xl font-bold lg:text-4xl lg:font-extrabold">
        {title}
      </h1>
      {isLoading ? (
        <p className="animate-pulse pt-2 text-xl text-green-600">
          Loading Supply...
        </p>
      ) : (
        <p className="pt-2 text-xl text-green-600">
          {claimedSupply}/{supply} NFT's claimed
        </p>
      )}
    </div>
  );
};

export default Content;
