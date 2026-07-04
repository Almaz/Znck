<script setup lang="ts">
import { computed, ref, shallowRef, onMounted } from 'vue';
import { data } from './HomeHeroIconsCard.data';
import { useData, useRouter } from 'vitepress';
import { motion, useScroll, useTransform, type Options } from 'motion-v';
import LucideIcon from '../base/LucideIcon.vue';

type MotionVariants = NonNullable<Options['variants']>;

const emit = defineEmits(['animation-complete']);

const MotionLucideIcon = motion.create(LucideIcon);

const preventFocusProps = {
  tabindex: '-1',
  focusable: 'false',
};

const COLUMNS = 8;
const SIZE = 2;
const GAP = 1;

const { scrollYProgress } = useScroll();
const opacity = useTransform(() => 1 - scrollYProgress.get() * 8);
const { isDark } = useData();
const logoColor = computed(() => (isDark.value ? '#a19bf1' : '#35139a'));
const guideColor = computed(() => (isDark.value ? '#d4d4d8' : '#737373'));
const guidePathOpacity = computed(() => (isDark.value ? 0.3 : 0.65));

const icons = ref(
  data.icons.slice(0, 64).map((icon, index) => {
    const x = index % COLUMNS;
    const y = Math.floor(index / COLUMNS);

    if (index === 0) {
      return {
        ...icon,
        x: 9999,
        y: 9999,
        opacity: 0,
      };
    }

    return {
      ...icon,
      x: x * (SIZE + GAP) + 0.5,
      y: y * (SIZE + GAP) + 0.5,
    };
  }),
);

const { go } = useRouter();
const intervalTime = shallowRef();

