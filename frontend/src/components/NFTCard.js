import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Image, Text } from "@chakra-ui/react";

const NFTCard = ({ tokenUri }) => {
  const [imageURI, setImageURI] = useState("");

  const getJsonData = async () => {
    const response = await axios.get(tokenUri);
    const responseData = JSON.parse(Object.keys(response.data));
    if (!responseData) return;

    setImageURI(responseData.image);
  };

  useEffect(() => {
    getJsonData();
  }, []);

  return (
    <Box>
      <Image w="20vw" h="28vh" src={imageURI} alt="NFTImage" />
    </Box>
  );
};

export default NFTCard;
