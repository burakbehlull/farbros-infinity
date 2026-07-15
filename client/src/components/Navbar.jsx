import { useNavigate, useLocation } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa6';
import { GrStatusCriticalSmall } from 'react-icons/gr';
import { IoSettingsSharp } from 'react-icons/io5';
import { Button } from '@ui';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const pages = [
    {
      name: 'Durum Paneli',
      route: '/status',
      icon: <GrStatusCriticalSmall />
    },
    {
      name: 'Yetki Paneli',
      route: '/authority',
      icon: <FaRegUser />
    },
    {
      name: 'Bot Ayarları',
      route: '/settings',
      icon: <IoSettingsSharp />
    }
  ];

  return (
    <nav className="bg-primary text-primary-foreground shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => navigate('/')}
              className="text-xl font-bold hover:opacity-80 transition-opacity"
            >
              Farbros Infinity
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {pages.map(page => (
              <Button
                key={page.route}
                variant={location.pathname === page.route ? 'secondary' : 'ghost'}
                onClick={() => navigate(page.route)}
                className="flex items-center gap-2"
              >
                {page.icon}
                {page.name}
              </Button>
            ))}
          </div>

          {/* Mobile Navigation (simplified) */}
          <div className="md:hidden flex space-x-2">
            {pages.map(page => (
              <Button
                key={page.route}
                variant="ghost"
                size="icon"
                onClick={() => navigate(page.route)}
              >
                {page.icon}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
