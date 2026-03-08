import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { BookOpen, User as UserIcon, GraduationCap, Briefcase, ArrowLeft } from 'lucide-react';

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', email: '', rollNumber: '', branch: '', year: '', password: '', role: 'student'
  });
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = (role) => {
    setFormData({ ...formData, role });
    setStep(2);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed. Email might already exist.');
    }
  };

  const renderStepOne = () => (
    <div className="auth-box" style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-main)' }}>
        Select your role
      </h3>
      <div className="flex-col gap-4">
        <button 
          onClick={() => handleRoleSelect('student')}
          className="btn-outline w-full flex items-center justify-center gap-2"
          style={{ padding: '1rem' }}
        >
          <GraduationCap size={20} /> Student
        </button>
        <button 
          onClick={() => handleRoleSelect('placed_student')}
          className="btn-outline w-full flex items-center justify-center gap-2"
          style={{ padding: '1rem' }}
        >
          <Briefcase size={20} /> Placed Student
        </button>
        <button 
          onClick={() => handleRoleSelect('mentor')}
          className="btn-outline w-full flex items-center justify-center gap-2"
          style={{ padding: '1rem' }}
        >
          <UserIcon size={20} /> Mentor
        </button>
      </div>
      <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem' }}>
        <span style={{ color: 'var(--text-muted)' }}>Already have an account? </span>
        <Link to="/login" style={{ fontWeight: 500, color: 'var(--brand-600)' }}>
          Sign in
        </Link>
      </div>
    </div>
  );

  const renderStepTwo = () => {
    const isStudent = formData.role === 'student' || formData.role === 'placed_student';
    
    return (
      <div className="auth-box">
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
          <button 
            type="button" 
            onClick={() => setStep(1)} 
            style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <ArrowLeft size={20} />
          </button>
          <h3 style={{ flex: 1, textAlign: 'center', fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-main)', margin: 0, paddingRight: '20px' }}>
            {formData.role === 'student' ? 'Student Registration' : 
             formData.role === 'placed_student' ? 'Placed Student Registration' : 'Mentor Registration'}
          </h3>
        </div>

        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4" style={{ marginBottom: '1.25rem' }}>
            <div style={{ flex: 1 }}>
              <label className="form-label">Full Name</label>
              <input type="text" name="name" required onChange={handleChange} className="form-input" />
            </div>
            <div style={{ flex: 1 }}>
              <label className="form-label">College Email</label>
              <input type="email" name="email" required onChange={handleChange} className="form-input" />
            </div>
          </div>

          {isStudent && (
            <>
              <div className="flex gap-4" style={{ marginBottom: '1.25rem' }}>
                <div style={{ flex: 1 }}>
                  <label className="form-label">Roll Number</label>
                  <input type="text" name="rollNumber" required onChange={handleChange} className="form-input" />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="form-label">Branch</label>
                  <select name="branch" required onChange={handleChange} className="form-input">
                    <option value="">Select</option>
                    <option value="CSE">CSE</option>
                    <option value="IT">IT</option>
                    <option value="ECE">ECE</option>
                    <option value="MECH">MECH</option>
                    <option value="CIVIL">CIVIL</option>
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label className="form-label">Graduation Year</label>
                <input type="number" name="year" required onChange={handleChange} className="form-input" />
              </div>
            </>
          )}

          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" name="password" required onChange={handleChange} className="form-input" />
          </div>

          <button type="submit" className="btn-primary w-full" style={{ marginTop: '1rem' }}>
            Register
          </button>
        </form>
      </div>
    );
  };

  return (
    <div className="auth-container min-h-screen">
      <div style={{ textAlign: 'center' }}>
        <BookOpen size={48} color="var(--brand-600)" style={{ margin: '0 auto' }} />
        <h2 style={{ fontSize: '1.875rem', fontWeight: 800, marginTop: '1.5rem', color: 'var(--text-main)' }}>
          Join Placement Hub
        </h2>
      </div>

      {step === 1 ? renderStepOne() : renderStepTwo()}
    </div>
  );
};

export default Register;
