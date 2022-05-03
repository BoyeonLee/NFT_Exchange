// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./RegisterToken.sol";

contract SaleToken {
    RegisterToken public registerToken;

    constructor (address _registerTokenAddress) {
        registerToken = RegisterToken(_registerTokenAddress);
    }

    mapping(uint256 => uint256) public tokenPrices;

    uint256[] public onSaleTokenArray;

    /// @dev : 토큰 가격을 설정하는 함수
    function setForSaleToken(uint256 _tokenId, uint256 _price) public {
        address tokenOwner = registerToken.ownerOf(_tokenId);

        require(tokenOwner == msg.sender, "Caller is not token owner");
        require(_price > 0, "Price is zero or lower");
        require(tokenPrices[_tokenId] == 0, "This token is already on sale");
        require(registerToken.isApprovedForAll(tokenOwner, address(this)), "Token owner did not approve token");

        tokenPrices[_tokenId] = _price;

        onSaleTokenArray.push(_tokenId);
    }

    /// @dev : 토큰을 구매하는 함수
    function purchaseToken(uint256 _tokenId) public payable {
        uint256 price = tokenPrices[_tokenId];
        address tokenOwner = registerToken.ownerOf(_tokenId);

        require(price > 0, "Animal token not sale");
        require(price <= msg.value, "Caller sent lower than price");
        require(tokenOwner != msg.sender, "Caller is token owner");

        payable(tokenOwner).transfer(msg.value);
        registerToken.safeTransferFrom(tokenOwner, msg.sender, _tokenId);

        tokenPrices[_tokenId] = 0;

        for(uint256 i=0; i<onSaleTokenArray.length; i++) {
            if(tokenPrices[onSaleTokenArray[i]] == 0) {
                onSaleTokenArray[i] = onSaleTokenArray[onSaleTokenArray.length - 1];
                onSaleTokenArray.pop();
            }
        }
    }

    /// @dev : onSaleTokenArray 길이 반환하는 함수
    function getOnSaleTokenArrayLength() view public returns(uint256) {
        return onSaleTokenArray.length;
    }

    /// @dev : 토큰 가격 반환하는 함수
    function getTokenPrice(uint256 _tokenId) view public returns(uint256) {
        return tokenPrices[_tokenId];
    }
}