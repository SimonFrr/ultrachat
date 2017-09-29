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
    const textField = target.text;
    let text = textField.value;

    // Refocus on text field
    textField.focus();

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
  text => "J'adore François Fillon",
  text => "Sérieux ?",
  text => "Alors après, voilà ! " + text,
  text => "Donc si tu veux, " + text,
  text => "Je suis pas raciste, mais " + text,
  text => text + " GROS BOLOSS!",
  text => text + ". Sad!",
  text => text.toUpperCase(),
  text => text.split("").reverse().join(""),
  text => text.split("").join(" "),
  text => text.split("").join("/"),
  text => text.split(" ").join(" bite "),
  text => text.replace(/e/g, "EEE"),
  text => {
    return text
      .replace(/a/g, "")
      .replace(/e/g, "")
      .replace(/i/g, "")
      .replace(/o/g, "")
      .replace(/u/g, "")
      .replace(/y/g, "")
  }
];

const modify = text => {
  // Leave half of the messages intact
  if (Math.random() < 0.5) {
    return text;
  }
  const index = Math.floor(Math.random() * modifiers.length);
  return modifiers[index](text);
}
