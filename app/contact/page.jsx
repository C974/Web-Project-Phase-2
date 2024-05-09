import Footer from "../common/Footer";
import Navbar from "../common/Navbar";

const Contact = () => {
  return (
    <>
      <Navbar />
      <section className="contact-form">
        <h2>Get in Touch</h2>
        <form id="contactForm">
          <div className="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label for="message">Message:</label>
            <textarea id="message" name="message" required></textarea>
          </div>
          <button type="submit">Send Message</button>
        </form>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
