const LiquidGlassDistortionFilter: React.FC = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
  >
    <filter
      id="glass-distortion"
      colorInterpolationFilters="sRGB"
      x="-12%"
      y="-28%"
      width="124%"
      height="156%"
      filterUnits="objectBoundingBox"
    >
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.012 0.028"
        numOctaves="2"
        seed="11"
        result="turbulence"
      />
      <feGaussianBlur in="turbulence" stdDeviation="2.8" result="softMap" />
      <feComponentTransfer in="softMap" result="liquidMap">
        <feFuncR type="gamma" amplitude="1.15" exponent="1.45" offset="-0.06" />
        <feFuncG type="gamma" amplitude="1" exponent="1.35" offset="-0.04" />
        <feFuncB type="gamma" amplitude="1.05" exponent="1.25" offset="-0.03" />
      </feComponentTransfer>

      <feColorMatrix
        in="SourceGraphic"
        type="matrix"
        values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
        result="sourceRed"
      />
      <feColorMatrix
        in="SourceGraphic"
        type="matrix"
        values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
        result="sourceGreen"
      />
      <feColorMatrix
        in="SourceGraphic"
        type="matrix"
        values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
        result="sourceBlue"
      />

      <feDisplacementMap
        in="sourceRed"
        in2="liquidMap"
        scale="22"
        xChannelSelector="R"
        yChannelSelector="B"
        result="redShift"
      />
      <feDisplacementMap
        in="sourceGreen"
        in2="liquidMap"
        scale="19"
        xChannelSelector="R"
        yChannelSelector="G"
        result="greenShift"
      />
      <feDisplacementMap
        in="sourceBlue"
        in2="liquidMap"
        scale="16"
        xChannelSelector="B"
        yChannelSelector="G"
        result="blueShift"
      />

      <feOffset in="redShift" dx="-0.7" dy="0" result="redOffset" />
      <feOffset in="blueShift" dx="0.7" dy="0" result="blueOffset" />
      <feBlend in="redOffset" in2="greenShift" mode="screen" result="rg" />
      <feBlend in="rg" in2="blueOffset" mode="screen" result="rgbGlass" />
      <feGaussianBlur in="rgbGlass" stdDeviation="0.5" />
    </filter>
  </svg>
);

export default LiquidGlassDistortionFilter;
