import BigStockCard from "./BigStockCard";
import SmallStockCard from "./SmallStockCard";


export default function MainContent() {
  return (
    <section className="main-content-sec flex column">
      <h1 className="main-title">Stock Market</h1>
      <p className="subtitle">Trending market group</p>
      <section className="big-cards-sec flex space-between">
      <BigStockCard></BigStockCard>
      </section>


      <section className="most-popular-sec">
        <h1 className="main-title">Most popular week</h1>
        <section className="little-cards-sec flex space-between">
        <SmallStockCard></SmallStockCard>
        </section>
      </section>
    </section>
  );
}
