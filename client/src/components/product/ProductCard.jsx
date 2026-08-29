import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { useToast } from '../../context/ToastContext';
import { formatCurrency } from '../../utils/formatters';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import Button from '../common/Button';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { showToast } = useToast();

  if (!product) return null;

  const {
    _id,
    name,
    brand,
    price,
    oldPrice,
    category,
    image,
    stock,
    rating,
    isFeatured
  } = product;

  const isOutOfStock = stock <= 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isOutOfStock) {
      showToast('Sorry, this product is out of stock', 'error');
      return;
    }

    dispatch(addToCart({ product, quantity: 1 }));
    showToast(`Added ${name} to cart!`, 'success');
  };

  return (
    <div className="product-card">
      <Link to={`/products/${_id}`} className="product-image-container">
        <img src={image} alt={name} className="product-image" loading="lazy" />
        {isFeatured && <span className="product-badge">Featured</span>}
        {isOutOfStock && (
          <span className="product-badge" style={{ background: 'var(--accent-rose)' }}>
            Out of Stock
          </span>
        )}
      </Link>

      <div className="product-info">
        <span className="product-brand">{brand}</span>
        <Link to={`/products/${_id}`}>
          <h3 className="product-name" title={name}>
            {name}
          </h3>
        </Link>

        <div className="product-meta">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#f59e0b', fontWeight: 600 }}>
            <Star size={14} fill="#f59e0b" />
            <span>{rating}</span>
          </div>
          <span>•</span>
          <span>{category}</span>
          <span>•</span>
          <span style={{ color: isOutOfStock ? 'var(--accent-rose)' : 'var(--accent-emerald)', fontWeight: 500 }}>
            {isOutOfStock ? 'Out of Stock' : `${stock} in stock`}
          </span>
        </div>

        <div className="product-price-row">
          <div>
            <span className="product-price">{formatCurrency(price)}</span>
            {oldPrice > price && <span className="product-old-price">{formatCurrency(oldPrice)}</span>}
          </div>

          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <Link to={`/products/${_id}`} className="btn btn-secondary btn-sm" title="View Details">
              <Eye size={16} />
            </Link>

            <Button
              variant="primary"
              size="sm"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              title={isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            >
              <ShoppingCart size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
