import React, { useState, useEffect, useContext, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Send, UserCircle, CheckCircle2 } from 'lucide-react';
import api from '../../services/api';
import './DoubtChat.css';

const DoubtChat = () => {
  const { user } = useContext(AuthContext);
  const [doubts, setDoubts] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [replyText, setReplyText] = useState('');
  const [activeReplyId, setActiveReplyId] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    fetchDoubts();
  }, []);

  const fetchDoubts = async () => {
    try {
      const res = await api.get('/doubts');
      setDoubts(res.data);
    } catch (error) {
      console.error('Error fetching doubts', error);
    }
  };

  const handleAskQuestion = async (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    try {
      const res = await api.post('/doubts', { question: newQuestion });
      setDoubts([res.data, ...doubts]);
      setNewQuestion('');
      scrollToTop();
    } catch (error) {
      console.error('Error asking question', error);
    }
  };

  const handleReply = async (doubtId) => {
    if (!replyText.trim()) return;

    try {
      const res = await api.post(`/doubts/${doubtId}/answer`, { answerText: replyText });
      setDoubts(doubts.map(d => d._id === doubtId ? res.data : d));
      setReplyText('');
      setActiveReplyId(null);
    } catch (error) {
      console.error('Error replying', error);
    }
  };

  const scrollToTop = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="doubt-chat-container">
      <div className="chat-header">
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          Doubt Clarification Forum 💬
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          Ask questions. Placed students and mentors will help out!
        </p>
      </div>

      <div className="chat-messages-area">
        <div ref={chatEndRef} />
        {doubts.map(doubt => (
          <div key={doubt._id} className={`doubt-bubble ${doubt.isResolved ? 'resolved' : ''}`}>
            <div className="question-block">
              <div className="user-info">
                <UserCircle size={18} className="text-muted" />
                <span className="user-name">{doubt.askedBy?.name || 'Unknown Student'}</span>
                {doubt.isResolved && (
                  <span className="resolved-badge"><CheckCircle2 size={12}/> Resolved</span>
                )}
              </div>
              <p className="question-text">{doubt.question}</p>
            </div>

            {doubt.answers && doubt.answers.length > 0 && (
              <div className="answers-block">
                {doubt.answers.map((ans, idx) => (
                  <div key={idx} className="answer-item">
                    <div className="user-info helper">
                      <UserCircle size={16} color="var(--brand-600)" />
                      <span className="user-name">
                        {ans.answeredBy?.name || 'Mentor'} 
                        <span className="role-tag">({ans.answeredBy?.role || 'mentor'})</span>
                      </span>
                    </div>
                    <p className="answer-text">{ans.answerText}</p>
                  </div>
                ))}
              </div>
            )}

            {(user?.role === 'mentor' || user?.role === 'student') && !doubt.isResolved && (
              <div className="reply-action">
                {activeReplyId === doubt._id ? (
                  <div className="reply-input-group">
                    <input 
                      type="text" 
                      placeholder="Type your answer..." 
                      className="form-input chat-input"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleReply(doubt._id)}
                      autoFocus
                    />
                    <button className="btn-primary icon-btn" onClick={() => handleReply(doubt._id)}>
                      <Send size={16} />
                    </button>
                    <button className="btn-secondary" onClick={() => { setActiveReplyId(null); setReplyText(''); }}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button className="btn-secondary small-btn" onClick={() => setActiveReplyId(doubt._id)}>
                    Reply to this doubt
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
        {doubts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            No questions asked yet. Be the first to ask!
          </div>
        )}
      </div>

      <div className="chat-input-area">
        <form onSubmit={handleAskQuestion} className="question-form">
          <input 
            type="text" 
            placeholder="Ask a question about interviews, prep, or companies..." 
            className="form-input"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          <button type="submit" className="btn-primary" disabled={!newQuestion.trim()}>
            Ask
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoubtChat;
