<template>
  <div class="line-animation-section">
    <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="150%" height="150%">
          <feDropShadow dx="8" dy="8" stdDeviation="5" flood-color="#72A5E4" flood-opacity="0.5" />
        </filter>

        <linearGradient id="grad-1" gradientUnits="objectBoundingBox" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#72A5E4" />
          <stop offset="100%" stop-color="#A39AD6" />
        </linearGradient>
      </defs>

      <g filter="url(#shadow)">
        <line class="line" x1="120" y1="50" x2="200" y2="120" stroke="url(#grad-1)" />
        <line class="line" x1="340" y1="60" x2="450" y2="160" stroke="url(#grad-1)" />
        <!-- <line class="line" x1="250" y1="470" x2="350" y2="560" stroke="url(#grad-1)" /> -->
      </g>
    </svg>
  </div>
</template>

<style scoped>
.line-animation-section {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

svg {
  width: 100%;
  height: 100%;
}

.line {
  stroke-width: 18;
  stroke-linecap: round;
  stroke-dasharray: 400;
  stroke-dashoffset: 400;
  /* 加入 forwards 確保動畫結束後維持狀態 */
  animation: draw-line 1.2s ease-out forwards;
}

@keyframes draw-line {
  to {
    stroke-dashoffset: 0;
  }
}
</style>