import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCartItems,
  selectCartSubtotal,
  selectCartShipping,
  selectCartTotal,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart
} from '../redux/slices/cartSlice';
import { formatCurrency } from '../utils/formatters';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Truck } from 'lucide-react';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const shipping = useSelector(selectCartShipping);
  const total = useSelector(selectCartTotal);

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container page-wrapper">
        <EmptyState
          icon={ShoppingBag}
          title="Your Shopping Cart is Empty"
          description="Looks like you haven't added any smartphones or accessories to your cart yet."
          actionText="Start Shopping"
          onAction={() => navigate('/products')}
        />
      </div>
    );
  }

  return (
    <div className="container page-wrapper">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h2>Shopping Cart</h2>
          <p>You have {cartItems.length} product(s) in your cart</p>
        </div>
        <Button variant="secondary" size="sm" onClick={() => dispatch(clearCart())}>
          <Trash2 size={16} />
          <span>Clear Cart</span>
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>
        {/* Cart Items List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {cartItems.map(({ product, quantity }) => (
            <div
              key={product._id}
              className="card"
              style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', padding: '1rem' }}
            >
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)' }}
              />

              {/* Info */}
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase' }}>
                  {product.brand}
                </span>
                <Link to={`/products/${product._id}`} style={{ display: 'block', color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                  {product.name}
                </Link>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                  {formatCurrency(product.price)}
                </div>
              </div>

              {/* Quantity controls */}
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)' }}>
                <button
                  onClick={() => dispatch(decreaseQuantity(product._id))}
                  style={{ width: 32, height: 32, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Minus size={14} />
                </button>
                <span style={{ width: 32, textAlign: 'center', fontWeight: 700, fontSize: '0.9rem' }}>{quantity}</span>
                <button
                  onClick={() => dispatch(increaseQuantity(product._id))}
                  disabled={quantity >= product.stock}
                  style={{ width: 32, height: 32, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Item Total & Remove */}
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 800, fontFamily: 'var(--font-heading)', fontSize: '1.05rem', marginBottom: '0.4rem' }}>
                  {formatCurrency(product.price * quantity)}
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(product._id))}
                  style={{ background: 'none', border: 'none', color: 'var(--accent-rose)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.8rem' }}
                >
                  <Trash2 size={14} />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          ))}

          <Link to="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--accent-primary)', marginTop: '0.5rem' }}>
            <span>← Continue Shopping</span>
          </Link>
        </div>

        {/* Order Summary Box */}
        <div className="card" style={{ padding: '1.75rem', position: 'sticky', top: 'calc(var(--nav-height) + 1.5rem)' }}>
          <h3 style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
            Order Summary
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
              <span style={{ fontWeight: 700 }}>{formatCurrency(subtotal)}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Shipping Fee</span>
              <span style={{ fontWeight: 700, color: shipping === 0 ? 'var(--accent-emerald)' : 'var(--text-primary)' }}>
                {shipping === 0 ? 'FREE Shipping' : formatCurrency(shipping)}
              </span>
            </div>

            {subtotal < 10000 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--accent-amber)', background: 'var(--accent-amber-light)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)' }}>
                <Truck size={16} />
                <span>Add {formatCurrency(10000 - subtotal)} more for FREE Delivery!</span>
              </div>
            )}

            <div
              style={{
                display: 'flex',
                justify: 'space-between',
                borderTop: '1px solid var(--border-color)',
                paddingTop: '1rem',
                fontSize: '1.2rem',
                fontWeight: 800
              }}
            >
              <span>Total (PKR)</span>
              <span style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-heading)' }}>
                {formatCurrency(total)}
              </span>
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/checkout')}
            style={{ width: '100%' }}
          >
            <span>Proceed to Checkout</span>
            <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
