import { urlFor } from "/sanity";

const Content = ({ image, title }) => {
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
      <p className="pt-2 text-xl text-green-600">12/25 NFT's claimed</p>
    </div>
  );
};

export default Content;
