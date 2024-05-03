import { FaUserTie, FaHouseUser, FaUser, FaLaptopCode } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const Card = ({ icon, title, description }) => {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-4 w-64 h-28 flex items-center space-x-3">
       <div className="text-2xl mr-4 ml-4">
          {icon === 'admin' && <FaUserTie   />}
          {icon === 'office manager' && <FaHouseUser   />}
          {icon === 'users' && <FaUser  />}
          {icon === 'desks' && <FaLaptopCode   />}
        </div>
      <div>
        <h5 className="text-lg">{title}</h5>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );
};

function ADashboard() {

  return (
    <div className="dark:bg-neutral-900" style={{ height: '100vh', overflowY: 'hidden' }}>
      <Header />
      <Sidebar />
      <div>
          <main className="container h-screen 2xl:pl-12 sm:pl-24 pt-5  dark:bg-neutral-900 dark:text-white ">
              <p className="font-light text-sm">Dashboard / Superadmin</p>
              <div className="flex flex-wrap justify-center pt-6 mt-6 border-[1px] border-neutral-300 shadow-md rounded-md space-x-6 md:flex-nowrap bg-neutral-50 h-screen">
                <Card icon="admin" title="Admins" description="No. of admins: 3" />
                <Card icon="office manager" title="Office Managers" description="No. of managers: 6" />
                <Card icon="users" title=" Users" description="No. of users: 10" />
                <Card icon="desks" title="All Desks" description="No. of desks: 20" />
              </div>
          </main>
      </div>
    </div>
  );
};

export default ADashboard;