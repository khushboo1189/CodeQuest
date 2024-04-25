import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Problems from './pages/Problems';
import Navbar from './components/Navbar';
import About from './pages/About';
import Authentication from './pages/Authentication';
import NotFound from './pages/NotFound';

export default function App() {
    return (
    <Router>
      {window.location.pathname !== "/authentication" ? <Navbar/> : null}
      <div>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/problems" element={<Problems/>} />
          <Route path="/about" element={<About />} />
          <Route path="/authentication" element={<Authentication />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

