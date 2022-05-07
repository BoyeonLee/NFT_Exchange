import { useState, useEffect } from "react";
import { Grid, Box, Heading } from "@chakra-ui/react";
import { registerTokenContract, saleTokenContract } from "./../contracts/contracts_info";
import SaleNFTCard from "../components/SaleNFTCard";

const SaleNFT = ({ account }) => {
  const [saleCardArray, setSaleCardArray] = useState([]);

  const getOnSaleTokens = async () => {
    try {
      const onSaleTokenArrayLength = await saleTokenContract.methods
        .getOnSaleTokenArrayLength()
        .call();

      const tempOnSaleArray = [];

      for (let i = 0; i < parseInt(onSaleTokenArrayLength, 10); i++) {
        const tokenId = await saleTokenContract.methods.onSaleTokenArray(i).call();
        const tokenUri = await registerTokenContract.methods.tokenURI(tokenId).call();
        const tokenPrice = await saleTokenContract.methods.getTokenPrice(tokenId).call();

        tempOnSaleArray.push({ tokenId, tokenUri, tokenPrice });
      }

      setSaleCardArray(tempOnSaleArray);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOnSaleTokens();
  }, []);

  return (
    <>
      <Box textAlign="center" mb={10}>
        <Heading>Sale NFT</Heading>
      </Box>
      <Grid w="40vw" mt={4} templateColumns="repeat(4, 1fr)" gap={8}>
        {saleCardArray &&
          saleCardArray.map((v, i) => {
            return (
              <SaleNFTCard
                key={i}
                tokenId={v.tokenId}
                tokenUri={v.tokenUri}
                tokenPrice={v.tokenPrice}
                account={account}
                getOnSaleTokens={getOnSaleTokens}
              />
            );
          })}
      </Grid>
    </>
  );
};

export default SaleNFT;
