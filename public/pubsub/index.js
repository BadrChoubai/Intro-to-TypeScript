export default class PubSub {
    constructor() {
        this.events = {};
    }
    /**
     * Takes an event, which is the event's unique name
     * and a callback function.
     *
     * If there's not already a matching event in our events
     * collection, we create it with a blank array. Then we push
     * the callback into that collection.
     *
     * @function subscribe
     * @param {string} event - unique event name
     * @param {Function} callback - callback function
     */
    subscribe(event, callback) {
        const self = this;
        if (!self.events.hasOwnProperty(event)) {
            self.events[event] = [];
        }
        return self.events[event].push(callback);
    }
    /**
     * This method first checks to see if the passed in event exists in our collection.
     * If not, we return an empty array. If there is an event, we loop through each
     * stored callback and pass the data into it.
     *
     * If there are no callbacks, we shouldn't run into any problems since we created that
     * event with an empty array in the subscribe method
     *
     * @function publish
     * @param {string} event - unique event name
     * @param {object} data
     */
    publish(event, data = {}) {
        const self = this;
        if (!self.events.hasOwnProperty(event)) {
            return [];
        }
        return self.events[event].map((callback) => callback(data));
    }
}
