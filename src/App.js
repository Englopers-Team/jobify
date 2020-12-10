import Routes from './routes';
import AuthProvider from './context/auth';
import SocketProvider from './context/socket';
import Header from './components/header/';
import Footer from './components/footer/';
import { BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <BrowserRouter>
          <Header />
          <Routes />
          <Footer />
        </BrowserRouter>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
