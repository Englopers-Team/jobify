import Routes from './routes';
import AuthProvider from './context/auth';
import SocketProvider from './context/socket';
import Header from './components/header/';
import Footer from './components/footer/';
import { BrowserRouter } from 'react-router-dom';
import './app.scss';

function App() {
  return (
            <BrowserRouter>

    <AuthProvider>
      <SocketProvider>
          <div className='page-container'>
            <div className='content-wrap'>
              <Header />
              <Routes />
            </div>
            <Footer />
          </div>
      </SocketProvider>
    </AuthProvider>
        </BrowserRouter>

  );
}

export default App;
