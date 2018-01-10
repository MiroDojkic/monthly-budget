import Loadable from 'react-loadable';
import Loader from '../../components/Loader';

const AsyncMonthly = Loadable({
  loader: () => import('./component'),
  loading: Loader
});

export default AsyncMonthly;
