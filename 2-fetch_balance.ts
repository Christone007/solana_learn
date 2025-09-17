import { Connection, PublicKey, LAMPORTS_PER_SOL, ClusterApiUrl } from "@solana/web3.js";

const publicKey = new PublicKey("7q7cJ7swVfFQb2QFkNBsFAF78maFyuFArHdc3pEYEhTz");
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const balanceInLamports = await connection.getBalance(publicKey);
const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
console.log(`💰 The balance on wallet at addr ${publicKey} is ${balanceInSOL}!`);
