const ethers = require("ethers")
require("dotenv").config()

async function main() {
    const ALCHEMY_RPC_URL = process.env.ALCHEMY_RPC_URL
    let PRIVATE_KEY = process.env.PRIVATE_KEY

    let artifacts = await hre.artifacts.readArtifact("Faucet")
    const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_RPC_URL)
    let wallet = new ethers.Wallet(PRIVATE_KEY, provider)

    // Create an instance of a Faucet Factory
    let factory = new ethers.ContractFactory(artifacts.abi, artifacts.bytecode, wallet)

    let faucet = await factory.deploy()

    console.log("Faucet address:", faucet.address)

    await faucet.deployed()
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
