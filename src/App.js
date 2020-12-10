import Routes from './routes'
import AuthProvider from './context/auth'
import SocketProvider from './context/socket'
import Header from './components/header/'
import Footer from './components/footer/'
import {Link} from 'react-router-dom'

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <Header />
        <Routes />
        <Link to={{ pathname: '/login'}}>test</Link>
        <Footer />
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
