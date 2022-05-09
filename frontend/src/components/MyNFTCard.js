import { useState } from "react";
import { Box, InputGroup, Input, InputRightAddon, Button, Text } from "@chakra-ui/react";
import NFTCard from "./NFTCard";
import { saleTokenContract, web3 } from "../contracts/contracts_info";

const MyNFTCard = ({ tokenId, tokenUri, tokenPrice, saleStatus, account }) => {
  const [sellPrice, setSellPrice] = useState("");
  const [myPrice, setMyPrice] = useState(tokenPrice);
  const [isEditable, setIsEditable] = useState(false);
  const [editPrice, setEditPrice] = useState(web3.utils.fromWei(tokenPrice));

  const onChangeSellPrice = (e) => {
    setSellPrice(e.target.value);
  };

  const onClickSell = async () => {
    try {
      if (!account || !saleStatus) return;

      const response = await saleTokenContract.methods
        .setForSaleToken(tokenId, web3.utils.toWei(sellPrice, "ether"))
        .send({ from: account });

      if (response.status) {
        setMyPrice(web3.utils.toWei(sellPrice, "ether"));
        setEditPrice(sellPrice);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onClickEditPrice = async () => {
    try {
      if (!account || !saleStatus) return;

      const response = await saleTokenContract.methods
        .editForSaleToken(tokenId, web3.utils.toWei(editPrice, "ether"))
        .send({ from: account });

      if (response.status) {
        setMyPrice(web3.utils.toWei(editPrice, "ether"));
        setIsEditable(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box textAlign="center">
      <NFTCard tokenUri={tokenUri} />
      <Box mt={2}>
        {myPrice === "0" && isEditable === false ? (
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
          <Box>
            {isEditable ? (
              <>
                <InputGroup>
                  <Input
                    type="number"
                    value={editPrice}
                    onChange={(e) => {
                      setEditPrice(e.target.value);
                    }}
                  ></Input>
                  <InputRightAddon children="ETH" />
                </InputGroup>
                <Button size="sm" colorScheme="blue" mt={2} onClick={onClickEditPrice}>
                  Finish
                </Button>
              </>
            ) : (
              <>
                <Text fontSize="xl" fontWeight="bold">
                  {web3.utils.fromWei(myPrice)} ETH
                </Text>
                <Button
                  size="sm"
                  colorScheme="pink"
                  mt={2}
                  onClick={() => {
                    setIsEditable(true);
                  }}
                >
                  Edit
                </Button>
              </>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MyNFTCard;
