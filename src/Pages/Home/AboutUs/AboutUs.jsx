import { FaFacebook, FaGithub, FaGlobe, FaLinkedin, FaCode, FaEnvelope, FaMapMarkerAlt, } from "react-icons/fa";

import meImage from '../../../../public/me.jpg';

const AboutUs = () => {
  const projects = [
    { name: "Tourism Management System", url: "http://localhost:5173/" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-500">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-indigo-600 dark:text-indigo-400 mb-2">Meet the Developer</h1>
        <div className="h-1 w-20 bg-indigo-600 mx-auto rounded-full"></div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Profile Section */}
        <div className="md:col-span-1">
          <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 text-center">
            <div className="w-32 h-32 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
              <img
                className="mb-2 w-32 h-32 rounded-full object-cover aspect-square"
                src={meImage}
                alt="Md. Abdulla Hel Shahi"
              />
            </div>
            <h2 className="text-2xl font-bold mb-1">Md. Abdulla Hel Shahi</h2>
            <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-4">Full-Stack Developer</p>

            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400 text-left">

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-indigo-500" />
                <span>polokshahi2@gmail.com</span>
              </div>




              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-indigo-500" />
                <span>Bogura, Bangladesh</span>
              </div>
              <div className="flex items-center gap-3">
                <FaCode className="text-indigo-500" />
                <span>MERN Stack Specialist</span>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-6 text-xl">
              <a href="https://github.com/Polokshahi" target="_blank" rel="noreferrer" className="hover:text-indigo-500 transition-colors"><FaGithub /></a>
              <a href="https://www.linkedin.com/in/polok-shahi-44b9a91aa/" target="_blank" rel="noreferrer" className="hover:text-indigo-500 transition-colors"><FaLinkedin /></a>
              <a href="https://www.facebook.com/Nameispoloks.9/" target="_blank" rel="noreferrer" className="hover:text-indigo-500 transition-colors"><FaFacebook /></a>
              <a href="https://polokshahi-portfolio.netlify.app/" target="_blank" rel="noreferrer" className="hover:text-indigo-500 transition-colors"><FaGlobe /></a>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="md:col-span-2 space-y-8">
          <section>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-indigo-600">01.</span> Professional Bio
            </h3>
            <p className="leading-relaxed text-slate-700 dark:text-slate-400">
              I am a dedicated Full-Stack Developer specializing in architecting scalable web applications using the MERN stack and Next.js. Based in Bogura, Bangladesh, I bridge the gap between technical engineering and strategic growth. Beyond writing clean, performant code, I specialize in building high-performance outreach infrastructures, leveraging my expertise in B2B lead generation and cold email marketing to drive measurable results.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-indigo-600">02.</span> Featured Projects
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {projects.map((project, index) => (
                <a
                  key={index}
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-indigo-500 transition-all"
                >
                  <h4 className="font-semibold group-hover:text-indigo-500 transition-colors">{project.name}</h4>
                  <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">Live Preview →</p>
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;