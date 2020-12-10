import Routes from './routes'
import AuthProvider from './context/auth'
import SocketProvider from './context/socket'
import Header from './components/header/'
import Footer from './components/footer/'

// test
import Chat from './components/chat'
function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <Chat />
        <Header />
        <Routes />
        <Footer />
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
