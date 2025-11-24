import { useMemo } from 'react';
import { createSlice } from '@reduxjs/toolkit';
import mockProducts from '../data/mock.json';

export const initialState = {
  allItems: mockProducts, 
  status: 'succeeded',
  
  // 筛选/排序/分页条件
  filterCategories: Array.from(new Set(mockProducts.map(p => p.category))), 
  selectedCategories: [], 
  priceRange: [0, 99999], 
  sortBy: 'price',        
  sortOrder: 'desc',      
  currentPage: 1,
  pageSize: 10,            
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