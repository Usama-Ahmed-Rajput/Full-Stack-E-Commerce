import React from 'react';

const Loader = ({ text = 'Loading Usama Mobiles catalog...' }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 1rem' }}>
      <div className="spinner" style={{ width: 40, height: 40, borderTopColor: 'var(--accent-primary)', marginBottom: '1rem' }} />
      <p style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{text}</p>
    </div>
  );
};

export default Loader;
