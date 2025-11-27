import { HomePage, TasksPage, ProfilePage } from './pages/index';
import { withNavigationWatcher } from './contexts/navigation';

const routes = [
  {
    path: '/tasks',
    element: TasksPage,
  },
  {
    path: '/profile',
    element: ProfilePage,
  },
  {
    path: '/home',
    element: HomePage,
  },
];

export default routes.map((route) => (
  {
    ...route,
    element: withNavigationWatcher(route.element, route.path),
  }
));
