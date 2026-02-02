import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import ChatbotLauncher from './ChatbotLauncher';

function Navbar() {
  const [isMenuOpen, setIsManuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const toggleMenu = () => setIsManuOpen(!isMenuOpen);
  const { isAuthenticated } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?keyword=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      navigate(`/products`)
    }
    setSearchQuery("");
    setIsSearchOpen(false);
  }
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-950/80 backdrop-blur-md border-b border-indigo-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="flex justify-between items-center h-16">
          <div className='hover:bg-black/10 hover:shadow-xl rounded-full py-1 px-2'>
            <Link to="/" onClick={() => setIsManuOpen(false)} className="text-xl md:text-bold sm:text-semibold font-extrabold text-indigo-700 tracking-wide" >
              QuickShop
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium m-12">
            <Link className="text-white hover:text-indigo-500 hover:bg-white/10 rounded-full py-2 px-3 transition" to="/" onClick={() => setIsManuOpen(false)}>Home</Link>
            <Link className="text-white hover:text-indigo-500 hover:bg-white/10 rounded-full py-2 px-3 transition" to="/products">Products</Link>
            <Link className="text-white hover:text-indigo-500 hover:bg-white/10 rounded-full py-2 px-3 transition" to="/about">About</Link>
            <Link className="text-white hover:text-indigo-500 hover:bg-white/10 rounded-full py-2 px-3 transition" to="/contact">Contact</Link>
          </div>
          <div className="flex items-center gap-3  px-25">
            <form onSubmit={handleSearchSubmit} className={`relative transition-all duration-300 ${isSearchOpen ? "w-56" : "w-10"}`}>
              <input type="text" placeholder="Search Products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={`absolute right-0 top-1/2 -translate-y-1/2 h-10 rounded-full border border-gray-200 bg-white px-4 text-sm outline-none transition-all duration-300 ${isSearchOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} />
              <button type="button" onClick={toggleSearch} className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-950/50 text-black">
                <SearchIcon />
              </button>
            </form>
            {isAuthenticated && (<Link to="/cart" className="relative">
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-3 w-5 h-5 text-xs bg-indigo-700 text-white rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
              <ShoppingCartIcon className="text-white hover:text-blue-400 transition" />
            </Link>)}
            {!isAuthenticated && (
              <Link to="/register"
                className="md:flex items-center gap-1 px-5 py-2 rounded-full bg-teal-700/70 text-black/80 hover:text-black/90 text-sm font-medium shadow hover:opacity-90 transition">
                Register
              </Link>
            )}
            <button onClick={toggleMenu} className="md:hidden p-2 pr-2 rounded-lg bg-white/80 hover:bg-white/30">
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-gray-100">
            <Link onClick={() => setIsManuOpen(false)} className="block text-white" to="/">Home</Link>
            <Link onClick={() => setIsManuOpen(false)} className="block text-white" to="/products">Products</Link>
            <Link onClick={() => setIsManuOpen(false)} className="block text-white" to="/about">About</Link>
            <Link onClick={() => setIsManuOpen(false)} className="block text-white" to="/contact">Contact</Link>
          </div>
        )}
      </div>
      {/* <ChatbotLauncher /> */}
    </nav>
  )
}

export default Navbar