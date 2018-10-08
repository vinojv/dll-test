import React from 'react';
import core from 'core/core_submodule'
console.log(' loaded module1 ');
const div = document.createElement('div')
div.innerHTML = '<h4>module 1</h4>'
document.body.appendChild(div)
export default 'module1';
