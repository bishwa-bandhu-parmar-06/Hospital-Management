
import HomeDepartments from '../components/CardComponents/HomeDepartments';
import doctorTeam from "../assets/doctorteam.png";
import DoctorCardHome from "../components/CardComponents/DoctorCardHome";
import FeedBackHome from "../components/CardComponents/FeedBackHome";
import HowAuturaWorks from "../components/HowAutraWorks";


const Home = () => {
  return (
    <div className="bg-accentlight">
      {/* Hero Section */}
      <div className="border-2 h-[90vh] w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Section: Welcome Text */}
        <div className="text-black ml-60 w-3/4">
          <h1 className="text-4xl md:text-3xl font-bold mb-2 leading-tight">
            Welcome to{" "}
            <span className="text-secondary md:text-7xl">'Aatura'</span>
          </h1>

          <div className="text-md text-textPrimary font-medium mb-4">
            <p>A modern, secure and personalized healthcare</p>
            <p>services with compassion and care.</p>
          </div>
          <p className="text-lg md:text-xl ml-10 font-bold text-textPrimary mb-4">
            Your Health is Our Priority.
          </p>
          <div className="min-w-96 flex gap-4 mt-7">
            <button className="text-secondary ml-8 font-bold border-2 border-secondary rounded-[10px] px-4 py-2 hover:text-background hover:bg-secondary">
              Book Appointment
            </button>
            <button className="text-secondary ml-8 font-bold border-2 border-secondary rounded-[10px] px-4 py-2 hover:text-background hover:bg-secondary">
              Explore!
            </button>
          </div>
        </div>

        {/* Right Section: Doctor Image */}
        <div className="flex h-100 w-96 ml-44 justify-center items-start">
          <img src={doctorTeam} alt="Doctor team" className="h-full w-full" />
        </div>
      </div>

      {/* Departments Section */}
      <HomeDepartments />

      {/* Doctors Section with Slider */}
      <DoctorCardHome />

      {/* Feedback Section */}
      <FeedBackHome />

      {/* How Autura Works Section */}
      <HowAuturaWorks />
    </div>
  );
};

export default Home;