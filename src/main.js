import { mount } from 'svelte'
import './css/app.css'
import App from './App.svelte'

try {
  document.getElementById('app').innerHTML = '';
} catch(err) {
  
}

const app = mount(App, {
  target: document.getElementById('app'),
})

export default app
