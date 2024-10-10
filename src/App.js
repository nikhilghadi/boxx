import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import AppRoutes from './routes';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './redux/store'
import Navbar from './components/Navbar'
function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
        <ChakraProvider>
      <Navbar  />

          <AppRoutes/>
        </ChakraProvider>
        </BrowserRouter>
      </Provider>
      
    </div>
  );
}

export default App;
