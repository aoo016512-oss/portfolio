document.addEventListener('DOMContentLoaded', function() {
    const SCROLL_UNIT = 900; // index/about과 동일
    const DURATION = 1000;
    let isScrolling = false;
    let animationFrameId = null;

    function isModalOpen() {
        return (
            document.body.classList.contains('modal-open') ||
            document.documentElement.classList.contains('modal-open') ||
            !!document.querySelector('.modal-overlay.active')
        );
    }

    function easeInOutCubic(t) {
        return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

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

    window.addEventListener('wheel', function(e) {
        // 모달이 열려 있을 때는 모달만 스크롤되도록(배경 스크롤 로직 중단)
        if (isModalOpen()) return;

        e.preventDefault();

        // 연속 스크롤 방지: 이미 스크롤 중이면 무시 (index/about과 동일한 체감)
        if (isScrolling) return;

        const deltaY = e.deltaY;
        const scrollDirection = deltaY > 0 ? 1 : -1;

        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetScrollTop = currentScrollTop + (scrollDirection * SCROLL_UNIT);

        const maxScroll = Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
        ) - window.innerHeight;

        const clampedScrollTop = Math.max(0, Math.min(targetScrollTop, maxScroll));

        isScrolling = true;
        smoothScrollTo(clampedScrollTop);
    }, { passive: false });

    // 네비게이션 링크 클릭 시 부드럽게 스크롤
    document.querySelectorAll('.nav-item[href^="#"]').forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

