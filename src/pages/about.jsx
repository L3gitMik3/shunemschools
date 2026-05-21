import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Fade-up animation variant
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const About = () => {
  // Core Values data
  const coreValues = [
    { title: "Integrity", desc: "We uphold honesty and moral principles in all our actions.", icon: "🤝" },
    { title: "Excellence", desc: "We strive for the highest standards in academics and character.", icon: "🏆" },
    { title: "Compassion", desc: "We treat every learner with care, respect and understanding.", icon: "❤️" },
    { title: "Resilience", desc: "We encourage perseverance and a growth mindset in every child.", icon: "💪" },
  ];

  // Leadership Team data
  const leadership = [
    { name: "Mr. James Mwangi", role: "Principal", icon: "👨‍🏫" },
    { name: "Mrs. Jane Akinyi", role: "Deputy Principal", icon: "👩‍🏫" },
    { name: "Mr. Peter Omondi", role: "Head of Academics", icon: "📚" },
    { name: "Ms. Sarah Wanjiku", role: "Head of Guidance & Counselling", icon: "💬" },
  ];

  // Facilities data
  const facilities = [
    { name: "Science Laboratories", icon: "🔬", desc: "Fully equipped labs for practical learning." },
    { name: "ICT & Computer Lab", icon: "💻", desc: "Digital literacy for the modern world." },
    { name: "Library", icon: "📖", desc: "A quiet space for research and reading." },
    { name: "Sports Fields", icon: "⚽", desc: "Football, athletics, and outdoor games." },
    { name: "Art & Music Centre", icon: "🎨", desc: "Creative expression and performing arts." },
    { name: "School Chapel", icon: "⛪", desc: "A place for spiritual growth and reflection." },
  ];

  return (
    <div className="bg-stone-50 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center bg-stone-800 text-white">
        <div className="absolute inset-0">
          <img
            src="https://placehold.co/1920x500/8B5E3C/FFFFFF?text=About+Shunem+Schools"
            alt="About header"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg text-stone-200 max-w-2xl mx-auto"
          >
            Rooted in faith, growing in wisdom and integrity.
          </motion.p>
        </div>
      </section>

      {/* Welcome & History Section */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="py-16 bg-stone-50"
      >
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-stone-800 mb-4">Welcome to Shunem Schools</h2>
            <p className="text-stone-600 mb-4">
              Shunem Schools was established in 2008 with a vision to provide quality, values‑based education to the children of Lanet and beyond. From modest beginnings with just 45 learners, we have grown into a vibrant community of over 800 students and 45 dedicated staff members.
            </p>
            <p className="text-stone-600 mb-4">
              The name "Shunem" is inspired by the biblical story of a hospitable woman who provided a resting place for the prophet Elisha. In the same spirit, our school is a haven where every child is nurtured to discover their God‑given potential.
            </p>
            <p className="text-stone-600">
              Today, we are proud to offer a holistic education that integrates academic excellence with spiritual formation, life skills, and co‑curricular activities.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://placehold.co/600x400/C2A878/FFFFFF?text=School+History+Photo"
              alt="School history"
              className="w-full h-auto object-cover hover:scale-105 transition duration-500"
            />
          </div>
        </div>
      </motion.section>

      {/* Vision & Mission Section */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={fadeUp} className="bg-stone-50 p-8 rounded-xl shadow-md">
              <div className="text-5xl mb-3">👁️</div>
              <h3 className="text-2xl font-bold text-amber-800 mb-3">Our Vision</h3>
              <p className="text-stone-600">
                To be a center of academic and moral excellence, raising a generation of transformative leaders who impact society positively.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} className="bg-stone-50 p-8 rounded-xl shadow-md">
              <div className="text-5xl mb-3">🎯</div>
              <h3 className="text-2xl font-bold text-amber-800 mb-3">Our Mission</h3>
              <p className="text-stone-600">
                To provide a nurturing, child‑centred environment that fosters intellectual curiosity, spiritual growth, and social responsibility, preparing every learner for a purposeful life.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Core Values Section */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="py-16 bg-stone-50"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-stone-800 mb-2">Our Core Values</h2>
            <p className="text-stone-500 max-w-2xl mx-auto">
              The principles that guide everything we do at Shunem.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md text-center"
              >
                <div className="text-5xl mb-3">{value.icon}</div>
                <h3 className="text-xl font-semibold text-amber-800 mb-2">{value.title}</h3>
                <p className="text-stone-500">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Facilities Section */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-stone-800 mb-2">Our Campus & Facilities</h2>
            <p className="text-stone-500 max-w-2xl mx-auto">
              A safe, conducive environment for learning and growth.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="bg-stone-50 p-5 rounded-xl shadow-md flex items-start gap-3"
              >
                <div className="text-3xl">{facility.icon}</div>
                <div>
                  <h3 className="font-semibold text-amber-800">{facility.name}</h3>
                  <p className="text-stone-500 text-sm">{facility.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Leadership Section */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="py-16 bg-stone-50"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-stone-800 mb-2">Meet Our Leadership</h2>
            <p className="text-stone-500 max-w-2xl mx-auto">
              Dedicated professionals committed to excellence.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((leader, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md text-center"
              >
                <div className="text-6xl mb-3">{leader.icon}</div>
                <h3 className="text-lg font-semibold text-amber-800">{leader.name}</h3>
                <p className="text-stone-500 text-sm">{leader.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-16 bg-gradient-to-br from-stone-800 to-stone-900 text-white"
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Shunem Family</h2>
          <p className="text-lg text-stone-200 mb-8">
            We would love to welcome your child to our community. Contact us to learn more about our programmes and how to apply.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/admissions"
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Apply Now
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-stone-800 px-6 py-3 rounded-lg transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;