import React from 'react';
console.log(' loaded module2 ');
const div = document.createElement('div');
div.innerHTML = '<h4>module2</h4>';
document.body.appendChild(div);

export default 'module2';

