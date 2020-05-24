/*eslint no-empty-function: ["error", { "allow": ["functions", "methods"] }]*/

import Store from '../store/Store.class.js';

export default class Component {
    static render: any;
    element: any;

    constructor(props: { [key: string]: any } = {}) {
        Component.render =
            Component.render ||
            function () {};

        if (props.store instanceof Store) {
            props.store.events.subscribe('stateChange', () => Component.render()); // https://stackoverflow.com/questions/51439843/unknown-vs-any
        }

        if (props.hasOwnProperty('element')) {
            this.element = props.element;
        }
    }
}
