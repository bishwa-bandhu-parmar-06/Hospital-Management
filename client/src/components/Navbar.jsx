import { NavLink } from 'react-router-dom';
import logoImage from '../assets/mainLogo.png';

const Navbar = () => {
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "bg-secondary text-background px-3 py-2 rounded-md"
      : "text-secondary px-3 py-2 hover:bg-secondary hover:text-background rounded-md";

  return (
    <div>
      <nav className="sticky top-0 z-50">
        <div className="w-full h-20 bg-accentlight flex justify-around items-center">
          <div className="flex items-center justify-between w-full">
            <div className="w-60 h-20 flex items-center justify-center">
              <NavLink to="/">
                <img src={logoImage} alt="Logo" className="w-full" />
              </NavLink>
            </div>
            <div className="w-auto h-20 flex items-center justify-center">
              <ul className="flex gap-6 font-medium text-base">
                <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
                <li><NavLink to="/services" className={navLinkClass}>Services</NavLink></li>
                <li><NavLink to="/departments" className={navLinkClass}>Departments</NavLink></li>
                <li><NavLink to="/about" className={navLinkClass}>About</NavLink></li>
                <li><NavLink to="/contact" className={navLinkClass}>Contact</NavLink></li>
                <li className="mr-4"><NavLink to="/auth" className={navLinkClass}>Signin/Signup</NavLink></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;