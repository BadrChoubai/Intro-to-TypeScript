import Store from './Store.class.js';
import actions from './actions.js';
import state from './state.js';
import mutations from './mutations.js';
export default new Store({
    actions,
    mutations,
    state,
});
