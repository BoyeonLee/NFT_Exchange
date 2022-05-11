import React, { useState } from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import GetFormData from "../components/GetFormData";
import { create } from "ipfs-http-client";

const MintNFT = ({ account }) => {
  const [imageSrc, setImageSrc] = useState("");
  const [imageHash, setImageHash] = useState("");

  const client = create("https://ipfs.infura.io:5001/api/v0");

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  const imageToIPFS = async (image) => {
    try {
      const imageHash = await client.add(image);
      setImageHash(imageHash.path);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex
      w="35vw"
      h={imageSrc ? "80vh" : "60vh"}
      direction="column"
      justifyContent="center"
      alignItems="center"
      borderColor="purple.100"
      borderWidth={10}
    >
      <Box position="relative" bottom={imageSrc ? 50 : 0}>
        <Box textAlign="center" mb={10}>
          <Heading>당신의 NFT를 등록하세요.</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <Box mb={30}>
            <input
              type="file"
              accept="image/jpg,image/png,image/jpeg,image/gif"
              name="image"
              onChange={(e) => {
                encodeFileToBase64(e.target.files[0]);
                imageToIPFS(e.target.files[0]);
              }}
            ></input>
            {imageSrc && (
              <Box w="10vw" h="15vh" mt={5}>
                <img src={imageSrc} alt="preview-img" />
              </Box>
            )}
          </Box>
          <Box position="relative" top={imageSrc ? 150 : 0}>
            <GetFormData imageHash={imageHash} account={account} />
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default MintNFT;
