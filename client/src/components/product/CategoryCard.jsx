import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ title, count, icon: Icon, category, image }) => {
  return (
    <Link
      to={`/products?category=${encodeURIComponent(category)}`}
      className="card card-hover"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.25rem',
        padding: '1.25rem',
        textDecoration: 'none',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          width: 54,
          height: 54,
          borderRadius: 'var(--radius-md)',
          background: 'var(--accent-light)',
          color: 'var(--accent-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}
      >
        <Icon size={28} />
      </div>

      <div>
        <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>{title}</h4>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{count} Available</span>
      </div>
    </Link>
  );
};

export default CategoryCard;
