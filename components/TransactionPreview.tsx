import { Transaction } from '@/typings';

interface Props {
    transaction: Transaction;
}

export default function TransactionPreview({ transaction }: Props) {
    return (
        <article className="transaction-preview">
            <p className="symbol">{transaction.symbol}</p>
            <p className="date">{transaction.date}</p>
            <p className="price">{transaction.price}</p>
            <p className="quantity">{transaction.quantity}</p>
            <p className="status">{transaction.status}</p>
        </article>
    );
}
