import React from 'react';

import Job from '../components/Job';

interface Company {
  id: number;
  name: string;
  time: string;
  role: string;
  icon: string;
  legit: boolean;
}

interface CompanyListProps {
  companies: Company[];
  onAddCompany: () => void;
}

const CompanyList: React.FC<CompanyListProps> = ({
  companies,
  onAddCompany,
}) => {
  return (
    <div className="company-list-container">
      <div className="company-list-header">
        <div>Jobs</div>
        <img src={'/icons/dots.png'} alt="Add" onClick={onAddCompany} />
      </div>
      <ul>
        {companies.map((company) => (
          <li key={company.id}>
            <Job
              icon={company.icon}
              role={company.role}
              company={company.name}
              time={company.time}
              legit={company.legit}
            />
          </li>
        ))}
      </ul>
      <br />
      <button className="add-company-button" onClick={onAddCompany}>
        Create
      </button>
      <style jsx>{`
        .company-list-container {
          width: 100%;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          background-color: #ffffff;
        }
        h3 {
          margin: 0 0 10px;
        }
        ul {
          width: 100%;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        li {
          border-bottom: 1px solid #f4f4f4;
          &:last-child {
            border-bottom: none;
          }
        }
        .add-company-button {
          padding: 5px 10px;
          background-color: #ddd;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .company-list-header {
          display: flex;
          width: 100%;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          color: #7c5cf3;
        }
        .company-list-header img {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default CompanyList;
