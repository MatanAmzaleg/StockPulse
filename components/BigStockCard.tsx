import { SlOptionsVertical } from "react-icons/sl";

export default function BigStockCard () {
    return(
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
          <div className="bottom-sec flex space-between align-center">
            <div className="graph"></div>
            <h1 className="price-title">$price$</h1>
          </div>
        </article>
    )
}