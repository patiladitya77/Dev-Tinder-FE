import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center text-center px-6">
      <motion.h1
        className="text-5xl font-extrabold mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Connect with Developers Worldwide 🌍
      </motion.h1>

      <motion.p
        className="mb-10 text-lg text-base-content/70 max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        DevTinder helps developers collaborate, network, and grow together based
        on their tech stack & interests. Swipe, match, and start coding
        friendships 🚀
      </motion.p>

      <motion.div
        className="flex gap-4 justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <Link to="/login" className="btn btn-primary btn-lg">
          Get Started
        </Link>
        <a
          href="https://github.com/patiladitya77/Dev-Tinder-FE"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline btn-lg"
        >
          GitHub ⭐
        </a>
      </motion.div>

      <motion.div
        className="mt-16 flex justify-center"
        initial={{ y: 0 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png"
          alt="dev match illustration"
          className="w-40 opacity-80"
        />
      </motion.div>
    </div>
  );
};

export default LandingPage;
