import Achievement from "../components/achievement/indes";
import OurService from "../components/our-service/indes";
import AboutStory from "../components/our-story";
import OurTeam from "../components/our-team/indes";

function AboutPage() {
  return (
    <>
      <div className="container" style={{ padding: "40px 20px" }}>
        <AboutStory />
        <Achievement />
        <OurTeam />
        <OurService />
      </div>
    </>
  );
}

export default AboutPage;
