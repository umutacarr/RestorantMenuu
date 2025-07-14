// Menü verileri - localStorage'dan yükle veya varsayılan verileri kullan
let menuData = {};

// DOM elementleri
const menuGrid = document.getElementById('menuGrid');
const navButtons = document.querySelectorAll('.nav-btn');
const qrBtn = document.getElementById('qrBtn');
const qrModal = document.getElementById('qrModal');
const closeBtn = document.querySelector('.close');
const qrcodeDiv = document.getElementById('qrcode');
const currentUrlSpan = document.getElementById('currentUrl');

// Mevcut kategori
let currentCategory = 'all';

// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    loadMenuData();
    displayMenu('all');
    setupEventListeners();
    generateQRCode();
    loadRestaurantSettings();
    updateMenuDisplay();
    setupStorageListener();
});

// localStorage'dan menü verilerini yükle
function loadMenuData() {
    const savedData = localStorage.getItem('menuData');
    if (savedData) {
        menuData = JSON.parse(savedData);
    } else {
        // Varsayılan menü verileri
        menuData = {
            starters: [
                {
                    id: 1,
                    name: "Mercimek Çorbası",
                    description: "Geleneksel Türk mutfağının vazgeçilmezi, ev yapımı mercimek çorbası",
                    price: "₺25",
                    category: "starters"
                },
                {
                    id: 2,
                    name: "Humus",
                    description: "Nohut püresi, tahin, zeytinyağı ve baharatlarla hazırlanan lezzetli mezze",
                    price: "₺35",
                    category: "starters"
                },
                {
                    id: 3,
                    name: "Cacık",
                    description: "Yoğurt, salatalık ve nane ile hazırlanan serinletici mezze",
                    price: "₺20",
                    category: "starters"
                },
                {
                    id: 4,
                    name: "Patlıcan Ezme",
                    description: "Közlenmiş patlıcan, kırmızı biber ve baharatlarla hazırlanan geleneksel mezze",
                    price: "₺30",
                    category: "starters"
                }
            ],
            main: [
                {
                    id: 5,
                    name: "Mantı",
                    description: "El açması hamur, kıyma harcı, yoğurt ve özel sos ile servis edilir",
                    price: "₺45",
                    category: "main"
                },
                {
                    id: 6,
                    name: "İskender Kebap",
                    description: "Döner et, tereyağı, domates sosu ve yoğurt ile servis edilir",
                    price: "₺65",
                    category: "main"
                },
                {
                    id: 7,
                    name: "Lahmacun",
                    description: "İnce hamur üzerine kıyma, soğan, maydanoz ve baharatlarla hazırlanır",
                    price: "₺25",
                    category: "main"
                },
                {
                    id: 8,
                    name: "Pide",
                    description: "Kaşarlı, kıymalı veya kuşbaşılı seçenekleriyle geleneksel Türk pidesi",
                    price: "₺35",
                    category: "main"
                }
            ],
            grill: [
                {
                    id: 9,
                    name: "Adana Kebap",
                    description: "Özel baharatlarla hazırlanmış kıyma, şişte ızgara edilir",
                    price: "₺75",
                    category: "grill"
                },
                {
                    id: 10,
                    name: "Urfa Kebap",
                    description: "Acısız baharatlarla hazırlanmış kıyma, şişte ızgara edilir",
                    price: "₺75",
                    category: "grill"
                },
                {
                    id: 11,
                    name: "Kuzu Pirzola",
                    description: "Özel marine edilmiş kuzu pirzola, ızgara edilir",
                    price: "₺120",
                    category: "grill"
                },
                {
                    id: 12,
                    name: "Tavuk Şiş",
                    description: "Marine edilmiş tavuk eti, sebzelerle birlikte şişte ızgara edilir",
                    price: "₺55",
                    category: "grill"
                }
            ],
            desserts: [
                {
                    id: 13,
                    name: "Künefe",
                    description: "Kadayıf hamuru, peynir ve şerbetle hazırlanan geleneksel tatlı",
                    price: "₺40",
                    category: "desserts"
                },
                {
                    id: 14,
                    name: "Baklava",
                    description: "40 kat el açması yufka, ceviz ve şerbetle hazırlanan klasik tatlı",
                    price: "₺50",
                    category: "desserts"
                },
                {
                    id: 15,
                    name: "Sütlaç",
                    description: "Ev yapımı fırın sütlaç, üzeri kızarmış şekerle servis edilir",
                    price: "₺25",
                    category: "desserts"
                },
                {
                    id: 16,
                    name: "Kazandibi",
                    description: "Tavuk göğsü, süt ve şekerle hazırlanan geleneksel tatlı",
                    price: "₺35",
                    category: "desserts"
                }
            ],
            drinks: [
                {
                    id: 17,
                    name: "Türk Çayı",
                    description: "Demli çay, geleneksel Türk çay bardağında servis edilir",
                    price: "₺8",
                    category: "drinks"
                },
                {
                    id: 18,
                    name: "Ayran",
                    description: "Ev yapımı taze ayran",
                    price: "₺10",
                    category: "drinks"
                },
                {
                    id: 19,
                    name: "Şalgam Suyu",
                    description: "Geleneksel acılı şalgam suyu",
                    price: "₺12",
                    category: "drinks"
                },
                {
                    id: 20,
                    name: "Taze Sıkılmış Portakal Suyu",
                    description: "Günlük taze sıkılmış portakal suyu",
                    price: "₺15",
                    category: "drinks"
                }
            ]
        };
        // Varsayılan verileri localStorage'a kaydet
        localStorage.setItem('menuData', JSON.stringify(menuData));
    }
}

