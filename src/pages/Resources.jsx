import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Search, Plus, ThumbsUp, ExternalLink, BookOpen } from 'lucide-react';
import './Resources.css';
import './Questions.css'; // For common header and form styling

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newResource, setNewResource] = useState({ title: '', category: 'Coding Preparation', description: '', link: '' });
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchResources();
  }, [category, search]);

  const fetchResources = async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (category) params.append('category', category);
      const { data } = await api.get(`/resources?${params.toString()}`);
      setResources(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpvote = async (id) => {
    try {
      await api.put(`/resources/${id}/upvote`);
      fetchResources();
    } catch (err) {
      console.error(err);
    }
  };

  const submitResource = async (e) => {
    e.preventDefault();
    try {
      await api.post('/resources', newResource);
      setShowAddModal(false);
      setNewResource({ title: '', category: 'Coding Preparation', description: '', link: '' });
      alert('Resource submitted successfully! ' + (user.role === 'student' ? 'Waiting for mentor approval.' : ''));
      fetchResources();
    } catch (err) {
      console.error(err);
      alert('Error submitting resource');
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Resource Library</h1>
          <p className="page-subtitle">Curated preparation materials, PDFs, and links for placement prep.</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={16} /> Upload Resource
        </button>
      </div>

      <div className="card filter-bar">
        <div className="search-input-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search resources by title or description..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <select className="filter-select" onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="Aptitude Preparation">Aptitude Preparation</option>
            <option value="Coding Preparation">Coding Preparation</option>
            <option value="Core Subjects">Core Subjects</option>
            <option value="HR Interview Preparation">HR Interview Preparation</option>
            <option value="Mock Interview Platforms">Mock Interview Platforms</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="resources-grid">
        {resources.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>No resources found matching your criteria.</div>
        ) : (
          resources.map((res) => (
            <div key={res._id} className="card resource-card">
              <div className="r-header">
                <div className="r-icon">
                  <BookOpen size={24} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 className="r-title">{res.title}</h3>
                  <span className="r-category">{res.category}</span>
                </div>
              </div>
              <p className="r-desc">{res.description}</p>
              
              <div className="r-footer">
                <a href={res.link} target="_blank" rel="noopener noreferrer" className="r-link">
                  <ExternalLink size={16} /> Open Resource
                </a>
                <button onClick={() => handleUpvote(res._id)} className={`upvote-btn ${res.upvotes.includes(user?._id) ? 'active' : ''}`}>
                  <ThumbsUp size={16} />
                  <span>{res.upvotes.length}</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '28rem' }}>
            <div className="modal-header">
              <h2 className="modal-title">Upload Resource</h2>
              <button onClick={() => setShowAddModal(false)} className="modal-close">✕</button>
            </div>
            <form onSubmit={submitResource} className="modal-body">
              <div className="form-group">
                <label className="form-label">Resource Title</label>
                <input type="text" required value={newResource.title} onChange={e => setNewResource({...newResource, title: e.target.value})} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select value={newResource.category} onChange={e => setNewResource({...newResource, category: e.target.value})} className="form-input">
                  <option value="Aptitude Preparation">Aptitude Preparation</option>
                  <option value="Coding Preparation">Coding Preparation</option>
                  <option value="Core Subjects">Core Subjects</option>
                  <option value="HR Interview Preparation">HR Interview Preparation</option>
                  <option value="Mock Interview Platforms">Mock Interview Platforms</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea required rows={3} value={newResource.description} onChange={e => setNewResource({...newResource, description: e.target.value})} className="form-input"></textarea>
              </div>
              <div className="form-group">
                <label className="form-label">Resource Link (URL)</label>
                <input type="url" required value={newResource.link} onChange={e => setNewResource({...newResource, link: e.target.value})} className="form-input" />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-outline">Cancel</button>
                <button type="submit" className="btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resources;
