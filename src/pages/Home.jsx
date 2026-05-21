import React from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

// Fade-up animation variant
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const Home = () => {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Programs data
  const programs = [
    {
      title: "Early Years (PP1–PP2)",
      desc: "Play‑based learning, social skills, foundational literacy.",
      icon: "🌱",
    },
    {
      title: "Primary School (Grade 1–6)",
      desc: "CBC curriculum with academics, sports, arts, and values.",
      icon: "📖",
    },
    {
      title: "Junior Secondary (Grade 7–9)",
      desc: "Competency‑based learning, career guidance, lab sciences.",
      icon: "🔬",
    },
    {
      title: "Extracurricular",
      desc: "Sports, music, drama, scouts, coding, debate clubs.",
      icon: "⚽",
    },
  ];

  // Stats
  const stats = [
    { label: "Students", value: "800+", icon: "👧🏽" },
    { label: "Teachers", value: "45+", icon: "👩🏾‍🏫" },
    { label: "Years of Excellence", value: "15+", icon: "🏆" },
    { label: "Clubs & Activities", value: "20+", icon: "🎭" },
  ];

  // Gallery placeholders (replace with actual school photos)
  const galleryImages = [
    "https://placehold.co/600x400/C2A878/FFFFFF?text=Classroom",
    "https://placehold.co/600x400/A67B5B/FFFFFF?text=Playground",
    "https://placehold.co/600x400/8B5E3C/FFFFFF?text=Library",
    "https://placehold.co/600x400/6B4226/FFFFFF?text=Sports+Day",
  ];

  return (
    <div className="bg-stone-50 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-stone-800 text-white">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img
            src="https://placehold.co/1920x1080/8B5E3C/FFFFFF?text=Shunem+Schools+Campus"
            alt="Hero background"
            className="w-full h-full object-cover opacity-40"
          />
        </motion.div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Shunem Schools –{" "}
              <span className="text-amber-300">Rooted in Excellence</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-200 mb-8">
              Located in Lanet, Nakuru. A nurturing environment where every child grows in wisdom, character, and faith.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/admissions"
                className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3 rounded-lg transition"
              >
                Apply Now
              </Link>
              <Link
                to="/contact"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-stone-800 px-6 py-3 rounded-lg transition"
              >
                Visit Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="py-20 bg-stone-50"
      >
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-stone-800 mb-4">About Shunem Schools</h2>
            <p className="text-stone-600 mb-4">
              Shunem Schools was founded in Lanet with a vision to provide holistic, values‑based education. We blend modern teaching methods with timeless moral principles.
            </p>
            <p className="text-stone-600 mb-6">
              Our campus features spacious classrooms, science and computer labs, a well‑stocked library, playgrounds, and a dedicated arts centre. We follow the Competency‑Based Curriculum (CBC) and prepare learners for leadership and integrity.
            </p>
            <Link to="/about" className="text-amber-700 font-semibold hover:underline inline-flex items-center">
              Learn more →
            </Link>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://placehold.co/600x400/C2A878/FFFFFF?text=School+Building"
              alt="Shunem school building"
              className="w-full h-auto object-cover hover:scale-105 transition duration-500"
            />
          </div>
        </div>
      </motion.section>

      {/* Programs Section */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-800 mb-2">Our Programs</h2>
            <p className="text-stone-500 max-w-2xl mx-auto">
              Tailored learning paths that honour each child's unique potential.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                whileHover={{ y: -5 }}
                className="bg-stone-50 p-6 rounded-xl shadow-md hover:shadow-lg transition"
              >
                <div className="text-5xl mb-3">{program.icon}</div>
                <h3 className="text-xl font-semibold text-amber-800 mb-2">{program.title}</h3>
                <p className="text-stone-500">{program.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-16 bg-amber-800 text-white"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-amber-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Gallery Preview */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="py-20 bg-stone-50"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-stone-800 mb-2">Our School in Pictures</h2>
            <p className="text-stone-500">A glimpse of everyday life at Shunem.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((src, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                whileHover={{ scale: 1.03 }}
                className="overflow-hidden rounded-lg shadow-md"
              >
                <img
                  src={src}
                  alt={`Gallery ${idx + 1}`}
                  className="w-full h-48 object-cover transition duration-500 hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/gallery"
              className="inline-block bg-amber-700 hover:bg-amber-800 text-white px-6 py-2 rounded-lg transition"
            >
              View Full Gallery →
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-br from-stone-800 to-stone-900 text-white"
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Enroll Your Child?</h2>
          <p className="text-lg text-stone-200 mb-8">
            Admissions are open for the current academic year. Contact us for a personal tour of our campus.
          </p>
          <Link
            to="/admissions"
            className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Start Application
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;