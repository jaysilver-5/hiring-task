import React, { useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import { MetaMaskInpageProvider } from '@metamask/providers'; // MetaMask provider type
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setUsername, setEmail, setWalletAddress, setToken } from '../features/user/userSlice'; // Correct path to slice
import styles from '../styles/AuthForm.module.css';
import LoadingModal from '../components/LoadingModal';

interface WalletConnectFormProps {
  type?: 'login' | 'register';
}

const WalletConnectForm: React.FC<WalletConnectFormProps> = ({ type = 'login' }) => {
  const [walletConnected, setWalletConnected] = useState<boolean>(false);
  const [walletAddress, setWalletAddressState] = useState<string | null>(null);
  const [email, setEmailState] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsernameState] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [walletLoading, setWalletLoading] = useState<boolean>(false); // New state for wallet loading
  const [formLoading, setFormLoading] = useState<boolean>(false); // New state for form loading

  const router = useRouter();
  const dispatch = useDispatch(); // Initialize useDispatch to dispatch actions

  const connectWallet = async () => {
    setWalletLoading(true); // Start wallet loading
    const provider = (await detectEthereumProvider()) as MetaMaskInpageProvider;

    if (provider) {
      try {
        const accounts = (await provider.request({ method: 'eth_requestAccounts' })) as string[] | null;

        if (accounts && accounts.length > 0) {
          setWalletConnected(true);
          const walletAddr = accounts[0];
          setWalletAddressState(walletAddr);
          dispatch(setWalletAddress(walletAddr)); // Dispatch wallet address to Redux
        } else {
          setError('No accounts found. Please connect MetaMask.');
        }
      } catch (err) {
        setError('Failed to connect wallet. Please try again.' + err);
      }
    } else {
      alert('MetaMask is not installed. Please install it to continue.');
    }
    setWalletLoading(false); // Stop wallet loading
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setFormLoading(true); // Start form loading

    const apiUrl = type === 'login' ? '/auth/login' : '/auth/register';
    const body = {
      email,
      password,
      ...(type === 'register' && { username }),
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${apiUrl}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token and user data in Redux
        dispatch(setToken(data.token));
        dispatch(setEmail(email));
        if (type === 'register') {
          dispatch(setUsername(username));
        }
        // Navigate to the dashboard
        router.push('/dashboard');
      } else {
        throw new Error(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    }
    setFormLoading(false); // Stop form loading
  };

  return (
    <div className='w-full bg-plain bg-cover h-screen'>
      <div className='flex flex-col lg:flex-row justify-between h-full'>
        {/* Image only visible on larger screens */}
        <img src='/images/sign-in-banner.jpg' className='hidden lg:block h-full' />

        {/* Form container, takes full width on small screens */}
        <div className='m-auto p-6 lg:p-0 lg:gap-y-6 w-full lg:w-1/2 flex flex-col items-center'>
          <h1 className='text-4xl lg:text-6xl text-secondary font-primary text-[58px] font-extrabold mb-6'>
            LOG IN 
            <br/> <span className='text-[#00BBFF]'>360</span> NFT
          </h1>

          {!walletConnected ? (
            <button 
              onClick={connectWallet} 
              className={`rounded-[10px] bg-[#4285F4] p-3 ${walletLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={walletLoading} // Disable button while loading
            >
              {walletLoading ? (
                <div className="flex gap-x-2 items-center">
                  <p className="text-white">Connecting...</p> {/* Loading state text */}
                </div>
              ) : (
                <div className="flex gap-x-2 items-center">
                  <img src="/images/metamask.svg" width={20} alt="MetaMask" />
                  <p className="text-white">Connect your wallet</p>
                </div>
              )}
            </button>
          ) : (
            <>
              <button className={styles.walletButton}>
                Wallet: {walletAddress && `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
              </button>

              <motion.div
                initial={{ y: 200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={styles.formContainer}
              >
                <h2>{type === 'login' ? 'Login' : 'Register'}</h2>
                <form onSubmit={handleFormSubmit} className={styles.form}>
                  {type === 'register' && (
                    <input
                      type="text"
                      className='text-black'
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsernameState(e.target.value)}
                      required
                    />
                  )}
                  <input
                    type="email"
                    className='text-black'
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmailState(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button 
                    type="submit" 
                    className={`${styles.submitButton} ${formLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={formLoading} // Disable button while loading
                  >
                    {formLoading ? 'Submitting...' : (type === 'login' ? 'Login' : 'Register')}
                  </button>
                </form>
                {error && <p className={styles.error}>{error}</p>}
                {formLoading && <LoadingModal />}
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletConnectForm;
