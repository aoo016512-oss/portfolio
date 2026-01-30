// 부드러운 스크롤 개선
document.addEventListener('DOMContentLoaded', function() {
    let isScrolling = false;
    let scrollTimeout;
    
    window.addEventListener('wheel', function(e) {
        if (isScrolling) {
            e.preventDefault();
            return;
        }
        
        clearTimeout(scrollTimeout);
        isScrolling = true;
        
        const delta = e.deltaY;
        const sections = document.querySelectorAll('section');
        const currentScroll = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const currentSection = Math.round(currentScroll / windowHeight);
        
        let targetSection;
        if (delta > 0) {
            // 아래로 스크롤
            targetSection = Math.min(currentSection + 1, sections.length - 1);
        } else {
            // 위로 스크롤
            targetSection = Math.max(currentSection - 1, 0);
        }
        
        const targetScroll = targetSection * windowHeight;
        
        window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
        });
        
        scrollTimeout = setTimeout(function() {
            isScrolling = false;
        }, 800);
    }, { passive: false });
    
    // 터치 이벤트 지원 (모바일)
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].clientY;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeDistance = touchStartY - touchEndY;
        const minSwipeDistance = 50;
        
        if (Math.abs(swipeDistance) > minSwipeDistance && !isScrolling) {
            isScrolling = true;
            const sections = document.querySelectorAll('section');
            const currentScroll = window.pageYOffset;
            const windowHeight = window.innerHeight;
            const currentSection = Math.round(currentScroll / windowHeight);
            
            let targetSection;
            if (swipeDistance > 0) {
                // 아래로 스와이프
                targetSection = Math.min(currentSection + 1, sections.length - 1);
            } else {
                // 위로 스와이프
                targetSection = Math.max(currentSection - 1, 0);
            }
            
            const targetScroll = targetSection * windowHeight;
            
            window.scrollTo({
                top: targetScroll,
                behavior: 'smooth'
            });
            
            setTimeout(function() {
                isScrolling = false;
            }, 800);
        }
    }
    
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

