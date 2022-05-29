import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input'),
  message: document.querySelector('textarea'),
};

const STORAGE_KEY = 'feedback-form-state';

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

function onFormInput(event) {
  event.preventDefault();

  const formData = {
    email: refs.email.value,
    message: refs.message.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();

  //   const formData = {
  //     email: refs.email.value,
  //     message: refs.message.value,
  //   };
  console.log(localStorage.getItem(STORAGE_KEY));

  refs.form.reset();
  //   refs.email.value = '';
  //   refs.message.value = '';
  localStorage.removeItem(STORAGE_KEY);
}

populateTextarea();

function populateTextarea() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedMessage) {
    refs.email.value = savedMessage.email;
    refs.message.value = savedMessage.message;
  }
}
