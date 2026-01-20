// 위치를 CSS에서 직접 수정하려면 이 스크립트를 비활성화하거나 삭제하세요
// CSS의 .section-2-red-square에서 top과 left 값을 직접 수정하면 됩니다

document.addEventListener('DOMContentLoaded', function() {
    const sub2Image = document.querySelectorAll('.bgc-image')[1]; // sub_2 이미지 (두 번째 이미지)
    const redSquare = document.querySelector('.section-2-red-square');
    
    if (!sub2Image || !redSquare) return;
    
    function positionRedSquare() {
        // CSS에서 설정한 top 값을 유지하기 위해 JavaScript 동적 위치 계산 비활성화
        // top 값은 CSS의 .section-2-red-square에서 직접 설정 (현재: 1204px)
        // redSquare.style.top = '1204px'; // 필요시 주석 해제하여 사용
    }
    
    // 초기 위치 설정
    positionRedSquare();
    
    // 이미지 로드 후 위치 재설정
    window.addEventListener('load', positionRedSquare);
    
    // 리사이즈 시 위치 재설정
    window.addEventListener('resize', positionRedSquare);
    
    // 이미지 로드 완료 후 위치 재설정
    if (sub2Image.complete) {
        positionRedSquare();
    } else {
        sub2Image.addEventListener('load', positionRedSquare);
    }
});
