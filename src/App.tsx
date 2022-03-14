import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { Web3Auth } from '@web3auth/web3auth'
import {  adapter, solanaChainConfig, subscribeAuthEvents } from './utils'
import { SolanaWallet } from "@web3auth/solana-provider";
import { signAndSendTransaction, signMessage, signTransaction } from './solanaProvider'

function App() {
  const [web3 , setWeb3] = useState<Web3Auth>();
  const [wallet , setWallet] = useState<SolanaWallet>();

  useEffect( function () {
      const initWeb3auth = async () =>{
        const web3auth = new Web3Auth({
          chainConfig: solanaChainConfig,
          clientId: "localhost-id" ,// get your clientId from https://developer.web3auth.io
          authMode: "DAPP"
        })

        // configure for web3auth torus solana wallet for custom chain
        // web3auth.configureAdapter(adapter)

        // subscribe for web3auth event
        subscribeAuthEvents(web3auth);

        await web3auth.initModal({modalConfig: { "TORUS_SOLANA" : {...adapter, label: "solana"} }})
        setWeb3(web3auth)
      }

      initWeb3auth()
    }, [])

  const connect = async() =>{
    if (!web3) throw new Error( "Web3Auth not initialized")
    const provider = await web3.connect()

    if (!provider) throw new Error( "No provider from web3auth")
    const wallet = new SolanaWallet(provider) 
    setWallet(wallet)
  }

  const disconnect = () =>{
    if (!web3) throw new Error( "Web3Auth not initialized")
    web3.logout()
    setWallet(undefined)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Web3Auth + React!</p>
        <div>
          <div>
            <button type="button" onClick={connect}>
              connect
            </button>
            <button type="button" onClick={disconnect}>
              disconnect
            </button>
          </div>
          <div>
            <button type="button" onClick={()=>signTransaction(wallet)}>
              signTransaction
            </button>
            <button type="button" onClick={()=> signAndSendTransaction(wallet)}>
              signAndSendTransaction
            </button>
            <button type="button" onClick={() => signMessage(wallet)}>
              signMessage
            </button>
          </div>

        </div>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Web3Auth
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Web3Auth Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default App
