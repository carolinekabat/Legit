import { shortenAddress } from './../utils/shortenAddress';
import Tabbar from '../components/Tabbar';

interface ProfileData {
  name: string;
  bio: string;
  profileImageUrl: string;
}

interface ProfileProps {
  profileData: ProfileData;
  wallet: string;
}

const Profile: React.FC<ProfileProps> = ({ profileData, wallet }) => {
  const handleChangeTab = (tab: string) => {
    console.log(tab);
  };

  return (
    <div className="profile-container">
      <div className="profile-info">
        <div>
          <h2>{profileData.name}</h2>
          <p>{shortenAddress(wallet)}</p>
          <p>{profileData.bio}</p>
        </div>
        <img
          src={profileData.profileImageUrl}
          alt="Profile"
          className="profile-image"
        />
      </div>

      <Tabbar handleChangeTab={() => handleChangeTab('events')} />
      <style jsx>{`
        .profile-container {
          width: 100%;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: linear-gradient(
            45deg,
            rgba(19, 233, 191, 1) 0%,
            rgba(142, 54, 255, 1) 68%
          );
          color: #ffffff;
        }
        .profile-image {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          object-fit: cover;
        }
        .profile-info {
          width: 100%;
          display: flex;
          flex-direction: row;
          font-family: 'Avenir Light', sans-serif;
          justify-content: space-between;
        }
        h2 {
          margin: 0;
          font-size: 32px;
          font-weight: 200;
        }
        p {
          margin: 5px 0;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};

export default Profile;
