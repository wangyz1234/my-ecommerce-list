import React from 'react';
import ProductCard from './ProductCard.jsx';

const SortIndicator = ({ keyName, sortBy, sortOrder }) => {
    const isAsc = (key) => sortBy === key && sortOrder === 'asc';
    const isDesc = (key) => sortBy === key && sortOrder === 'desc';    
    let icon = '';
    if (isAsc(keyName)) icon = '↑';
    else if (isDesc(keyName)) icon = '↓';
    return <span className="sort-indicator">{icon}</span>;
}

const ProductListGrid = ({ pagedItems, totalItems, status, sortBy, sortOrder, dispatch }) => {
  const handleSortClick = (key) => {
    let newOrder = 'asc';
    if (sortBy === key) {
      newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    }
    // 派发 setSort action
    dispatch({ type: 'products/setSort', payload: { key, order: newOrder } });
  };

  const items = Array.isArray(pagedItems) ? pagedItems : [];

  return (
    <div className="product-grid-container">
      {/* 排序控制 */}
      <div className="sort-controls">
        <span className="label">排序:</span>
        <button
          onClick={() => handleSortClick('price')}
          className={`sort-button ${sortBy === 'price' ? 'active' : ''}`}
        >
          价格 <SortIndicator keyName="price" sortBy={sortBy} sortOrder={sortOrder} />
        </button>
        <button
          onClick={() => handleSortClick('sales')}
          className={`sort-button ${sortBy === 'sales' ? 'active' : ''}`}
        >
          销量 <SortIndicator keyName="sales" sortBy={sortBy} sortOrder={sortOrder} />
        </button>
        <span className="item-count">共找到 {totalItems} 件商品</span>
      </div>

      {/* 列表内容区域 */}
      <div className="product-grid-wrapper">
        {status === 'loading' && <div className="loading-state">加载中...</div>}
        {status === 'succeeded' && items.length === 0 && (
          <div className="empty-state">未找到匹配的商品</div>
        )}

        <div className="product-grid">
          {items.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListGrid;