import React, { useContext } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { AuthContext } from '../../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import './Layout.css';

export const Layout = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="layout-container">
      <Sidebar />
      <div className="layout-main-wrapper">
        <Header />
        <main className="layout-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
