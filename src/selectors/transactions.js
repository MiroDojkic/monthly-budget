import omit from 'lodash/omit';
import get from 'lodash/get';

export const getTransactions = state => omit(state, ['loading', 'error']);
export const getIsLoading = state => get(state, 'loading', false);
export const getError = state => get(state, 'error', null);
