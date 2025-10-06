import type { FC } from "react";
import s from "./Contact.module.scss";

const Contact: FC = () => {
  return (
    <section className={s.root}>
      {/* Breadcrumb */}
      <nav className={` ${s.breadcrumb}`} aria-label="Breadcrumb">
        <ol className={s.bcList}>
          <li className={s.bcItem}>
            <a href="/" className={s.bcLink}>
              Home
            </a>
          </li>
          <li className={`${s.bcItem} ${s.current}`} aria-current="page">
            Contact
          </li>
        </ol>
      </nav>

      {/* Content */}
      <div className={`container ${s.grid}`}>
        {/* Left info card */}
        <aside className={s.infoCard} aria-label="Contact Info">
          <div className={s.infoBlock}>
            <span className={s.icon} aria-hidden>
              {/* phone icon */}
              <svg viewBox="0 0 24 24">
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.3 19.3 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.8.3 1.5.5 2.2a2 2 0 0 1-.5 2l-1.2 1.1a15.6 15.6 0 0 0 6 6l1.1-1.2a2 2 0 0 1 2-.5c.7.2 1.4.4 2.2.5A2 2 0 0 1 22 16.9Z" />
              </svg>
            </span>
            <div>
              <h3 className={s.blockTitle}>Call To Us</h3>
              <p className={s.muted}>We are available 24/7, 7 days a week.</p>
              <p className={s.muted}>
                <strong>Phone:</strong> +8801611112222
              </p>
              <hr className={s.hr} />
            </div>
          </div>

          <div className={s.infoBlock}>
            <span className={s.icon} aria-hidden>
              {/* mail icon */}
              <svg viewBox="0 0 24 24">
                <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 3-8 5L4 7V6l8 5 8-5z" />
              </svg>
            </span>
            <div>
              <h3 className={s.blockTitle}>Write To Us</h3>
              <p className={s.muted}>
                Fill out our form and we will contact you within 24 hours.
              </p>
              <p className={s.muted}>
                Emails: customer@exclusive.com
                <br />
                Emails: support@exclusive.com
              </p>
            </div>
          </div>
        </aside>

        {/* Right form card */}
        <main className={s.formCard}>
          <form className={s.form} onSubmit={(e) => e.preventDefault()}>
            <div className={s.row}>
              <label className={s.field}>
                <input type="text" placeholder="Your Name *" required />
              </label>
              <label className={s.field}>
                <input type="email" placeholder="Your Email *" required />
              </label>
              <label className={s.field}>
                <input type="tel" placeholder="Your Phone *" required />
              </label>
            </div>

            <label className={`${s.field} ${s.textarea}`}>
              <textarea placeholder="Your Message" rows={8} />
            </label>

            <div className={s.actions}>
              <button className={s.btn} type="submit">
                Send Message
              </button>
            </div>
          </form>
        </main>
      </div>
    </section>
  );
};

export default Contact;
