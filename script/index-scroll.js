document.addEventListener('DOMContentLoaded', function() {
    const SCROLL_UNIT = 900; // 휠 한 번당 스크롤 거리 (px)
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
        
        // 목표 스크롤 위치 계산 (±900px)
        const targetScrollTop = currentScrollTop + (scrollDirection * SCROLL_UNIT);
        
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
    
    // 3번째 섹션 텍스트 위치 설정
    function positionSection3Text() {
        const section3Text = document.getElementById('section3-text');
        
        if (!section3Text) return;
        
        // 고정 위치 설정
        section3Text.style.left = '981px';
        section3Text.style.top = '1931px';
        section3Text.style.transform = 'translateX(-50%)';
    }
    
    // 3번째 섹션 오른쪽 아래 텍스트 위치 설정
    function positionSection3TextBottom() {
        const section3TextBottom = document.getElementById('section3-text-bottom');
        
        if (!section3TextBottom) return;
        
        // 고정 위치 설정
        section3TextBottom.style.left = '1634px';
        section3TextBottom.style.top = '2528px';
        section3TextBottom.style.transform = 'translateX(-100%) translateY(-100%)';
    }
    
    // 초기 3번째 섹션 텍스트 배치
    positionSection3Text();
    
    // 초기 3번째 섹션 오른쪽 아래 텍스트 배치
    positionSection3TextBottom();
});
