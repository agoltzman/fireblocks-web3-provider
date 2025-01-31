import * as dotenv from 'dotenv'
dotenv.config()
import * as ethers from "ethers"
import { FireblocksWeb3Provider, ChainId } from "../src"
import Web3 from "web3";

export function getFireblocksProviderForTesting(extraConfiguration?: any) {
  if (!process.env.FIREBLOCKS_API_PRIVATE_KEY_PATH ||
    !process.env.FIREBLOCKS_API_KEY) {
    throw new Error("Environment variables FIREBLOCKS_API_PRIVATE_KEY_PATH, FIREBLOCKS_API_KEY, FIREBLOCKS_VAULT_ACCOUNT_IDS must be set")
  }

  const provider = new FireblocksWeb3Provider(
    {
      privateKey: process.env.FIREBLOCKS_API_PRIVATE_KEY_PATH,
      apiKey: process.env.FIREBLOCKS_API_KEY,
      vaultAccountIds: process.env.FIREBLOCKS_VAULT_ACCOUNT_IDS,
      chainId: ChainId.GOERLI,
      rpcUrl: process.env.FIREBLOCKS_RPC_URL,
      apiBaseUrl: process.env.FIREBLOCKS_API_BASE_URL,
      ...extraConfiguration
    }
  )

  return provider
}

export function getEthersFireblocksProviderForTesting(extraConfiguration?: any) {
  return new ethers.providers.Web3Provider(getFireblocksProviderForTesting(extraConfiguration))
}

export function getWeb3FireblocksProviderForTesting(extraConfiguration?: any) {
  return new Web3(getFireblocksProviderForTesting(extraConfiguration))
}
