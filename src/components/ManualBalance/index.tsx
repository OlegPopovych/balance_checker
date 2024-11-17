import { useEffect, useState } from 'react';
import { TARGET_CHAIN } from '../../connectors/wagmiConfig';
import { useAccount } from 'wagmi';
import { isAddress } from 'ethers/lib/utils';
import { useBalance } from '../../hooks/useBalance';
import { default_wallet } from '../../constants';

export const ManualBalance = () => {
  const { chain } = useAccount();
  const [walletAddress, setWalletAddress] = useState(default_wallet);
  const [errorAddress, setErrorAddress] = useState('');
  const { balance, getBalance, isLoading, error } = useBalance();

  const checkWalletAddress = async (walletAddress: string) => {
    if (chain && chain.id !== TARGET_CHAIN.id)
      setErrorAddress(`Chain ${chain?.name} is not supported`);

    getBalance(walletAddress as `0x${string}`);

    if (isAddress(walletAddress)) {
      setErrorAddress('');
    } else {
      setErrorAddress('Enter en valid address');
    }
  };

  useEffect(() => {
    isAddress(walletAddress) && getBalance(walletAddress as `0x${string}`);
  }, []);

  const handleSetDefaultAddress = () => {
    setWalletAddress(default_wallet);
    getBalance(default_wallet);
    setErrorAddress('');
  };

  return (
    <div className='p-2 bg-slate-700 flex flex-col gap-4'>
      <p>Enter wallet address:</p>
      <div className='flex gap-2'>
        <input
          className='w-full bg-transparent p-2 border border-yellow-800'
          type='text'
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          onBlur={() => checkWalletAddress(walletAddress)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              checkWalletAddress(walletAddress);
            }
          }}
        />
        <button
          className='p-2 text-[12px] border-[1px] disabled:opacity-50'
          onClick={handleSetDefaultAddress}
          disabled={default_wallet === walletAddress}
        >
          Set default wallet
        </button>
      </div>

      <span>Balance: {isLoading ? 'Loading...' : balance} wAVAX </span>

      {error && <span className='text-red-500'>{error}</span>}
      {errorAddress && <span className='text-red-500'>{errorAddress}</span>}
    </div>
  );
};
