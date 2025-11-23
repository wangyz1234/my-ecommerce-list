import React, { useReducer } from 'react';
import './index.css';
import Navbar from './components/Navbar.jsx';
import ProductListGrid from './components/ProductListGrid.jsx';
import FilterComponent from './components/FilterComponent.jsx';
import Pagination from './components/Pagination.jsx';
import productsReducer, { initialState, useProductsSelectors } from './store/productsSlice.jsx';

const App = () => {
  // 模拟 Redux Store (State & Dispatch)
  const [state, dispatch] = useReducer(productsReducer, initialState);
  
  // 模拟 Redux Selectors (派生数据)
  const { 
    pagedItems, 
    totalPages, 
    totalFilteredItemsCount, 
    currentPage,
    pageSize,
    status,
    sortBy,
  sortOrder
  } = useProductsSelectors(state);

  const handlePageChange = (page) => {
    dispatch({ type: 'products/setCurrentPage', payload: page });
  };

  return (
    <div className="min-h-screen bg-gray-200 font-sans">
      {/* 导航栏 */}
      <Navbar />

      <main style={{ display: 'flex', flexDirection: 'row'}}>
        {/* 筛选组件 (通用组件) */}
        <FilterComponent state={state} dispatch={dispatch} />
        
        {/* 商品列表区域 (业务组件 & 排序) */}
        <div className="flex-1 flex flex-col">
          <ProductListGrid
            pagedItems={pagedItems}
            totalItems={totalFilteredItemsCount}
            status={status}
            sortBy={sortBy}
            sortOrder={sortOrder}
            dispatch={dispatch}
          />
            
          {/* 分页器 (通用组件) */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalFilteredItemsCount}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
        </div>
      </main>
    </div>
  );
};

export default App;