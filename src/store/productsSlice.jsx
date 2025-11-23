import { useMemo } from 'react';
import { createSlice } from '@reduxjs/toolkit';

// 模拟所有商品数据
const MOCK_ALL_PRODUCTS = [
  { id: 1, name: '高性能笔记本电脑 (2025款)', price: 10999, sales: 1200, category: 'Electronics', tags: ['新品', '高端'] },
  { id: 2, name: '畅销算法导论 (第4版)', price: 120, sales: 640, category: 'Books', tags: ['热销'] },
  { id: 3, name: '专业机械键盘 (红轴)', price: 899, sales: 980, category: 'Electronics', tags: ['热销'] },
  { id: 4, name: '高品质男士纯棉衬衫', price: 299, sales: 2300, category: 'Clothing', tags: ['折扣'] },
  { id: 5, name: '经典女装针织衫', price: 320, sales: 5100, category: 'Clothing', tags: ['热销'] },
  { id: 6, name: '简约风木质书架', price: 450, sales: 590, category: 'Home', tags: ['新品'] },
  { id: 7, name: '高清降噪耳机', price: 1299, sales: 349, category: 'Electronics', tags: ['折扣'] },
  { id: 8, name: '经典小说套装 (全10册)', price: 199, sales: 349, category: 'Books', tags: ['新品'] },
  { id: 9, name: '运动跑鞋 (透气款)', price: 599, sales: 510, category: 'Clothing', tags: ['折扣'] },
];

export const initialState = {
    allItems: MOCK_ALL_PRODUCTS, 
    status: 'succeeded', 
    
    // 筛选/排序/分页条件
    filterCategories: ['男装', '女装', '童装', '鞋靴'], 
    selectedCategories: [], 
    priceRange: [0, 99999], 
    sortBy: 'price',        
    sortOrder: 'desc',      
    currentPage: 1,
    pageSize: 6,            
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            const category = action.payload;
            const newCategories = state.selectedCategories.includes(category)
                ? state.selectedCategories.filter(c => c !== category)
                : [...state.selectedCategories, category];
            state.selectedCategories = newCategories;
            state.currentPage = 1; 
        },
        setPriceRange: (state, action) => {
            state.priceRange = action.payload;
            state.currentPage = 1;
        },
        setSort: (state, action) => {
            state.sortBy = action.payload.key;
            state.sortOrder = action.payload.order;
            state.currentPage = 1; 
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
});

export const { setCategory, setPriceRange, setSort, setCurrentPage } = productsSlice.actions;

export default productsSlice.reducer;

const useProductsSelectors = (state) => {
    // 基础输入
    const { allItems, selectedCategories, priceRange, sortBy, sortOrder, currentPage, pageSize } = state;

    // --- 第一步：筛选 (Filtering) ---
    const filteredItems = useMemo(() => {
        return allItems.filter(item => {
            // 1. 分类筛选 (如果未选择任何分类，则不过滤)
            const categoryMatch = selectedCategories.length === 0 || 
                                  selectedCategories.some(c => item.category.includes(c.substring(0, 2))); // 简单匹配前两位字
            
            // 2. 价格区间筛选
            const priceMatch = item.price >= priceRange[0] && item.price <= priceRange[1];

            return categoryMatch && priceMatch;
        });
    }, [allItems, selectedCategories, priceRange]);

    // --- 第二步：排序 (Sorting) ---
    const sortedAndFilteredItems = useMemo(() => {
        const sortedArray = [...filteredItems]; 

        return sortedArray.sort((a, b) => {
            let comparison = 0;
            if (a[sortBy] > b[sortBy]) comparison = 1;
            if (a[sortBy] < b[sortBy]) comparison = -1;

            return sortOrder === 'desc' ? comparison * -1 : comparison;
        });
    }, [filteredItems, sortBy, sortOrder]);

    // --- 派生：总页数和总数 ---
    const totalFilteredItemsCount = sortedAndFilteredItems.length;
    const totalPages = Math.ceil(totalFilteredItemsCount / pageSize);

    // --- 第三步：分页 (Pagination) ---
    const pagedItems = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        
        return sortedAndFilteredItems.slice(startIndex, endIndex);
    }, [sortedAndFilteredItems, currentPage, pageSize]);

    return {
        pagedItems,
        totalPages,
        totalFilteredItemsCount,
        // 其他控制状态，供子组件使用
        ...state,
    };
};
export { useProductsSelectors };