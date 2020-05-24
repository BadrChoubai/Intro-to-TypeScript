/*eslint no-empty-function: ["error", { "allow": ["functions", "methods"] }]*/
import Store from '../store/Store.class.js';
export default class Component {
    constructor(props = {}) {
        this.render = this.render;
        if (props.store instanceof Store) {
            props.store.events.subscribe('stateChange', () => this.render()); // https://stackoverflow.com/questions/51439843/unknown-vs-any
        }
        if (props.hasOwnProperty('element')) {
            this.element = props.element;
        }
    }
}
