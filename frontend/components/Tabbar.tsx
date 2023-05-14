import React, { MouseEventHandler } from 'react';

interface TabbarProps {
  handleChangeTab: () => void;
}

const Tabbar: React.FC<TabbarProps> = ({ handleChangeTab }) => {
  return (
    <nav className="tabbar">
      <div className="tab selected">
        <img src="icons/job.png" alt="Logo" width={40} />
        jobs
      </div>
      <div className="tab">
        <img src="icons/events.png" alt="Logo" width={40} />
        events
      </div>
      <div className="tab">
        <img src="icons/skills.png" alt="Logo" width={40} />
        skills
      </div>
      <div className="tab">
        <img src="icons/education.png" alt="Logo" width={40} />
        education
      </div>
      <style jsx>{`
        .tabbar {
          display: flex;
          width: 100%;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
        }
        .tab {
          // width: 50px;
          display: flex;
          flex-direction: column;
          text-transform: uppercase;
          font-size: 14px;
          align-items: center;
          gap: 4px;
          padding: 4px 0;
        }
        .tab.selected {
          border-bottom: 1px solid #fff;
        }
      `}</style>
    </nav>
  );
};

export default Tabbar;
