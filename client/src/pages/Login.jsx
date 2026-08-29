import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/authSlice';
import { useToast } from '../context/ToastContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { LogIn, Smartphone } from 'lucide-react';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();

  const { loading, error } = useSelector((state) => state.auth);

  // Controlled State (Topic 4)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [formErrors, setFormErrors] = useState({});

  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await dispatch(loginUser(formData)).unwrap();
      showToast('Welcome back to Usama Mobiles!', 'success');
      navigate(from, { replace: true });
    } catch (err) {
      showToast(err || 'Invalid email or password', 'error');
    }
  };

  return (
    <div className="container page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card" style={{ width: '100%', maxWidth: 420, padding: '2.5rem 2rem' }}>
        {/* Logo Banner */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{ width: 54, height: 54, borderRadius: 'var(--radius-full)', background: 'var(--accent-light)', color: 'var(--accent-primary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
            <Smartphone size={28} />
          </div>
          <h2>Login to Usama Mobiles</h2>
          <p style={{ fontSize: '0.85rem' }}>Enter your credentials to access your account & order history</p>
        </div>

        {error && (
          <div style={{ background: 'var(--accent-rose-light)', color: 'var(--accent-rose)', padding: '0.75rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', fontSize: '0.85rem', fontWeight: 600 }}>
            {error}
          </div>
        )}

        {/* Demo Credentials Alert Box */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px border-color', borderRadius: 'var(--radius-md)', padding: '0.75rem', marginBottom: '1.5rem', fontSize: '0.8rem' }}>
          <div style={{ fontWeight: 700, marginBottom: '0.3rem', color: 'var(--accent-primary)' }}>Demo Viva Test Credentials:</div>
          <div><strong>Admin:</strong> admin@usamamobiles.pk | <code>admin123</code></div>
          <div><strong>Customer:</strong> customer@usamamobiles.pk | <code>customer123</code></div>
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={formErrors.email}
            required
            placeholder="usama@example.com"
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={formErrors.password}
            required
            placeholder="••••••••"
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            <LogIn size={18} />
            <span>Login to Account</span>
          </Button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem' }}>
          <span>Don't have an account yet? </span>
          <Link to="/register" style={{ fontWeight: 700 }}>
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
