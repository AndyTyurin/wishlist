import Layout from './component/layout/layout';
import ErrorPage from './component/error_page/error_page';
import MainPage from './component/main_page/main_page';
import WishlistPage from './component/wishlist_page/wishlist_page';

export const MAIN_PAGE_ROUTE = '/';
export const WISHLIST_PAGE_ROUTE = '/wishlist';

export const routes = [
  {
    component: Layout,
    routes: [
      {
        path: MAIN_PAGE_ROUTE,
        exact: true,
        component: MainPage,
        meta: {
          noIndex: false
        }
      },
      {
        path: WISHLIST_PAGE_ROUTE,
        exact: true,
        component: WishlistPage,
        meta: {
          noIndex: false
        }
      },
      {
        component: ErrorPage,
        path: '*',
        meta: {
          noIndex: true
        }
      }
    ]
  }
];

export default routes;
