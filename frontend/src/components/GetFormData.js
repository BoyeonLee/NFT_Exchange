import React, { useState } from "react";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { registerTokenContract } from "./../contracts/contracts_info";
import AlertBlockHash from "./AlertBlockHash";
import { create } from "ipfs-http-client";

const GetFormData = ({ account, imageHash }) => {
  const [blockHash, setBlockHash] = useState("");

  const client = create("https://ipfs.infura.io:5001/api/v0");

  const mintNFT = async (account, metadataHash) => {
    if (!account) return;

    const ipfsURI = `https://ipfs.infura.io/ipfs/${metadataHash}`;

    const response = await registerTokenContract.methods
      .registerNft(ipfsURI)
      .send({ from: account });

    if (response.status) {
      setBlockHash(response.blockHash);
    }
  };

  const metadataToIPFS = async (metadata) => {
    try {
      const metadataHash = await client.add(metadata);
      mintNFT(account, metadataHash.path);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const description = e.target.description.value;
    const imageHashUrl = `https://ipfs.infura.io/ipfs/${imageHash}`;

    const metadata = JSON.stringify({
      name: name,
      description: description,
      image: imageHashUrl,
    });

    metadataToIPFS(metadata);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl isRequired>
        <FormLabel>NFT 이름</FormLabel>
        <Input type="text" placeholder="NFT 이름을 입력하세요." name="name" />
      </FormControl>
      <FormControl mt={4} mb={3} isRequired>
        <FormLabel>NFT 설명</FormLabel>
        <Input
          type="text"
          placeholder="NFT 설명을 입력하세요. (100자 이내)"
          name="description"
          maxLength={100}
        />
      </FormControl>
      <Button type="submit" margin="auto" display="block" mt={10}>
        NFT 등록
      </Button>
      {blockHash && <AlertBlockHash blockHash={blockHash} />}
    </form>
  );
};

export default GetFormData;
