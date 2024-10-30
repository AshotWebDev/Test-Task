import React, { useMemo, useState, useEffect, useCallback } from 'react';
import Card from '../../../../components/Card/Card';
import './Products.css';
import FilterPanel from '../../../../components/FilterPanel/FilterPanel';
import { ClipLoader } from 'react-spinners';

const mockData = [
    {
      "id": 1,
      "name": "Wireless Headphones",
      "category": "Electronics",
      "brand": "Brand A",
      "price": 99.99,
      "rating": 4.5,
      "imageUrl": "https://example.com/images/headphones.jpg"
    },
    {
      "id": 2,
      "name": "Bluetooth Speaker",
      "category": "Electronics",
      "brand": "Brand B",
      "price": 49.99,
      "rating": 4.0,
      "imageUrl": "https://example.com/images/speaker.jpg"
    },
    {
      "id": 3,
      "name": "Running Shoes",
      "category": "Footwear",
      "brand": "Brand C",
      "price": 59.99,
      "rating": 4.2,
      "imageUrl": "https://example.com/images/shoes.jpg"
    },
    {
      "id": 4,
      "name": "Smartphone",
      "category": "Electronics",
      "brand": "Brand D",
      "price": 499.99,
      "rating": 4.8,
      "imageUrl": "https://example.com/images/smartphone.jpg"
    },
    {
      "id": 5,
      "name": "Leather Jacket",
      "category": "Clothing",
      "brand": "Brand E",
      "price": 199.99,
      "rating": 4.7,
      "imageUrl": "https://example.com/images/jacket.jpg"
    }
  ]

const Products = () => {
  const [filters, setFilters] = useState(() => {
    const savedFilters = localStorage.getItem('filters');
    return savedFilters ? JSON.parse(savedFilters) : {
      category: '',
      priceRange: [0, 500],
      brand: '',
      rating: 0,
    };
  });
  
  const [loading, setLoading] = useState(false);

  const debounceFilter = useCallback((newFilters) => {
    setLoading(true);
    const timer = setTimeout(() => {
      setFilters(newFilters);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('filters', JSON.stringify(filters));
  }, [filters]);

  const filteredProducts = useMemo(() => {
    return mockData.filter((product) => {
      return (
        (!filters.category || product.category === filters.category) &&
        (!filters.brand || product.brand === filters.brand) &&
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1] &&
        product.rating >= filters.rating
      );
    });
  }, [filters]);

  return (
    <div className="products">
      <FilterPanel filters={filters} setFilters={setFilters} debounceFilter={debounceFilter} />
      {loading ? (
        <div className="spinner">
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </div>
      ) : (
        <div className="product-items">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => <Card key={product.id} product={product} />)
          ) : (
            <p>No products found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
