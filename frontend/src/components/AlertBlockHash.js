import React from "react";
import Swal from "sweetalert2";

const AlertBlockHash = ({ blockHash }) => {
  Swal.fire({ title: "BlockHash", text: blockHash, width: 800 });
};

export default AlertBlockHash;
