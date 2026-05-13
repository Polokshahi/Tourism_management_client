import { FaFacebook, FaGithub, FaGlobe, FaLinkedin } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 bg-white text-black dark:bg-black dark:text-white transition-colors duration-500">
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">About the Developer</h1>

      <div className="bg-gray-100 dark:bg-gray-900 shadow-lg rounded-lg p-6 transition-colors duration-500">
        {/* Developer Info */}
        <h2 className="text-2xl font-semibold mb-2 text-black dark:text-white">👨‍💻 Topan Roy</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          I am a passionate MERN Stack Developer from Dinajpur, Bangladesh. I enjoy building dynamic and responsive web applications with modern tools and technologies.
        </p>

        {/* Projects Info */}
        <h3 className="text-xl font-semibold mt-6 mb-2 text-black dark:text-white">💼 Projects Completed: 5+</h3>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
          <li>
            🌐{" "}
            <a
              href="https://tourism-management-syste-e2926.web.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Tourism Management System (This Project)
            </a>
          </li>
          <li>
            📦{" "}
            <a
              href="https://subscription-box-1.web.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Subscription Box Platform
            </a>
          </li>
          <li>
            🌿{" "}
            <a
              href="https://plant-care-tracker-3a085.web.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Plant Care Tracker App
            </a>
          </li>
          <li>
            🎓{" "}
            <a
              href="https://online-group-study-f26a8.web.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Online Group Study Assignment System
            </a>
          </li>
          <li>
            🩺{" "}
            <a
              href="https://terrible-fuel.surge.sh/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              docTalk
            </a>
          </li>
        </ul>

        {/* Other Links */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">🔗 Other Links</h3>
          <div className="flex flex-col gap-2">
            <a
              href="https://github.com/Topan-Roy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
            >
              <FaGithub className="mr-2" /> GitHub Profile
            </a>
            <a
              href="https://my-portfolio-7c664.web.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
            >
              <FaGlobe className="mr-2" /> Portfolio Website
            </a>
            <a
              href="https://www.linkedin.com/in/topanroy/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
            >
              <FaLinkedin className="mr-2" /> LinkedIn Profile
            </a>
            <a
              href="https://www.facebook.com/TopanRoy41105/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
            >
              <FaFacebook className="mr-2" /> Facebook Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