// === Анимация масштабирования ===
const scaleDownVariants: MotionVariants = {
  fullSize: {
    x: 0,
    y: 0,
    scale: 1,
    opacity: 1,
  },
  riseUp: {
    x: 0.5,
    y: -0.5,
    animationName: 'riseUp',
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  small: {
    x: -10.5,
    y: -10.5,
    scale: 0.1,
    opacity: 1,
    animationName: 'small',
    transition: {
      delay: 1,
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  hidden: {
    x: -10.5,
    y: -10.5,
    scale: 0.1,
    opacity: 0,
    animationName: 'hidden',
    transition: {
      duration: 0.8,
      ease: 'easeInOut',
    },
  },
};
const scaleDownAnimation = ref('fullSize');

const iconGridAnimation = ref('initial');

// === Пути букв ===
const LOGOS = [
  {
    paths: [
      'm 3,3 h 7.5 l -7.5,8.5 7.5,-1',   // z
      'M 13.5,10.5 V 3 l 7.5,6.5 V 3',   // n
      'm 10.5,13.5 -7.5,1 v 6.5 h 7.5',  // c
      'm 13.5,13.5 v 7.5',                // k1
      'M 21,12.5 15.5,18 21,21',          // k2
    ],
    points: [
      { name: 'k5', cx: 21, cy: 21 },
      { name: 'k4', cx: 15.5, cy: 18 },
      { name: 'k3', cx: 21, cy: 12.5 },
      { name: 'k2', cx: 13.5, cy: 21 },
      { name: 'k1', cx: 13.5, cy: 13.5 },
      { name: 'c4', cx: 10.5, cy: 21 },
      { name: 'c3', cx: 3, cy: 21 },
      { name: 'c2', cx: 3, cy: 14.5 },
      { name: 'c1', cx: 10.5, cy: 13.5 },
      { name: 'n4', cx: 21, cy: 3 },
      { name: 'n3', cx: 21, cy: 9.5 },
      { name: 'n2', cx: 13.5, cy: 3 },
      { name: 'n1', cx: 13.5, cy: 10.5 },
      { name: 'z4', cx: 10.5, cy: 10.5 },
      { name: 'z3', cx: 3, cy: 11.5 },
      { name: 'z2', cx: 10.5, cy: 3 },
      { name: 'z1', cx: 3, cy: 3 },
    ],
  },
  {
    paths: [
      'M 3,3 H 10.5 L 7,6.5 10.5,10.5 3,11.5',
      'M 13.5,3 v 7.5 -3.5 h 7.5 v 2.5 -6.5',
      'M 3,14.5 v 3.5 l 7.5,1 V 13.5 21',
      'm 13.5,13.5 v 7.5',
      'M 21,12.5 15.5,18 21,21',
    ],
    points: [
      { name: 'к5', cx: 21, cy: 21 },
      { name: 'к4', cx: 15.5, cy: 18 },
      { name: 'к3', cx: 21, cy: 12.5 },
      { name: 'к2', cx: 13.5, cy: 21 },
      { name: 'к1', cx: 13.5, cy: 13.5 },
      { name: 'ч5', cx: 10.5, cy: 21 },
      { name: 'ч4', cx: 10.5, cy: 13.5 },
      { name: 'ч3', cx: 10.5, cy: 19 },
      { name: 'ч2', cx: 3, cy: 18 },
      { name: 'ч1', cx: 3, cy: 14.5 },
      { name: 'н6', cx: 21, cy: 9.5 },
      { name: 'н5', cx: 21, cy: 3 },
      { name: 'н4', cx: 21, cy: 7 },
      { name: 'н3', cx: 13.5, cy: 7 },
      { name: 'н2', cx: 13.5, cy: 10.5 },
      { name: 'н1', cx: 13.5, cy: 3 },
      { name: 'з5', cx: 3, cy: 11.5 },
      { name: 'з4', cx: 10.5, cy: 10.5 },
      { name: 'з3', cx: 7, cy: 6.5 },
      { name: 'з2', cx: 10.5, cy: 3 },
      { name: 'з1', cx: 3, cy: 3 },
    ],
  },
].map((logo) => ({
  ...logo,
  points: logo.points.map((point) => ({
    ...point,
    delay: Math.random() * 2,
  })),
}));

const LETTER_PATHS = LOGOS[0].paths;

const GUIDE_PATHS_START_TIME = 2400;
const GUIDE_PATHS_DURATION = 600;
const LETTER_COLORIZE_DURATION = 3200;
const LETTER_K1_COLORIZE_DURATION = LETTER_COLORIZE_DURATION / 3;
const LETTER_COLORIZE_STAGGER = LETTER_COLORIZE_DURATION * 0.3;
const LETTER_K_PART_STAGGER = LETTER_K1_COLORIZE_DURATION * 0.2;
const LETTER_COLORIZE_START_TIME = GUIDE_PATHS_START_TIME + GUIDE_PATHS_DURATION;
const LETTER_COLORIZE_DELAYS = LETTER_PATHS.map((_, index) => {
  if (index <= 3) {
    return index * LETTER_COLORIZE_STAGGER;
  }

  return 3 * LETTER_COLORIZE_STAGGER + LETTER_K_PART_STAGGER;
});
const LETTER_EXIT_START_TIME =
  LETTER_COLORIZE_START_TIME + Math.max(...LETTER_COLORIZE_DELAYS) + LETTER_COLORIZE_DURATION;
const LOGO_SCALE_DOWN_START_TIME = LETTER_EXIT_START_TIME + 1400;
const ICON_GRID_START_TIME = LETTER_EXIT_START_TIME + 3200;
const SHRINK_START_TIME = LETTER_EXIT_START_TIME + 7600;
const ICON_GRID_RESET_TIME = SHRINK_START_TIME + 3300;
const LOGO_CYCLE_DURATION = ICON_GRID_RESET_TIME + 2000;

// === Состояния анимации ===
// Фаза 0: точки и хендлы
const dotsOpacity = ref([0, 0]);
const guidePathsOpacity = ref([0, 0]);
// Фаза 2: цветная прорисовка логотипа
const letterColorStates = ref(LOGOS.map(() => ['hidden', 'hidden', 'hidden', 'hidden', 'hidden']));
// Фаза 3: exit (смена на цвет текста)
const letterExitStates = ref(LOGOS.map(() => ['hidden', 'hidden', 'hidden', 'hidden', 'hidden']));
const logoOpacity = ref([1, 0]);

const setLogoValue = (values: number[], index: number, value: number) =>
  values.map((item, itemIndex) => (itemIndex === index ? value : item));

const setLogoLetterState = (states: string[][], logoIndex: number, pathIndex: number, value: string) =>
  states.map((logoStates, itemIndex) =>
    itemIndex === logoIndex
      ? logoStates.map((state, stateIndex) => (stateIndex === pathIndex ? value : state))
      : logoStates,
  );

// Variants для цветной прорисовки
const colorVariants: MotionVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (custom: unknown) => {
    const index = Number(custom);
    const duration = index === 3 ? LETTER_K1_COLORIZE_DURATION : LETTER_COLORIZE_DURATION;

    return {
      animationName: 'colorize',
      pathLength: 1.02,
      opacity: 1,
      transition: {
        pathLength: { type: 'spring', duration: duration / 1000, bounce: 0 },
        opacity: { duration: 0.1 },
      },
    };
  },
};

// Variants для exit
const exitVariants: MotionVariants = {
  hidden: { opacity: 0 },
  visible: {
    animationName: 'exit',
    opacity: 1,
    transition: {
      duration: 0.8,
    },
  },
};

// Запуск анимации по таймеру
onMounted(() => {
  LOGOS.forEach((logo, logoIndex) => {
    const startTime = logoIndex * LOGO_CYCLE_DURATION;

    setTimeout(() => {
      scaleDownAnimation.value = 'fullSize';
      iconGridAnimation.value = 'initial';
      shrinkIconAnimation.value = 'initial';
      logoOpacity.value = logoOpacity.value.map((_, index) => (index === logoIndex ? 1 : 0));
    }, startTime);

    setTimeout(() => {
      dotsOpacity.value = setLogoValue(dotsOpacity.value, logoIndex, 1);
    }, startTime + 200);

    setTimeout(() => {
      guidePathsOpacity.value = setLogoValue(guidePathsOpacity.value, logoIndex, 1);
    }, startTime + GUIDE_PATHS_START_TIME);

    logo.paths.forEach((_, index) => {
      setTimeout(() => {
        letterColorStates.value = setLogoLetterState(letterColorStates.value, logoIndex, index, 'visible');
      }, startTime + LETTER_COLORIZE_START_TIME + LETTER_COLORIZE_DELAYS[index]);
    });

    setTimeout(() => {
      dotsOpacity.value = setLogoValue(dotsOpacity.value, logoIndex, 0);
      guidePathsOpacity.value = setLogoValue(guidePathsOpacity.value, logoIndex, 0);
      letterExitStates.value = letterExitStates.value.map((logoStates, itemIndex) =>
        itemIndex === logoIndex ? logoStates.map(() => 'visible') : logoStates,
      );
    }, startTime + LETTER_EXIT_START_TIME);

    // Фаза 4: scaleDown логотипа
    setTimeout(() => {
      scaleDownAnimation.value = 'small';
    }, startTime + LOGO_SCALE_DOWN_START_TIME);

    // Фаза 5: показ иконок
    setTimeout(() => {
      shrinkIconAnimation.value = 'initial';
      iconGridAnimation.value = 'showIcons';
    }, startTime + ICON_GRID_START_TIME);

    // Фаза 6: shrink всех элементов
    setTimeout(() => {
      shrinkIconAnimation.value = 'shrinkIcons';
    }, startTime + SHRINK_START_TIME);

    setTimeout(() => {
      logoOpacity.value = setLogoValue(logoOpacity.value, logoIndex, 0);
    }, startTime + SHRINK_START_TIME + 3300);

    setTimeout(() => {
      iconGridAnimation.value = 'initial';
    }, startTime + ICON_GRID_RESET_TIME);
  });

  // Полный цикл завершён
  setTimeout(() => {
    emit('animation-complete');
  }, LOGOS.length * LOGO_CYCLE_DURATION);
});

const randomIndex = ref(Math.floor(Math.random() * 64));

const iconAnimationVariants: MotionVariants = {
  initial: {
    animationName: 'end',
    opacity: 0,
    x: 0,
    y: 0,
    transition: { duration: 1, delay: 1, ease: 'easeInOut' },
  },
  showIcons: (custom: unknown) => {
    const index = Number(custom);

    return {
      animationName: 'showIcons',
      opacity: [0, 1, 1],
      x: [0.5, 0, 0],
      y: [-0.5, 0, 0],
      strokeWidth: randomIndex.value === index ? [0, 2, 2] : undefined,
      transition: { delay: index * 0.023, duration: 1.6, ease: 'easeInOut' as const },
    };
  },
};

const shrinkIconAnimation = ref('initial');

const shrinkIconVariants: MotionVariants = {
  initial: { strokeWidth: 2 },
  shrinkIcons: () => ({
    animationName: 'shrinkIcons',
    opacity: 1,
    strokeWidth: 0,
    transition: { delay: 1.8, duration: 1.5, ease: 'easeInOut' as const },
  }),
};
</script>

<template>
  <div
    class="home-hero-animation-container"
    v-bind="preventFocusProps"
  >
    <div
      class="home-hero-animation"
      v-bind="preventFocusProps"
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-12 -12 48 48"
        fill="none"
        overflow="auto"
        stroke="currentColor"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="hero-background"
        :style="{ opacity }"
        v-bind="preventFocusProps"
      >
        <!-- Сетка -->
        <g
          class="svg-preview-grid-group"
          stroke-linecap="butt"
          stroke-width="0.1"
          stroke="#777"
          mask="url(#svg-preview-bounding-box-mask)"
          stroke-opacity="0.3"
          v-bind="preventFocusProps"
        >
          <path
            stroke-dasharray="0 0.1 0.1 0.15 0.1 0.15 0.1 0.15 0.1 0.15 0.1 0.15 0.1 0.15 0.1 0.15 0.1 0.15 0.1 0.15 0.1 0.15 0.1 0.15 0 0.15"
            stroke-width="0.1"
            d="M1 0.1v23.8M2 0.1v23.8M4 0.1v23.8M5 0.1v23.8M7 0.1v23.8M8 0.1v23.8M10 0.1v23.8M11 0.1v23.8M13 0.1v23.8M14 0.1v23.8M16 0.1v23.8M17 0.1v23.8M19 0.1v23.8M20 0.1v23.8M22 0.1v23.8M23 0.1v23.8M0.1 1h23.8M0.1 2h23.8M0.1 4h23.8M0.1 5h23.8M0.1 7h23.8M0.1 8h23.8M0.1 10h23.8M0.1 11h23.8M0.1 13h23.8M0.1 14h23.8M0.1 16h23.8M0.1 17h23.8M0.1 19h23.8M0.1 20h23.8M0.1 22h23.8M0.1 23h23.8"
          />
          <path
            d="M3 0.1v23.8M6 0.1v23.8M9 0.1v23.8M12 0.1v23.8M15 0.1v23.8M18 0.1v23.8M21 0.1v23.8M0.1 3h23.8M0.1 6h23.8M0.1 9h23.8M0.1 12h23.8M0.1 15h23.8M0.1 18h23.8M0.1 21h23.8"
          />
        </g>

        <!-- Контейнер с логотипом и иконками -->
        <motion.g
          initial="initial"
          :variants="shrinkIconVariants"
          :animate="shrinkIconAnimation"
          v-bind="preventFocusProps"
        >
          <!-- Иконки сетки -->
          <MotionLucideIcon
            v-for="(icon, index) in icons"
            size="2"
            initial="initial"
            :key="icon.name"
            :variants="iconAnimationVariants"
            :animate="iconGridAnimation"
            :custom="index"
            strokeWidth="inherit"
            v-bind="icon"
            tabindex="-1"
            focusable="false"
          />

          <!-- Логотип с анимацией сжатия -->
          <motion.g
            :variants="scaleDownVariants"
            :animate="scaleDownAnimation"
            initial="fullSize"
            v-bind="preventFocusProps"
          >
            <motion.g
              v-for="(logo, logoIndex) in LOGOS"
              :key="logoIndex"
              :animate="{ opacity: logoOpacity[logoIndex] }"
              :initial="{ opacity: logoOpacity[logoIndex] }"
              :transition="{ duration: 0.4 }"
              v-bind="preventFocusProps"
            >
              <g
                v-for="(path, index) in logo.paths"
                :key="index"
                v-bind="preventFocusProps"
              >
                <motion.path
                  :d="path"
                  :style="{ stroke: logoColor }"
                  stroke-width="inherit"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  fill="none"
                  :animate="letterColorStates[logoIndex][index]"
                  initial="hidden"
                  :variants="colorVariants"
                  :custom="index"
                  v-bind="preventFocusProps"
                />
                <motion.path
                  :d="path"
                  stroke="var(--vp-c-text-1)"
                  stroke-width="inherit"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  fill="none"
                  :animate="letterExitStates[logoIndex][index]"
                  initial="hidden"
                  :variants="exitVariants"
                  v-bind="preventFocusProps"
                />
              </g>
            </motion.g>
          </motion.g>
        </motion.g>

        <!-- Тонкие линии, повторяющие форму букв (предварительные) -->
        <motion.g
          v-for="(logo, logoIndex) in LOGOS"
          :key="`guide-${logoIndex}`"
          class="svg-preview-handle-lines"
          :stroke="guideColor"
          stroke-width="0.12"
          :stroke-opacity="guidePathOpacity"
          fill="none"
          :animate="{ opacity: guidePathsOpacity[logoIndex] }"
          :initial="{ opacity: 0 }"
          :transition="{ duration: GUIDE_PATHS_DURATION / 1000 }"
          v-bind="preventFocusProps"
        >
          <path
            v-for="path in logo.paths"
            :key="path"
            :d="path"
          />
        </motion.g>

        <!-- Контрольные точки (узлы букв) -->
        <motion.g
          v-for="(logo, logoIndex) in LOGOS"
          :key="`points-${logoIndex}`"
          class="svg-preview-control-path-marker-group"
          :stroke="guideColor"
          stroke-width="0.125"
          v-bind="preventFocusProps"
        >
          <motion.circle
            v-for="point in logo.points"
            :key="point.name"
            :cx="point.cx"
            :cy="point.cy"
            r="0.5"
            :initial="{ opacity: 0 }"
            :animate="{ opacity: dotsOpacity[logoIndex] }"
            :transition="{ delay: dotsOpacity[logoIndex] ? point.delay : 0, duration: 0.3 }"
            v-bind="preventFocusProps"
          />
        </motion.g>

      </motion.svg>
    </div>
  </div>
</template>

<style scoped>
.home-hero-animation-container {
  margin: -48px -24px 0;
  display: flex;
}

.home-hero-animation {
  height: 250px;
  width: 396px;
  overflow: hidden;
  margin: auto;
  margin-left: calc(((396px - 100vw) / 2) * -1);
}

@media (min-width: 396px) {
  .home-hero-animation {
    margin-left: auto;
  }
}

.hero-background {
  transform: rotateX(-51deg) rotateZ(-43deg);
  transform-style: preserve-3d;
  will-change: transform, opacity;
  position: relative;
  top: -155px;
  left: -82px;
  width: 560px;
  height: 560px;
  pointer-events: none;
}

@media (min-width: 640px) {
  .hero-background {
    width: 680px;
    height: 680px;
    left: -100px;
    top: -188px;
  }

  .home-hero-animation {
    height: 305px;
    width: 480px;
  }
}

@media (min-width: 768px) {
  .hero-background {
    width: 760px;
    height: 760px;
    left: -110px;
    top: -200px;
  }

  .home-hero-animation {
    height: 360px;
    width: 540px;
  }

  .home-hero-animation-container {
    margin-top: -60px;
  }
}

@media (min-width: 960px) {
  .hero-background {
    top: -20vw;
    right: 20vw;
    width: 80vw;
    height: 80vw;
  }

  .home-hero-animation {
    height: 415px;
    width: 620px;
  }

  .home-hero-animation-container {
    margin: -48px -48px 0 -64px;
  }
}

@media (min-width: 1160px) {
  .home-hero-animation-container {
    margin-right: -64px;
    margin-bottom: -180px;
  }

  .home-hero-animation {
    width: auto;
    height: calc(((1152px / 2)));
    top: -20px;
  }

  .hero-background {
    top: -20vw;
  }
}

@media (min-width: 1280px) {
  .home-hero-animation-container {
    margin-right: -420px;
    margin-top: -64px;
    margin-left: -128px;
  }

  .hero-background {
    width: 1024px;
    height: 1024px;
    top: -280px;
  }
}
</style>
