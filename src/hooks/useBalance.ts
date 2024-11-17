import { useCallback, useState } from 'react';
import { useEthersProvider } from './useEthersProvider';
import { TARGET_CHAIN } from '../connectors/wagmiConfig';
import { Contract, ethers } from 'ethers';
import { erc20Abi } from 'viem';
import { wAVAX_address } from '../constants';
import { isAddress } from 'ethers/lib/utils';

export const useBalance = () => {
	  const provider = useEthersProvider({ chainId: TARGET_CHAIN.id });
	  const [isLoading, setIsLoading] = useState(false);
		const [error, setError] = useState('');
		const [balance, setBalance] = useState('0')

	const getBalance = useCallback(async (walletAddress?: `0x${string}`) => {
		if (!provider || !walletAddress) return
		if (!isAddress(walletAddress)) setBalance('0')
		setIsLoading(true)

		
		try {
			const token = new Contract(wAVAX_address, erc20Abi, provider)

			const decimals = await token.decimals();

			const balance = await token.balanceOf(walletAddress)

			setError('')

			setBalance(ethers.utils.formatUnits(balance,decimals))

			setIsLoading(false)
		} catch (error) {
			console.error(error)
			setError((error as Error)?.message || 'Error while getting balance')
			setIsLoading(false)
		}
	}, [provider])

	return {balance, getBalance, isLoading, error}
}