export default class PubSub {
    events: { [index: string]: any };

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
    subscribe(event: string, callback: Function): [] {
        if (!this.events.hasOwnProperty(event)) {
            this.events[event] = [];
        }

        return this.events[event].push(callback);
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
    publish(event: string, data: object = {}): [] {
        if (!this.events.hasOwnProperty(event)) {
            return [];
        }

        return this.events[event].map((callback: Function) => callback(data));
    }
}
