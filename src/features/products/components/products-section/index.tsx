import { ProductList } from "../product-list";
import { CountdownTimer } from "../../../../shared/components/timer/countdown-timer";
import { addDays } from "date-fns";
import "./style.css";

export function ProductsSection() {
  const saleEndDate = addDays(new Date(), 3); // 3 days from now

  return (
    <div>
      <div>
        <div className="categories__eyebrow">
          <span className="dot" />
          <span>Today’s</span>
        </div>
        <div className="title-timer-container">
          <h3 className="products-section-title">Flash Sales</h3>
          <CountdownTimer targetDate={saleEndDate} />
        </div>
      </div>
      <ProductList />
    </div>
  );
}
