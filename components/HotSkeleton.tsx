export default function HotSkeleton() {
    return (
        <article className="hot-crypto-preview">
            <div className="upper-sec flex align-center">
                <div className="icon-img skeleton"></div>
                <div className="title-sec flex column">
                    <h2 className="stock-title skeleton"></h2>
                    <p className="stock-subtitle skeleton"></p>
                </div>
            </div>
            <div className="bottom-sec flex space-between align-center">
                <div className="graph skeleton"></div>
                <div className="">
                    <h2 className="price-title skeleton"></h2>
                    <h3 className="percent skeleton"></h3>
                </div>
            </div>
        </article>
    );
}
