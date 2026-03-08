import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { BookOpen, Briefcase, Award, TrendingUp } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DoubtChat from '../components/dashboard/DoubtChat';
import api from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({ questions: 0, resources: 0, stories: 0, contributions: 0, recentQuestions: [], topResources: [] });
  const [selectedCompany, setSelectedCompany] = useState('All Market');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [qRes, rRes, sRes] = await Promise.all([
          api.get('/questions'),
          api.get('/resources'),
          api.get('/stories')
        ]);
        
        let contributions = 0;
        if (user) {
          contributions += qRes.data.filter(q => q.postedBy?._id === user.id).length;
          contributions += rRes.data.filter(r => r.uploadedBy?._id === user.id).length;
          contributions += sRes.data.filter(s => s.postedBy?._id === user.id).length;
        }

        setStats({ 
          questions: qRes.data.length, 
          resources: rRes.data.length,
          stories: sRes.data.length,
          contributions,
          recentQuestions: qRes.data.slice(0, 3) || [],
          topResources: rRes.data.slice(0, 3) || []
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { title: 'Total Questions', value: stats.questions, icon: Briefcase, colorClass: 'blue-icon' },
    { title: 'Study Resources', value: stats.resources, icon: BookOpen, colorClass: 'green-icon' },
    { title: 'Success Stories', value: stats.stories, icon: Award, colorClass: 'purple-icon' },
  ];

  const companyData = {
    'All Market': {
      trendData: [
        { year: '2020', tech: 4000, nonTech: 2400 },
        { year: '2021', tech: 5500, nonTech: 2800 },
        { year: '2022', tech: 7800, nonTech: 3900 },
        { year: '2023', tech: 6200, nonTech: 4300 },
        { year: '2024', tech: 8100, nonTech: 4800 },
        { year: '2025 (Est)', tech: 9500, nonTech: 5200 },
      ],
      roleData: [
        { name: 'Software Eng', demand: 85 },
        { name: 'Data Analyst', demand: 65 },
        { name: 'Product Mgr', demand: 45 },
        { name: 'Consulting', demand: 55 },
        { name: 'Core Eng', demand: 35 },
      ]
    },
    'Amazon': {
      trendData: [
        { year: '2020', tech: 600, nonTech: 400 },
        { year: '2021', tech: 1100, nonTech: 500 },
        { year: '2022', tech: 1400, nonTech: 650 },
        { year: '2023', tech: 1200, nonTech: 550 },
        { year: '2024', tech: 1500, nonTech: 700 },
        { year: '2025 (Est)', tech: 1800, nonTech: 850 },
      ],
      roleData: [
        { name: 'Cloud Arch', demand: 90 },
        { name: 'SDE', demand: 85 },
        { name: 'Ops Mgr', demand: 70 },
        { name: 'Data Sci', demand: 60 },
        { name: 'Prod Mgr', demand: 40 },
      ]
    },
    'Microsoft': {
      trendData: [
        { year: '2020', tech: 500, nonTech: 300 },
        { year: '2021', tech: 800, nonTech: 400 },
        { year: '2022', tech: 1200, nonTech: 550 },
        { year: '2023', tech: 1100, nonTech: 500 },
        { year: '2024', tech: 1300, nonTech: 600 },
        { year: '2025 (Est)', tech: 1600, nonTech: 750 },
      ],
      roleData: [
        { name: 'SDE (Cloud)', demand: 88 },
        { name: 'AI/ML Eng', demand: 85 },
        { name: 'Sys Eng', demand: 65 },
        { name: 'Conslt', demand: 50 },
        { name: 'Prod Mgr', demand: 45 },
      ]
    },
    'Google': {
      trendData: [
        { year: '2020', tech: 400, nonTech: 150 },
        { year: '2021', tech: 600, nonTech: 200 },
        { year: '2022', tech: 900, nonTech: 300 },
        { year: '2023', tech: 800, nonTech: 250 },
        { year: '2024', tech: 950, nonTech: 350 },
        { year: '2025 (Est)', tech: 1100, nonTech: 450 },
      ],
      roleData: [
        { name: 'Backend SDE', demand: 92 },
        { name: 'ML/AI Eng', demand: 85 },
        { name: 'Data Eng', demand: 75 },
        { name: 'Prod Mgr', demand: 40 },
        { name: 'Sales', demand: 30 },
      ]
    },
    'Meta': {
      trendData: [
        { year: '2020', tech: 300, nonTech: 100 },
        { year: '2021', tech: 700, nonTech: 200 },
        { year: '2022', tech: 1000, nonTech: 250 },
        { year: '2023', tech: 600, nonTech: 150 },
        { year: '2024', tech: 750, nonTech: 250 },
        { year: '2025 (Est)', tech: 900, nonTech: 350 },
      ],
      roleData: [
        { name: 'Frontend', demand: 90 },
        { name: 'Data Eng', demand: 80 },
        { name: 'Backend', demand: 70 },
        { name: 'Prod Mgr', demand: 50 },
        { name: 'Research', demand: 40 },
      ]
    },
    'Apple': {
      trendData: [
        { year: '2020', tech: 200, nonTech: 150 },
        { year: '2021', tech: 300, nonTech: 200 },
        { year: '2022', tech: 550, nonTech: 250 },
        { year: '2023', tech: 500, nonTech: 220 },
        { year: '2024', tech: 550, nonTech: 300 },
        { year: '2025 (Est)', tech: 650, nonTech: 350 },
      ],
      roleData: [
        { name: 'Hardware', demand: 90 },
        { name: 'Systems', demand: 85 },
        { name: 'iOS Dev', demand: 75 },
        { name: 'Supply Chn', demand: 60 },
        { name: 'Retail Mgt', demand: 40 },
      ]
    }
  };

  const activeTrendData = companyData[selectedCompany].trendData;
  const activeRoleData = companyData[selectedCompany].roleData;

  const faangData = [
    { company: 'Amazon', '2023': 1200, '2024': 1500, '2025 (Est)': 1800, roleFocus: 'SDE & Cloud' },
    { company: 'Microsoft', '2023': 1100, '2024': 1300, '2025 (Est)': 1600, roleFocus: 'Full Stack & AI' },
    { company: 'Google', '2023': 800, '2024': 950, '2025 (Est)': 1100, roleFocus: 'Backend & ML' },
    { company: 'Meta', '2023': 600, '2024': 750, '2025 (Est)': 900, roleFocus: 'Frontend & Data' },
    { company: 'Apple', '2023': 500, '2024': 550, '2025 (Est)': 650, roleFocus: 'Systems & Hardware' },
    { company: 'Netflix', '2023': 200, '2024': 250, '2025 (Est)': 300, roleFocus: 'Backend & UI' },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
          <p style={{ fontWeight: 600, margin: 0 }}>{label}</p>
          <p style={{ margin: '4px 0', fontSize: '12px', color: '#64748b' }}>Primary Focus: <span style={{ color: '#0f172a', fontWeight: 500 }}>{data.roleFocus}</span></p>
          {payload.map((entry, index) => (
            <p key={index} style={{ margin: 0, fontSize: '12px', color: entry.color }}>
              {entry.name}: {entry.value} placements
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name}! 👋</h1>
        <p>Here's what's happening in your placement preparation today.</p>
      </div>

      <div className="stats-grid">
        {cards.map((card, idx) => (
          <div key={idx} className="card stat-card">
            <div className={`stat-icon ${card.colorClass}`}>
              <card.icon size={24} />
            </div>
            <div className="stat-info">
              <p>{card.title}</p>
              <p>{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content-grid">
        <div className="card content-section">
          <h2>Recent Company Questions</h2>
          {stats.recentQuestions.length > 0 ? (
            <div className="recent-list">
              {stats.recentQuestions.map(q => (
                <div key={q._id} className="recent-item">
                  <span className="recent-title">{q.companyName} - {q.role}</span>
                  <span className="recent-meta">{q.roundType} Round • {q.difficulty}</span>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>No recent questions available.</p>
          )}
        </div>
        <div className="card content-section">
          <h2>Top Resources</h2>
          {stats.topResources.length > 0 ? (
            <div className="recent-list">
              {stats.topResources.map(r => (
                <div key={r._id} className="recent-item">
                  <span className="recent-title">{r.title}</span>
                  <span className="recent-meta">{r.category}</span>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>No resources available.</p>
          )}
        </div>
      </div>
      
      {/* Doubt Chat Component Section */}
      <div style={{ marginTop: '1.5rem' }}>
        <DoubtChat />
      </div>

      <div className="card content-section" style={{ marginTop: '1.5rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <h2>Market Trends & Placement Analysis 🚀</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            A historical overview of placement volumes across sectors and predictive analysis of future role demands.
          </p>
        </div>
        <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {Object.keys(companyData).map(company => (
            <button
              key={company}
              onClick={() => setSelectedCompany(company)}
              className={`company-tab ${selectedCompany === company ? 'active' : ''}`}
            >
              {company}
            </button>
          ))}
        </div>
        
        <div className="market-trends-section">
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Hiring Volume Trends (2020-2025)</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activeTrendData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Line type="monotone" name="Tech Roles" dataKey="tech" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" name="Non-Tech Roles" dataKey="nonTech" stroke="#9333ea" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Current Role Demand (%)</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activeRoleData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="demand" name="Demand Score" fill="#0ea5e9" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="market-trends-section" style={{ marginTop: '2rem' }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)' }}>MAANG / Top Tech Individual Analysis</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
              Comparison of past hiring numbers and 2025 projections specifically for top-tier product companies. Hover to see primary role focuses.
            </p>
            <div className="chart-container" style={{ height: '350px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={faangData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="company" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Bar dataKey="2023" fill="#94a3b8" radius={[4, 4, 0, 0]} name="2023 Actual" />
                  <Bar dataKey="2024" fill="#3b82f6" radius={[4, 4, 0, 0]} name="2024 Actual" />
                  <Bar dataKey="2025 (Est)" fill="#10b981" radius={[4, 4, 0, 0]} name="2025 Predicted" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
