import { Link } from 'react-router-dom';
import profileImg from '../assets/images/about/profile.jpg'; // Import the image correctly

const About = () => (
  <main className="bg-gray-50 dark:bg-gray-900 min-h-screen pt-32 pb-16">
    <section
      id="about"
      className="bg-gray-100 dark:bg-gray-800 py-20 lg:py-32 relative overflow-hidden"
    >
      {/* Background SVG Decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="100" r="100" fill="url(#gradient1)" />
          <defs>
            <linearGradient id="gradient1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#dbe3e8" />
              <stop offset="100%" stopColor="#f1f5f8" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center -mx-4">
          {/* Text Section */}
          <div className="w-full px-4 lg:w-1/2">
            <div className="mb-12 max-w-lg mx-auto lg:mb-0 animate-fadeInLeft">
              <h2 className="mb-6 text-4xl font-extrabold leading-tight text-gray-800 dark:text-white sm:text-5xl sm:leading-tight tracking-wide">
                About Me
              </h2>
              <p className="mb-8 text-lg text-gray-600 dark:text-gray-300 tracking-wide">
                I am a 5th semester student who has an interest in software technology and AI and wants to continue studying it. I am active in organizations, especially in organizing and planning various activities. I am also a hard worker and like to explore new things. <br /> <br />
                Although I am still building my professional experience, I am dedicated to creating user-centered
                designs and continuously improving my skills to deliver seamless user experiences. My focus is on
                learning new technologies and applying them to real-world projects.
              </p>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center py-3 px-8 text-base font-medium text-center text-white bg-blue-600 border border-transparent rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Get In Touch
              </Link>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full px-4 lg:w-1/2 animate-fadeInRight">
            <div className="flex justify-center lg:justify-end">
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <img
                  src={profileImg}
                  alt="about image"
                  className="object-cover object-center w-full h-full rounded-lg transition-transform duration-500 ease-in-out hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
);

export default About;
