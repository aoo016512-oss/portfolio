// 로딩 게이지 호버 시 텍스트 변경
document.addEventListener('DOMContentLoaded', function() {
    const section2Loading = document.querySelector('.section-2-loading');
    const section2LoadingText = document.getElementById('section2LoadingText');
    
    if (!section2Loading || !section2LoadingText) return;
    
    section2Loading.addEventListener('mouseenter', function() {
        section2LoadingText.textContent = '100%';
    });
    
    section2Loading.addEventListener('mouseleave', function() {
        section2LoadingText.textContent = '80%';
    });
});
