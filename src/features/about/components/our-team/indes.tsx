import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// مهم جداً حتى يبقى السلايدر أفقي

import s from "./OurTeam.module.scss";

type Member = {
  id: string;
  name: string;
  title: string;
  photo: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
};

import TOM from "/assets/imgs/tom-story.png";
import EMMA from "/assets/imgs/emma-story.png";
import WILL from "/assets/imgs/will-story.png";

const members: Member[] = [
  {
    id: "1",
    name: "Tom Cruise",
    title: "Founder & Chairman",
    photo: WILL,
    twitter: "#",
    instagram: "#",
    linkedin: "#",
  },
  {
    id: "2",
    name: "Emma Watson",
    title: "Managing Director",
    photo: EMMA,
    twitter: "#",
    instagram: "#",
    linkedin: "#",
  },
  {
    id: "3",
    name: "Will Smith",
    title: "Product Designer",
    photo: TOM,
    twitter: "#",
    instagram: "#",
    linkedin: "#",
  },
  {
    id: "4",
    name: "John Doe",
    title: "Marketing Manager",
    photo: WILL,
    twitter: "#",
    instagram: "#",
    linkedin: "#",
  },
  {
    id: "5",
    name: "Jane Smith",
    title: "Lead Developer",
    photo: EMMA,
    twitter: "#",
    instagram: "#",
    linkedin: "#",
  },
];

const IconX = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M3 3l18 18M21 3 3 21"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const IconIG = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect
      x="3.5"
      y="3.5"
      width="17"
      height="17"
      rx="5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle
      cx="12"
      cy="12"
      r="3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
  </svg>
);

const IconIn = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.5 8h4V23h-4V8Zm7.5 0h3.8v2.1h.1c.5-1 1.8-2.1 3.8-2.1 4 0 4.7 2.6 4.7 6v9H16v-8c0-1.9 0-4.3-2.6-4.3s-3 2-3 4.1V23H8V8Z"
      fill="currentColor"
    />
  </svg>
);

const OurTeam: React.FC = () => {
  return (
    <section className={s.root}>
      <div className={s.wrap}>
        {/* أضفنا كلاس عام 'ourteam-swiper' لنضمن الاستهداف في الـSCSS */}
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={28}
          slidesPerView={3}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 16 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 28 },
          }}
          className={`ourteam-swiper ${s.swiper}`}
        >
          {members.map((m) => (
            <SwiperSlide key={m.id}>
              <article className={s.card}>
                <div className={s.media}>
                  <img src={m.photo} alt={m.name} />
                </div>
                <h3 className={s.name}>{m.name}</h3>
                <p className={s.title}>{m.title}</p>

                <div className={s.socials}>
                  <a href={m.twitter} aria-label={`${m.name} Twitter`}>
                    <IconX />
                  </a>
                  <a href={m.instagram} aria-label={`${m.name} Instagram`}>
                    <IconIG />
                  </a>
                  <a href={m.linkedin} aria-label={`${m.name} LinkedIn`}>
                    <IconIn />
                  </a>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* مساحة صغيرة تحت السلايدر */}
        <div className={s.paginationHack} />
      </div>
    </section>
  );
};

export default OurTeam;
