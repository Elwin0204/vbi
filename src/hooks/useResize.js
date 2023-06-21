import { onMounted, onUnmounted, getCurrentInstance } from 'vue';
import throttle from '../utils/throttle';
export default function () {
  const { Bus }  = getCurrentInstance().appContext.config.globalProperties;
  const resize = () => {
    const h = document.documentElement.clientHeight || document.body.clientHeight;
    const w = document.documentElement.clientWidth || document.body.clientWidth;
    const chartH = 240 / 1080 * h;
    const chartW = 510 / 1080 * h;
    const mapH = 770 / 1080 * h;
    const mapW = 830 / 1080 * h;
    Bus.emit('resize', { screen: { w, h }, chart: { chartW, chartH }, map: { mapW, mapH }  });
  }
  const throttled = throttle(resize, 300);

  onMounted(() => {
    resize();
    window.addEventListener('resize', throttled);
  });
  onUnmounted(() => {
    window.removeEventListener('resize', throttled);
  });
}