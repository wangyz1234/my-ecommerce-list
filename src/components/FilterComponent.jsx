import React from 'react';
const FilterComponent = ({ state, dispatch }) => {
    const { filterCategories, selectedCategories, priceRange } = state;
    
    const handleCategoryToggle = (category) => {
        dispatch({ type: 'products/setCategory', payload: category });
    };

    const handlePriceChange = (index, value) => {
        const newRange = [...priceRange];
        newRange[index] = Number(value) || 0;
        dispatch({ type: 'products/setPriceRange', payload: newRange });
    };

    return (
        <div className="sidebar">
            <h2 className="filter-title">筛选区</h2>
            
            {/* 分类筛选 */}
            <div className="filter-section">
                <h3 className="filter-subtitle">分类</h3>
                {filterCategories.map(cat => (
                    <div key={cat} className="checkbox-item">
                        <input
                            type="checkbox"
                            id={cat}
                            checked={selectedCategories.includes(cat)}
                            onChange={() => handleCategoryToggle(cat)}
                        />
                        <label htmlFor={cat}>{cat}</label>
                    </div>
                ))}
            </div>

            {/* 价格区间 */}
            <div className="filter-section">
                <h3 className="filter-subtitle">价格区间</h3>
                <div className="filter-input-group">
                    <input
                        type="number"
                        placeholder="最低价"
                        value={priceRange[0] || ''}
                        onChange={(e) => handlePriceChange(0, e.target.value)}
                        className="filter-input filter-input-min"
                    />
                    <span className="filter-separator">-</span>
                    <input
                        type="number"
                        placeholder="最高价"
                        value={priceRange[1] === 99999 ? '' : priceRange[1] || ''}
                        onChange={(e) => handlePriceChange(1, e.target.value)}
                        className="filter-input filter-input-max"
                    />
                </div>
                <div className="filter-info">
                    当前: ¥{priceRange[0]} - ¥{priceRange[1] === 99999 ? '最高价' : priceRange[1]}
                </div>
            </div>
        </div>
    );
};
export default FilterComponent;