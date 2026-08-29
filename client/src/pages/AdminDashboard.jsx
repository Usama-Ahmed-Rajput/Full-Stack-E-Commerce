import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiCall } from '../utils/api';
import { formatCurrency } from '../utils/formatters';
import Loader from '../components/common/Loader';
import {
  Package,
  Users,
  ShoppingCart,
  Clock,
  TrendingUp,
  PlusCircle,
  Shield,
  ArrowRight
} from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await apiCall('/admin/stats', 'GET');
        setStats(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="container page-wrapper">
        <Loader text="Loading Admin Store Analytics..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container page-wrapper" style={{ textAlign: 'center', padding: '3rem' }}>
        <h3>Error Loading Admin Dashboard</h3>
        <p style={{ color: 'var(--accent-rose)' }}>{error}</p>
      </div>
    );
  }

  const statCards = [
    { title: 'Total Products', value: stats.totalProducts, icon: Package, color: 'var(--accent-primary)', link: '/admin/products' },
    { title: 'Total Users', value: stats.totalUsers, icon: Users, color: 'var(--accent-emerald)', link: '/admin/users' },
    { title: 'Total Orders', value: stats.totalOrders, icon: ShoppingCart, color: 'var(--accent-amber)', link: '/admin/orders' },
    { title: 'Pending Orders', value: stats.pendingOrders, icon: Clock, color: 'var(--accent-rose)', link: '/admin/orders' },
    { title: 'Total Revenue', value: formatCurrency(stats.totalRevenue), icon: TrendingUp, color: '#8b5cf6', link: '/admin/orders' }
  ];

  return (
    <div className="container page-wrapper">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-amber)', fontWeight: 700, fontSize: '0.85rem' }}>
            <Shield size={16} />
            <span>Usama Mobiles Control Center</span>
          </div>
          <h2>Admin Management Dashboard</h2>
        </div>

        <Link to="/admin/products/new" className="btn btn-primary">
          <PlusCircle size={18} />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Analytics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link key={idx} to={card.link} className="card card-hover" style={{ padding: '1.5rem', textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{card.title}</span>
                <div style={{ width: 42, height: 42, borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', color: card.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={22} />
                </div>
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
                {card.value}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid-3">
        <Link to="/admin/products" className="card card-hover" style={{ textDecoration: 'none' }}>
          <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>Manage Product Catalog</span>
            <ArrowRight size={20} />
          </h3>
          <p style={{ fontSize: '0.85rem' }}>Create, update price, edit stock, or remove smartphones and accessories from store inventory.</p>
        </Link>

        <Link to="/admin/orders" className="card card-hover" style={{ textDecoration: 'none' }}>
          <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>Manage Customer Orders</span>
            <ArrowRight size={20} />
          </h3>
          <p style={{ fontSize: '0.85rem' }}>Review incoming orders, change delivery status (Pending → Processing → Shipped → Delivered).</p>
        </Link>

        <Link to="/admin/users" className="card card-hover" style={{ textDecoration: 'none' }}>
          <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>Manage Store Users</span>
            <ArrowRight size={20} />
          </h3>
          <p style={{ fontSize: '0.85rem' }}>View registered store users, customer emails, registration dates, and assigned authorization roles.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
