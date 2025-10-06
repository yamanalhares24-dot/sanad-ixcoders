// Hero.tsx
import type { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import s from "./Hero.module.scss";

import APPLE from "/assets/icons/Apple.svg";
import HERO_IMG1 from "/assets/imgs/hero_endframe1.png";
import HERO_IMG2 from "/assets/imgs/hero_endframe2.png";

type Slide = {
  id: string;
  image: string;
  badge: string;
  titleLines: string[];
  cta: string;
};

const categories = [
  "Woman’s Fashion",
  "Men’s Fashion",
  "Electronics",
  "Home & Lifestyle",
  "Medicine",
  "Sports & Outdoor",
  "Baby’s & Toys",
  "Groceries & Pets",
  "Health & Beauty",
];

const slides: Slide[] = [
  {
    id: "1",
    image: HERO_IMG1,
    badge: "iPhone 14 Series",
    titleLines: ["Up to 10% ", "off Voucher"],
    cta: "Shop Now",
  },
  {
    id: "2",
    image: HERO_IMG2,
    badge: "iPhone 14 Series",
    titleLines: ["Up to 10% ", "off Voucher"],
    cta: "Shop Now",
  },
];

const HeroWithCategories: FC = () => {
  return (
    <section className={`container ${s.hero}`}>
      {/* Sidebar */}
      <aside className={s.sidebar} aria-label="Categories">
        <ul className={s.catList}>
          {categories.map((c) => (
            <li key={c} className={s.catItem}>
              <a className={s.catLink} href="#">
                <span>{c}</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M9 18l6-6-6-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* Slider */}
      <div className={s.sliderWrap}>
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          loop
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className={s.swiper}
        >
          {slides.map((sl) => (
            <SwiperSlide key={sl.id}>
              <article className={s.slide}>
                <div className={s.content}>
                  <div className={s.badgeRow}>
                    <img
                      src={APPLE}
                      style={{ width: "40px", height: "49px" }}
                      alt="apple logo"
                    />
                    <span className={s.badge}>{sl.badge}</span>
                  </div>

                  <h2 className={s.title}>
                    {sl.titleLines.map((t, i) => (
                      <span key={i} className={s.line}>
                        {t}
                      </span>
                    ))}
                  </h2>

                  <a href="#" className={s.cta}>
                    <span className={s.ctaText}>{sl.cta}</span>
                    <span className={s.arrow} aria-hidden>
                      →
                    </span>
                  </a>
                </div>

                <div className={s.media}>
                  <img src={sl.image} alt="" />
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default HeroWithCategories;
