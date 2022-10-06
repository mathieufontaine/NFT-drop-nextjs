import { urlFor } from "/sanity";

const Card = ({ image, name, description }) => {
  return (
    <div className="bg-gradient-to-br from-cyan-800 to-rose-500 lg:col-span-4">
      <div className="flex flex-col items-center justify-center py-2 lg:min-h-screen">
        <div className="bg-gradient-to-br from-yellow-300 to-purple-400 p-4 rounded-lg">
          <img
            className="w-44 rounded-lg object-cover lg:h-96 lg:w-72"
            src={urlFor(image.asset).url()}
            alt="ape nft"
          />
        </div>
        <div className="p-2 text-center my-2">
          <h1 className="text-4xl font-bold text-white">{name}</h1>
          <h2 className="text-xl text-gray-100">{description}</h2>
        </div>
      </div>
    </div>
  );
};

export default Card;
