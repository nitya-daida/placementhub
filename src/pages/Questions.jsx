import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Search, ThumbsUp, MessageSquare, Plus } from 'lucide-react';
import './Questions.css';

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ company: '', role: '', roundType: '' });
  const [showAddModal, setShowAddModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState({ companyName: '', role: '', year: new Date().getFullYear(), roundType: 'Technical', difficulty: 'Medium', description: '', tips: '' });
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchQuestions();
  }, [filters, search]);

  const fetchQuestions = async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      Object.entries(filters).forEach(([key, val]) => {
        if (val) params.append(key, val);
      });
      const { data } = await api.get(`/questions?${params.toString()}`);
      setQuestions(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpvote = async (id) => {
    try {
      await api.put(`/questions/${id}/upvote`);
      fetchQuestions();
    } catch (err) {
      console.error(err);
    }
  };

  const submitQuestion = async (e) => {
    e.preventDefault();
    try {
      await api.post('/questions', newQuestion);
      setShowAddModal(false);
      setNewQuestion({ companyName: '', role: '', year: new Date().getFullYear(), roundType: 'Technical', difficulty: 'Medium', description: '', tips: '' });
      alert('Question submitted successfully! ' + (user.role === 'student' ? 'Waiting for mentor approval.' : ''));
      fetchQuestions();
    } catch (err) {
      console.error(err);
      alert('Error submitting question');
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Company Question Bank</h1>
          <p className="page-subtitle">Browse and share interview questions asked by top recruiters.</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={16} /> Add Question
        </button>
      </div>

      <div className="card filter-bar">
        <div className="search-input-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search companies, roles, or keywords..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <select className="filter-select" onChange={(e) => setFilters({ ...filters, roundType: e.target.value })}>
            <option value="">All Rounds</option>
            <option value="Aptitude">Aptitude</option>
            <option value="Technical">Technical</option>
            <option value="Coding">Coding</option>
            <option value="HR">HR</option>
          </select>
          <select className="filter-select" onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}>
            <option value="">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>

      <div className="questions-grid">
        {questions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>No questions found matching your criteria.</div>
        ) : (
          questions.map((q) => (
            <div key={q._id} className="card question-card">
              <div className="q-header">
                <div>
                  <h3 className="q-title">{q.companyName} - {q.role}</h3>
                  <div className="q-badges">
                    <span className="badge badge-blue">{q.roundType}</span>
                    <span className={`badge ${
                      q.difficulty === 'Easy' ? 'badge-green' :
                      q.difficulty === 'Medium' ? 'badge-yellow' : 'badge-red'
                    }`}>{q.difficulty}</span>
                    <span className="badge badge-gray">{q.year}</span>
                  </div>
                </div>
                <button onClick={() => handleUpvote(q._id)} className={`upvote-btn ${q.upvotes.includes(user?._id) ? 'active' : ''}`}>
                  <ThumbsUp size={16} />
                  <span>{q.upvotes.length}</span>
                </button>
              </div>
              <p className="q-desc">{q.description}</p>
              {q.tips && (
                <div className="q-tip">
                  <strong>Pro Tip: </strong>{q.tips}
                </div>
              )}
              <div className="q-footer">
                <div>
                  <span>Posted by <strong>{q.postedBy?.name}</strong></span>
                </div>
                <button style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'inherit' }}>
                  <MessageSquare size={16} /> {q.comments?.length || 0} Comments
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Share Interview Experience</h2>
              <button onClick={() => setShowAddModal(false)} className="modal-close">✕</button>
            </div>
            <form onSubmit={submitQuestion} className="modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label className="form-label">Company Name</label>
                  <input type="text" required value={newQuestion.companyName} onChange={e => setNewQuestion({...newQuestion, companyName: e.target.value})} className="form-input" />
                </div>
                <div>
                  <label className="form-label">Role</label>
                  <input type="text" required value={newQuestion.role} onChange={e => setNewQuestion({...newQuestion, role: e.target.value})} className="form-input" />
                </div>
                <div>
                  <label className="form-label">Round Type</label>
                  <select value={newQuestion.roundType} onChange={e => setNewQuestion({...newQuestion, roundType: e.target.value})} className="form-input">
                    <option value="Aptitude">Aptitude</option>
                    <option value="Technical">Technical</option>
                    <option value="Coding">Coding</option>
                    <option value="HR">HR</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Difficulty</label>
                  <select value={newQuestion.difficulty} onChange={e => setNewQuestion({...newQuestion, difficulty: e.target.value})} className="form-input">
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Question Description</label>
                <textarea required rows={4} value={newQuestion.description} onChange={e => setNewQuestion({...newQuestion, description: e.target.value})} className="form-input"></textarea>
              </div>
              <div className="form-group">
                <label className="form-label">Tips / Advice (Optional)</label>
                <textarea rows={2} value={newQuestion.tips} onChange={e => setNewQuestion({...newQuestion, tips: e.target.value})} className="form-input"></textarea>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-outline">Cancel</button>
                <button type="submit" className="btn-primary">Submit Question</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Questions;
