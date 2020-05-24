import PubSub from '../pubsub/index.js';
export default class Store {
    constructor(params) {
        this.actions = {};
        this.mutations = {};
        this.state = {};
        this.status = 'resting';
        this.events = new PubSub();
        if (params.hasOwnProperty('actions')) {
            this.actions = params.actions;
        }
        if (params.hasOwnProperty('mutations')) {
            this.mutations = params.mutations;
        }
        /**
         * Set our state to be a Proxy. We are setting the default state by
         * checking the params and defaulting to an empty object if no default
         * state is passed in.
         *
         * MDN Docs on Proxy (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
         */
        let self = this; // alias self to this so that we can refer to this inside of Proxy constructor
        self.state = new Proxy(params.state || {}, {
            set: function (state, key, value) {
                state[key] = value;
                console.log(`stateChange: ${String(key)}: ${value}`);
                self.events.publish('stateChange', self.state);
                if (self.status !== 'mutation') {
                    console.warn(`You should use a mutation to set ${String(key)}`);
                }
                self.status = 'resting';
                return true;
            },
        });
    }
    dispatch(actionKey, payload) {
        if (typeof this.actions[actionKey] !== 'function') {
            console.error(`Action "${actionKey}" doesn't exist`);
            return false;
        }
        console.groupCollapsed(`ACTION: ${actionKey}`);
        this.status = 'action';
        this.actions[actionKey](this, payload);
        console.groupEnd();
        return true;
    }
    commit(mutationKey, payload) {
        if (typeof this.mutations[mutationKey] !== 'function') {
            console.error(`Mutation "${mutationKey}" doesn't exist`);
            return false;
        }
        this.status = 'mutation';
        let newState = this.mutations[mutationKey](this.state, payload);
        this.state = Object.assign(this.state, newState);
        return true;
    }
}
