import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Users, Briefcase, BookOpen, BarChart3, UserCheck } from 'lucide-react';
import './Admin.css';

const Admin = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, usersRes] = await Promise.all([
        api.get('/admin/analytics'),
        api.get('/admin/users')
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      if (window.confirm(`Change this user's role to ${newRole}?`)) {
        await api.put(`/admin/users/${id}/role`, { role: newRole });
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!stats) return <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Loading Admin Dashboard...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 className="page-title">Admin Dashboard</h1>
        <p className="page-subtitle">Platform analytics and user management.</p>
      </div>

      <div className="admin-grid">
        <div className="card stat-card">
          <div className="stat-icon blue-icon"><Users size={28} /></div>
          <div className="stat-info">
            <p>Total Users</p>
            <p>{stats.users.total}</p>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{stats.users.students} Students • {stats.users.mentors} Mentors</span>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon purple-icon"><Briefcase size={28} /></div>
          <div className="stat-info">
            <p>Total Questions</p>
            <p>{stats.questions.total}</p>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{stats.questions.approved} Approved • {stats.questions.pending} Pending</span>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon green-icon"><BookOpen size={28} /></div>
          <div className="stat-info">
            <p>Resources</p>
            <p>{stats.resources.total}</p>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Uploads</span>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon orange-icon"><BarChart3 size={28} /></div>
          <div className="stat-info">
            <p>Top Company</p>
            <p style={{ fontSize: '1.25rem' }}>{stats.topCompanies[0]?._id || 'N/A'}</p>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{stats.topCompanies[0]?.count || 0} Questions</span>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-light)', backgroundColor: 'var(--bg-color)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <UserCheck size={20} color="var(--brand-600)" />
          <h2 style={{ fontSize: '1.125rem', fontWeight: 700 }}>User Management</h2>
        </div>
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Branch / Year</th>
                <th>Current Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>
                    <div style={{ fontWeight: 500, color: 'var(--text-main)' }}>{user.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.rollNumber}</div>
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{user.email}</td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{user.branch} • {user.year}</td>
                  <td>
                    <span className={`role-badge ${
                      user.role === 'admin' ? 'role-admin' :
                      user.role === 'mentor' ? 'role-mentor' : 'role-student'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <select
                      className="role-select"
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      disabled={user.role === 'admin'}
                    >
                      <option value="student">Student</option>
                      <option value="mentor">Mentor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
