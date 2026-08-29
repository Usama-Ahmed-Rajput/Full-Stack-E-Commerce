import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders, updateOrderStatus } from '../redux/slices/orderSlice';
import { useToast } from '../context/ToastContext';
import { formatCurrency, formatDate } from '../utils/formatters';
import Loader from '../components/common/Loader';
import { ArrowLeft, Eye } from 'lucide-react';

const statusOptions = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const AdminOrders = () => {
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const { allOrders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleStatusChange = async (id, status) => {
    try {
      await dispatch(updateOrderStatus({ id, status })).unwrap();
      showToast(`Order status updated to ${status}`, 'success');
    } catch (err) {
      showToast(err || 'Failed to update order status', 'error');
    }
  };

  if (loading) {
    return (
      <div className="container page-wrapper">
        <Loader text="Loading customer orders list..." />
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
        <h2>Manage Customer Orders</h2>
        <p>Total Orders Placed: {allOrders.length}</p>
      </div>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Items</th>
              <th>Total (PKR)</th>
              <th>Order Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order) => (
              <tr key={order._id}>
                <td style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '0.85rem' }}>
                  #{order._id.substring(order._id.length - 8)}
                </td>
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    {order.shippingAddress?.fullName || order.user?.name || 'Customer'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {order.shippingAddress?.email || order.user?.email}
                  </div>
                </td>
                <td>{formatDate(order.createdAt)}</td>
                <td>{order.items?.length || 0} product(s)</td>
                <td style={{ fontWeight: 800, color: 'var(--accent-primary)' }}>{formatCurrency(order.total)}</td>
                <td>
                  <select
                    className="select-field"
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem', width: 130 }}
                  >
                    {statusOptions.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <Link to={`/orders/${order._id}`} className="btn btn-secondary btn-sm" title="View Invoice">
                    <Eye size={14} />
                    <span>View</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
