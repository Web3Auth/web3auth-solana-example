import { CustomChainConfig } from "@web3auth/base";
import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { SolanaWallet } from "@web3auth/solana-provider";



const getConnection = async (wallet : SolanaWallet): Promise<Connection> => {
const connectionConfig = await wallet.request<CustomChainConfig>({ method: "solana_provider_config", params: [] });
const conn = new Connection(connectionConfig.rpcTarget);
return conn
}

const getAccounts = async ( wallet?: SolanaWallet ): Promise<string[]> => {
    if (!wallet) throw new Error ("No wallet")
try {
    const acc = await wallet.requestAccounts();
//   uiConsole("Solana accounts", acc);
    return acc;
} catch (error) {
    console.error("Error", error);
//   uiConsole("error", error);
    return [];
}
};

const getBalance = async ( wallet?: SolanaWallet) => {
    if (!wallet) throw new Error ("No wallet")
    try {
        const conn = await getConnection(wallet);
        const accounts = await wallet.requestAccounts();
        const balance = await conn.getBalance(new PublicKey(accounts[0]));
    //   uiConsole("Solana balance", balance);
    } catch (error) {
        console.error("Error", error);
    //   uiConsole("error", error);
    }
};

const signMessage = async (wallet?: SolanaWallet): Promise<void> => {
    if (!wallet) throw new Error ("No wallet")
    try {
        const msg = Buffer.from("Test Signing Message ", "utf8");
        const res = await wallet.signMessage(msg);
        console.log(res)
    //   uiConsole("Solana sign message", res);
    } catch (error) {
        console.error("Error", error);
    //   uiConsole("error", error);
    }
};

const signAndSendTransaction = async (wallet?: SolanaWallet): Promise<void> => {
    if (!wallet) throw new Error ("No wallet")
    try {
        const conn = await getConnection(wallet);
        const pubKey = await wallet.requestAccounts();
        const blockhash = (await conn.getRecentBlockhash("finalized")).blockhash;
        const TransactionInstruction = SystemProgram.transfer({
        fromPubkey: new PublicKey(pubKey[0]),
        toPubkey: new PublicKey(pubKey[0]),
        lamports: 0.01 * LAMPORTS_PER_SOL,
        });
        const transaction = new Transaction({ recentBlockhash: blockhash, feePayer: new PublicKey(pubKey[0]) }).add(TransactionInstruction);
        const signature = await wallet.signAndSendTransaction(transaction);
        console.log(signature);
    //   uiConsole("signature", signature);
    } catch (error) {
        console.error("Error", error);
    //   uiConsole("error", error);
    }
};

const signTransaction = async (wallet?: SolanaWallet):  Promise<void> => {
    if (!wallet) throw new Error ("No wallet")
    try {
        const conn = await getConnection(wallet);
        const pubKey = await wallet.requestAccounts();
        const blockhash = (await conn.getRecentBlockhash("finalized")).blockhash;
        const TransactionInstruction = SystemProgram.transfer({
        fromPubkey: new PublicKey(pubKey[0]),
        toPubkey: new PublicKey(pubKey[0]),
        lamports: 0.01 * LAMPORTS_PER_SOL,
        });
        const transaction = new Transaction({ recentBlockhash: blockhash, feePayer: new PublicKey(pubKey[0]) }).add(TransactionInstruction);
        const signedTx = await wallet.signTransaction(transaction);
        signedTx.serialize();
        console.log(signedTx)
    //   uiConsole("signature", signedTx);
    } catch (error) {
        console.error("Error", error);
    //   uiConsole("error", error);
    }
};

export  { getAccounts, getBalance, signMessage, signAndSendTransaction, signTransaction };

