import { ContractOptions, getContract } from "thirdweb";
import { ethereum, optimism } from "thirdweb/chains";
import { useReadContract } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import React from "react";
import { useContractEvents } from "thirdweb/react";
import { prepareEvent } from "thirdweb";
import { useEffect } from "react";
import { Contract } from "ethers";
import { ethers } from "ethers";

function fetchMarketId(poolProviderContract: Readonly<ContractOptions<[]>>) {
  const {data, isLoading} = useReadContract({
    contract: poolProviderContract,
    method: "function getMarketId() external view returns (string memory)",
    params: [],
  })

  console.log(data);
}

const DefiContract = () => {
  const client = createThirdwebClient({ clientId: "b4acdc244febe029528f057064473fc0" });

  const contract = getContract({
    client,
    address: "0x8a2Efd9A790199F4c94c6effE210fce0B4724f52",
    chain: ethereum,
  });

  // console.log(contract);
  // AAVE pool configurator ethereum: 0x64b761D848206f447Fe2dd461b0c635Ec39EbB27
  // AAVE pool address ethereum: 0x2f39d218133AFaB8F2B819B1066c7E434Ad94E9e
  // AAVE usdc ethereum: 0x64b761D848206f447Fe2dd461b0c635Ec39EbB27
  // AAVE usdc optimism: 0x625E7708f30cA75bfd92586e17077590C60eb4cD
  // const { data, isLoading } = useReadContract({
  //   contract,
  //   method: "function getPendingLtv(address asset) external view returns (uint256)",
  //   params: ["0x625E7708f30cA75bfd92586e17077590C60eb4cD"],
  // });

  // console.log(data);

  const provider = new ethers.JsonRpcProvider("https://1.rpc.thirdweb.com/b4acdc244febe029528f057064473fc0")
  
  const poolProviderContract = getContract({
    client,
    address: "0x2f39d218133AFaB8F2B819B1066c7E434Ad94E9e",
    chain: ethereum,
  });

   fetchMarketId(poolProviderContract);


  // Event listening
  const contractAddress = "0x8a2Efd9A790199F4c94c6effE210fce0B4724f52";
  // const eventContract = useCONTRACT
  const contractABI = [
    // Your contract ABI, including the VoteEmitted event
    "event VoteEmitted(uint256 indexed proposalId, address indexed voter, uint256 indexed vote, address asset, uint256 weight, uint256 balance)"
  ];

  const aaveContract = new ethers.Contract(contractAddress, contractABI, provider);

  const eventFilter = aaveContract.filters.VoteEmitted(null, "0xdd45542cCf17A16F5c515c20db7F7C7D8bB74Cc5", null, null, null, null);

  const fromBlock = 0;
  const toBlock = "latest";

  const events = aaveContract.queryFilter(eventFilter, fromBlock, toBlock);

  events.then((result) => {
    
    console.log(result);
  });

  const voteEmittedEvent = prepareEvent({
    signature: "event VoteEmitted(uint256 indexed proposalId, address indexed voter, uint256 indexed vote, address asset, uint256 weight, uint256 balance)",
  });

  
    const {data, isLoading} = useContractEvents({
      contract,
      events: [voteEmittedEvent],
    });

    
  
 console.log(data);  


  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <p>{String(data)}</p>
      )}
    </div>
  );
};

export default DefiContract;