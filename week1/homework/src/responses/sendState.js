"use strict";
function sendState(state) {
  let json = JSON.parse(`{"state": ${state}}`, (key, value) =>
  typeof value === 'number'
    ? value // return value * 2 for numbers
    : value     // return everything else unchanged
);
  return json;
}

module.exports = sendState;
