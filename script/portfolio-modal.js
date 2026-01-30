// 모달 열기/닫기 기능
document.addEventListener('DOMContentLoaded', function() {
    // 현재 스크롤 위치 및 스크롤 동작 저장
    let scrollPosition = 0;
    let previousScrollBehavior = '';
    
    // 모달 열기 함수
    function openModal(modal) {
        if (modal) {
            // 현재 스크롤 위치 저장 (모바일/데스크탑 모두 지원)
            scrollPosition = window.pageYOffset || 
                           document.documentElement.scrollTop || 
                           document.body.scrollTop || 
                           0;
            
            // 현재 html의 scroll-behavior 값을 저장 (smooth 방지용)
            const html = document.documentElement;
            previousScrollBehavior = html.style.scrollBehavior || '';
            
            // 모달 표시
            modal.classList.add('active');
            document.body.classList.add('modal-open');
            document.documentElement.classList.add('modal-open');
        }
    }
    
    // 모달 닫기 함수
    function closeModal(modal) {
        if (modal) {
            // 모달 숨김
            modal.classList.remove('active');
            document.body.classList.remove('modal-open');
            document.documentElement.classList.remove('modal-open');
            
            // scroll-behavior를 일시적으로 auto로 설정하여 강제 smooth 방지
            const html = document.documentElement;
            const originalBehavior = html.style.scrollBehavior;
            html.style.scrollBehavior = 'auto';
            
            // 스크롤 위치 복원 (애니메이션 없이, 점프 없이)
            window.scrollTo(0, scrollPosition);
            document.documentElement.scrollTop = scrollPosition;
            document.body.scrollTop = scrollPosition;
            
            // 다음 프레임에 기존 scroll-behavior 복원
            requestAnimationFrame(function() {
                html.style.scrollBehavior = previousScrollBehavior || originalBehavior || '';
            });
        }
    }
    
    // Section 1 모달
    const modalTrigger1 = document.getElementById('section1-modal-trigger');
    const modal1 = document.getElementById('section1-modal');
    const closeBtn1 = document.getElementById('section1-modal-close-btn');
    
    if (modalTrigger1) {
        modalTrigger1.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            openModal(modal1);
            return false;
        });
    }
    
    if (closeBtn1) {
        closeBtn1.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeModal(modal1);
        });
    }
    
    if (modal1) {
        modal1.addEventListener('click', function(e) {
            if (e.target === modal1) {
                closeModal(modal1);
            }
        });
    }
    
    // Section 2 모달
    const modalTrigger2 = document.getElementById('section2-modal-trigger');
    const modal2 = document.getElementById('section2-modal');
    const closeBtn2 = document.getElementById('section2-modal-close-btn');
    
    if (modalTrigger2) {
        modalTrigger2.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            openModal(modal2);
            return false;
        });
    }
    
    if (closeBtn2) {
        closeBtn2.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeModal(modal2);
        });
    }
    
    if (modal2) {
        modal2.addEventListener('click', function(e) {
            if (e.target === modal2) {
                closeModal(modal2);
            }
        });
    }
    
    // Section 3 모달
    const modalTrigger3 = document.getElementById('section3-modal-trigger');
    const modal3 = document.getElementById('section3-modal');
    const closeBtn3 = document.getElementById('section3-modal-close-btn');
    
    if (modalTrigger3) {
        modalTrigger3.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            openModal(modal3);
            return false;
        });
    }
    
    if (closeBtn3) {
        closeBtn3.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeModal(modal3);
        });
    }
    
    if (modal3) {
        modal3.addEventListener('click', function(e) {
            if (e.target === modal3) {
                closeModal(modal3);
            }
        });
    }
    
    // Section 4 모달
    const modalTrigger4 = document.getElementById('section4-modal-trigger');
    const modal4 = document.getElementById('section4-modal');
    const closeBtn4 = document.getElementById('section4-modal-close-btn');
    
    if (modalTrigger4) {
        modalTrigger4.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            openModal(modal4);
            return false;
        });
    }
    
    if (closeBtn4) {
        closeBtn4.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeModal(modal4);
        });
    }
    
    if (modal4) {
        modal4.addEventListener('click', function(e) {
            if (e.target === modal4) {
                closeModal(modal4);
            }
        });
    }
    
    // Section 5 모달
    const modalTrigger5 = document.getElementById('section5-modal-trigger');
    const modal5 = document.getElementById('section5-modal');
    const closeBtn5 = document.getElementById('section5-modal-close-btn');
    
    if (modalTrigger5) {
        modalTrigger5.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            openModal(modal5);
            return false;
        });
    }
    
    if (closeBtn5) {
        closeBtn5.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeModal(modal5);
        });
    }
    
    if (modal5) {
        modal5.addEventListener('click', function(e) {
            if (e.target === modal5) {
                closeModal(modal5);
            }
        });
    }
    
    // Section 6 모달
    const modalTrigger6 = document.getElementById('section6-modal-trigger');
    const modal6 = document.getElementById('section6-modal');
    const closeBtn6 = document.getElementById('section6-modal-close-btn');
    
    if (modalTrigger6) {
        modalTrigger6.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            openModal(modal6);
            return false;
        });
    }
    
    if (closeBtn6) {
        closeBtn6.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeModal(modal6);
        });
    }
    
    if (modal6) {
        modal6.addEventListener('click', function(e) {
            if (e.target === modal6) {
                closeModal(modal6);
            }
        });
    }
    
    // 모달 컨테이너 클릭 시 이벤트 전파 방지
    const modalContainers = document.querySelectorAll('.modal-container');
    modalContainers.forEach(function(container) {
        container.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
    
    // 모달 콘텐츠 영역에서 스크롤 이벤트가 배경으로 전파되지 않도록 처리
    const modalContents = document.querySelectorAll('.modal-content');
    modalContents.forEach(function(content) {
        // 휠 이벤트로 인한 배경 스크롤 방지
        content.addEventListener('wheel', function(e) {
            const isScrollable = content.scrollHeight > content.clientHeight;
            const isAtTop = content.scrollTop === 0;
            const isAtBottom = content.scrollTop + content.clientHeight >= content.scrollHeight - 1;
            
            // 스크롤 가능한 영역에서만 이벤트 전파 방지
            if (isScrollable) {
                if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
                    e.preventDefault();
                    e.stopPropagation();
                } else {
                    e.stopPropagation();
                }
            } else {
                e.preventDefault();
                e.stopPropagation();
            }
        }, { passive: false });
        
        // 터치 이벤트로 인한 배경 스크롤 방지
        let touchStartY = 0;
        content.addEventListener('touchstart', function(e) {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });
        
        content.addEventListener('touchmove', function(e) {
            const touchY = e.touches[0].clientY;
            const deltaY = touchStartY - touchY;
            const isScrollable = content.scrollHeight > content.clientHeight;
            const isAtTop = content.scrollTop === 0;
            const isAtBottom = content.scrollTop + content.clientHeight >= content.scrollHeight - 1;
            
            // 스크롤 가능한 영역에서만 처리
            if (isScrollable) {
                if ((isAtTop && deltaY < 0) || (isAtBottom && deltaY > 0)) {
                    e.preventDefault();
                    e.stopPropagation();
                } else {
                    e.stopPropagation();
                }
            } else {
                e.preventDefault();
                e.stopPropagation();
            }
        }, { passive: false });
    });
    
    // ESC 키로 모달 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal-overlay.active');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });
});
