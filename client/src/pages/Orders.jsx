import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyOrders } from '../redux/slices/orderSlice';
import { formatCurrency, formatDate } from '../utils/formatters';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState';
import { Package, Eye, Clock, CheckCircle2, Truck, AlertCircle } from 'lucide-react';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return <span className="badge badge-pending"><Clock size={12} /> Pending</span>;
      case 'Processing':
        return <span className="badge badge-processing"><Clock size={12} /> Processing</span>;
      case 'Shipped':
        return <span className="badge badge-shipped"><Truck size={12} /> Shipped</span>;
      case 'Delivered':
        return <span className="badge badge-delivered"><CheckCircle2 size={12} /> Delivered</span>;
      case 'Cancelled':
        return <span className="badge badge-cancelled"><AlertCircle size={12} /> Cancelled</span>;
      default:
        return <span className="badge">{status}</span>;
    }
  };

  if (loading) {
    return (
      <div className="container page-wrapper">
        <Loader text="Fetching your mobile orders history..." />
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="container page-wrapper">
        <EmptyState
          icon={Package}
          title="No Orders Placed Yet"
          description="You haven't placed any orders with Usama Mobiles yet. Explore our latest mobile catalog!"
          actionText="Browse Products"
          onAction={() => window.location.href = '/products'}
        />
      </div>
    );
  }

  return (
    <div className="container page-wrapper">
      <div style={{ marginBottom: '2rem' }}>
        <h2>My Order History</h2>
        <p>Track your current mobile deliveries and view previous purchases</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {orders.map((order) => (
          <div key={order._id} className="card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Order Reference</div>
                <div style={{ fontWeight: 700, fontFamily: 'monospace', fontSize: '0.95rem' }}>#{order._id}</div>
              </div>

              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Order Date</div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{formatDate(order.createdAt)}</div>
              </div>

              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Amount</div>
                <div style={{ fontWeight: 800, color: 'var(--accent-primary)', fontSize: '1.05rem' }}>{formatCurrency(order.total)}</div>
              </div>

              <div>{getStatusBadge(order.status)}</div>

              <Link to={`/orders/${order._id}`} className="btn btn-secondary btn-sm">
                <Eye size={16} />
                <span>View Details</span>
              </Link>
            </div>

            {/* Item thumbnails */}
            <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', alignItems: 'center' }}>
              {order.items.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-secondary)', padding: '0.4rem 0.75rem', borderRadius: 'var(--radius-md)' }}>
                  <img src={item.image} alt={item.name} style={{ width: 36, height: 36, objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, maxWidth: 160, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.name}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>×{item.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
