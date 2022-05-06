import React, { useState } from "react";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import axios from "axios";
import { pinataApiKey, pinataSecretApiKey } from "../pinata_api_key";
import { registerTokenContract } from "./../contracts/contracts_info";
import AlertBlockHash from "./AlertBlockHash";

const GetFormData = ({ account, imageHash }) => {
  const [blockHash, setBlockHash] = useState("");

  const mintNFT = async (account, metadataHash) => {
    if (!account) return;

    const ipfsURI = `https://gateway.pinata.cloud/ipfs/${metadataHash}`;

    const response = await registerTokenContract.methods
      .registerNft(ipfsURI)
      .send({ from: account });

    if (response.status) {
      setBlockHash(response.blockHash);
    }
  };

  const pinJSONToIPFS = (pinataApiKey, pinataSecretApiKey, JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    return axios
      .post(url, JSONBody, {
        headers: {
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretApiKey,
        },
      })
      .then(function (response) {
        const metadataHash = response.data.IpfsHash;
        mintNFT(account, metadataHash);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const description = e.target.description.value;
    const imageHashUrl = `https://gateway.pinata.cloud/ipfs/${imageHash}`;

    const metadata = JSON.stringify({
      name: name,
      description: description,
      image: imageHashUrl,
    });

    pinJSONToIPFS(pinataApiKey, pinataSecretApiKey, metadata);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl isRequired>
        <FormLabel>NFT 이름</FormLabel>
        <Input type="text" placeholder="NFT 이름을 입력하세요." name="name" />
      </FormControl>
      <FormControl mt={6} mb={6} isRequired>
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
