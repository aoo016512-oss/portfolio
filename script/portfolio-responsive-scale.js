// 포트폴리오(1920px 고정 좌표) 레이아웃을 창 크기에 맞춰 비율 스케일링
// - absolute 좌표 기반 요소(이미지/버튼/텍스트)가 "밀리지" 않게, 섹션 전체를 같이 줄입니다.

(function () {
  const CANVAS_WIDTH = 1920;

  function applyScale() {
    const canvas = document.querySelector(".portfolio-canvas");
    if (!canvas) return;

    const vw =
      (window.visualViewport && window.visualViewport.width) ||
      window.innerWidth ||
      document.documentElement.clientWidth ||
      CANVAS_WIDTH;
    // 모바일에서도 화면 폭에 "딱 맞게" 축소되도록 최소 스케일 제한 제거
    const scale = Math.min(1, vw / CANVAS_WIDTH);
    document.documentElement.style.setProperty("--portfolio-scale", String(scale));

    // scale(transform)은 레이아웃 높이를 줄이지 않아서 맨 아래에 "검은 여백"이 생길 수 있음
    // → 캔버스 높이를 스케일에 맞춰 보정해서 SUB_6에서 스크롤이 끝나게 함
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
  applyScale();
})();

