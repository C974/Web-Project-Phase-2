/* eslint-disable react/no-unescaped-entities */
import Footer from "../common/Footer";

const { default: Navbar } = require("../common/Navbar");

const About = () => {
  return (
    <>
      <Navbar />
      <section className="about-tesla">
        <h2>About Tesla</h2>
        <p>
          Tesla, Inc. is an American electric vehicle and clean energy company
          founded by Elon Musk, Martin Eberhard, Marc Tarpenning, JB Straubel,
          and Ian Wright. Tesla's mission is to accelerate the world's
          transition to sustainable energy.
        </p>
        <p>
          Tesla's electric cars not only offer zero-emission transportation but
          also feature cutting-edge technology, performance, and safety.
        </p>
      </section>

      <section className="future-vision">
        <h2>Future Vision</h2>
        <ul>
          <li>
            Developing renewable energy solutions such as solar and battery
            storage to create a sustainable energy ecosystem.
          </li>
          <li>
            Expanding the charging infrastructure to enable long-distance travel
            with electric vehicles.
          </li>
          <li>
            Exploring innovative transportation concepts like autonomous driving
            and electric aircraft.
          </li>
          <li>
            Advancing electric vehicle technology to make it accessible to
            everyone.
          </li>
        </ul>
      </section>
      <Footer />
    </>
  );
};

export default About;
