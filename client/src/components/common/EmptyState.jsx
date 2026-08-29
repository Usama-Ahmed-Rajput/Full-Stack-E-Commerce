import React from 'react';
import { PackageX } from 'lucide-react';
import Button from './Button';

const EmptyState = ({
  icon: Icon = PackageX,
  title = 'No items found',
  description = 'Try adjusting your search filters or browse our other categories.',
  actionText,
  onAction
}) => {
  return (
    <div style={{ textAlign: 'center', padding: '3.5rem 1rem', background: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
      <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', color: 'var(--text-muted)' }}>
        <Icon size={32} />
      </div>
      <h3 style={{ marginBottom: '0.5rem' }}>{title}</h3>
      <p style={{ maxWidth: '400px', margin: '0 auto 1.5rem auto', color: 'var(--text-secondary)' }}>{description}</p>
      {actionText && onAction && (
        <Button onClick={onAction} variant="primary">
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
