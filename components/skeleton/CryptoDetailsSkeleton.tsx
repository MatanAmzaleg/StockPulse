export function CryptoDetailsSkeleton() {
    return (
        <section className="crypto-details skeleton">
            <div className="logo">
                <div className="flex">
                    <div className="icon-img skeleton" />
                    <h2 className="skeleton" />
                </div>
            </div>
            <div className="main-grid ">
                <div className="card small-detaills skeleton" />
                <div className="card open-close skeleton" />
                <div className="card graph skeleton" />
                <div className="card details skeleton" />
                <div className="card actions flex column skeleton" />
            </div>
        </section>
    );
}
