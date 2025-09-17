import { Connection, PublicKey, LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js";

const suppliedPublicKey = process.argv[2];

if (!suppliedPublicKey) {
    throw new Error("Provide a public key to check balance")
}

const publicKey = new PublicKey(suppliedPublicKey);
const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
const balanceInLamports = await connection.getBalance(publicKey);
const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
console.log(`💰 The balance on wallet at addr ${publicKey} is ${balanceInSOL} SOL (${balanceInLamports} Lamports!)`);

