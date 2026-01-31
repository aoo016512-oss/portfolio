document.addEventListener('DOMContentLoaded', function() {
    const SCROLL_UNIT = 900; // 기본 휠 한 번당 스크롤 거리 (px)
    const LAST_SCROLL_UNIT = 925; // 마지막 섹션 휠 한 번당 스크롤 거리 (px)
    const DURATION = 1000; // 애니메이션 지속 시간 (ms)
    let isScrolling = false; // 연속 스크롤 방지 플래그
    let animationFrameId = null;
    
    // 부드러운 easing 함수 (easeInOutCubic)
    function easeInOutCubic(t) {
        return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    
    // 부드러운 스크롤 애니메이션 함수
    function smoothScrollTo(targetScrollTop) {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        
        const startScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const distance = targetScrollTop - startScrollTop;
        const startTime = performance.now();
        
        function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / DURATION, 1);
            const easedProgress = easeInOutCubic(progress);
            
            const currentScrollTop = startScrollTop + (distance * easedProgress);
            window.scrollTo(0, currentScrollTop);
            
            if (progress < 1) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                isScrolling = false;
                animationFrameId = null;
            }
        }
        
        animationFrameId = requestAnimationFrame(animate);
    }
    
    // 마지막 섹션인지 확인하는 함수
    function isLastSection(currentScrollTop) {
        const images = document.querySelectorAll('.bgc-image');
        if (images.length === 0) return false;
        
        const lastImage = images[images.length - 1];
        const lastImageTop = lastImage.offsetTop;
        const viewportHeight = window.innerHeight;
        
        // 마지막 이미지가 뷰포트에 보이기 시작하는 위치부터 마지막 섹션으로 간주
        return currentScrollTop >= (lastImageTop - viewportHeight);
    }
    
    // 마우스 휠 이벤트 리스너
    window.addEventListener('wheel', function(e) {
        // 기본 스크롤 동작 방지
        e.preventDefault();
        
        // 연속 스크롤 방지: 이미 스크롤 중이면 무시
        if (isScrolling) {
            return;
        }
        
        // 휠 방향 감지
        const deltaY = e.deltaY;
        const scrollDirection = deltaY > 0 ? 1 : -1; // 1: 아래, -1: 위
        
        // 현재 스크롤 위치
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 마지막 섹션인지 확인하여 스크롤 단위 결정
        const scrollUnit = isLastSection(currentScrollTop) ? LAST_SCROLL_UNIT : SCROLL_UNIT;
        
        // 목표 스크롤 위치 계산
        const targetScrollTop = currentScrollTop + (scrollDirection * scrollUnit);
        
        // 최소/최대 스크롤 범위 제한
        const maxScroll = Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
        ) - window.innerHeight;
        
        const clampedScrollTop = Math.max(0, Math.min(targetScrollTop, maxScroll));
        
        // 스크롤 실행
        isScrolling = true;
        smoothScrollTo(clampedScrollTop);
    }, { passive: false }); // passive: false로 설정하여 preventDefault() 사용 가능
});
