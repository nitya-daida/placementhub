import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { LayoutDashboard, BookOpen, Briefcase, Award, ShieldCheck, Users } from 'lucide-react';
import './Layout.css';

export const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Question Bank', path: '/questions', icon: Briefcase },
    { name: 'Resources', path: '/resources', icon: BookOpen },
    { name: 'Success Stories', path: '/stories', icon: Award },
  ];

  if (user?.role === 'mentor' || user?.role === 'admin') {
    links.push({ name: 'Mentor Review', path: '/mentor', icon: ShieldCheck });
  }
  
  if (user?.role === 'admin') {
    links.push({ name: 'Admin Panel', path: '/admin', icon: Users });
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">Placement Hub</h1>
      </div>
      <nav className="sidebar-nav">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname.startsWith(link.path);
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${isActive ? 'active' : ''}`}
            >
              <Icon className="nav-icon" />
              {link.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
