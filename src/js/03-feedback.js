import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input'),
  message: document.querySelector('textarea'),
};

const STORAGE_KEY = 'feedback-form-state';

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

populateTextarea();

function onFormInput(event) {
  event.preventDefault();

  const value = {
    email: refs.email.value,
    message: refs.message.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}

function onFormSubmit(event) {
  event.preventDefault();

  console.log(localStorage.getItem(STORAGE_KEY));

  localStorage.removeItem(STORAGE_KEY);
  refs.form.reset();
  //   refs.email.value = '';
  //   refs.message.value = '';
}

function populateTextarea() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

  refs.email.value = savedMessage.email || '';
  refs.message.value = savedMessage.message || '';

  //   localStorage.setItem(STORAGE_KEY, JSON.stringify(savedMessage));
}
