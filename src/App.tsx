import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/global.css';

const App = () => {
  // Use basename from Vite config or fallback to '/'
  const basename = import.meta.env.BASE_URL || '/';

  return (
    <Router basename={basename}>
      <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-white">
        <Header />
        <main className="flex-grow w-full pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* Fallbacks in case base path is included directly in route */}
            <Route path="/my-portofolio/" element={<Home />} />
            <Route path="/my-portofolio/projects" element={<Projects />} />
            <Route path="/my-portofolio/about" element={<About />} />
            <Route path="/my-portofolio/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
