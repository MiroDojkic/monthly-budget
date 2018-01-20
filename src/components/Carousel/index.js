import Loadable from 'react-loadable';
import Loader from './Loader';

const AsyncCarousel = Loadable({
  loader: () => import('./component'),
  loading: Loader
});

export default AsyncCarousel;
