import Store from "./Store.class";

export default {
    addItem(context: Store, payload: object) {
        context.commit('addItem', payload);
    },
    clearItem(context: Store, payload: object) {
        context.commit('clearItem', payload);
    }
};