// Restoran ayarlarını yükle
function loadRestaurantSettings() {
    const settings = JSON.parse(localStorage.getItem('restaurantSettings') || '{}');
    
    // Restoran adını güncelle
    const restaurantName = document.querySelector('.restaurant-name');
    if (restaurantName) {
        restaurantName.textContent = settings.name || 'Lezzet Durağı';
    }
    
    // Header'daki restoran adını güncelle
    const headerTitle = document.querySelector('.header h1');
    if (headerTitle) {
        headerTitle.textContent = settings.name || 'Lezzet Durağı';
    }
    
    // İletişim bilgilerini güncelle
    const phoneElement = document.querySelector('.contact-info .phone');
    if (phoneElement) {
        phoneElement.textContent = settings.phone || '+90 555 123 45 67';
    }
    
    const addressElement = document.querySelector('.contact-info .address');
    if (addressElement) {
        addressElement.textContent = settings.address || 'Örnek Mahallesi, Lezzet Sokak No:123';
    }
    
    const hoursElement = document.querySelector('.contact-info .hours');
    if (hoursElement) {
        hoursElement.textContent = settings.hours || 'Her gün 11:00 - 23:00';
    }
    
    // Sosyal medya linklerini güncelle
    const facebookLink = document.querySelector('.social-links .facebook');
    if (facebookLink) {
        facebookLink.href = settings.facebook || '#';
    }
    
    const instagramLink = document.querySelector('.social-links .instagram');
    if (instagramLink) {
        instagramLink.href = settings.instagram || '#';
    }
    
    const twitterLink = document.querySelector('.social-links .twitter');
    if (twitterLink) {
        twitterLink.href = settings.twitter || '#';
    }
}

// Event listener'ları ayarla
function setupEventListeners() {
    // Navigation butonları
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            currentCategory = category;
            
            // Aktif buton stilini güncelle
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Menüyü göster
            displayMenu(category);
        });
    });

    // QR Modal
    qrBtn.addEventListener('click', () => {
        qrModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        qrModal.style.display = 'none';
    });

    // Modal dışına tıklandığında kapat
    window.addEventListener('click', (event) => {
        if (event.target === qrModal) {
            qrModal.style.display = 'none';
        }
    });

    // Admin panel linki
    const adminLink = document.querySelector('.admin-link');
    if (adminLink) {
        adminLink.addEventListener('click', function(e) {
            e.preventDefault();
            // Admin paneline yönlendir (login sayfasına)
            window.open('admin/login.html', '_blank');
        });
    }

    // Klavye kısayolları
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
}

