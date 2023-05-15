import { onMounted, onUnmounted, getCurrentInstance } from 'vue';
import throttle from '../utils/throttle';
export default function () {
  const { Bus }  = getCurrentInstance().appContext.config.globalProperties;
  const resize = () => {
    Bus.emit('resize', { msg: 'hello' });
  }
  const throttled = throttle(resize, 300);

  onMounted(() => {
    window.addEventListener('resize', throttled);
  });
  onUnmounted(() => {
    window.removeEventListener('resize', throttled);
  });
}