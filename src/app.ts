import store from './store/index.js';

import List from './components/List.js';

const formElement = document.querySelector('#new-book-form') as HTMLFormElement;
const titleField = document.querySelector('#titleField') as HTMLInputElement;
const authorField = document.querySelector('#authorField') as HTMLInputElement;
const completedField = document.querySelector('#completedField') as HTMLInputElement;

formElement?.addEventListener('submit', (e: Event) => {
    e.preventDefault();

    let values: [string, string, boolean];
    values = [titleField.value, authorField.value, completedField.checked];

    const newBook = {
        author: values[1],
        completed: values[2],
        title: values[0],
    };

    if (values.length) {
        store.dispatch('addItem', newBook);
        return [titleField, authorField, completedField].forEach((el: HTMLInputElement) => {
            el.value = '';
            if (el.checked) {
                el.checked = false;
            }
        });
    }
});

const listInstance = new List();
listInstance.render();
