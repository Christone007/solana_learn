import {
    Connection,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
    PublicKey,
    clusterApiUrl,
    LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const suppliedToPubKey = process.argv[2] || null;

if (!suppliedToPubKey) {
    console.log("Please provide a public key to send to");
    process.exit(1);
}

const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");

if (!senderKeypair) {
    console.log(`Could not retrieve sender keypair from env`);
    process.exit(1);
}

console.log(`📩suppliedToPubKey: ${suppliedToPubKey}`);
console.log(`📤senderPubKey: ${senderKeypair.publicKey.toBase58()}`);
const toPubkey = new PublicKey(suppliedToPubKey);

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

console.log(`✅ Loaded my own keypair, the destination pubKey and also connected to Solana devnet`);

const transaction = new Transaction();

const LAMPORTS_TO_SEND = 5000000;

const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: senderKeypair.publicKey,
    toPubkey: toPubkey,
    lamports: LAMPORTS_TO_SEND,
});

console.log("Instruction keys:", sendSolInstruction.keys);

transaction.add(sendSolInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [senderKeypair,]);

console.log(`Transaction signature is ${signature}`);
