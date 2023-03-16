import axios from 'axios';

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser';

export const userService = {
    addToWatchList,
};

async function addToWatchList(email: string, symbol: String) {
    return await axios.post(`api/user/${email}`, symbol);
}
