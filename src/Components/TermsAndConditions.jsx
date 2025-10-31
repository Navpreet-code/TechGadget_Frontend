import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const TermsAndConditions = () => {
  return (
    <>
      <Navbar />
      <section className="py-20 px-6 md:px-20 bg-[#d7dde8] text-gray-800">
        <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl p-8 md:p-12 leading-relaxed">
          {/* Header */}
          <h1 className="text-4xl font-bold text-center mb-4 text-blue-600">
            Terms and Conditions
          </h1>
          <p className="text-sm text-center text-gray-500 mb-10">
            Last updated: <span className="font-medium">October 30, 2025</span>
          </p>

          {/* ✅ Main Terms Content */}
          <div
            className="terms-content text-gray-700 text-[15px] md:text-base space-y-5 [&_h1]:text-2xl [&_h1]:font-semibold [&_h1]:text-[#365899] [&_h1]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-[#365899] [&_h2]:mt-8 [&_h3]:text-lg [&_h3]:font-semibold [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-1 [&_a]:text-blue-600 [&_a]:hover:underline [&_p]:leading-relaxed [&_p]:text-gray-700"
            dangerouslySetInnerHTML={{
              __html: `
              <p>Please read these terms and conditions carefully before using Our Service.</p>

              <h2>Interpretation and Definitions</h2>
              <h3>Interpretation</h3>
              <p>Words with initial capital letters have specific meanings under these Terms.</p>

              <h3>Definitions</h3>
              <ul>
                <li><strong>Affiliate</strong> means an entity that controls or is under common control with a party (ownership ≥ 50%).</li>
                <li><strong>Country</strong> refers to Punjab, India.</li>
                <li><strong>Company</strong> refers to Tech Gadgets (“we”, “us”, or “our”).</li>
                <li><strong>Device</strong> means any device that can access the Service (computer, tablet, phone).</li>
                <li><strong>Service</strong> refers to our website.</li>
                <li><strong>Website</strong> refers to Tech Gadgets, accessible from <a href="http://localhost:5173/" target="_blank">http://localhost:5173/</a>.</li>
                <li><strong>You</strong> means the user accessing or using the Service.</li>
              </ul>

              <h2>Acknowledgment</h2>
              <p>These Terms govern your use of the Service and form a binding agreement between you and Tech Gadgets. By using the Service, you agree to comply with these Terms.</p>

              <h2>Links to Other Websites</h2>
              <p>Our Service may contain links to third-party websites. We are not responsible for their content or privacy policies.</p>

              <h2>Termination</h2>
              <p>We may terminate your access immediately for violations of these Terms. Upon termination, your right to use the Service ceases immediately.</p>

              <h2>Limitation of Liability</h2>
              <p>We are not liable for indirect, incidental, or consequential damages. Our maximum liability is limited to the amount you paid or 100 USD, whichever is lower.</p>

              <h2>“AS IS” Disclaimer</h2>
              <p>The Service is provided “AS IS” without warranties of any kind. We make no guarantees of uninterrupted or error-free service.</p>

              <h2>Governing Law</h2>
              <p>The laws of Punjab, India govern these Terms, excluding its conflict-of-law provisions.</p>

              <h2>Dispute Resolution</h2>
              <p>If you have any dispute with us, please contact us first to resolve it informally.</p>

              <h2>Severability & Waiver</h2>
              <p>If any provision is found invalid, the rest remain in effect. Failure to enforce a right does not mean waiver of that right.</p>

              <h2>Changes to These Terms</h2>
              <p>We may modify these Terms at any time. Continued use after updates means acceptance of the revised Terms.</p>

              <h2>Contact Us</h2>
              <p>If you have any questions about these Terms, contact us at:</p>
              <ul>
                <li>Email: <a href="mailto:navpreetsinghcse@gmail.com">navpreetsinghcse@gmail.com</a></li>
              </ul>
              `,
            }}
          />

          {/* Footer Button */}
          <div className="text-center mt-10">
            <a
              href="https://www.termsfeed.com/live/1f288319-3190-4d27-b684-f6ee921e8d9c"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2 text-white bg-[#365899] hover:bg-[#2f4d80] rounded-full transition-all duration-300 shadow-md"
            >
              View Full Terms & Conditions
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
