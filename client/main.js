import { Template } from 'meteor/templating';
import { Messages } from '../imports/api/messages.js';

import './main.html';

Template.body.helpers({
  messages() {
    return Messages.find({}, { sort: { createdAt: -1 } });
  }
});

Template.body.events({
  'submit #new-message'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const name = target.name.value;
    let text = target.text.value;

    if (name === "" || text === "") {
      return;
    }

    text = modify(text);

    // Insert a task into the collection
    Messages.insert({
      name,
      text,
      createdAt: new Date(), // current time
    });

    // Clear text
    target.text.value = '';
  },
});

const modifiers = [
  text => text.toUpperCase(),
  text => {
    return text
      .replace(/a/g, "")
      .replace(/e/g, "")
      .replace(/i/g, "")
      .replace(/o/g, "")
      .replace(/u/g, "")
  }
];

const modify = text => {
  const index = Math.floor(Math.random() * modifiers.length);
  return modifiers[index](text);
}
