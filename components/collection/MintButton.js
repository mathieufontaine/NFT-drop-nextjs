const MintButton = ({ isLoading, isSoldOut, priceInEth, mintNft, address }) => {
  return (
    <button
      onClick={mintNft}
      disabled={isSoldOut || isLoading || !address}
      className="h-16 disabled:bg-gray-300 bg-cyan-800 text-white rounded-full w-full"
    >
      {isSoldOut && "Sold Out"}
      {!isSoldOut && !address && "Connect your wallet to mint an NFT"}
      {!isSoldOut && address && `Mint NFT (${priceInEth} MATIC)`}
    </button>
  );
};

export default MintButton;
