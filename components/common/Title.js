import Link from "next/link";
import React from "react";

const Title = ({ large = false }) => {
  return (
    <Link href={"/"}>
      <h1
        className={`cursor-pointer ${
          large ? "text-3xl" : "text-xl"
        } font-extralight`}
      >
        The{" "}
        <span className="font-extrabold underline decoration-pink-500/50">
          Kodao.io
        </span>{" "}
        NFT Market Place
      </h1>
    </Link>
  );
};

export default Title;
