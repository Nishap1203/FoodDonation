import {
  FaCheckCircle,
  FaHandsHelping,
  FaDonate,
  FaUsers,
} from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <section className=" text-green-900 text-center py-20 px-5">
        <h1 className="text-4xl font-bold">Together, We Can End Hunger</h1>
        <p className="mt-4 text-lg">
          Connecting food donors with NGOs to reduce food waste and feed those
          in need.
        </p>
        {/* <button className="mt-6 px-6 py-3 bg-[#093637] text-white rounded-lg shadow-md hover:bg-[#0d5547]">
          Start Donating
        </button> */}
      </section>

      <section className="text-center py-5 px-4">
        <h2 className="text-3xl font-bold text-[#093637]">Our Mission</h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg">
          We aim to build a bridge between **food donors** and **NGOs** to
          ensure excess food reaches those who need it most. Every meal saved is
          a step toward a hunger-free world.
        </p>
      </section>

   
      <section className="py-16 px-8 bg-white">
        <h2 className="text-3xl font-bold text-center text-[#093637]">
          How It Works
        </h2>
        <div className="flex flex-wrap justify-center gap-10 mt-8">
          <div className="bg-gray-200 p-6 rounded-lg shadow-md w-72 text-center">
            <FaDonate className="text-4xl text-[#44A08D] mx-auto mb-4" />
            <h3 className="text-xl font-semibold">For Donors</h3>
            <p>Register → List a Donation → NGO Picks It Up</p>
          </div>
          <div className="bg-gray-200 p-6 rounded-lg shadow-md w-72 text-center">
            <FaHandsHelping className="text-4xl text-[#44A08D] mx-auto mb-4" />
            <h3 className="text-xl font-semibold">For NGOs</h3>
            <p>Register → Browse Donations → Collect & Distribute</p>
          </div>
          <div className="bg-gray-200 p-6 rounded-lg shadow-md w-72 text-center">
            <FaUsers className="text-4xl text-[#44A08D] mx-auto mb-4" />
            <h3 className="text-xl font-semibold">For Admins</h3>
            <p>Approve NGOs → Monitor Donations</p>
          </div>
        </div>
      </section>

    
      <section className="py-16 px-8 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold text-[#093637]">Why Choose Us?</h2>
        <div className="flex flex-wrap justify-center gap-10 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md w-64 text-center">
            <FaCheckCircle className="text-3xl text-green-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold">Easy & Secure</h3>
            <p>Simple and hassle-free donations.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md w-64 text-center">
            <FaCheckCircle className="text-3xl text-green-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold">Verified NGOs</h3>
            <p>Only approved organizations can receive donations.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md w-64 text-center">
            <FaCheckCircle className="text-3xl text-green-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold">Impact Tracking</h3>
            <p>See where your food goes.</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-8  text-green-900 text-center text-3xl">
        <h2 className="text-3xl font-bold">Contact Us</h2>
        <p className="mt-4">Have questions? Reach out to us.</p>
        <a
          href="mailto:support@fooddonation.com"
          className="mt-4 inline-block text-white bg-[#093637] px-6 py-3 rounded-lg shadow-md hover:bg-green-900"
        >           
          Email Us
        </a>
      </section>
    </div>
  );
};

export default About;
