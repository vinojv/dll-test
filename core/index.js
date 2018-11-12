import React from 'react';

console.log(' loaded core ');
const div = document.createElement('div');
div.innerHTML = '<h4>\'core\'</h4>';
document.body.appendChild(div);
let loaded = false;
export default 'core';
let count = 0;
fetch('manifest.json')
  .then(res => res.json())
  .then((res) => {
    if (loaded) {
      console.log('already loaded');
      return;
    }
    loaded = true;
    console.log(res);
    Object.entries(res).forEach(([moduleName, mod]) => {
      // if (moduleName === 'core') return;
      Object.entries(mod).forEach(([name, script]) => {
        if (name.includes('index.html')) return;
        const scriptTag = document.createElement('script');
        scriptTag.type = 'application/javascript';
        scriptTag.src = script;
        document.querySelector('body').appendChild(scriptTag);
        count++;
      });
    });
  }).catch(e => {
  console.error(e);
});