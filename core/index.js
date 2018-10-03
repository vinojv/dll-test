console.log(' loaded core ');
export default 'core';
let count = 0;
fetch('/manifest.json')
  .then(res => res.json())
  .then((res) => {
    console.log(res);
    Object.entries(res).forEach(([moduleName, mod]) => {
      if (moduleName === 'core') return;
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