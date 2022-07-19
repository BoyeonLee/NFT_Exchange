# 🏁 NFT_Exchange
자신이 가지고 있는 NFT(Image)를 등록한 후에 사고 팔 수 있는 사이트입니다.

## 1. 프로젝트 구성 안내
1. smart-contract는 **Solidity**를 이용해 작성하였습니다.(**ERC-721**)
2. Blockchain은 Ethereum의 **Ropsten Test Network**를 이용하였습니다.
3. smart-contract와 frontend와의 연결은 **Web3.js**를 이용하였습니다.
4. smart-wallet은 **Metamask**를 이용하였습니다.
5. 사용자가 올린 NFT는 **Infura IPFS**에 등록하였습니다.
6. frontend는 **React**로 구성하였습니다.
7. css는 **Chakra-UI**를 이용하였습니다.
8. 배포는 **Netlify**를 이용하였습니다.

## 2. 실행방법
[NFT-Exchange](https://nftexchange.netlify.app/) <br><br>
위 링크를 이용하시면 됩니다. <br>
(Metamask가 없을 시 에러가 발생할 수도 있습니다.)

## 3. 프로젝트 구현 내용
1. contracts
  - <code>RegisterToken</code> : NFT를 등록하는 함수, owner 별로 가진 NFT를 가져오는 함수 구현
  - <code>SaleToken</code> : NFT의 가격을 설정하는 함수, NFT의 가격을 수정하는 함수, NFT를 구매하는 함수 구현
2. frontend
  - <code>mintNFT</code>
    - 파일 등록하면 미리보기 제공
    - NFT 등록

  - <code>myNFT</code>
    - 내가 등록한 NFT 확인
    - saleStatus 설정
    - NFT 가격 설정 및 수정

  - <code>saleNFT</code>
    - 판매 중인 NFT 확인
    - NFT 구매
    
## 4. 사용자가 올린 NFT를 block에 등록하는 과정
- 사용자가 NFT를 사이트에 등록한다. (NFT 이미지, NFT 이름, NFT 설명)
- NFT를 IPFS에 올려 url을 받는다.
- NFT url, NFT 이름, NFT 설명이 들어간 metadata.json을 만든다.
- metadata.json을 IPFS에 올리고 url을 받는다.
- 그 url을 block에 저장한다.

## 5. 문제 발생 & 해결 방안
- 문제 정의
  - 로컬에서 했을 때는 문제가 없었으나 배포 했을 때 이미지가 뜨지 않았다.
  
- 원인 분석
  - 사용자가 올린 NFT 이미지는 NFT 등록할 때 IPFS에 올라간다.
  - 이미지를 불러올 때 블록체인에 등록된 IPFS URI로부터 가져온다.
  - 배포 했을 때 블록체인에서 IPFS URI는 잘 받아오는 걸 확인했다.
  - IPFS URI로부터 이미지를 가져오는데 시간이 오래 걸려서 안 뜨는 걸 확인했다.
  
- 해결 방안 
  - 방법을 찾다가 올바른 방법을 찾지 못해서 IPFS를 바꿔 보았다.
  - Pinata IPFS에서 Infura IPFS로 바꿔서 했더니 배포시 이미지가 안 뜨는 문제가 해결됐다.
  
- 아쉬운 점
  - 올바른 원인을 찾아 해결하지 못해서 아쉽다.
  - 배포했을 때 IPFS에서 이미지를 잘 못 받아오는 이유를 찾아서 공부해야 한다.
  
## 6. 진행 기간
- 2022-05-02 ~ 2022-05-13

## 7. 버전
- 1.0 : 2022-05-13

## 8. 데모
### mintNFT
![mintNFT_gif](https://user-images.githubusercontent.com/78004477/168217666-2c7c7b88-9833-459b-ac2f-f6dae31e9375.gif)

### myNFT
![myNFT_gif](https://user-images.githubusercontent.com/78004477/168217788-032f07c0-11d5-4f8a-b1f0-14be673a9895.gif)

### saleNFT
![saleNFT_gif](https://user-images.githubusercontent.com/78004477/168218080-c65c0df2-b967-4192-9970-c75691f4f4ef.gif)

