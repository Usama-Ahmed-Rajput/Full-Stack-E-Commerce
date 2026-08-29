import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, updateProduct, fetchProductById } from '../redux/slices/productSlice';
import { useToast } from '../context/ToastContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import { ArrowLeft, Save, Sparkles } from 'lucide-react';

const categoriesList = [
  'Smartphones',
  'Tablets',
  'Smart Watches',
  'Earbuds',
  'Chargers',
  'Power Banks',
  'Cases & Covers',
  'Cables'
];

const AdminProductForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { productDetail, detailLoading } = useSelector((state) => state.products);

  // Controlled form state (Topic 4)
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    description: '',
    price: '',
    oldPrice: '',
    category: 'Smartphones',
    image: '',
    stock: '10',
    rating: '4.5',
    isFeatured: false
  });

  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isEdit) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id, isEdit]);

  useEffect(() => {
    if (isEdit && productDetail) {
      setFormData({
        name: productDetail.name || '',
        brand: productDetail.brand || '',
        description: productDetail.description || '',
        price: productDetail.price ? String(productDetail.price) : '',
        oldPrice: productDetail.oldPrice ? String(productDetail.oldPrice) : '',
        category: productDetail.category || 'Smartphones',
        image: productDetail.image || '',
        stock: productDetail.stock !== undefined ? String(productDetail.stock) : '10',
        rating: productDetail.rating !== undefined ? String(productDetail.rating) : '4.5',
        isFeatured: Boolean(productDetail.isFeatured)
      });
    }
  }, [isEdit, productDetail]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Product name is required';
    if (!formData.brand.trim()) errors.brand = 'Brand is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (!formData.price || Number(formData.price) <= 0) errors.price = 'Valid price in PKR is required';
    if (!formData.image.trim()) errors.image = 'Image URL is required';
    if (formData.stock === '' || Number(formData.stock) < 0) errors.stock = 'Valid stock number is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    const payload = {
      ...formData,
      price: Number(formData.price),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : 0,
      stock: Number(formData.stock),
      rating: Number(formData.rating)
    };

    try {
      if (isEdit) {
        await dispatch(updateProduct({ id, productData: payload })).unwrap();
        showToast('Product updated successfully!', 'success');
      } else {
        await dispatch(createProduct(payload)).unwrap();
        showToast('New product created successfully!', 'success');
      }
      navigate('/admin/products');
    } catch (err) {
      showToast(err || 'Failed to save product', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (isEdit && detailLoading) {
    return (
      <div className="container page-wrapper">
        <Loader text="Loading product details for editing..." />
      </div>
    );
  }

  return (
    <div className="container page-wrapper">
      <Link to="/admin/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', fontWeight: 500 }}>
        <ArrowLeft size={16} />
        <span>Back to Product List</span>
      </Link>

      <div className="card" style={{ maxWidth: 650, margin: '0 auto', padding: '2.5rem 2rem' }}>
        <h2 style={{ marginBottom: '0.5rem' }}>{isEdit ? 'Edit Mobile Product' : 'Create New Mobile Product'}</h2>
        <p style={{ marginBottom: '1.5rem', fontSize: '0.85rem' }}>
          {isEdit ? 'Update existing product information in store inventory' : 'Add a new phone or accessory to Usama Mobiles catalog'}
        </p>

        <form onSubmit={handleSubmit}>
          <Input
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={formErrors.name}
            required
            placeholder="e.g. Apple iPhone 15 Pro Max (256GB)"
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Input
              label="Brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              error={formErrors.brand}
              required
              placeholder="e.g. Apple, Samsung, Xiaomi"
            />

            <div className="form-group">
              <label className="form-label">Category *</label>
              <select
                name="category"
                className="select-field"
                value={formData.category}
                onChange={handleChange}
              >
                {categoriesList.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Input
              label="Price (PKR Rs.)"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              error={formErrors.price}
              required
              placeholder="e.g. 485000"
            />

            <Input
              label="Old Price (Optional PKR Rs.)"
              name="oldPrice"
              type="number"
              value={formData.oldPrice}
              onChange={handleChange}
              placeholder="e.g. 510000"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Input
              label="Stock Quantity"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              error={formErrors.stock}
              required
              placeholder="10"
            />

            <Input
              label="Rating (0 - 5.0)"
              name="rating"
              type="number"
              step="0.1"
              value={formData.rating}
              onChange={handleChange}
              placeholder="4.5"
            />
          </div>

          <Input
            label="Image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
            error={formErrors.image}
            required
            placeholder="https://images.unsplash.com/photo-..."
          />

          <div className="form-group">
            <label className="form-label">Product Description *</label>
            <textarea
              name="description"
              className="textarea-field"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Detailed specifications, features, and official warranty information..."
            />
            {formErrors.description && <span className="form-error">{formErrors.description}</span>}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <input
              type="checkbox"
              id="isFeatured"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              style={{ width: 18, height: 18, cursor: 'pointer' }}
            />
            <label htmlFor="isFeatured" style={{ fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Sparkles size={16} color="var(--accent-amber)" />
              <span>Mark as Featured Product on Homepage</span>
            </label>
          </div>

          <Button type="submit" variant="primary" size="lg" loading={submitting} style={{ width: '100%' }}>
            <Save size={18} />
            <span>{isEdit ? 'Update Product' : 'Create Product'}</span>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminProductForm;
