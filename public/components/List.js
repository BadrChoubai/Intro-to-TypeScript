import Component from './Component.js';
import store from '../store/index.js';
export default class List extends Component {
    constructor() {
        super({
            store,
            element: document.querySelector('.book-list-container'),
        });
        this.render = () => {
            if (store.state.items.length === 0) {
                this.element.innerHTML = `<p class="no-items">No books to display.</p>`;
                return;
            }
            this.element.innerHTML = `
            <ul class="app__items">
                ${store.state.items
                    .map((item) => {
                        return `<li>${item.title} By ${item.author} 
                        <button class="button-salmon" aria-label="Delete this item">x</button>
                    </li>`;
                    })
                    .join('')}
            </ul>
        `;
            this.element.querySelectorAll('button').forEach((button, index) => {
                button.addEventListener('click', () => {
                    store.dispatch('clearItem', { index });
                });
            });
        };
    }
}
