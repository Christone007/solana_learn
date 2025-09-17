import * as web3 from "@solana/web3.js";
import "dotenv/config";
import {
    getKeypairFromEnvironment,
} from "@solana-developers/helpers";

const toPubKey = process.argv[2] || null;

if (!toPubKey) {
    console.log("Please provide a Solana Address to transfer to");
    process.exit(1);
}

const receiverKey = new web3.PublicKey(toPubKey);
const senderKey = getKeypairFromEnvironment("SECRET_KEY");

// create connection to devnet
const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

// create transaction
const transaction = new web3.Transaction();
const LAMPORTS_TO_SEND = 10_000;

// create instruction
const sendSolInstruction = web3.SystemProgram.transfer({
    fromPubkey: senderKey.publicKey,
    lamports: LAMPORTS_TO_SEND,
    toPubkey: receiverKey
    });

// add instruction to transaction
transaction.add(sendSolInstruction);

// sign transaction
const signature = await web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [senderKey,]
);

console.log(`✅ Transaction Successful: ${signature}`);
