import { Template } from 'meteor/templating';
import { Messages } from '../imports/api/messages.js';

import './main.html';

Template.body.helpers({
  messages() {
    return Messages.find({});
  }
});

Template.body.events({
  'submit #new-message'(event) {
    console.log("'bla'");
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const name = target.name.value;
    let text = target.text.value;
    text = modify(text);

    // Insert a task into the collection
    Messages.insert({
      name,
      text,
      createdAt: new Date(), // current time
    });

    // Clear form
    target.text.value = '';
  },
});

const modify = text => {
  return text
    .replace(/a/g, "")
    .replace(/e/g, "")
    .replace(/i/g, "")
    .replace(/o/g, "")
    .replace(/u/g, "")
}
