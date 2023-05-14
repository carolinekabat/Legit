import React from 'react';

interface JobProps {
  icon: string;
  role: string;
  company: string;
  time: string;
  legit: boolean;
}

const Job: React.FC<JobProps> = ({ icon, role, company, time, legit }) => {
  return (
    <div className="job-card">
      <div className="icon-wrapper">
        {legit ? (
          <img src={'/icons/check.png'} alt="Icon" />
        ) : (
          <img src={'/icons/clock.png'} alt="Icon" />
        )}
      </div>
      <div className="info">
        <div className="role">{role}</div>
        <div className="company">{company}</div>
        <div className="time">{time}</div>
      </div>
      <div className="profile-image-wrapper">
        <img src={icon} alt="Profile" />
      </div>
      <style jsx>{`
        .job-card {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          padding: 10px 0;
          border-radius: 10px;
          background-color: #ffffff;
        }
        .icon-wrapper {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .icon-wrapper img {
          width: 30px;
          height: 30px;
        }
        .info {
          width: 100%;
          margin: 0 20px;
          font-family: 'Avenir Light', sans-serif;
        }
        .profile-image-wrapper {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .profile-image-wrapper img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
        }
        .company {
          font-size: 12px;
          color: #a0a0a0;
        }
        .time {
          font-size: 12px;
          color: #a0a0a0;
        }
      `}</style>
    </div>
  );
};

export default Job;
