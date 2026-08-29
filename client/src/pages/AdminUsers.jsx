import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiCall } from '../utils/api';
import { formatDate } from '../utils/formatters';
import Loader from '../components/common/Loader';
import { ArrowLeft, User, Shield } from 'lucide-react';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await apiCall('/admin/users', 'GET');
        setUsers(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="container page-wrapper">
        <Loader text="Loading registered store users..." />
      </div>
    );
  }

  return (
    <div className="container page-wrapper">
      <Link to="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', fontWeight: 500 }}>
        <ArrowLeft size={16} />
        <span>Back to Admin Dashboard</span>
      </Link>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Registered Store Users</h2>
        <p>Total Registered Accounts: {users.length}</p>
      </div>

      {error && (
        <div style={{ background: 'var(--accent-rose-light)', color: 'var(--accent-rose)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
          {error}
        </div>
      )}

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email Address</th>
              <th>System Role</th>
              <th>Joined Date</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--accent-light)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                      {u.name.charAt(0)}
                    </div>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{u.name}</span>
                  </div>
                </td>
                <td>{u.email}</td>
                <td>
                  <span
                    style={{
                      padding: '0.25rem 0.65rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      background: u.role === 'admin' ? 'var(--accent-amber-light)' : 'var(--accent-light)',
                      color: u.role === 'admin' ? 'var(--accent-amber)' : 'var(--accent-primary)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}
                  >
                    {u.role === 'admin' ? <Shield size={12} /> : <User size={12} />}
                    {u.role.toUpperCase()}
                  </span>
                </td>
                <td>{formatDate(u.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
