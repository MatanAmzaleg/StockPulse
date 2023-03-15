import { Transaction } from '@/typings';

interface Props {
    transaction: Transaction;
}

export default function TransactionPreview({ transaction }: Props) {
    return (
        <div
            className={
                transaction.status === 'approved'
                    ? 'transaction-preview approved'
                    : 'transaction-preview'
            }
        >
            <div className="symbol">
                <p>{transaction.symbol}</p>
                <p>{transaction.symbolName}</p>
            </div>
            <p className="action">{transaction.action}</p>
            <p className="date">{transaction.date}</p>
            <p className="price">{transaction.price}</p>
            <p className="quantity">{transaction.quantity}</p>
            <p className="status">{transaction.status}</p>
        </div>
    );
}
