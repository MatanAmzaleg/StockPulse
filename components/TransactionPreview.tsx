import { Transaction } from '@/typings';

interface Props {
    transaction: Transaction;
}

export default function TransactionPreview({ transaction }: Props) {
    console.log(transaction);
    
    return (
<<<<<<< HEAD
        <div className={transaction.status === 'approved' ? 'transaction-preview approved' : 'transaction-preview'}>
            <p className="action">{transaction.action}</p>
=======
        <article className="transaction-preview">
>>>>>>> 68ac61d39e644c8dc9841bacd4dc9ce304274ecf
            <p className="symbol">{transaction.symbol}</p>
            <p className="date">{transaction.date}</p>
            <p className="price">{transaction.price}</p>
            <p className="quantity">{transaction.quantity}</p>
            <p className="status">{transaction.status}</p>
        </article>
    );
}
