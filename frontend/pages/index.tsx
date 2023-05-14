import { Layout } from '../components/Layout';
import Profile from '../containers/Profile';
import CompanyList from '../containers/CompanyList';
import Navbar from '../components/Navbar';

import { useListen } from '../hooks/useListen';
import { useMetaMask } from '../hooks/useMetaMask';
import { ethers } from 'ethers';

import contractABI from '../utils/contractABI';

import Link from 'next/link';

export default function Home() {
  const {
    dispatch,
    state: { status, isMetaMaskInstalled, wallet },
  } = useMetaMask();
  const listen = useListen();

  const showInstallMetaMask =
    status !== 'pageNotLoaded' && !isMetaMaskInstalled;

  const showConnectButton =
    status !== 'pageNotLoaded' && isMetaMaskInstalled && !wallet;

  const isConnected = status !== 'pageNotLoaded' && typeof wallet === 'string';

  const provider = new ethers.providers.JsonRpcProvider(
    'https://alpha-rpc.scroll.io/l2'
  );

  const CONTRACT_ADDRESS = '0xf08dB83bFEFD259ca49369C969fa7d339626A2C0';

  const signerWallet = wallet as string;
  const signer = provider.getSigner(signerWallet);

  const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

  async function create() {
    const isCompany = false;
    const companyName = 'Aave';
    const userAccount = '0x3Ac8456748C8Bd404D85C0BF608ca7F645a3aC2B';
    const experienceName = 'rAAVEr';

    try {
      console.log('Creating request...');

      const tx = await contract.createRequest(
        isCompany,
        companyName,
        userAccount,
        experienceName
      );

      await tx.wait();

      console.log('Request created successfully');
    } catch (error) {
      console.error('Error creating request:', error);
    }
  }

  const handleConnect = async () => {
    dispatch({ type: 'loading' });
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    if (accounts.length > 0) {
      const balance = await window.ethereum!.request({
        method: 'eth_getBalance',
        params: [accounts[0], 'latest'],
      });
      dispatch({ type: 'connect', wallet: accounts[0], balance });

      listen();
    }
  };

  const handleDisconnect = () => {
    dispatch({ type: 'disconnect' });
  };

  const profileData = {
    name: 'ana-legit.eth',
    bio: 'DevRel, Solidity Developer, Hacker',
    profileImageUrl: '/img/noundry-studio-noun1.png',
  };

  const companies = [
    {
      id: 1,
      name: 'MetaMask',
      role: 'DevRel',
      time: '2021 - Present',
      icon: '/img/metamask-nouns.png',
      legit: true,
    },
    {
      id: 2,
      name: 'Nouns',
      role: 'BusDev',
      time: '2020 - 2021',
      icon: '/img/noundry-studio-noun4.png',
      legit: false,
    },
  ];

  const handleAddCompany = async () => {
    create();
  };

  return (
    <Layout>
      {isConnected ? (
        <>
          <Navbar handleDisconnect={handleDisconnect} />
          <Profile profileData={profileData} wallet={wallet} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              width: '100%',
              background: '#f8f8f8',
            }}
          >
            <CompanyList
              companies={companies}
              onAddCompany={handleAddCompany}
            />
          </div>
        </>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 20,
            background: 'linear-gradient(163.38deg, #00ECC5 15%, #A536FF 85%)',
          }}
        >
          <img
            src="img/legit-logo-gradientbg-nouns.png"
            alt="Logo"
            width={200}
          />
          <p style={{ color: 'white', fontSize: '26px' }}>
            Why fake it? Make it.
          </p>
          <button onClick={handleConnect}>
            <img src="/img/metamask-nouns.png" alt="metamask" width={30} />
            Connect with your wallet
          </button>
          <p
            style={{
              color: 'white',
              position: 'absolute',
              bottom: 20,
            }}
          >
            Is this legit?{' '}
            <Link
              href="/about"
              style={{
                textDecoration: 'underline',
              }}
            >
              Learn more
            </Link>
          </p>
        </div>
      )}
    </Layout>
  );
}
