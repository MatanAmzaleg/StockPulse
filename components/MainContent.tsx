import { SlOptionsVertical } from "react-icons/sl";

export default function MainContent() {
  return (
    <section className="main-content-sec flex column">
      <h1 className="main-title">Stock Market</h1>
      <p className="subtitle">Trending market group</p>
      <section className="big-cards-sec flex space-between">
        <article className="big-card relative">
          <div className="options-btn">
            <SlOptionsVertical className="opt-icon"></SlOptionsVertical>
          </div>
          <div className="upper-sec flex align-center">
            <img className="icon-img" src="" alt="" />
            <div className="title-sec flex column">
              <h2 className="stock-title">Tilte</h2>
              <p className="stock-subtitle">Subtitle</p>
            </div>
          </div>
        </article>
      </section>


      <section className="most-popular-sec">
        <h1 className="main-title">Most popular week</h1>
        <section className="little-cards-sec flex space-between">
          <article className="little-card">
            <img className="stock-s-img" src="" alt="" />
          </article>
        </section>
      </section>
    </section>
  );
}
