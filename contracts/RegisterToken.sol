// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

import "./SaleToken.sol";

contract RegisterToken is ERC721URIStorage, ERC721Enumerable {
    uint256 public tokenCounter;
    constructor() ERC721("ImageNFT", "INFT") {
        tokenCounter = 0;
    }

    SaleToken public saleToken;

    struct TokenData {
        uint256 tokenId;
        string tokenUri;
        uint256 tokenPrice;
    }

    /// @dev : _tokenURI(metadata-json-hash)로 nft를 등록하는 함수
    function registerNft(string memory _tokenURI) public {
        uint256 newItemId = tokenCounter;
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, _tokenURI);
        tokenCounter = tokenCounter + 1;
    }

    /// @dev : _tokenOwner가 가진 모든 nft를 반환하는 함수
    function getToken(address _tokenOwner) view public returns (TokenData[] memory) {
        uint256 balanceLength = balanceOf(_tokenOwner);
        require(balanceLength != 0, "Owner did not have token");

        TokenData[] memory tokenData = new TokenData[](balanceLength);

        for (uint256 i=0; i<balanceLength; i++) {
            uint256 tokenId = tokenOfOwnerByIndex(_tokenOwner, i);
            string memory tokenUri = tokenURI(tokenId);
            uint256 tokenPrice = saleToken.getTokenPrice(tokenId);

            tokenData[i] = TokenData(tokenId, tokenUri, tokenPrice);
        }

        return tokenData;
    }

    /// @dev : saleToken 사용할 수 있게 하는 함수
    function setSaleToken(address _saleToken) public {
        saleToken = SaleToken(_saleToken);
    }

    /// override 방지
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}