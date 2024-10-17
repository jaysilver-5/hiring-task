// /pages/login.tsx

import WalletConnectForm from '../../components/WalletConnectForm';
import Head from 'next/head';

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div>
        <WalletConnectForm type="login" />
      </div>
    </>
  );
};

export default LoginPage;
