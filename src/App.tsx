import { useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import './App.css';
import '@rainbow-me/rainbowkit/styles.css';
import { useAccount, useSwitchChain } from 'wagmi';
import { TARGET_CHAIN } from './connectors/wagmiConfig';
import { useBalance } from './hooks/useBalance';
import { ManualBalance } from './components/ManualBalance';

function App() {
  const { address: account, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const { balance, getBalance, isLoading, error } = useBalance();

  useEffect(() => {
    if (!account) return;

    if (!chain || chain.id !== TARGET_CHAIN.id) {
      switchChain({ chainId: TARGET_CHAIN.id });
    }
  }, [chain, account]);

  useEffect(() => {
    getBalance(account);
  }, [account]);

  return (
    <div className='max-w-[1024px] mx-auto'>
      <header className='flex justify-between text-red-600 w-full py-7 px-2'>
        <span>wAVAX balance checker</span> <ConnectButton />
      </header>
      <h1 className='text-red-200 text-center text-[36px]'>
        Hi, let's check your wAVAX balance on Avalanche chain
      </h1>
      <h2 className='text-center text-[24px]'>
        You could enter a valid wallet address or connect your wallet
      </h2>

      <div className='flex flex-col gap-10 mt-10'>
        {account && (
          <div className='p-2 bg-slate-700'>
            <div className='flex flex-col gap-4'>
              <span>Connected wallet address: {account}</span>
              <span>Balance: {isLoading ? 'Loading...' : balance} wAVAX</span>

              {error && <span className='text-red-500'>{error}</span>}
            </div>
          </div>
        )}

        <ManualBalance />
      </div>
    </div>
  );
}

export default App;
