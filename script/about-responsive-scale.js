// About(고정 좌표 기반) 페이지를 창 크기에 맞춰 비율 스케일링
// - 창모드에서 레이아웃이 "그대로"라 위치가 틀어지는 문제 해결
// - 캔버스 전체를 같이 줄이고, 문서 높이도 스케일에 맞춰 보정

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
    const canvas = document.querySelector(".about-canvas");
    if (!canvas) return;

    const vw = getViewportWidth();
    // 모바일에서도 화면 폭에 "딱 맞게" 축소되도록 최소 스케일 제한 제거
    const scale = Math.min(1, vw / CANVAS_WIDTH);

    // 스케일 적용
    document.documentElement.style.setProperty("--about-scale", String(scale));

    // transform은 레이아웃 높이를 줄이지 않기 때문에, 실제 문서 높이를 보정
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

