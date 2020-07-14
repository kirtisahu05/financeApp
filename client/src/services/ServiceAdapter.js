import Api from '@/services/Api';

export default {
    members (body) {
        return Api().post('members', body);
    },
    getMembers () {
        return Api().get('members');
    },

    postTransaction(body) {
        return Api().post('transactions', body);
    },

    getAccounts(body) {
        return Api().get('accounts', body);
    },
    accounts(body) {
        return Api().post('accounts', body);
    }
}
