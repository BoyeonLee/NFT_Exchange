import React, { useState, useEffect } from "react";
import { Flex, Text, Button, Grid } from "@chakra-ui/react";
import { registerTokenContract, saleTokenAddress } from "./../contracts/contracts_info";
import MyNFTCard from "./../components/MyNFTCard";

const MyNFT = ({ account }) => {
  const [saleStatus, setSaleStatus] = useState(false);
  const [cardArray, setCardArray] = useState([]);

  const getToken = async () => {
    try {
      const balanceLength = await registerTokenContract.methods.balanceOf(account).call();

      if (balanceLength === "0") return;

      const tempTokenArray = [];

      const response = await registerTokenContract.methods.getToken(account).call();

      response.map((v) => {
        tempTokenArray.push({
          tokenId: v.tokenId,
          tokenUri: v.tokenUri,
          tokenPrice: v.tokenPrice,
        });
      });

      setCardArray(tempTokenArray);
    } catch (error) {
      console.error(error);
    }
  };

  const getIsApprovedForAll = async () => {
    try {
      const response = await registerTokenContract.methods
        .isApprovedForAll(account, saleTokenAddress)
        .call();

      if (response) {
        setSaleStatus(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onClickApproveToggle = async () => {
    try {
      if (!account) return;

      const response = await registerTokenContract.methods
        .setApprovalForAll(saleTokenAddress, !saleStatus)
        .send({ from: account });

      if (response.status) {
        setSaleStatus(!saleStatus);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!account) return;

    getIsApprovedForAll();
    getToken();
  }, [account]);

  return (
    <>
      <Flex alignItems>
        <Text display="inline-block" fontSize="lg" fontWeight="bold">
          Sale Status : {saleStatus ? "True" : "False"}
        </Text>
        <Button
          size="xs"
          ml={2}
          colorScheme={saleStatus ? "purple" : "gray"}
          onClick={onClickApproveToggle}
        >
          {saleStatus ? "Cancel" : "Approve"}
        </Button>
      </Flex>
      <Grid templateColumns="repeat(4, 1fr)" gap={8} mt={10} w="40vw">
        {cardArray &&
          cardArray.map((v, i) => {
            return (
              <MyNFTCard
                key={i}
                tokenId={v.tokenId}
                tokenUri={v.tokenUri}
                tokenPrice={v.tokenPrice}
                saleStatus={saleStatus}
                account={account}
              />
            );
          })}
      </Grid>
    </>
  );
};

export default MyNFT;
