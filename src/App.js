import './App.css';
import Home from './pages/Home'
import { ChakraProvider } from '@chakra-ui/react'
import AppRoutes from './routes';
import {BrowserRouter} from 'react-router-dom'
function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <ChakraProvider>
        <AppRoutes/>
      </ChakraProvider>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
