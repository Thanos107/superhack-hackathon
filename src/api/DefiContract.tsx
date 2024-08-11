import { ContractOptions, getContract } from "thirdweb";
import { ethereum, optimism } from "thirdweb/chains";
import { useReadContract } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import React, { useState } from "react";
import { useContractEvents } from "thirdweb/react";
import { prepareEvent } from "thirdweb";
import { useEffect } from "react";
import { Contract } from "ethers";
import { ethers } from "ethers";
import { activeAccount } from "../hooks/userInfoHook";

function fetchMarketId(poolProviderContract: Readonly<ContractOptions<[]>>) {
  const {data, isLoading} = useReadContract({
    contract: poolProviderContract,
    method: "function getMarketId() external view returns (string memory)",
    params: [],
  })

  console.log(data);
}

function fetchPendingLtv(poolProviderContract: Readonly<ContractOptions<[]>>) {
  const { data, isLoading } = useReadContract({
    contract: poolProviderContract,
    method: "function getPendingLtv(address asset) external view returns (uint256)",
    params: ["0x64b761D848206f447Fe2dd461b0c635Ec39EbB27"],
  });
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
  

  // console.log(data);

  const provider = new ethers.JsonRpcProvider("https://1.rpc.thirdweb.com/b4acdc244febe029528f057064473fc0")
  
  const poolProviderContract = getContract({
    client,
    address: "0x2f39d218133AFaB8F2B819B1066c7E434Ad94E9e",
    chain: ethereum,
  });

    fetchMarketId(poolProviderContract);

    const poolConfiguratorContract = getContract({
      client,
      address: "0x64b761D848206f447Fe2dd461b0c635Ec39EbB27",
      chain: ethereum,
    
    })

  fetchPendingLtv(poolConfiguratorContract);


  // Event listening
  const contractAddress = "0xc2aaCf6553D20d1e9d78E365AAba8032af9c85b0";
  // const eventContract = useCONTRACT
  const contractABI = [
    // Your contract ABI, including the VoteEmitted event
    "event RoleRevoked(bytes32 indexed role, address indexed account, address indexed sender)",
    "event RoleAdminChanged(bytes32 indexed role, bytes32 indexed previousAdminRole, bytes32 indexed newAdminRole)",
    "event RoleGranted(bytes32 indexed role, address indexed account, address indexed sender)"
  ];

  const addressProviderContractABI = [
    "event MarketIdSet(string indexed oldMarketId, string indexed newMarketId)",
    "event PoolUpdated(address indexed oldAddress, address indexed newAddress)",
    "event PoolConfiguratorUpdated(address indexed oldAddress, address indexed newAddress)",
    "event PriceOracleUpdated(address indexed oldAddress, address indexed newAddress)",
    "event ACLManagerUpdated(address indexed oldAddress, address indexed newAddress)",
    "event PriceOracleSentinelUpdated(address indexed oldAddress, address indexed newAddress)",
    "event PoolDataProviderUpdated(address indexed oldAddress, address indexed newAddress)",
    "event ProxyCreated(bytes32 indexed id, address indexed proxyAddress, address indexed implementationAddress)",
    "event AddressSet(bytes32 indexed id, address indexed oldAddress, address indexed newAddress)",
    "event AddressSetAsProxy(bytes32 indexed id, address indexed proxyAddress, address oldImplementationAddress, address indexed newImplementationAddress)"

  ]


  const aaveContract = new ethers.Contract(contractAddress, contractABI, provider);
  const aaveAddressProviderContract = new ethers.Contract("0x2f39d218133AFaB8F2B819B1066c7E434Ad94E9e", addressProviderContractABI, provider); //Requires the aave pool provider contract
  const etherscanAddress = "0xb90594ea5128a8178e132286DC2B7fBaC7d7266c";

  // FILTERING REVOKE ROLE EVENT  
  const revokeRoleEvent = aaveContract.queryFilter("RoleRevoked", 0, "latest");

  revokeRoleEvent.then((result) => {
    
    console.log(result);
  });

  // FILTERING ROLE ADMIN CHANGED EVENT
  const roleAdminChangedEvent = aaveContract.filters.RoleAdminChanged(null, null, null);
  const getRoleAdminChangedEvent = aaveContract.queryFilter("RoleAdminChanged", 0, "latest");
  getRoleAdminChangedEvent.then((result) => {
    console.log(result);
  });

  // FILTERING ROLE GRANTED EVENT
  const roleGrantedEvent = aaveContract.filters.RoleGranted(null, null, etherscanAddress);
  const getRoleGrantedEvent = aaveContract.queryFilter(roleGrantedEvent, 0, "latest");
  getRoleGrantedEvent.then((result) => {
    console.log(result);
  });

  // FILTERING MARKET ID SET EVENT
  const marketIdSetEvent = aaveAddressProviderContract.filters.MarketIdSet(null, null);
  const getMarketIdSetEvent = aaveAddressProviderContract.queryFilter("MarketIdSet", 0, "latest");
  getMarketIdSetEvent.then((result) => {
    console.log(result);
  });
  
  // FILTERING POOL UPDATED EVENT
  const poolUpdatedEvent = aaveAddressProviderContract.filters.PoolUpdated(null, null);
  const getPoolUpdatedEvent = aaveAddressProviderContract.queryFilter("PoolUpdated", 0, "latest");
  getPoolUpdatedEvent.then((result) => {
    console.log(result);
  });

  // FILTERING POOL CONFIGURATOR UPDATED EVENT
  const poolConfiguratorUpdatedEvent = aaveAddressProviderContract.filters.PoolConfiguratorUpdated(null, null);
  const getPoolConfiguratorUpdatedEvent = aaveAddressProviderContract.queryFilter("PoolConfiguratorUpdated", 0, "latest");
  getPoolConfiguratorUpdatedEvent.then((result) => {
    console.log(result);
  });

  // FILTERING PRICE ORACLE UPDATED EVENT
  const priceOracleUpdatedEvent = aaveAddressProviderContract.filters.PriceOracleUpdated(null, null);
  const getPriceOracleUpdatedEvent = aaveAddressProviderContract.queryFilter("PriceOracleUpdated", 0, "latest");
  getPriceOracleUpdatedEvent.then((result) => {
    console.log(result);
  });

  // FILTERING ACL MANAGER UPDATED EVENT
  const aclManagerUpdatedEvent = aaveAddressProviderContract.filters.ACLManagerUpdated(null, null);
  const getAclManagerUpdatedEvent = aaveAddressProviderContract.queryFilter("ACLManagerUpdated", 0, "latest");
  getAclManagerUpdatedEvent.then((result) => {
    console.log(result);
  });

  // FILTERING PRICE ORACLE SENTINEL UPDATED EVENT
  const priceOracleSentinelUpdatedEvent = aaveAddressProviderContract.filters.PriceOracleSentinelUpdated(null, null);
  const getPriceOracleSentinelUpdatedEvent = aaveAddressProviderContract.queryFilter("PriceOracleSentinelUpdated", 0, "latest");
  getPriceOracleSentinelUpdatedEvent.then((result) => {
    console.log(result);
  });

  // FILTERING POOL DATA PROVIDER UPDATED EVENT
  const poolDataProviderUpdatedEvent = aaveAddressProviderContract.filters.PoolDataProviderUpdated(null, null);
  const getPoolDataProviderUpdatedEvent = aaveAddressProviderContract.queryFilter("PoolDataProviderUpdated", 0, "latest");
  getPoolDataProviderUpdatedEvent.then((result) => {
    console.log(result);
  });

  // FILTERING PROXY CREATED EVENT
  const proxyCreatedEvent = aaveAddressProviderContract.filters.ProxyCreated(null, null, null);
  const getProxyCreatedEvent = aaveAddressProviderContract.queryFilter("ProxyCreated", 0, "latest");
  getProxyCreatedEvent.then((result) => {
    console.log(result);
  });

  // FILTERING ADDRESS SET EVENT
  const addressSetEvent = aaveAddressProviderContract.filters.AddressSet(null, null, null);
  const getAddressSetEvent = aaveAddressProviderContract.queryFilter("AddressSet", 0, "latest");
  getAddressSetEvent.then((result) => {
    console.log(result);
  });

  // FILTERING ADDRESS SET AS PROXY EVENT
  const addressSetAsProxyEvent = aaveAddressProviderContract.filters.AddressSetAsProxy(null, null, null, null);
  const getAddressSetAsProxyEvent = aaveAddressProviderContract.queryFilter(addressSetAsProxyEvent, 0, "latest");
  getAddressSetAsProxyEvent.then((result) => {
    console.log(result);
  });


  const monitorEvents = async () => {
    const filter = {
      address: contractAddress,
      topics: [
        ethers.hexlify("0xA96d5Fef3029A46a31BF4865CFDe08684A8b9bb3"),

      ],
      fromBlock: 0,
      toBlock: "latest",
    }
    

    const logs = await provider.getLogs(filter).catch((error) => {
      console.error("Error fetching logs:", error);
    })
    

 

  };


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