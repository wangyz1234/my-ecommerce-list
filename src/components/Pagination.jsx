import React from 'react';

const Pagination = ({ currentPage, totalPages, totalItems, pageSize, onPageChange }) => {
    if (totalPages <= 1) return null;

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div className="pagination-container">
            <div className="pagination-info">
                {currentPage} / {totalPages} 页 | 总共 {totalItems} 件商品 | 每页数量: {pageSize}
            </div>
            
            <button 
                onClick={() => handlePageChange(currentPage - 1)} 
                disabled={currentPage === 1}
                className="pagination-button pagination-prev"
            >
                &larr; 上一页
            </button>
            <button 
                onClick={() => handlePageChange(currentPage + 1)} 
                disabled={currentPage === totalPages}
                className="pagination-button pagination-next"
            >
                下一页 &rarr;
            </button>
        </div>
    );
};
export default Pagination;