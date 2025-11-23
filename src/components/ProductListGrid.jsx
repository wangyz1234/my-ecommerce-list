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
        dispatch({ type: 'products/setSort', payload: { key, order: newOrder } });
    };

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
                
                {/* 状态反馈 */}
                {status === 'loading' && (
                    <div className="loading-state">加载中: 列表骨架卡片占位...</div>
                )}
                
                {status === 'succeeded' && pagedItems.length === 0 && (
                    <div className="empty-state">
                        空态: 未命中筛选条件时显示此空态信息。请尝试修改条件或返回。
                    </div>
                )}
                
                {/* Grid 布局渲染商品卡片 */}
                <div className="product-grid">
                    {pagedItems.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* 底部填充，保持高度 */}
                <div style={{ height: '1rem' }}></div> 
            </div>
        </div>
    );
};
export default ProductListGrid;