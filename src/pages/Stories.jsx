import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Award, Target, CalendarDays, Plus } from 'lucide-react';
import './Stories.css';
import './Questions.css'; // modal generic styling

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStory, setNewStory] = useState({ studentName: '', branch: '', company: '', preparationTimeline: '', dailyRoutine: '', resourcesUsed: '', mistakes: '', tips: '' });

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const { data } = await api.get('/stories');
      setStories(data);
    } catch (err) {
      console.error(err);
    }
  };

  const submitStory = async (e) => {
    e.preventDefault();
    try {
      await api.post('/stories', newStory);
      setShowAddModal(false);
      setNewStory({ studentName: '', branch: '', company: '', preparationTimeline: '', dailyRoutine: '', resourcesUsed: '', mistakes: '', tips: '' });
      fetchStories();
    } catch (err) {
      console.error(err);
      alert('Error submitting story');
    }
  };

  return (
    <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
      <div className="stories-hero">
        <div>
          <h1>Alumni Success Stories 🚀</h1>
          <p>Learn from the experiences of our seniors. Discover their preparation strategies, daily routines, and tips for cracking top companies.</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="stories-add-btn">
          <Plus size={20} /> Share Your Story
        </button>
      </div>

      <div className="stories-list">
        {stories.map(story => (
          <div key={story._id} className="story-card">
            <div className="story-content">
              <div className="s-header">
                <div>
                  <h2 className="s-company">Placed at {story.company}</h2>
                  <p className="s-author">{story.studentName} • {story.branch}</p>
                </div>
                <div className="s-icon-wrapper">
                  <Award size={32} />
                </div>
              </div>

              <div className="s-grid">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="s-section s-timeline">
                    <h3><CalendarDays size={20} color="var(--brand-500)" /> Preparation Timeline</h3>
                    <p>{story.preparationTimeline}</p>
                  </div>
                  <div className="s-section">
                    <h3>Daily Routine</h3>
                    <p>{story.dailyRoutine || 'Not specified'}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="s-section s-tips">
                    <h3><Target size={20} color="#10b981" /> Tips & Advice</h3>
                    <p>{story.tips}</p>
                  </div>
                  {story.mistakes && (
                    <div className="s-section s-mistakes">
                      <h3>Mistakes to Avoid</h3>
                      <p>{story.mistakes}</p>
                    </div>
                  )}
                  {story.resourcesUsed && (
                    <div className="s-section s-resources">
                      <h3>Resources Used</h3>
                      <p>{story.resourcesUsed}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        {stories.length === 0 && (
          <div className="empty-state">
            <Award size={64} color="#cbd5e1" style={{ margin: '0 auto' }} />
            <h3>No stories yet</h3>
            <p>Be the first to share your success story!</p>
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '48rem' }}>
            <div className="modal-header">
              <h2 className="modal-title">Share Your Success Story</h2>
              <button onClick={() => setShowAddModal(false)} className="modal-close">✕</button>
            </div>
            <form onSubmit={submitStory} className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                <div>
                  <label className="form-label">Your Name</label>
                  <input type="text" required value={newStory.studentName} onChange={e => setNewStory({...newStory, studentName: e.target.value})} className="form-input" />
                </div>
                <div>
                  <label className="form-label">Branch</label>
                  <input type="text" required value={newStory.branch} onChange={e => setNewStory({...newStory, branch: e.target.value})} className="form-input" />
                </div>
                <div>
                  <label className="form-label">Company Placed</label>
                  <input type="text" required value={newStory.company} onChange={e => setNewStory({...newStory, company: e.target.value})} className="form-input" />
                </div>
              </div>
              
              <div>
                <label className="form-label">Preparation Timeline (How long did you prepare?)</label>
                <textarea required rows={2} value={newStory.preparationTimeline} onChange={e => setNewStory({...newStory, preparationTimeline: e.target.value})} className="form-input"></textarea>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                <div>
                  <label className="form-label">Daily Routine</label>
                  <textarea rows={3} value={newStory.dailyRoutine} onChange={e => setNewStory({...newStory, dailyRoutine: e.target.value})} className="form-input"></textarea>
                </div>
                <div>
                  <label className="form-label">Resources Used</label>
                  <textarea rows={3} value={newStory.resourcesUsed} onChange={e => setNewStory({...newStory, resourcesUsed: e.target.value})} className="form-input"></textarea>
                </div>
              </div>

              <div>
                <label className="form-label">Mistakes to Avoid</label>
                <textarea rows={2} value={newStory.mistakes} onChange={e => setNewStory({...newStory, mistakes: e.target.value})} className="form-input"></textarea>
              </div>

              <div>
                <label className="form-label">Tips for Juniors</label>
                <textarea required rows={3} value={newStory.tips} onChange={e => setNewStory({...newStory, tips: e.target.value})} className="form-input"></textarea>
              </div>

              <div className="modal-actions" style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-outline">Cancel</button>
                <button type="submit" className="btn-primary">Publish Story</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stories;
