import Collection from "./Collection";

const CollectionList = ({ collections }) => {
  return (
    <div className="grid space-x-3 md:grid-cols-2bg-slate-100 p-10 shadow-xl shadow-rose-300 mt-10">
      {collections.map((collection) => (
        <Collection key={collection._id} collection={collection} />
      ))}
    </div>
  );
};

export default CollectionList;
