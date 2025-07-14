// Admin giriş sistemi
document.addEventListener('DOMContentLoaded', function() {
    // Sayfa yüklendiğinde otomatik giriş kontrolü
    checkAutoLogin();
    
    // Form submit event listener
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Şifre sıfırlama formu
    document.getElementById('resetForm').addEventListener('submit', handlePasswordReset);
    
    // Modal dışına tıklama
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeForgotModal();
        }
    });
    
    // Enter tuşu ile giriş
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.target.closest('.modal')) {
            handleLogin(e);
        }
    });
});

// Varsayılan kullanıcı bilgileri
const DEFAULT_CREDENTIALS = {
    username: 'admin',
    password: '123456'
};

// Giriş işlemi
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Form validasyonu
    if (!username || !password) {
        showMessage('Lütfen tüm alanları doldurun.', 'error');
        return;
    }
    
    // Loading durumu
    const loginBtn = document.querySelector('.login-btn');
    const originalText = loginBtn.innerHTML;
    loginBtn.innerHTML = '<div class="loading"></div> Giriş yapılıyor...';
    loginBtn.disabled = true;
    
    // Simüle edilmiş giriş gecikmesi (gerçek uygulamada API çağrısı olur)
    setTimeout(() => {
        if (validateCredentials(username, password)) {
            // Başarılı giriş
            if (rememberMe) {
                saveLoginSession(username);
            }
            
            showMessage('Giriş başarılı! Yönlendiriliyorsunuz...', 'success');
            
            // Admin paneline yönlendir
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            // Başarısız giriş
            showMessage('Kullanıcı adı veya şifre hatalı!', 'error');
            loginBtn.innerHTML = originalText;
            loginBtn.disabled = false;
            
            // Şifre alanını temizle
            document.getElementById('password').value = '';
            document.getElementById('password').focus();
        }
    }, 1000);
}

// Kullanıcı bilgilerini doğrula
function validateCredentials(username, password) {
    // Basit doğrulama (gerçek uygulamada hash'lenmiş şifreler kullanılır)
    return username === DEFAULT_CREDENTIALS.username && 
           password === DEFAULT_CREDENTIALS.password;
}

// Otomatik giriş kontrolü
function checkAutoLogin() {
    const savedSession = localStorage.getItem('adminSession');
    if (savedSession) {
        try {
            const session = JSON.parse(savedSession);
            const now = new Date().getTime();
            
            // Session'ın geçerli olup olmadığını kontrol et (24 saat)
            if (session.timestamp && (now - session.timestamp) < 24 * 60 * 60 * 1000) {
                showMessage('Otomatik giriş yapılıyor...', 'info');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                // Süresi dolmuş session'ı temizle
                localStorage.removeItem('adminSession');
            }
        } catch (error) {
            localStorage.removeItem('adminSession');
        }
    }
}

// Giriş session'ını kaydet
function saveLoginSession(username) {
    const session = {
        username: username,
        timestamp: new Date().getTime(),
        loginTime: new Date().toISOString()
    };
    localStorage.setItem('adminSession', JSON.stringify(session));
}

// Şifre göster/gizle
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.password-toggle i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.className = 'fas fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        toggleBtn.className = 'fas fa-eye';
    }
}

// Şifremi unuttum modal'ını göster
function showForgotPassword() {
    document.getElementById('forgotModal').style.display = 'block';
}

// Şifremi unuttum modal'ını kapat
function closeForgotModal() {
    document.getElementById('forgotModal').style.display = 'none';
    document.getElementById('resetForm').reset();
}

