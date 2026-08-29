import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById } from '../redux/slices/orderSlice';
import { formatCurrency, formatDate } from '../utils/formatters';
import Loader from '../components/common/Loader';
import { ArrowLeft, MapPin, Truck, Calendar, CreditCard, ShieldCheck } from 'lucide-react';

const OrderDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentOrder, detailLoading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrderById(id));
  }, [dispatch, id]);

  if (detailLoading) {
    return (
      <div className="container page-wrapper">
        <Loader text="Loading order details..." />
      </div>
    );
  }

  if (error || !currentOrder) {
    return (
      <div className="container page-wrapper" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h3>Order Not Found</h3>
        <p style={{ margin: '1rem 0' }}>Unable to retrieve details for order #{id}</p>
        <Link to="/orders" className="btn btn-primary">
          Back to My Orders
        </Link>
      </div>
    );
  }

  const { items, shippingAddress, subtotal, shipping, total, status, createdAt } = currentOrder;

  return (
    <div className="container page-wrapper">
      <Link to="/orders" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', fontWeight: 500 }}>
        <ArrowLeft size={16} />
        <span>Back to Order History</span>
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h2>Order Invoice #{currentOrder._id}</h2>
          <p>Placed on {formatDate(createdAt)}</p>
        </div>
        <div style={{ padding: '0.5rem 1.25rem', borderRadius: 'var(--radius-full)', background: 'var(--accent-light)', color: 'var(--accent-primary)', fontWeight: 700, fontSize: '0.9rem' }}>
          Status: {status}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>
        {/* Ordered Items Table */}
        <div className="card" style={{ padding: '1.75rem' }}>
          <h3 style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
            Purchased Products
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {items.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <img src={item.image} alt={item.name} style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.name}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Qty: {item.quantity} × {formatCurrency(item.price)}
                  </div>
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                  {formatCurrency(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', marginTop: '1.5rem', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Shipping Fee</span>
              <span>{shipping === 0 ? 'FREE Shipping' : formatCurrency(shipping)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', fontSize: '1.15rem', fontWeight: 800 }}>
              <span>Grand Total</span>
              <span style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-heading)' }}>
                {formatCurrency(total)}
              </span>
            </div>
          </div>
        </div>

        {/* Shipping Address & Info */}
        <div className="card" style={{ padding: '1.75rem' }}>
          <h3 style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
            Delivery Details
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <MapPin size={20} color="var(--accent-primary)" style={{ marginTop: 2 }} />
              <div>
                <div style={{ fontWeight: 700 }}>{shippingAddress.fullName}</div>
                <div>{shippingAddress.address}</div>
                <div>{shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem' }}>
              <CreditCard size={20} color="var(--accent-emerald)" />
              <div>
                <div style={{ fontWeight: 600 }}>Payment Method</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Cash on Delivery (COD)</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem' }}>
              <ShieldCheck size={20} color="var(--accent-amber)" />
              <div>
                <div style={{ fontWeight: 600 }}>Authenticity Guaranteed</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>100% Genuine product with official warranty</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
