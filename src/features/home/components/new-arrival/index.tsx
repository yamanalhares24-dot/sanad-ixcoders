// import React from "react";
import "./PromoGridStatic.scss";
import PS5 from "/assets/imgs/PS5.png";
import WOMAN from "/assets/imgs/WOMAN.png";
import GUCCI from "/assets/imgs/GUCCI.png";
import SPEAKERS from "/assets/imgs/SPEAKERS.png";

export default function NewArrival() {
  return (
    <section className="promoGrid">
      {/* Left — HERO */}
      <a className="card hero" href="#" style={{ backgroundColor: "black" }}>
        <img src={PS5} alt="" />
        <div className="content">
          <h3 className="title">PlayStation 5</h3>
          <p className="subtitle">
            Black and White version of the PS5
            <br />
            coming out on sale.
          </p>
          <span className="cta">Shop Now</span>
        </div>
      </a>

      {/* Right column */}
      <div className="rightCol">
        {/* Top wide */}
        <a className="card wide" href="#">
          <img src={WOMAN} alt="" />
          <div className="content">
            <h3 className="title">Women’s Collections</h3>
            <p className="subtitle">
              Featured woman collections that
              <br />
              give you another vibe.
            </p>
            <span className="cta">Shop Now</span>
          </div>
        </a>

        {/* Bottom two small */}
        <div className="row">
          <a className="card small" href="#">
            <img src={SPEAKERS} alt="" />
            <div className="content">
              <h3 className="title">Speakers</h3>
              <p className="subtitle">Amazon wireless speakers</p>
              <span className="cta">Shop Now</span>
            </div>
          </a>

          <a className="card small" href="#">
            <img src={GUCCI} alt="" />
            <div className="content">
              <h3 className="title">Perfume</h3>
              <p className="subtitle">GUCCI INTENSE OUD EDP</p>
              <span className="cta">Shop Now</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