// Şifre sıfırlama işlemi
function handlePasswordReset(e) {
    e.preventDefault();
    
    const email = document.getElementById('resetEmail').value.trim();
    
    if (!email) {
        showMessage('Lütfen e-posta adresinizi girin.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showMessage('Geçerli bir e-posta adresi girin.', 'error');
        return;
    }
    
    // Simüle edilmiş şifre sıfırlama
    showMessage('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.', 'success');
    closeForgotModal();
}

// E-posta formatını kontrol et
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Mesaj göster
function showMessage(message, type = 'info') {
    // Mevcut mesajları temizle
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Yeni mesaj oluştur
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    const icon = type === 'success' ? 'check-circle' : 
                 type === 'error' ? 'exclamation-circle' : 'info-circle';
    
    messageDiv.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;
    
    // Mesajı form'dan önce ekle
    const form = document.getElementById('loginForm');
    form.parentNode.insertBefore(messageDiv, form);
    
    // Mesajı otomatik kaldır
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Güvenlik özellikleri
let loginAttempts = 0;
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 dakika

// Başarısız giriş denemelerini takip et
function trackFailedLogin() {
    loginAttempts++;
    localStorage.setItem('failedLoginAttempts', loginAttempts);
    localStorage.setItem('lastFailedLogin', new Date().getTime());
    
    if (loginAttempts >= MAX_LOGIN_ATTEMPTS) {
        showMessage(`Çok fazla başarısız deneme. ${LOCKOUT_TIME / 60000} dakika bekleyin.`, 'error');
        disableLoginForm();
    }
}

// Başarılı girişte sayaçları sıfırla
function resetLoginAttempts() {
    loginAttempts = 0;
    localStorage.removeItem('failedLoginAttempts');
    localStorage.removeItem('lastFailedLogin');
}

// Giriş formunu devre dışı bırak
function disableLoginForm() {
    const form = document.getElementById('loginForm');
    const inputs = form.querySelectorAll('input');
    const button = form.querySelector('button[type="submit"]');
    
    inputs.forEach(input => input.disabled = true);
    button.disabled = true;
    button.innerHTML = '<div class="loading"></div> Hesap kilitli...';
}

// Form kilidini kontrol et
function checkFormLock() {
    const lastFailedLogin = localStorage.getItem('lastFailedLogin');
    const failedAttempts = localStorage.getItem('failedLoginAttempts');
    
    if (lastFailedLogin && failedAttempts) {
        const now = new Date().getTime();
        const timeSinceLastAttempt = now - parseInt(lastFailedLogin);
        
        if (parseInt(failedAttempts) >= MAX_LOGIN_ATTEMPTS && timeSinceLastAttempt < LOCKOUT_TIME) {
            const remainingTime = Math.ceil((LOCKOUT_TIME - timeSinceLastAttempt) / 60000);
            showMessage(`Hesap kilitli. ${remainingTime} dakika bekleyin.`, 'error');
            disableLoginForm();
            return true;
        } else if (timeSinceLastAttempt >= LOCKOUT_TIME) {
            // Kilit süresi dolmuş
            resetLoginAttempts();
        }
    }
    
    return false;
}

// Sayfa yüklendiğinde form kilidini kontrol et
document.addEventListener('DOMContentLoaded', function() {
    if (checkFormLock()) {
        return;
    }
    
    // Başarısız giriş denemelerini yükle
    const savedAttempts = localStorage.getItem('failedLoginAttempts');
    if (savedAttempts) {
        loginAttempts = parseInt(savedAttempts);
    }
});

// Giriş işlemini güncelle
const originalHandleLogin = handleLogin;
function handleLogin(e) {
    e.preventDefault();
    
    // Form kilidini kontrol et
    if (checkFormLock()) {
        return;
    }
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    if (!username || !password) {
        showMessage('Lütfen tüm alanları doldurun.', 'error');
        return;
    }
    
    const loginBtn = document.querySelector('.login-btn');
    const originalText = loginBtn.innerHTML;
    loginBtn.innerHTML = '<div class="loading"></div> Giriş yapılıyor...';
    loginBtn.disabled = true;
    
    setTimeout(() => {
        if (validateCredentials(username, password)) {
            // Başarılı giriş
            resetLoginAttempts();
            
            if (rememberMe) {
                saveLoginSession(username);
            }
            
            showMessage('Giriş başarılı! Yönlendiriliyorsunuz...', 'success');
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            // Başarısız giriş
            trackFailedLogin();
            
            const remainingAttempts = MAX_LOGIN_ATTEMPTS - loginAttempts;
            showMessage(`Kullanıcı adı veya şifre hatalı! Kalan deneme: ${remainingAttempts}`, 'error');
            
            loginBtn.innerHTML = originalText;
            loginBtn.disabled = false;
            
            document.getElementById('password').value = '';
            document.getElementById('password').focus();
        }
    }, 1000);
}

// Güvenlik uyarıları
console.log('%c⚠️ Güvenlik Uyarısı ⚠️', 'color: red; font-size: 20px; font-weight: bold;');
console.log('%cBu sayfa sadece yetkili kullanıcılar içindir. Herhangi bir kod çalıştırmayın.', 'color: red; font-size: 14px;');

// Otomatik çıkış (30 dakika inaktivite)
let inactivityTimer;
function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        localStorage.removeItem('adminSession');
        showMessage('Oturum süresi doldu. Lütfen tekrar giriş yapın.', 'info');
    }, 30 * 60 * 1000); // 30 dakika
}

// Kullanıcı aktivitesini takip et
document.addEventListener('mousemove', resetInactivityTimer);
document.addEventListener('keypress', resetInactivityTimer);
document.addEventListener('click', resetInactivityTimer);

// Sayfa yüklendiğinde timer'ı başlat
resetInactivityTimer(); 