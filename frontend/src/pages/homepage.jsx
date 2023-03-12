import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';

const Home = () => {
  const navigate = useNavigate();

  function handleStartSearchingClick() {
    navigate('/ucla-listings');
  }

  return (
    <div className="relative flex flex-col">
      <Navbar color_scheme={'LIGHT'} homepage />
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-black bg-opacity-60 bg-homepage-apartments-background bg-cover px-site-standard py-8 bg-blend-darken">
        <div className="flex max-w-3xl flex-col items-center justify-center gap-7">
          <h1 className="text-center text-5xl font-bold text-white">Find your next home.</h1>
          <span className="text-center text-xl text-gray-200">
            A tool for college students to find living spaces near their campus, contact property
            managers, and track the status of their contracts and applications.
          </span>
          <button
            className="rounded-md bg-blue-700 px-5 py-3 font-bold text-white"
            onClick={handleStartSearchingClick}
          >
            Start Searching
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
