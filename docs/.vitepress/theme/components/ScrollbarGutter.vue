<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  function getScrollbarWidth() {
    const div = document.createElement('div');
    div.style.overflow = 'scroll';
    div.style.width = '100px';
    div.style.height = '100px';
    document.body.appendChild(div);
    const width = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
    return width;
  }
  document.documentElement.style.setProperty('--scrollbar-width', getScrollbarWidth() + 'px');
});
</script>
