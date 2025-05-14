// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// // Importing Components
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';

// // Importing Pages
// import Home from './pages/Home';
// import About from './pages/About';
// import Contact from './pages/Contact';
// import Services from './pages/Services';
// import NotFound from './pages/NotFound';
// import AuthPage from './pages/AuthPage';
// import Departments from './pages/Departments';
// const App = () => {
//   return (
//     <div>
//       <Router>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/services" element={<Services />} />
//           <Route path="/departments" element={<Departments />} />
//           <Route path="/auth" element={<AuthPage />} />
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//         <Footer />
//       </Router>
//     </div>
//   );
// };

// export default App;

// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Departments from './pages/Departments';
import DepartmentDetail from './pages/DepartmentDetail';
import ServiceDetail from './pages/ServiceDetail';
import NotFound from './pages/NotFound';
import AuthPage from './pages/AuthPage';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:serviceName" element={<ServiceDetail />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/departments/:departmentName" element={<DepartmentDetail />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;