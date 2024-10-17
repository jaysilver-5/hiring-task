'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { usePostTitle } from '../hooks/usePostTitle';
import LoadingModal from '../components/LoadingModal';
import Logo from './logo.png';
import { useSelector } from 'react-redux';
import { RootState } from '../store';


// Utility function to shorten the wallet address
const shortenAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const Dashboard = () => {
  const { token, titles, fetchTitles, tokenIsValid, refreshToken } = useAuth();
  const { postTitle } = usePostTitle();
  const [newTitle, setNewTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const { walletAddress, email, username } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const checkAndFetch = async () => {
      if (!tokenIsValid()) {
        await refreshToken();
      }
      await fetchTitles();
      setLoading(false);
    };

    checkAndFetch();
  }, [token]);

  const handlePostTitle = async (e: React.FormEvent) => {
    e.preventDefault();
    await postTitle(newTitle);
    setNewTitle('');
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-back bg-cover bg-no-repeat bg-center w-full overflow-x-hidden">
      <nav className="px-32 py-4 flex justify-between items-center fixed top-0 left-0 w-full bg-transparent z-10">
        <div className="flex gap-x-2 items-center">
          <img src={Logo.src} alt="logo" width={50} height={50} className="cursor-pointer" />
          <h1 className="text-4xl font-primary font-extrabold">TITLE</h1>
        </div>

        <div className="flex flex-col items-center gap-y-2">
          <button className="btn text-sm font-light">
            {shortenAddress(walletAddress)}
          </button>
          <div className="flex flex-col items-end text-xs text-gray-600">
            <span>{username}</span>
            <span>{email}</span>
          </div>
        </div>
      </nav>

      <div className="pt-28 px-8 w-full flex flex-col items-center flex-grow">
        <form onSubmit={handlePostTitle} className="w-full max-w-lg mb-8">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Enter a new title"
            className="text-black w-full border border-gray-300 p-3 mb-4 rounded-lg"
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg">
            Add Title
          </button>
        </form>

        {loading ? (
          <p className="text-gray-500">Loading titles...</p>
        ) : titles.length === 0 ? (
          <p className="text-gray-500">No titles found. Start adding some!</p>
        ) : (
          <div className="w-full max-w-lg h-96 overflow-y-auto pb-4 custom-scrollbar">
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {titles.map((titleObj: unknown) => {
                if (
                  typeof titleObj === 'object' &&
                  titleObj !== null &&
                  'uuid' in titleObj &&
                  'title' in titleObj &&
                  'createdAt' in titleObj
                ) {
                  return (
                    <li
                      key={(titleObj as { uuid: string }).uuid}
                      className="bg-white shadow-lg rounded-lg p-4"
                    >
                      <p className="font-bold text-black">
                        {(titleObj as { title: string }).title}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {new Date(
                          (titleObj as { createdAt: string }).createdAt
                        ).toLocaleString()}
                      </p>
                    </li>
                  );
                }
                return null;
              })}
            </motion.ul>
          </div>
        )}
      </div>

      {loading && <LoadingModal />}
    </div>
  );
};

export default Dashboard;
