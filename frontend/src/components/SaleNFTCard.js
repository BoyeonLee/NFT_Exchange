import { useState, useEffect } from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import NFTCard from "./NFTCard";
import { registerTokenContract, saleTokenContract, web3 } from "./../contracts/contracts_info";

const SaleNFTCard = ({ tokenId, tokenUri, tokenPrice, account, getOnSaleTokens }) => {
  const [isBuyable, setIsBuyable] = useState(false);

  const getTokenOwner = async () => {
    try {
      const response = await registerTokenContract.methods.ownerOf(tokenId).call();

      setIsBuyable(response.toLocaleLowerCase() === account.toLocaleLowerCase());
    } catch (error) {
      console.error(error);
    }
  };

  const onClickBuy = async () => {
    try {
      if (!account) return;

      const response = await saleTokenContract.methods
        .purchaseToken(tokenId)
        .send({ from: account, value: tokenPrice });

      if (response.status) {
        getOnSaleTokens();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTokenOwner();
  }, []);

  return (
    <Box textAlign="center">
      <NFTCard tokenUri={tokenUri} />
      <Box>
        <Text d="inline-block">{web3.utils.fromWei(tokenPrice)} ETH</Text>
        <Button size="sm" colorScheme="pink" m={2} disabled={isBuyable} onClick={onClickBuy}>
          Buy
        </Button>
      </Box>
    </Box>
  );
};

export default SaleNFTCard;
