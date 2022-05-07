import { useState } from "react";
import { Box, InputGroup, Input, InputRightAddon, Button, Text } from "@chakra-ui/react";
import NFTCard from "./NFTCard";
import { SaleTokenContract, web3 } from "../contracts/contracts_info";

const MyNFTCard = ({ tokenId, tokenUri, tokenPrice, saleStatus, account }) => {
  const [sellPrice, setSellPrice] = useState("");
  const [myPrice, setMyPrice] = useState(tokenPrice);

  const onChangeSellPrice = (e) => {
    setSellPrice(e.target.value);
  };

  const onClickSell = async () => {
    try {
      if (!account || !saleStatus) return;

      const response = await SaleTokenContract.methods
        .setForSaleToken(tokenId, web3.utils.toWei(sellPrice, "ether"))
        .send({ from: account });

      console.log(`setForSaleToken response: ${response}`);
      if (response.status) {
        setMyPrice(web3.utils.toWei(sellPrice, "ether"));
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Box textAlign="center">
      <NFTCard tokenUri={tokenUri} />
      <Box mt={2}>
        {myPrice === "0" ? (
          <>
            <InputGroup>
              <Input type="number" value={sellPrice} onChange={onChangeSellPrice}></Input>
              <InputRightAddon children="ETH" />
            </InputGroup>
            <Button size="sm" colorScheme="purple" mt={2} onClick={onClickSell}>
              Sell
            </Button>
          </>
        ) : (
          <Text d="inline-block" fontSize="xl" fontWeight="bold">
            {web3.utils.fromWei(myPrice)} ETH
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default MyNFTCard;
