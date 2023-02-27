export default function SmallStockCard () {
    return(
        <article className="little-card flex column space-between">
        <img className="stock-s-img" src="" alt="" />
        <div className="title-sec flex ">
        <h1 className="stock-title">Title</h1>
        <p className="stock-subtitle">Subitle</p>
        </div>
        <h1>$Price$</h1>
      </article>
    )
}