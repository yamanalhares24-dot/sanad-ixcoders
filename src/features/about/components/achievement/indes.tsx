import React from "react";
import s from "./Achievement.module.scss";

type Stat = {
  value: string;
  label: string;
  // You can pass any JSX icon. I used inline SVGs for portability.
  icon: React.ReactNode;
};

const IconStore = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M3 10V6l2-3h14l2 3v4M4 10h16v10H4V10Zm4 0v10m8-10v10M7 6h10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconCoin = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle
      cx="12"
      cy="12"
      r="7.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M9.5 14.5a3 3 0 1 0 0-5M12 7v10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const IconBag = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M6 8h12l-1 12H7L6 8Zm3 0a3 3 0 1 1 6 0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconSack = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M8 7h8l-2-3H10L8 7Zm-2 3h12c1.66 2 2 4.5 2 6s-1.5 4-6 5c-3 .7-7-.3-8-2.5S4 16 6 10Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 14h4m-4 3h2"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const data: Stat[] = [
  { value: "10.5k", label: "Sellers active our site", icon: <IconStore /> },
  { value: "33k", label: "Monthly Product Sale", icon: <IconCoin /> },
  { value: "45.5k", label: "Customer active in our site", icon: <IconBag /> },
  { value: "25k", label: "Annual gross sale in our site", icon: <IconSack /> },
];

const Achievement: React.FC = () => {
  return (
    <section className={s.root} aria-label="Site statistics">
      <div className={s.grid}>
        {data.map((item, i) => (
          <article className={s.card} key={i}>
            <div className={s.iconWrap}>
              <span className={s.iconRing} />
              <span className={s.iconDot}>{item.icon}</span>
            </div>
            <p className={s.value}>{item.value}</p>
            <p className={s.label}>{item.label}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Achievement;
