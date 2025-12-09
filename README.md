# my-ecommerce-list

项目概述
---
my-ecommerce-list 是一个轻量级的前端示例项目，展示商品列表页面的常见功能（筛选、排序、分页、响应式网格等）。数据来自项目内的 Mock 数据，UI 使用项目的全局样式（src/index.css），并通过本地的产品状态模块提供筛选/排序/分页逻辑。

主要功能
---
- 商品列表展示（ProductCard）
- 固定布局：每页 2 行 × 5 列（共 10 个商品），在视口过小时可横向滚动查看
- 筛选：按分类、价格区间筛选
- 排序：按价格或销量排序
- 分页：与布局一致的每页 10 项
- Mock 数据驱动（位于 src/store/productsSlice.jsx 或相应数据文件）
- 样式集中在 src/index.css（可替代 Tailwind 类）

技术栈
---
### 前端框架与库
- **React 18+** — UI 组件库，使用 Hooks（useReducer、useMemo）进行状态管理与性能优化
- **Redux Toolkit** — 简化 Redux 使用，提供 createSlice、configureStore 等 API
- **React-Redux** — Redux 与 React 的绑定层（useSelector、useDispatch）

### 样式与响应式
- **CSS Grid** — 响应式网格布局（5 列 × 2 行，支持窄视口横向滚动）
- **CSS 变量（Custom Properties）** — 集中管理卡片宽高、间距、列数等参数
- **媒体查询（@media）** — 视口自适应布局

### 构建与开发工具
- **Vite** — 高效的前端构建工具与开发服务器
- **Node.js & npm** — 包管理与脚本运行环境

### 状态管理模式
- **useReducer Hook** — 本地状态管理（配合 Redux Toolkit 的 reducer 逻辑）
- **选择器模式（Selectors）** — 通过 useProductsSelectors 派生数据（筛选、排序、分页）
- **Mock 数据** — MOCK_ALL_PRODUCTS 常量模拟后端商品列表

项目结构（关键文件）
---
- src/App.jsx — 应用入口，组合各组件并提供模拟状态
- src/index.css — 全局样式，负责网格与卡片布局
- src/components/
  - Navbar.jsx
  - ProductListGrid.jsx
  - ProductCard.jsx
  - FilterComponent.jsx
  - Pagination.jsx
- src/store/productsSlice.jsx — 产品数据、初始状态、筛选/排序/分页逻辑（导出 reducer、initialState、useProductsSelectors）

快速上手
---
1. 进入项目根目录：
   ```bash
   cd /d d:\Zijie\my-ecommerce-list
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 启动开发服务器：
   ```bash
   npm run dev
   ```

4. 浏览器打开开发服务器地址（通常为 http://localhost:5173 或终端输出的地址）。

常见调整
---
- 修改每页数量（pageSize）：编辑 src/store/productsSlice.jsx 中 initialState 的 pageSize（默认与 2×5 布局对应为 10）。
- 调整卡片尺寸或列数：修改 src/index.css 中 :root 的变量（--card-width、--card-height、--grid-columns、--card-gap）。
- 若需启用真实后端数据：替换 productsSlice 的 mock 数据加载逻辑为异步请求，并在 fulfilled 时确保 items 始终为数组（Array.isArray 校验）。