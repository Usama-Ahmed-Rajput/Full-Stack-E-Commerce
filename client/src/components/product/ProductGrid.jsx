import React from 'react';
import ProductCard from './ProductCard';
import Skeleton from '../common/Skeleton';
import EmptyState from '../common/EmptyState';

const ProductGrid = ({ products, loading, emptyTitle, emptyDescription }) => {
  if (loading) {
    return (
      <div className="grid-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="card" style={{ height: 350, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Skeleton height="180px" />
            <Skeleton width="40%" height="16px" />
            <Skeleton width="90%" height="22px" />
            <Skeleton width="60%" height="20px" style={{ marginTop: 'auto' }} />
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="grid-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
