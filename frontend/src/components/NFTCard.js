import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Image } from "@chakra-ui/react";

const NFTCard = ({ tokenUri }) => {
  const [imageURI, setImageURI] = useState("");

  const getJsonData = async () => {
    const response = await axios.get(tokenUri);

    if (!response.data) return;

    setImageURI(response.data.image);
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
