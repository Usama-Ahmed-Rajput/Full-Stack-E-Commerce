import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../redux/slices/productSlice';
import { useToast } from '../context/ToastContext';
import { formatCurrency } from '../utils/formatters';
import Loader from '../components/common/Loader';
import Button from '../components/common/Button';
import { Plus, Edit, Trash2, ArrowLeft } from 'lucide-react';

const AdminProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ limit: 100 }));
  }, [dispatch]);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}" from Usama Mobiles catalog?`)) {
      try {
        await dispatch(deleteProduct(id)).unwrap();
        showToast(`Successfully deleted ${name}`, 'success');
      } catch (err) {
        showToast(err || 'Failed to delete product', 'error');
      }
    }
  };

  if (loading) {
    return (
      <div className="container page-wrapper">
        <Loader text="Loading catalog management..." />
      </div>
    );
  }

  return (
    <div className="container page-wrapper">
      <Link to="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', fontWeight: 500 }}>
        <ArrowLeft size={16} />
        <span>Back to Admin Dashboard</span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2>Manage Products Catalog</h2>
          <p>Total Products in Inventory: {products.length}</p>
        </div>

        <Link to="/admin/products/new" className="btn btn-primary">
          <Plus size={18} />
          <span>Add New Product</span>
        </Link>
      </div>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Price (PKR)</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <img src={product.image} alt={product.name} style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                </td>
                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{product.name}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td style={{ fontWeight: 700 }}>{formatCurrency(product.price)}</td>
                <td>
                  <span style={{ color: product.stock <= 0 ? 'var(--accent-rose)' : 'var(--accent-emerald)', fontWeight: 600 }}>
                    {product.stock <= 0 ? 'Out of Stock' : product.stock}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button
                      onClick={() => navigate(`/admin/products/${product._id}/edit`)}
                      className="btn btn-secondary btn-sm"
                      title="Edit Product"
                    >
                      <Edit size={14} />
                    </button>

                    <button
                      onClick={() => handleDelete(product._id, product.name)}
                      className="btn btn-danger btn-sm"
                      title="Delete Product"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
