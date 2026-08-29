import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { useToast } from '../context/ToastContext';
import { formatCurrency } from '../utils/formatters';
import Loader from '../components/common/Loader';
import Button from '../components/common/Button';
import {
  Star,
  ShoppingCart,
  Zap,
  ShieldCheck,
  Truck,
  RotateCcw,
  Minus,
  Plus,
  ArrowLeft
} from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { productDetail, detailLoading, error } = useSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1);

  // Fetch product details on mount / ID change (Topic 5 useEffect)
  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (detailLoading) {
    return (
      <div className="container page-wrapper">
        <Loader text="Loading product details..." />
      </div>
    );
  }

  if (error || !productDetail) {
    return (
      <div className="container page-wrapper" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h3>Product Not Found</h3>
        <p style={{ margin: '1rem 0' }}>The mobile or accessory you are looking for does not exist or has been removed.</p>
        <Link to="/products" className="btn btn-primary">
          Back to Catalog
        </Link>
      </div>
    );
  }

  const {
    name,
    brand,
    description,
    price,
    oldPrice,
    category,
    image,
    stock,
    rating,
    numReviews
  } = productDetail;

  const isOutOfStock = stock <= 0;

  const handleIncreaseQty = () => {
    if (quantity < stock) setQuantity((prev) => prev + 1);
  };

  const handleDecreaseQty = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    dispatch(addToCart({ product: productDetail, quantity }));
    showToast(`Added ${quantity} x ${name} to cart!`, 'success');
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    dispatch(addToCart({ product: productDetail, quantity }));
    navigate('/checkout');
  };

  return (
    <div className="container page-wrapper">
      {/* Back Link */}
      <Link to="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', fontWeight: 500 }}>
        <ArrowLeft size={16} />
        <span>Back to Products</span>
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>
        {/* Product Image */}
        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            padding: '2rem',
            textAlign: 'center'
          }}
        >
          <img
            src={image}
            alt={name}
            style={{ maxWidth: '100%', maxHeight: 420, objectFit: 'contain', borderRadius: 'var(--radius-md)' }}
          />
        </div>

        {/* Product Details Info */}
        <div>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {brand} • {category}
          </span>
          <h1 style={{ fontSize: '1.85rem', margin: '0.5rem 0 1rem 0' }}>{name}</h1>

          {/* Rating & Stock */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#f59e0b', fontWeight: 700 }}>
              <Star size={18} fill="#f59e0b" />
              <span>{rating}</span>
              <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({numReviews} reviews)</span>
            </div>
            <span>•</span>
            <span
              style={{
                padding: '0.25rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: 700,
                background: isOutOfStock ? 'var(--accent-rose-light)' : 'var(--accent-emerald-light)',
                color: isOutOfStock ? 'var(--accent-rose)' : 'var(--accent-emerald)'
              }}
            >
              {isOutOfStock ? 'Out of Stock' : `In Stock (${stock} available)`}
            </span>
          </div>

          {/* Pricing */}
          <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
            <span style={{ fontSize: '2.25rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
              {formatCurrency(price)}
            </span>
            {oldPrice > price && (
              <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                {formatCurrency(oldPrice)}
              </span>
            )}
          </div>

          {/* Description */}
          <div style={{ padding: '1.25rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
            <h4 style={{ marginBottom: '0.5rem', fontSize: '0.95rem' }}>Product Description</h4>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>{description}</p>
          </div>

          {/* Quantity Selector */}
          {!isOutOfStock && (
            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Quantity:</span>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--bg-surface)' }}>
                <button
                  onClick={handleDecreaseQty}
                  disabled={quantity <= 1}
                  style={{ width: 38, height: 38, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)' }}
                >
                  <Minus size={16} />
                </button>
                <span style={{ width: 40, textAlign: 'center', fontWeight: 700 }}>{quantity}</span>
                <button
                  onClick={handleIncreaseQty}
                  disabled={quantity >= stock}
                  style={{ width: 38, height: 38, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)' }}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <Button
              variant="primary"
              size="lg"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              style={{ flex: 1 }}
            >
              <ShoppingCart size={20} />
              <span>Add to Cart</span>
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              style={{ flex: 1 }}
            >
              <Zap size={20} />
              <span>Buy Now</span>
            </Button>
          </div>

          {/* Warranty badges */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', fontSize: '0.8rem', textAlign: 'center' }}>
            <div>
              <ShieldCheck size={20} color="var(--accent-primary)" style={{ margin: '0 auto 0.3rem auto' }} />
              <div>100% Genuine</div>
            </div>
            <div>
              <Truck size={20} color="var(--accent-emerald)" style={{ margin: '0 auto 0.3rem auto' }} />
              <div>Fast Shipping</div>
            </div>
            <div>
              <RotateCcw size={20} color="var(--accent-amber)" style={{ margin: '0 auto 0.3rem auto' }} />
              <div>7-Day Returns</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
