import s from "./style.module.scss";
import QrCode from "/assets/imgs/QrCode.png";
import GOOGLEPLAY from "/assets/imgs/GOOGLEPLAY.png";
import APPSTORE from "/assets/imgs/APPSTORE.png";
import Vector from "/assets/imgs/Vector.svg";

export function Footer() {
  return (
    <footer className={s["exf-root"]}>
      <div className={s["exf-top"]}>
        <div className="container">
          <div className={s["exf-grid"]}>
            {/* Brand / Subscribe */}
            <section className={s["exf-col"]}>
              <h3 className={s["exf-logo"]}>Exclusive</h3>
              <h4 className={s["exf-title"]}>Subscribe</h4>
              <p className={s["exf-muted"]}>Get 10% off your first order</p>
              <form
                className={s["exf-sub"]}
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  className={s["exf-input"]}
                  type="email"
                  placeholder="Enter your email"
                  required
                />
                <button className={s["exf-send"]} aria-label="Send">
                  <img src={Vector} alt="Send" />
                </button>
              </form>
            </section>

            {/* Support */}
            <section className={s["exf-col"]}>
              <h4 className={s["exf-title"]}>Support</h4>
              <p className={s["exf-muted"]}>111 Bijoy sarani, Dhaka, </p>
              <p className={s["exf-muted"]}>DH 1515, Bangladesh.</p>
              <a className={s["exf-muted"]} href="mailto:exclusive@gmail.com">
                exclusive@gmail.com
              </a>
              <a className={s["exf-muted"]} href="tel:‪+8801588888999‬">
                +88015-88888-9999
              </a>
            </section>

            {/* Account */}
            <nav className={s["exf-col"]}>
              <h4 className={s["exf-title"]}>Account</h4>
              <p className={s["exf-muted"]}>My Account</p>
              <p className={s["exf-muted"]}>Login / Register</p>
              <p className={s["exf-muted"]}>Cart</p>
              <p className={s["exf-muted"]}>Wishlist</p>
              <p className={s["exf-muted"]}>Shop</p>
            </nav>

            {/* Quick Links */}
            <nav className={s["exf-col"]}>
              <h4 className={s["exf-title"]}>Quick Link</h4>
              <p className={s["exf-muted"]}>Privacy Policy</p>
              <p className={s["exf-muted"]}>Terms Of Use</p>
              <p className={s["exf-muted"]}>FAQ</p>
              <p className={s["exf-muted"]}>Contact</p>
            </nav>

            {/* Download App */}
            <section className={s["exf-col"]}>
              <h4 className={s["exf-title"]}>Download App</h4>
              <p className={`${s["exf-muted"]} ${s["exf-small"]}`}>
                Save $3 with App New User Only
              </p>

              <div className={s["exf-row"]}>
                <div className={s["exf-qr"]} aria-label="QR code">
                  <img
                    src={QrCode}
                    alt="QR Code for app download"
                    style={{ width: 80, height: 80 }}
                  />
                </div>
                <div className={s["exf-badges"]}>
                  <a className={s["exf-badge"]} href="#">
                    <img src={GOOGLEPLAY} alt="Google Play" />
                  </a>
                  <a className={s["exf-badge"]} href="#">
                    <img src={APPSTORE} alt="App Store" />
                  </a>
                </div>
              </div>

              <div className={s["exf-socialLeft"]}>
                {/* Facebook */}
                <a className={s["exf-sbtn"]} href="#" aria-label="Facebook">
                  <svg viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                {/* Twitter */}
                <a className={s["exf-sbtn"]} href="#" aria-label="Twitter">
                  <svg viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43.36a9.14 9.14 0 0 1-2.88 1.1 4.52 4.52 0 0 0-7.69 4.13A12.84 12.84 0 0 1 3 2.16a4.52 4.52 0 0 0 1.4 6.03 4.49 4.49 0 0 1-2.05-.57v.06a4.53 4.53 0 0 0 3.63 4.43 4.49 4.49 0 0 1-2.04.08 4.52 4.52 0 0 0 4.22 3.14 9.06 9.06 0 0 1-5.6 1.93A9.23 9.23 0 0 1 2 19.54a12.82 12.82 0 0 0 6.92 2.03c8.3 0 12.84-6.9 12.84-12.86 0-.2 0-.39-.01-.58A9.22 9.22 0 0 0 23 3z" />
                  </svg>
                </a>
                {/* Instagram */}
                <a className={s["exf-sbtn"]} href="#" aria-label="Instagram">
                  <svg viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <path d="M16 11.37a4 4 0 1 1-2.82-2.82A4 4 0 0 1 16 11.37z" />
                    <circle cx="18" cy="6" r="1" />
                  </svg>
                </a>
                {/* LinkedIn */}
                <a className={s["exf-sbtn"]} href="#" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className={s["exf-bottom"]}>
        <div className="container">
          <p className={s["exf-copy"]}>
            <span className={s["exf-copyIcon"]}>©</span>
            Copyright Rimel 2022. All right reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
