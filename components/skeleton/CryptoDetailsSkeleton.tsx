export function CryptoDetailsSkeleton() {
    return (
        <section className="crypto-details skeleton">
            <div className="logo">
                <div className="flex">
                    <div className="icon-img skeleton"></div>
                    <h2 className="skeleton"></h2>
                </div>
            </div>
            <div className="main-grid ">
                <div className="card small-detaills skeleton"></div>
                <div className="card open-close skeleton"></div>
                <div className="card graph skeleton"></div>
                <div className="card details skeleton"></div>
                <div className="card actions flex column skeleton"></div>
            </div>
        </section>
    );
}
