import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, MapPin, Phone, Mail, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        {/* Value Propositions */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid var(--border-color)',
            marginBottom: '2.5rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '0.75rem', background: 'var(--accent-light)', borderRadius: 'var(--radius-md)', color: 'var(--accent-primary)' }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem' }}>100% Genuine Products</h4>
              <p style={{ fontSize: '0.8rem' }}>Authentic warranty & box packed</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '0.75rem', background: 'var(--accent-emerald-light)', borderRadius: 'var(--radius-md)', color: 'var(--accent-emerald)' }}>
              <Truck size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem' }}>Fast Nationwide Delivery</h4>
              <p style={{ fontSize: '0.8rem' }}>Free shipping over Rs. 10,000</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '0.75rem', background: 'var(--accent-amber-light)', borderRadius: 'var(--radius-md)', color: 'var(--accent-amber)' }}>
              <RotateCcw size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem' }}>Easy 7-Day Returns</h4>
              <p style={{ fontSize: '0.8rem' }}>Hassle-free replacement policy</p>
            </div>
          </div>
        </div>

        {/* Footer Links Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
          <div>
            <div className="brand-logo" style={{ marginBottom: '1rem' }}>
              <Smartphone size={24} color="var(--accent-primary)" />
              <span>Usama Mobiles</span>
            </div>
            <p style={{ fontSize: '0.85rem', marginBottom: '1rem', lineHeight: 1.6 }}>
              Your trusted online destination for authentic smartphones, tablets, smart watches, earbuds, and genuine mobile accessories in Pakistan.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Shop Categories</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
              <li><Link to="/products?category=Smartphones" style={{ color: 'var(--text-secondary)' }}>Smartphones</Link></li>
              <li><Link to="/products?category=Tablets" style={{ color: 'var(--text-secondary)' }}>Tablets & iPads</Link></li>
              <li><Link to="/products?category=Smart+Watches" style={{ color: 'var(--text-secondary)' }}>Smart Watches</Link></li>
              <li><Link to="/products?category=Earbuds" style={{ color: 'var(--text-secondary)' }}>Wireless Earbuds</Link></li>
              <li><Link to="/products?category=Power+Banks" style={{ color: 'var(--text-secondary)' }}>Power Banks & Chargers</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
              <li><Link to="/products" style={{ color: 'var(--text-secondary)' }}>All Catalog</Link></li>
              <li><Link to="/cart" style={{ color: 'var(--text-secondary)' }}>Shopping Cart</Link></li>
              <li><Link to="/orders" style={{ color: 'var(--text-secondary)' }}>Order Tracking</Link></li>
              <li><Link to="/login" style={{ color: 'var(--text-secondary)' }}>Account Login</Link></li>
              <li><Link to="/register" style={{ color: 'var(--text-secondary)' }}>Create Account</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Store Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={16} color="var(--accent-primary)" />
                <span>Hafeez Center, Main Boulevard, Gulberg III, Lahore, Pakistan</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={16} color="var(--accent-primary)" />
                <span>+92 300 1234567 / (042) 35789012</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={16} color="var(--accent-primary)" />
                <span>support@usamamobiles.pk</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} Usama Mobiles. All rights reserved. Full-Stack Academic Assignment Project.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
