// Home/Index(1920px 고정 좌표) 레이아웃을 창 크기에 맞춰 비율 스케일링
// - 창모드에서 레이아웃이 그대로라 위치가 틀어지는 문제 해결

(function () {
  const CANVAS_WIDTH = 1920;

  function getViewportWidth() {
    return (
      (window.visualViewport && window.visualViewport.width) ||
      window.innerWidth ||
      document.documentElement.clientWidth ||
      CANVAS_WIDTH
    );
  }

  function applyScale() {
    const canvas = document.querySelector(".home-canvas");
    if (!canvas) return;

    const vw = getViewportWidth();
    // 모바일에서도 화면 폭에 "딱 맞게" 축소되도록 최소 스케일 제한 제거
    const scale = Math.min(1, vw / CANVAS_WIDTH);

    document.documentElement.style.setProperty("--home-scale", String(scale));

    // transform은 레이아웃 높이를 줄이지 않으므로 문서 높이를 보정
    canvas.style.height = "auto";
    const naturalHeight = canvas.scrollHeight;
    canvas.style.height = `${Math.ceil(naturalHeight * scale)}px`;
  }

  let rafId = null;
  function onResize() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      rafId = null;
      applyScale();
    });
  }

  window.addEventListener("resize", onResize, { passive: true });
  window.addEventListener("orientationchange", onResize, { passive: true });
  document.addEventListener("DOMContentLoaded", applyScale);
  window.addEventListener("load", applyScale);
  applyScale();
})();

