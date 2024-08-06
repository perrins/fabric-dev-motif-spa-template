// Importing Renderer
import renderer from './AppRenderer';

const render = () => {
  import('./main.scss').then(() => {
    renderer();
  });
};
render();
