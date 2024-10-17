// /pages/register.tsx

import WalletConnectForm from '../../components/WalletConnectForm';
import Head from 'next/head';

const RegisterPage = () => {
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <div>
        <WalletConnectForm type="register" />
      </div>
    </>
  );
};

export default RegisterPage;
