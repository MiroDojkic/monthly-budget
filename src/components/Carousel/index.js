import Loadable from 'react-loadable';
import Loader from '../../components/Loader';

const AsyncCarousel = Loadable({
  loader: () => import('./component'),
  loading: Loader
});

export default AsyncCarousel;
