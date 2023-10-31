import NavLogo from './NavLogo';


const Navbar = ({children}) => {

  return (
    <nav className="nav-bar">
    <NavLogo />
   {children}
  </nav>
  )
}

export default Navbar