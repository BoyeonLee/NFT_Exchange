import React from "react";
import {
  useDisclosure,
  Alert,
  AlertIcon,
  Box,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";

const AlertBlockHash = ({ blockHash }) => {
  const { isOpen: isVisible, onClose } = useDisclosure({ defaultIsOpen: true });

  return (
    isVisible && (
      <Alert status="success" position="relative" mt={5}>
        <AlertIcon />
        <Box>
          <AlertTitle>BlockHash</AlertTitle>
          <AlertDescription>{blockHash}</AlertDescription>
        </Box>
        <CloseButton
          alignSelf="flex-start"
          position="relative"
          right={-1}
          top={-1}
          onClick={onClose}
        />
      </Alert>
    )
  );
};

export default AlertBlockHash;
