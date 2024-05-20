
import Tabs from './src/logic/Tabs';
import store from './src/logic/Redux/Store';
import { Provider } from 'react-redux';

export default function App() {
  return (
    <Provider store={store}>
      <Tabs />
    </Provider>
  );
}