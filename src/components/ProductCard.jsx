import React from 'react';

const ProductCard = ({ product }) => (
    <div className="product-card">
        {/* 缩略图 Placeholder */}
        <div className="product-placeholder">
            缩略图
        </div>
        
        {/* 标题 */}
        <p className="product-title line-clamp-2">
            {product.name}
        </p>
        
        {/* 价格 */}
        <p className="product-price">
            价格 ¥{product.price}
        </p>

        {/* 销量 */}
        <p className="product-sales">
            销量 {product.sales ?? 0}
        </p>

        {/* 标签 */}
        <div className="product-tags">
            {Array.isArray(product.tags) ? product.tags.map((tag, index) => {
                const cls =
                    tag === '热销' ? 'tag-base tag-hot' :
                    tag === '新品' ? 'tag-base tag-new' :
                    'tag-base tag-default';
                return (
                    <span key={index} className={cls}>
                        {tag}
                    </span>
                );
            }) : null}
        </div>
    </div>
);

export default ProductCard;