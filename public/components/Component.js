/*eslint no-empty-function: ["error", { "allow": ["functions", "methods"] }]*/
import Store from '../store/index.js';
export default class Component {
    constructor(props = {}) {
        this.render =
            this.render ||
                function () {
                    return;
                };
        if (props.store instanceof Store) {
            props.store.events.subscribe('stateChange', () => this.render()); // https://stackoverflow.com/questions/51439843/unknown-vs-any
        }
        if (props.hasOwnProperty('element')) {
            this.element = props.element;
        }
    }
}
