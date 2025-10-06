import React from "react";
import s from "./AboutStory.module.scss";

/**
 * If your image is under /public, use a root-relative path like:
 *   /assets/imgs/about-hero.jpg
 * Replace the default if needed.
 */
import ABOUT_IMG from "/assets/imgs/about-our-story.png";

const AboutStory: React.FC = () => {
  return (
    <section className={s.root}>
      {/* Breadcrumb */}
      <nav className={s.breadcrumb} aria-label="Breadcrumb">
        <a href="/" className={s.bcLink}>
          Home
        </a>
        <span className={s.bcSep}>/</span>
        <span className={s.bcCurrent}>About</span>
      </nav>

      <div className={s.wrap}>
        {/* Left text */}
        <div className={s.content}>
          <h1 className={s.title}>Our Story</h1>

          <p className={s.p}>
            Launched in 2015, Exclusive is South Asia’s premier online shopping
            marketplace with an active presence in Bangladesh. Supported by a
            wide range of tailored marketing, data and service solutions,
            Exclusive has 10,500 sellers and 300 brands and serves 3 million
            customers across the region.
          </p>

          <p className={s.p}>
            Exclusive has more than 1 million products to offer, growing at a
            very fast pace. Exclusive offers a diverse assortment in categories
            ranging from consumer.
          </p>
        </div>

        {/* Right image */}
        <aside className={s.media}>
          <img className={s.img} src={ABOUT_IMG} alt="Happy shoppers" />
        </aside>
      </div>
    </section>
  );
};

export default AboutStory;
