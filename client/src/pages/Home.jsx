// Home.jsx
import HomeDepartments from '../components/CardComponents/HomeDepartments';
import doctorTeam from "../assets/doctorteam.png";
import DoctorCardHome from "../components/CardComponents/DoctorCardHome";
import FeedBackHome from "../components/CardComponents/FeedBackHome";
import HowAuturaWorks from "../components/HowAutraWorks";

const Home = () => {
  return (
    <div className="bg-accentlight relative">
      {/* Hero Section with absolute positioning */}
      <div className="h-[80vh] sm:h-[90vh] w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center px-4 sm:px-6 md:px-8 relative z-10">
        {/* Left Section: Welcome Text */}
        <div className="text-black md:ml-12 lg:ml-20 xl:ml-32 w-full md:w-3/4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 leading-tight">
            Welcome to{" "}
            <span className="text-secondary text-5xl sm:text-6xl md:text-7xl">'Aatura'</span>
          </h1>
          <div className="text-sm sm:text-md text-textPrimary font-medium mb-3 sm:mb-4">
            <p>A modern, secure and personalized healthcare</p>
            <p>services with compassion and care.</p>
          </div>
          <p className="text-base sm:text-lg md:text-xl ml-4 sm:ml-6 md:ml-10 font-bold text-textPrimary mb-3 sm:mb-4">
            Your Health is Our Priority.
          </p>
          <div className="w-full flex flex-wrap gap-3 sm:gap-4 mt-5 sm:mt-7">
            <button className="text-secondary font-bold border-2 border-secondary rounded-lg px-3 py-1 sm:px-4 sm:py-2 hover:text-background hover:bg-secondary">
              Book Appointment
            </button>
            <button className="text-secondary font-bold border-2 border-secondary rounded-lg px-3 py-1 sm:px-4 sm:py-2 hover:text-background hover:bg-secondary">
              Explore!
            </button>
          </div>
        </div>

        {/* Right Section: Doctor Image */}
        <div className="flex justify-center items-center md:items-start w-full md:w-auto">
          <img 
            src={doctorTeam} 
            alt="Doctor team" 
            className="h-auto w-full max-w-md md:max-w-lg lg:max-w-xl" 
          />
        </div>
      </div>

      {/* Departments Section with negative margin */}
      <div className="relative z-20 -mt-16 md:-mt-24">
        <HomeDepartments />
      </div>

      {/* Other Sections */}
      <DoctorCardHome />
      <FeedBackHome />
      <HowAuturaWorks />
    </div>
  );
};

export default Home;