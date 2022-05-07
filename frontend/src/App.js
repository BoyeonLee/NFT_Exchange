import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import MintNFT from "./routes/mintNFT";
import MyNFT from "./routes/myNFT";

function App() {
  const [account, setAccount] = useState("");

  async function getAccount() {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } else {
        alert("Install Metamask!");
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAccount();
  }, [account]);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<MintNFT account={account} />} />
          <Route path="/my-nft" element={<MyNFT account={account} />} />
          {/*
          <Route path="/sale-nft" element={<SaleNFT account={account} />} /> 
          */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
