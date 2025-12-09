import './index.css';
import Navbar from './components/Navbar.jsx';
import ProductListGrid from './components/ProductListGrid.jsx';
import FilterComponent from './components/FilterComponent.jsx';
import Pagination from './components/Pagination.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useProductsSelectors } from './store/productsSlice.jsx';
import { setCurrentPage } from './store/productsSlice';
const App = () => {
  const dispatch = useDispatch();

  // 从 Redux store 读取原始状态
  const state = useSelector(state => state.products);

  // 使用 selector 派生计算数据（筛选、排序、分页）
  const {
    pagedItems,
    totalFilteredItemsCount,
    totalPages,
  } = useProductsSelectors(state);

  // 从 state 直接读取当前页、排序条件、状态等
  const { currentPage, sortBy, sortOrder, status, pageSize } = state;

  // 分页处理
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      dispatch(setCurrentPage(page));
    }
  };

  return (
    <div>
      {/* 导航栏 */}
      <Navbar />

      <main style={{ display: 'flex', flexDirection: 'row' }}>
        {/* 筛选组件：传递 state 和 dispatch，组件内部调用 reducer */}
        <FilterComponent state={state} dispatch={dispatch} />

        {/* 商品列表区域 */}
        <div className="flex-1 flex flex-col">
          <ProductListGrid
            pagedItems={pagedItems}
            totalItems={totalFilteredItemsCount}
            status={status}
            sortBy={sortBy}
            sortOrder={sortOrder}
            dispatch={dispatch}
          />

          {/* 分页器 */}
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