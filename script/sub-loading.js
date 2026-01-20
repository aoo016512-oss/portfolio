// 로딩 게이지 애니메이션
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingBar = document.getElementById('loadingBar');
    const loadingText = document.getElementById('loadingText');
    
    let progress = 0;
    const targetProgress = 100;
    const duration = 800; // 0.8초 동안 로드
    const interval = 16; // 약 60fps
    const increment = (targetProgress / duration) * interval;
    
    // 이미지 로드 확인
    const images = document.querySelectorAll('img');
    let loadedImages = 0;
    const totalImages = images.length;
    
    function updateProgress(value) {
        progress = Math.min(value, 100);
        loadingBar.style.width = progress + '%';
        loadingText.textContent = Math.round(progress) + '%';
    }
    
    // 이미지 로드 완료 체크
    function checkImageLoad() {
        loadedImages++;
        const imageProgress = (loadedImages / totalImages) * 80; // 이미지 로드는 80%까지
        updateProgress(imageProgress);
    }
    
    // 이미지 로드 이벤트 리스너
    images.forEach(function(img) {
        if (img.complete) {
            checkImageLoad();
        } else {
            img.addEventListener('load', checkImageLoad);
            img.addEventListener('error', checkImageLoad); // 에러 시에도 진행
        }
    });
    
    // 기본 진행률 애니메이션
    const startTime = Date.now();
    const animate = setInterval(function() {
        const elapsed = Date.now() - startTime;
        const timeProgress = Math.min((elapsed / duration) * 100, 100);
        
        // 이미지 로드 진행률과 시간 진행률 중 더 큰 값 사용
        const currentProgress = Math.max(progress, timeProgress);
        updateProgress(currentProgress);
        
        if (currentProgress >= 100) {
            clearInterval(animate);
            // 로딩 완료 후 약간의 딜레이 후 화면 숨김
            setTimeout(function() {
                loadingScreen.classList.add('hidden');
                setTimeout(function() {
                    loadingScreen.style.display = 'none';
                }, 300);
            }, 200);
        }
    }, interval);
    
    // 최소 로딩 시간 보장 (너무 빠르게 사라지지 않도록)
    setTimeout(function() {
        if (progress < 100) {
            updateProgress(100);
        }
    }, duration);
});

