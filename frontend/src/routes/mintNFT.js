import React, { useState } from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import axios from "axios";
import FormData from "form-data";
import { pinataApiKey, pinataSecretApiKey } from "../pinata_api_key";
import GetFormData from "../components/GetFormData";

const MintNFT = ({ account }) => {
  const [imageSrc, setImageSrc] = useState("");
  const [imageHash, setImageHash] = useState("");

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

  const pinFileToIPFS = (pinataApiKey, pinataSecretApiKey, image) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

    let data = new FormData();
    data.append("file", image);

    return axios
      .post(url, data, {
        maxBodyLength: "Infinity", //this is needed to prevent axios from erroring out with large files
        headers: {
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretApiKey,
        },
      })
      .then(function (response) {
        setImageHash(response.data.IpfsHash);
      })
      .catch(function (error) {
        console.error(error);
      });
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
                pinFileToIPFS(pinataApiKey, pinataSecretApiKey, e.target.files[0]);
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
