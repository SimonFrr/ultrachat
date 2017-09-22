import { Template } from 'meteor/templating';
import { Messages } from '../imports/api/messages.js';

import './main.html';

Template.body.helpers({
  messages() {
    return Messages.find({});
  }
});
