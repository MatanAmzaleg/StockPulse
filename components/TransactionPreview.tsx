import { Transaction } from '@/typings';
import { fotmattedTimestamp } from '@/utils/format';

interface Props {
    transaction: Transaction;
}

export default function TransactionPreview({ transaction }: Props) {
    return (
        <div className="transaction-preview">
            <div className="symbol">
                <p>{transaction.symbol}</p>
                <p>{transaction.symbolName}</p>
            </div>
            <p className="action">{transaction.action}</p>
            <p className="date">{fotmattedTimestamp(transaction.date) }</p>
            <p className="price">{transaction.price}</p>
            <p className="quantity">{transaction.amount}</p>
            <p className={`status ${transaction.status}`}>
                {transaction.status}
            </p>
        </div>
    );
}
