import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

function ADashboard() {

  return (
    <div className="dark:bg-neutral-900" style={{ height: '100vh', overflowY: 'hidden' }}>
      <Header />
      <Sidebar />
      <div>
          <main className="container h-screen 2xl:pl-12 sm:pl-24 pt-5  dark:bg-neutral-900 dark:text-white">
              <p className="font-light text-sm">Dashboard / Superadmin</p>
          </main>
      </div>
    </div>
  );
};

export default ADashboard;