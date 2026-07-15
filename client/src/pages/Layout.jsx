import { Navbar } from '@components';

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-6">
        {children}
      </main>
    </div>
  );
}

export default Layout;
