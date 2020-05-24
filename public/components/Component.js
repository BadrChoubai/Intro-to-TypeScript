/*eslint no-empty-function: ["error", { "allow": ["functions", "methods"] }]*/
import Store from '../store/Store.class.js';
export default class Component {
    constructor(props = {}) {
        Component.render =
            Component.render ||
                function () { };
        if (props.store instanceof Store) {
            props.store.events.subscribe('stateChange', () => Component.render()); // https://stackoverflow.com/questions/51439843/unknown-vs-any
        }
        if (props.hasOwnProperty('element')) {
            this.element = props.element;
        }
    }
}
