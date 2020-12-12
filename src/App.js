import Routes from './routes'
import AuthProvider from './context/auth'
import SocketProvider from './context/socket'
import Header from './components/header/'
import Footer from './components/footer/'

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <Header />
        <Routes />
        <Footer />
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
