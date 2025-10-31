import React, { useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const AboutUs = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "What is Tech Gadgets?",
      answer:
        "Tech Gadgets is your one-stop online store for the latest electronic gadgets — from smartphones and smartwatches to gaming consoles and accessories. We aim to bring technology closer to you at unbeatable prices.",
    },
    {
      question: "Do you offer warranty on products?",
      answer:
        "Yes, all our products come with a standard manufacturer warranty. You can also purchase extended protection plans for select gadgets.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Most orders are delivered within 3–7 business days depending on your location. We also offer express delivery for select items.",
    },
    {
      question: "Can I return or exchange a product?",
      answer:
        "Absolutely! You can request a return or exchange within 7 days of receiving your order, provided the product is unused and in its original packaging.",
    },
  ];

  return (
    <>
      <Navbar />

      {/* 🟦 Banner Section */}
      <section className="banner relative flex items-center justify-center">
        <div className="banner-content text-center relative z-10">
          <h1 className="head">About Us</h1>
          <p className="subhead">
            <a href="#" className="Home opacity-80 hover:opacity-100 cursor-pointer">
              Home
            </a>
            <span className="mx-3">&gt;</span>
            <span className="font-medium">About Us</span>
          </p>
        </div>
      </section>

      {/* 🧩 About Section */}
      <section className="py-16 px-6 md:px-20 bg-[#d7dde8]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <img
            src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=60"
            alt="Electronics Store"
            className="rounded-2xl shadow-2xl w-auto h-auto object-cover block"
          />
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Welcome to <span className="text-blue-600">Tech Gadgets</span>
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              At Tech Gadgets, we believe technology should empower and inspire.
              Our goal is to provide innovative, reliable, and affordable tech
              products for everyone — from gamers and creators to professionals
              and casual users.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Founded with a passion for electronics, we aim to bridge the gap
              between technology and lifestyle, making your digital experience
              smarter, faster, and better.
            </p>
          </div>
        </div>
      </section>

      {/* 🚀 Mission Section */}
      <section className="py-16 px-6 md:px-20 bg-[#c1cfe4]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=60"
            alt="Mission - Smartwatch and Tech"
            className="rounded-2xl shadow-2xl w-full h-auto object-cover block"
          />
          <div>
            <h2 className="text-3xl font-bold text-blue-600 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              To make the latest technology accessible to everyone by offering
              genuine products, transparent pricing, and excellent customer
              support. We strive to build a strong relationship with our
              customers based on trust, value, and satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* 🌟 Vision Section */}
      <section className="py-16 px-6 md:px-20 bg-[#d7dde8]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-blue-600 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-600 leading-relaxed">
              To become the most trusted eCommerce brand for electronics across
              India — where every customer feels valued and every purchase feels
              rewarding. We envision a future where technology is accessible,
              sustainable, and seamlessly integrated into daily life.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=900&q=60"
            alt="Vision - Modern Tech Devices"
            className="rounded-2xl shadow-2xl w-full h-auto object-cover block"
          />
        </div>
      </section>

      {/* 👨‍💻 Our Team Section (Upgraded Professional Version) */}
<section className="relative py-20 px-6 md:px-20 bg-gradient-to-br from-[#d9e4f5] via-[#eef2f7] to-[#c1cfe4] overflow-hidden">
  <div className="max-w-6xl mx-auto text-center relative z-10">
    <h2 className="text-3xl font-bold text-blue-600 mb-6 tracking-wide">
      Meet Our Team
    </h2>
    <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-lg">
      Our talented professionals work passionately to bring innovation and
      quality to every customer experience.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
      {[
        {
          name: "Aarav Sharma",
          role: "CEO & Founder",
          img: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?auto=format&fit=crop&w=400&q=80",
        },
        {
          name: "Rohit Mehra",
          role: "Lead Developer",
          img: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=400&q=80",
        },
        {
          name: "Simran Kaur",
          role: "UI/UX Designer",
          img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80",
        },
      ].map((member, index) => (
        <div
          key={index}
          className="group bg-gray-200 rounded-3xl border-2 black shadow-lg p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
        >
          <div className="relative w-36 h-36 mx-auto mb-6">
            <img
              src={member.img}
              alt={member.name}
              className="rounded-full w-36 h-36 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#7e8ce0]/20 to-[#b3c3f7]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 group-hover:text-[#4b6cb7] transition-colors">
            {member.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{member.role}</p>
          <div className="mt-3 w-12 h-[2px] bg-[#4b6cb7] mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      ))}
    </div>
  </div>

  {/* subtle gradient glow background */}
  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/40 to-transparent pointer-events-none"></div>
</section>



      {/* ❓ FAQ Section */}
      <section
        className="py-16 px-6 md:px-20"
        style={{
          background: "linear-gradient(135deg, #7794cc, #c1cfe4)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition-shadow p-6 cursor-pointer"
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {faq.question}
                  </h3>
                  <span className="text-2xl text-blue-600">
                    {openFAQ === index ? "−" : "+"}
                  </span>
                </div>
                {openFAQ === index && (
                  <p className="text-gray-600 mt-3 leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AboutUs;
