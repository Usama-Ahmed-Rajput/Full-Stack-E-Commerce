import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import { useToast } from '../context/ToastContext';
import {
  Smartphone,
  Tablet,
  Watch,
  Headphones,
  Zap,
  BatteryCharging,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headset
} from 'lucide-react';
import Button from '../components/common/Button';
import CategoryCard from '../components/product/CategoryCard';
import ProductGrid from '../components/product/ProductGrid';

const Home = () => {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const { products, loading } = useSelector((state) => state.products);

  // Fetch initial featured products using useEffect (Topic 5)
  useEffect(() => {
    dispatch(fetchProducts({ limit: 8, sort: 'newest' }));
  }, [dispatch]);

  const categories = [
    { title: 'Smartphones', count: '150+', icon: Smartphone, category: 'Smartphones' },
    { title: 'Tablets & iPads', count: '45+', icon: Tablet, category: 'Tablets' },
    { title: 'Smart Watches', count: '80+', icon: Watch, category: 'Smart Watches' },
    { title: 'Wireless Earbuds', count: '120+', icon: Headphones, category: 'Earbuds' },
    { title: 'Power Banks', count: '60+', icon: BatteryCharging, category: 'Power Banks' },
    { title: 'Fast Chargers', count: '90+', icon: Zap, category: 'Chargers' }
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email) {
      showToast('Thank you for subscribing to Usama Mobiles newsletter!', 'success');
      e.target.reset();
    }
  };

  return (
    <div className="container page-wrapper">
      {/* Hero Section */}
      <section className="hero-banner">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'var(--accent-light)', color: 'var(--accent-primary)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1.25rem' }}>
          <Sparkles size={16} />
          <span>Official Pakistani Mobile & Accessories Store</span>
        </div>

        <h1 className="hero-title">
          Latest Mobiles. Genuine Accessories. Better Prices.
        </h1>
        <p className="hero-subtitle">
          Shop smartphones, accessories and smart devices from Usama Mobiles with 100% official brand warranty and fast nationwide shipping across Pakistan.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/products?category=Smartphones" className="btn btn-primary btn-lg">
            <span>Shop Mobiles</span>
            <ArrowRight size={18} />
          </Link>
          <Link to="/products" className="btn btn-secondary btn-lg">
            Explore Accessories
          </Link>
        </div>
      </section>

      {/* Popular Categories */}
      <section style={{ marginBottom: '3.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <h2>Popular Categories</h2>
            <p>Browse our wide range of authentic mobile electronics</p>
          </div>
          <Link to="/products" className="btn btn-outline btn-sm">
            View All Categories
          </Link>
        </div>

        <div className="grid-3">
          {categories.map((cat, idx) => (
            <CategoryCard key={idx} {...cat} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ marginBottom: '3.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <h2>Featured & Latest Arrivals</h2>
            <p>Handpicked authentic mobile devices and flagship accessories</p>
          </div>
          <Link to="/products" className="btn btn-outline btn-sm">
            Explore All Catalog
          </Link>
        </div>

        <ProductGrid
          products={products}
          loading={loading}
          emptyTitle="No featured products available"
          emptyDescription="Check back soon for latest arrivals."
        />
      </section>

      {/* Why Choose Us */}
      <section
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '3rem 2rem',
          marginBottom: '3.5rem',
          textAlign: 'center'
        }}
      >
        <h2 style={{ marginBottom: '0.5rem' }}>Why Choose Usama Mobiles?</h2>
        <p style={{ maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
          We take pride in providing authentic mobile technology with unbeatable customer service.
        </p>

        <div className="grid-4">
          <div>
            <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'var(--accent-light)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
              <ShieldCheck size={24} />
            </div>
            <h4 style={{ marginBottom: '0.4rem' }}>100% Genuine Warranty</h4>
            <p style={{ fontSize: '0.85rem' }}>All smartphones and accessories are 100% original PTA approved with official brand warranty.</p>
          </div>

          <div>
            <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'var(--accent-emerald-light)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
              <Truck size={24} />
            </div>
            <h4 style={{ marginBottom: '0.4rem' }}>Fast Nationwide Delivery</h4>
            <p style={{ fontSize: '0.85rem' }}>Quick courier delivery across Lahore, Karachi, Islamabad, and all cities of Pakistan.</p>
          </div>

          <div>
            <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'var(--accent-amber-light)', color: 'var(--accent-amber)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
              <RotateCcw size={24} />
            </div>
            <h4 style={{ marginBottom: '0.4rem' }}>7 Days Replacement</h4>
            <p style={{ fontSize: '0.85rem' }}>Hassle-free 7-day checking replacement policy for any technical fault.</p>
          </div>

          <div>
            <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'var(--accent-light)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
              <Headset size={24} />
            </div>
            <h4 style={{ marginBottom: '0.4rem' }}>Dedicated Support</h4>
            <p style={{ fontSize: '0.85rem' }}>Our expert team is available via WhatsApp and Phone to assist you with purchase guidance.</p>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section
        style={{
          background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-secondary) 100%)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem 1.5rem',
          textAlign: 'center'
        }}
      >
        <h2 style={{ marginBottom: '0.5rem' }}>Subscribe to Usama Mobiles Deals</h2>
        <p style={{ maxWidth: '500px', margin: '0 auto 1.5rem auto' }}>
          Get notified about price drops, new smartphone launches, and exclusive weekend discounts!
        </p>

        <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', gap: '0.5rem', maxWidth: '450px', margin: '0 auto' }}>
          <input
            type="email"
            name="email"
            required
            className="input-field"
            placeholder="Enter your email address"
            style={{ flex: 1 }}
          />
          <Button type="submit" variant="primary">
            Subscribe
          </Button>
        </form>
      </section>
    </div>
  );
};

export default Home;
