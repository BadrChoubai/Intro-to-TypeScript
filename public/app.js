import store from './store/index.js';
import List from './components/List.js';
const formElement = document.querySelector('#new-book-form');
const titleField = document.querySelector('#titleField');
const authorField = document.querySelector('#authorField');
const completedField = document.querySelector('#completedField');
formElement === null || formElement === void 0 ? void 0 : formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    let values;
    values = [titleField.value, authorField.value, completedField.checked];
    const newBook = {
        author: values[1],
        completed: values[2],
        title: values[0],
    };
    if (values.length) {
        store.dispatch('addItem', newBook);
        return [titleField, authorField, completedField].forEach((el) => {
            el.value = '';
            if (el.checked) {
                el.checked = false;
            }
        });
    }
});
const listInstance = new List();
listInstance.render();
