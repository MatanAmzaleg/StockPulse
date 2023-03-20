import axios from 'axios';

// const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser';

export const transactionService = {
    add,
    getByEmail,
};

async function add(transaction: any) {
    return await axios.post(`api/transaction/add`, transaction);
}

async function getByEmail(email: string) {
    return await axios.get(`api/transaction/${email}`);
}
