import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Check, X, ShieldAlert } from 'lucide-react';
import './Admin.css'; // Shared styles for review lists

const Mentor = () => {
  const [pendingQuestions, setPendingQuestions] = useState([]);
  const [pendingResources, setPendingResources] = useState([]);

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    try {
      const [qRes, rRes] = await Promise.all([
        api.get('/questions/pending'),
        api.get('/resources/pending')
      ]);
      setPendingQuestions(qRes.data);
      setPendingResources(rRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleApprove = async (type, id) => {
    try {
      await api.put(`/${type}/${id}/approve`);
      fetchPending();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 className="page-title">Mentor Dashboard</h1>
        <p className="page-subtitle">Review and approve student-submitted questions and resources.</p>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-light)', backgroundColor: 'var(--bg-color)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldAlert size={20} color="#f59e0b" />
          <h2 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Pending Interview Questions</h2>
          <span style={{ backgroundColor: '#fef3c7', color: '#b45309', fontSize: '0.75rem', padding: '0.125rem 0.5rem', borderRadius: '9999px', fontWeight: 500 }}>
            {pendingQuestions.length}
          </span>
        </div>
        <div className="review-list">
          {pendingQuestions.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No pending questions to review.</div>
          ) : (
            pendingQuestions.map(q => (
              <div key={q._id} className="review-item">
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontWeight: 700 }}>{q.companyName} ({q.role})</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {q.description}
                  </p>
                  <div className="review-meta">
                    <span>By: {q.postedBy?.name}</span>
                    <span>Round: {q.roundType}</span>
                    <span>Difficulty: {q.difficulty}</span>
                  </div>
                </div>
                <div className="review-actions">
                  <button onClick={() => handleApprove('questions', q._id)} className="btn-approve">
                    <Check size={16} /> Approve
                  </button>
                  <button className="btn-reject">
                    <X size={16} /> Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-light)', backgroundColor: 'var(--bg-color)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldAlert size={20} color="#f59e0b" />
          <h2 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Pending Resources</h2>
          <span style={{ backgroundColor: '#fef3c7', color: '#b45309', fontSize: '0.75rem', padding: '0.125rem 0.5rem', borderRadius: '9999px', fontWeight: 500 }}>
            {pendingResources.length}
          </span>
        </div>
        <div className="review-list">
          {pendingResources.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No pending resources to review.</div>
          ) : (
            pendingResources.map(r => (
              <div key={r._id} className="review-item">
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontWeight: 700 }}>{r.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {r.description}
                  </p>
                  <div className="review-meta">
                    <span>By: {r.uploadedBy?.name}</span>
                    <span>Category: {r.category}</span>
                    <a href={r.link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand-600)' }}>View Link</a>
                  </div>
                </div>
                <div className="review-actions">
                  <button onClick={() => handleApprove('resources', r._id)} className="btn-approve">
                    <Check size={16} /> Approve
                  </button>
                  <button className="btn-reject">
                    <X size={16} /> Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Mentor;
