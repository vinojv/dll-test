import React from 'react';

console.log(' loaded core ');
const div = document.createElement('div');
div.innerHTML = '<h4>core</h4>';
document.body.appendChild(div);
let loaded = false;
export default 'core';