// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import Header from './components/Header'; // Keep using Header
import Footer from './components/Footer';
import './styles/global.css';

const App = () => (
  <Router>
    <Header /> {/* Header component */}
    <main className="w-full px-4 min-h-screen">
      <div className="container mx-auto">
        <Routes>
          <Route path="/my-portofolio/" element={<Home />} />
          <Route path="/my-portofolio/projects" element={<Projects />} />
          <Route path="/my-portofolio/about" element={<About />} />
          <Route path="/my-portofolio/contact" element={<Contact />} />
        </Routes>
      </div>
    </main>

    <Footer /> {/* Footer component */}
  </Router>
);

export default App;
