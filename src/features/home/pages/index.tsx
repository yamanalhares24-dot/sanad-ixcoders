import HeroWithCategories from "../components/hero";
import { ProductsSection } from "../../products/components/products-section";
import BrowseByCategory from "../components/browse-by-category";
import { BestSellingProducts } from "../components/best-selling-products";
import { ExploreOurProducts } from "../components/explore-our-products";
import JBL from "/assets/imgs/jbl.png";
import NewArrival from "../components/new-arrival";
import OurService from "../../about/components/our-service/indes";

function HomePage() {
  return (
    <>
      <HeroWithCategories />
      <div className="container" style={{ padding: "40px 20px" }}>
        <ProductsSection />
        <BrowseByCategory />
        <BestSellingProducts />
        <img src={JBL} alt="JBL" className="container" />
        <ExploreOurProducts />
        <NewArrival />
        <OurService />
      </div>
    </>
  );
}

export default HomePage;
