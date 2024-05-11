/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unescaped-entities */

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-col-1">
            <h3>Download Our App</h3>
            <p>Download App for Android and ios mobile phone.</p>
            <div className="app-logo">
              <img src="/images/play-store.png" alt="" />
              <img src="/images/app-store.png" alt="" />
            </div>
          </div>
          <div className="footer-col-2">
            <img src="/images/logo.png" />
            <p>
              Tesla's goal is to accelerate the world's transition to
              sustainable energy through innovative electric vehicles and
              renewable energy solutions.
            </p>
          </div>
          <div className="footer-col-3">
            <h3>Useful Links</h3>
            <ul>
              <li>Coupons</li>
              <li>Blog Post</li>
              <li>Return Policy</li>
              <li>Join Affiliate</li>
            </ul>
          </div>
          <div className="footer-col-4">
            <h3>Follow us</h3>
            <ul>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
              <li>Youtube</li>
            </ul>
          </div>
        </div>

        <hr />
        {/* <!--horizontal line--> */}
        <p className="copyright">Copyright 2024 - A, Tesla, QU</p>
      </div>
    </div>
  );
};

export default Footer;