// Menüyü göster
function displayMenu(category) {
    menuGrid.innerHTML = '';
    
    let itemsToShow = [];
    
    if (category === 'all') {
        // Tüm kategorilerden ürünleri al
        Object.values(menuData).forEach(categoryItems => {
            if (Array.isArray(categoryItems)) {
                itemsToShow = itemsToShow.concat(categoryItems);
            }
        });
    } else {
        // Sadece seçili kategoriden ürünleri al
        itemsToShow = menuData[category] || [];
    }
    
    // Menü öğelerini oluştur
    itemsToShow.forEach(item => {
        const menuItem = createMenuItem(item);
        menuGrid.appendChild(menuItem);
    });
    
    // Eğer ürün yoksa mesaj göster
    if (itemsToShow.length === 0) {
        menuGrid.innerHTML = `
            <div class="loading">
                <p>Bu kategoride henüz ürün bulunmamaktadır.</p>
            </div>
        `;
    }
}

// Menü öğesi oluştur
function createMenuItem(item) {
    const menuItem = document.createElement('div');
    menuItem.className = 'menu-item';
    menuItem.dataset.category = item.category;
    
    menuItem.innerHTML = `
        <div class="menu-item-header">
            <div>
                <h3 class="menu-item-title">${item.name}</h3>
                <span class="menu-item-category">${getCategoryName(item.category)}</span>
            </div>
            <div class="menu-item-price">${item.price}</div>
        </div>
        <p class="menu-item-description">${item.description}</p>
    `;
    
    return menuItem;
}

// Kategori adını getir
function getCategoryName(category) {
    const categoryNames = {
        'starters': 'Başlangıç',
        'main': 'Ana Yemek',
        'grill': 'Izgara',
        'desserts': 'Tatlı',
        'drinks': 'İçecek'
    };
    
    return categoryNames[category] || category;
}

// QR kod oluştur
function generateQRCode() {
    const currentUrl = window.location.href;
    currentUrlSpan.textContent = currentUrl;
    
    // QR kod oluştur
    QRCode.toCanvas(qrcodeDiv, currentUrl, {
        width: 200,
        margin: 2,
        color: {
            dark: '#667eea',
            light: '#ffffff'
        }
    }, function (error) {
        if (error) {
            console.error('QR kod oluşturulurken hata:', error);
            qrcodeDiv.innerHTML = '<p>QR kod oluşturulamadı</p>';
        }
    });
}

// Sayfa yüklendiğinde animasyon efekti
window.addEventListener('load', function() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Scroll animasyonu
window.addEventListener('scroll', function() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const itemVisible = 150;
        
        if (itemTop < window.innerHeight - itemVisible) {
            item.classList.add('animate');
        }
    });
});

// Arama fonksiyonu (gelecekte eklenebilir)
function searchMenu(query) {
    const allItems = [];
    Object.values(menuData).forEach(categoryItems => {
        if (Array.isArray(categoryItems)) {
            allItems.push(...categoryItems);
        }
    });
    
    const filteredItems = allItems.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
    );
    
    return filteredItems;
}

// Fiyat formatı
function formatPrice(price) {
    return `₺${price}`;
}

// Kategori renkleri
const categoryColors = {
    'starters': '#667eea',
    'main': '#764ba2',
    'grill': '#f093fb',
    'desserts': '#f5576c',
    'drinks': '#4facfe'
};

// Performans optimizasyonu için debounce fonksiyonu
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Scroll event'ini optimize et
const optimizedScrollHandler = debounce(function() {
    // Scroll işlemleri burada yapılabilir
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Storage değişikliklerini dinle (admin panelinden güncellemeler için)
window.addEventListener('storage', function(e) {
    if (e.key === 'menuData') {
        loadMenuData();
        displayMenu(currentCategory);
    } else if (e.key === 'restaurantSettings') {
        loadRestaurantSettings();
    }
});

// Tüm modal'ları kapat
function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

// Menü görünümünü güncelle
function updateMenuDisplay() {
    // Varsayılan olarak başlangıçlar kategorisini göster
    displayMenu('starters');
}

// Sayfa yüklendiğinde ilk kategoriyi göster
document.addEventListener('DOMContentLoaded', function() {
    // İlk kategori butonunu aktif yap
    const firstCategoryBtn = document.querySelector('.nav-btn');
    if (firstCategoryBtn) {
        firstCategoryBtn.classList.add('active');
    }
});

// Storage değişikliklerini dinle
function setupStorageListener() {
    window.addEventListener('storage', function(e) {
        if (e.key === 'menuData') {
            loadMenuData();
            displayMenu(currentCategory);
        } else if (e.key === 'restaurantSettings') {
            loadRestaurantSettings();
        }
    });
} 