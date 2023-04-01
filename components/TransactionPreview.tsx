import { Transaction } from '@/typings';
import { fotmattedTimestamp, formattedPrice } from '@/utils/format';

interface Props {
    transaction: Transaction;
}

export default function TransactionPreview({ transaction }: Props) {
    return (
        <div className="transaction-preview">
            <div className="symbol flex align-center">
                <img className='symbol-img' src={`/${transaction.symbol}.svg`} alt="" />
                <p>{transaction.symbolName}</p>
            </div>
            <p className="action">{transaction.action}</p>
            <p className="date">{fotmattedTimestamp(transaction.date) }</p>
            <p className="price">{formattedPrice(transaction.price) }</p>
            <p className="quantity">{transaction.amount.toFixed(6)}</p>
            <p className={`status ${transaction.status}`}>
                {transaction.status}
            </p>
        </div>
    );
}
