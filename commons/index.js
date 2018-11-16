console.log('core submodule');
const div = document.createElement('div')
div.innerHTML = '<h4>submodule from core</h4>'
document.body.appendChild(div)

export default 'exporting submodule from core'