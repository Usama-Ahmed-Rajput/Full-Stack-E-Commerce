import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCartItems,
  selectCartSubtotal,
  selectCartShipping,
  selectCartTotal
} from '../redux/slices/cartSlice';
import { createOrder } from '../redux/slices/orderSlice';
import { useToast } from '../context/ToastContext';
import { formatCurrency } from '../utils/formatters';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { ShieldCheck, Truck, CreditCard, CheckCircle } from 'lucide-react';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { user } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.orders);

  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const shipping = useSelector(selectCartShipping);
  const total = useSelector(selectCartTotal);

  // Controlled form state (Topic 4)
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: 'Lahore',
    postalCode: '54000',
    country: 'Pakistan'
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!formData.email.trim()) errors.email = 'Email address is required';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required (e.g. 03001234567)';
    if (!formData.address.trim()) errors.address = 'Delivery address is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.postalCode.trim()) errors.postalCode = 'Postal code is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (!cartItems || cartItems.length === 0) {
      showToast('Your cart is empty', 'error');
      navigate('/cart');
      return;
    }

    const orderPayload = {
      items: cartItems.map((item) => ({
        product: item.product._id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        image: item.product.image
      })),
      shippingAddress: formData,
      subtotal,
      shipping,
      total
    };

    try {
      const resultAction = await dispatch(createOrder(orderPayload)).unwrap();
      showToast('Order placed successfully! Thank you for shopping with Usama Mobiles.', 'success');
      navigate('/orders');
    } catch (err) {
      showToast(err || 'Failed to place order', 'error');
    }
  };

  if (!cartItems || cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container page-wrapper">
      <div style={{ marginBottom: '2rem' }}>
        <h2>Checkout & Shipping</h2>
        <p>Complete your delivery address details to place your mobile order</p>
      </div>

      {error && (
        <div style={{ background: 'var(--accent-rose-light)', color: 'var(--accent-rose)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontWeight: 600 }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>
        {/* Delivery Address Form */}
        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
            Shipping Information
          </h3>

          <Input
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            error={formErrors.fullName}
            required
            placeholder="e.g. Usama Khan"
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={formErrors.email}
              required
              placeholder="usama@example.com"
            />

            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              error={formErrors.phone}
              required
              placeholder="0300 1234567"
            />
          </div>

          <Input
            label="Street Address / House No / Area"
            name="address"
            value={formData.address}
            onChange={handleChange}
            error={formErrors.address}
            required
            placeholder="e.g. House #14, Street 5, Gulberg III"
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <Input
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              error={formErrors.city}
              required
              placeholder="Lahore"
            />

            <Input
              label="Postal Code"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              error={formErrors.postalCode}
              required
              placeholder="54000"
            />

            <Input
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              disabled
              required
            />
          </div>

          <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <CreditCard size={24} color="var(--accent-emerald)" />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Cash on Delivery (COD)</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Pay cash to courier upon inspecting your packed package.</div>
            </div>
          </div>
        </div>

        {/* Order Review & Submit */}
        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
            Order Items ({cartItems.length})
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem', maxHeight: 300, overflowY: 'auto' }}>
            {cartItems.map(({ product, quantity }) => (
              <div key={product._id} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <img src={product.image} alt={product.name} style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{product.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Qty: {quantity} × {formatCurrency(product.price)}</div>
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                  {formatCurrency(product.price * quantity)}
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span>Shipping Fee</span>
              <span style={{ color: shipping === 0 ? 'var(--accent-emerald)' : 'inherit', fontWeight: 600 }}>
                {shipping === 0 ? 'FREE Shipping' : formatCurrency(shipping)}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem', fontSize: '1.25rem', fontWeight: 800 }}>
              <span>Total Payable</span>
              <span style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-heading)' }}>
                {formatCurrency(total)}
              </span>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            style={{ width: '100%' }}
          >
            <CheckCircle size={20} />
            <span>Place Mobile Order</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
