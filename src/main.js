import { createApp } from 'vue';
import mitt from 'mitt';
import './style.less';
import App from './App.vue';

const app = createApp(App);
app.config.globalProperties.Bus = mitt();
app.mount('#app');
