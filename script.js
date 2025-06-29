/**
 * 居酒屋 さくら ウェブサイト用JavaScript
 * ===================================
 */

document.addEventListener('DOMContentLoaded', function() {
    // モバイルメニューの表示・非表示
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileNav.classList.toggle('active');
        
        // ハンバーガーメニューのアニメーション
        const spans = this.querySelectorAll('span');
        if (this.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // モバイルメニューのリンクをクリックしたらメニューを閉じる
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            mobileNav.classList.remove('active');
            
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
    
    // スクロール時のヘッダースタイル変更
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(44, 30, 11, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(44, 30, 11, 0.9)';
            header.style.boxShadow = 'none';
        }
    });
    
    // メニュータブの切り替え
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuGroups = document.querySelectorAll('.menu-group');
    
    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // すべてのタブからactiveクラスを削除
            menuTabs.forEach(t => t.classList.remove('active'));
            // クリックされたタブにactiveクラスを追加
            this.classList.add('active');
            
            // ターゲットとなるメニューグループを取得
            const target = this.getAttribute('data-target');
            
            // すべてのメニューグループを非表示にする
            menuGroups.forEach(group => group.classList.remove('active'));
            
            // ターゲットのメニューグループを表示する
            document.getElementById(target).classList.add('active');
        });
    });
    
    // 予約フォームのバリデーション
    const reservationForm = document.getElementById('reservationForm');
    
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // フォームデータの取得
            const formData = new FormData(this);
            const formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // 簡易的なバリデーション
            let isValid = true;
            let errorMessage = '';
            
            if (!formValues.name) {
                isValid = false;
                errorMessage += 'お名前を入力してください。\n';
            }
            
            if (!formValues.email || !formValues.email.includes('@')) {
                isValid = false;
                errorMessage += 'メールアドレスを正しく入力してください。\n';
            }
            
            if (!formValues.tel) {
                isValid = false;
                errorMessage += '電話番号を入力してください。\n';
            }
            
            if (!formValues.date) {
                isValid = false;
                errorMessage += 'ご予約日を選択してください。\n';
            }
            
            if (!formValues.time) {
                isValid = false;
                errorMessage += 'ご予約時間を選択してください。\n';
            }
            
            if (!formValues.people) {
                isValid = false;
                errorMessage += '人数を入力してください。\n';
            }
            
            if (isValid) {
                // 成功時の処理
                // 実際の実装ではここでAPIを呼び出すなどの処理を行う
                
                // デモ用のアラート
                alert(`予約が確認されました！
                お名前: ${formValues.name}
                予約日時: ${formValues.date} ${formValues.time}
                人数: ${formValues.people}名

                実際のサイトでは、ここからメール送信などの処理が行われます。`);
                
                // フォームをリセット
                reservationForm.reset();
            } else {
                // エラー時の処理
                alert(errorMessage);
            }
        });
    }
    
    // スムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 要素のフェードインアニメーション
    const fadeInElements = document.querySelectorAll('.about-content, .features-grid, .menu-content, .reservation-content, .access-content');
    
    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeInElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInObserver.observe(element);
    });
    
    // ページトップへ戻るボタンの表示・非表示
    const pageTopBtn = document.querySelector('.page-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            pageTopBtn.style.opacity = '1';
            pageTopBtn.style.pointerEvents = 'auto';
        } else {
            pageTopBtn.style.opacity = '0';
            pageTopBtn.style.pointerEvents = 'none';
        }
    });
    
    // 現在日付より過去の日付を予約不可にする
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        
        const todayString = `${year}-${month}-${day}`;
        dateInput.setAttribute('min', todayString);
    }
    
    // ニュースのスライドショー（複数お知らせがある場合）
    const newsItems = document.querySelectorAll('.news-item');
    let currentNewsIndex = 0;
    
    if (newsItems.length > 1) {
        // 最初のニュース以外を非表示にする
        for (let i = 1; i < newsItems.length; i++) {
            newsItems[i].style.display = 'none';
        }
        
        // ニュースを定期的に切り替える
        setInterval(() => {
            newsItems[currentNewsIndex].style.display = 'none';
            currentNewsIndex = (currentNewsIndex + 1) % newsItems.length;
            newsItems[currentNewsIndex].style.display = 'flex';
        }, 5000);
    }
});