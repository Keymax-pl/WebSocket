const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName = '';

loginForm.addEventListener('submit', function (event) {
  event.preventDefault();
  
  login(event);
});

function login (event) {

const userNameValue = userNameInput.value.trim();

if (userNameValue === '') {
  alert('Please enter your username');
  return;
}

userName = userNameValue;

loginForm.classList.remove('show');
messagesSection.classList.add('show');

};

addMessageForm.addEventListener('submit', function (event) {
  event.preventDefault();

  sendMessage(event);
});

function sendMessage (event) {
  event.preventDefault();

  const messageContentValue = messageContentInput.value.trim();

  if (messageContentValue === '') {
    alert('Please enter your message');
    return;
  }

  addMessage(userName, messageContentValue);
};

function addMessage ( author, content ) {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.addd('message--received');
  if (author === userName) {
    message.classList.add('message--self')
  }
  message.innerHTML = `
  <h3 class="message__author">${userName === author ? 'You' : author }</h3>
  <div class="message__content">
    ${content}
  </div>
  `;
  messagesList.appendChild(message);
}