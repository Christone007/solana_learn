import { Keypair } from "@solana/web3.js";

const keypair = Keypair.generate();

console.log('Keypair Generated✅');
console.log(`Public Key is: `, keypair.publicKey.toBase58());
console.log(`Secret Key is: `, keypair.secretKey);
