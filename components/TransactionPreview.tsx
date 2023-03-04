interface Props {
    transaction: object;
}

export default function TransactionPreview({ transaction }: Props) {
    return (
        <div className="transaction-preview">
            {/* <p className="symbol">{transaction.symbol}</p>
            <p className="date">{transaction.date}</p>
            <p className="price">{transaction.price}</p>
            <p className="quantity">{transaction.quantity}</p>
            <p className="status">{transaction.statis}</p> */}
        </div>
    );
}
