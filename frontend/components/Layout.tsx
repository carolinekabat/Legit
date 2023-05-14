import { PropsWithChildren } from 'react';

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="wrapper">
      {children}
      <style jsx>{`
        .wrapper {
          height: 100vh;
          width: 100vw;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </div>
  );
};
