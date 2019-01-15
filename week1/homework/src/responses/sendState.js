'use strict';
function sendState(state) {
  let json = JSON.parse(
    `{"state": ${state}}`,
    (key, value) => (typeof value === 'number' ? value : value) // return everything else unchanged
  );
  return json;
}

module.exports = sendState;
