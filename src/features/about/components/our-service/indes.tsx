import React from "react";
import s from "./OurService.module.scss";

type Benefit = {
  id: string;
  title: string;
  subtitle: string;
  icon: "truck" | "headset" | "shield";
};

const IconTruck = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M3 6h10v7H3V6Zm10 2h3.9l2.1 3v2H13V8ZM6 19a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm10 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
      fill="currentColor"
    />
  </svg>
);

const IconHeadset = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 3a8 8 0 0 0-8 8v5a3 3 0 0 0 3 3h2v-7H7v-1a5 5 0 1 1 10 0v1h-2v7h2a3 3 0 0 0 3-3v-5a8 8 0 0 0-8-8Z"
      fill="currentColor"
    />
  </svg>
);

const IconShield = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 3 4 6v6c0 5 3.5 8.4 8 9 4.5-.6 8-4 8-9V6l-8-3Zm-1 13-3-3 1.4-1.4L11 13.2l3.6-3.6L16 11l-5 5Z"
      fill="currentColor"
    />
  </svg>
);

const ICONS: Record<Benefit["icon"], React.FC> = {
  truck: IconTruck,
  headset: IconHeadset,
  shield: IconShield,
};

const benefits: Benefit[] = [
  {
    id: "b1",
    title: "FREE AND FAST DELIVERY",
    subtitle: "Free delivery for all orders over $140",
    icon: "truck",
  },
  {
    id: "b2",
    title: "24/7 CUSTOMER SERVICE",
    subtitle: "Friendly 24/7 customer support",
    icon: "headset",
  },
  {
    id: "b3",
    title: "MONEY BACK GUARANTEE",
    subtitle: "We return money within 30 days",
    icon: "shield",
  },
];

const OurService: React.FC = () => {
  return (
    <section className={s.root} aria-label="Store benefits">
      <div className={s.wrap}>
        <ul className={s.grid}>
          {benefits.map(({ id, title, subtitle, icon }) => {
            const Icon = ICONS[icon];
            return (
              <li key={id} className={s.item}>
                <span className={s.iconWrap} aria-hidden="true">
                  <span className={s.iconRing} />
                  <span className={s.iconInner}>
                    <Icon />
                  </span>
                </span>

                <h3 className={s.title}>{title}</h3>
                <p className={s.subtitle}>{subtitle}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default OurService;
