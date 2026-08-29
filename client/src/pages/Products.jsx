import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import ProductGrid from '../components/product/ProductGrid';
import Pagination from '../components/common/Pagination';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { Search, Filter, RotateCcw } from 'lucide-react';

const categoriesList = [
  'All',
  'Smartphones',
  'Tablets',
  'Smart Watches',
  'Earbuds',
  'Chargers',
  'Power Banks',
  'Cases & Covers',
  'Cables'
];

const Products = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { products, page, pages, total, loading } = useSelector((state) => state.products);

  // Local filter states (Topic 4 state)
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('newest');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Parse URL search parameters on mount or URL change (Topic 5 useEffect)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const catParam = params.get('category');
    const searchParam = params.get('search');

    if (catParam) setCategory(catParam);
    if (searchParam) setSearch(searchParam);
  }, [location.search]);

  // Trigger Redux async thunks on filter changes
  useEffect(() => {
    const filterParams = {
      page: currentPage,
      limit: 12,
      sort
    };

    if (search.trim()) filterParams.search = search.trim();
    if (category && category !== 'All') filterParams.category = category;
    if (minPrice) filterParams.minPrice = minPrice;
    if (maxPrice) filterParams.maxPrice = maxPrice;

    dispatch(fetchProducts(filterParams));
  }, [dispatch, currentPage, category, sort, minPrice, maxPrice]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    const filterParams = { page: 1, limit: 12, sort };
    if (search.trim()) filterParams.search = search.trim();
    if (category && category !== 'All') filterParams.category = category;
    if (minPrice) filterParams.minPrice = minPrice;
    if (maxPrice) filterParams.maxPrice = maxPrice;

    dispatch(fetchProducts(filterParams));
  };

  const handleResetFilters = () => {
    setSearch('');
    setCategory('All');
    setSort('newest');
    setMinPrice('');
    setMaxPrice('');
    setCurrentPage(1);
    dispatch(fetchProducts({ page: 1, limit: 12, sort: 'newest' }));
  };

  return (
    <div className="container page-wrapper">
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h2>Usama Mobiles Catalog</h2>
        <p>Explore {total} authentic mobile phones, tablets, and original accessories</p>
      </div>

      {/* Filter Panel */}
      <div className="filter-panel">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} style={{ flex: '1 1 240px', position: 'relative' }}>
          <input
            type="text"
            className="input-field"
            placeholder="Search catalog..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '2.4rem' }}
          />
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: 12, top: 14 }} />
        </form>

        {/* Category Dropdown */}
        <div style={{ flex: '1 1 180px' }}>
          <select
            className="select-field"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setCurrentPage(1);
            }}
          >
            {categoriesList.map((cat) => (
              <option key={cat} value={cat}>
                Category: {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Dropdown */}
        <div style={{ flex: '1 1 180px' }}>
          <select
            className="select-field"
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="newest">Sort: Newest Arrivals</option>
            <option value="price_asc">Price: Low → High</option>
            <option value="price_desc">Price: High → Low</option>
            <option value="rating">Sort: Top Rated</option>
          </select>
        </div>

        {/* Price Inputs */}
        <div style={{ display: 'flex', gap: '0.4rem', flex: '1 1 200px' }}>
          <input
            type="number"
            className="input-field"
            placeholder="Min Rs."
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            style={{ fontSize: '0.85rem' }}
          />
          <input
            type="number"
            className="input-field"
            placeholder="Max Rs."
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            style={{ fontSize: '0.85rem' }}
          />
        </div>

        {/* Reset Button */}
        <Button variant="secondary" size="sm" onClick={handleResetFilters} title="Reset Filters">
          <RotateCcw size={16} />
          <span>Reset</span>
        </Button>
      </div>

      {/* Category Pills Bar */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '2rem' }}>
        {categoriesList.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setCategory(cat);
              setCurrentPage(1);
            }}
            style={{
              padding: '0.4rem 0.9rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-color)',
              background: category === cat ? 'var(--accent-primary)' : 'var(--bg-surface)',
              color: category === cat ? 'white' : 'var(--text-primary)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <ProductGrid
        products={products}
        loading={loading}
        emptyTitle="No products match your criteria"
        emptyDescription="Try clearing your filters or searching for something else."
      />

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={pages}
        onPageChange={(p) => setCurrentPage(p)}
      />
    </div>
  );
};

export default Products;
