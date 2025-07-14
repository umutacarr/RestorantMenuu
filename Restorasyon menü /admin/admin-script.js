// Global variables
let menuData = {};
let currentEditingItem = null;
let currentEditingCategory = null;
let nextItemId = 1;

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
    // Giriş kontrolü
    if (!checkAdminSession()) {
        window.location.href = 'login.html';
        return;
    }
    
    loadMenuData();
    setupEventListeners();
    updateDashboard();
    loadSettings();
    setupLogout();
});

// Admin session kontrolü
function checkAdminSession() {
    const session = localStorage.getItem('adminSession');
    if (!session) {
        return false;
    }
    
    try {
        const sessionData = JSON.parse(session);
        const now = new Date().getTime();
        
        // Session'ın geçerli olup olmadığını kontrol et (24 saat)
        if (sessionData.timestamp && (now - sessionData.timestamp) < 24 * 60 * 60 * 1000) {
            return true;
        } else {
            // Süresi dolmuş session'ı temizle
            localStorage.removeItem('adminSession');
            return false;
        }
    } catch (error) {
        localStorage.removeItem('adminSession');
        return false;
    }
}

// Çıkış fonksiyonu
function setupLogout() {
    // Header'a çıkış butonu ekle
    const headerRight = document.querySelector('.header-right');
    const logoutBtn = document.createElement('button');
    logoutBtn.className = 'logout-btn';
    logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> Çıkış';
    logoutBtn.onclick = logout;
    
    headerRight.appendChild(logoutBtn);
}

function logout() {
    if (confirm('Çıkış yapmak istediğinizden emin misiniz?')) {
        localStorage.removeItem('adminSession');
        window.location.href = 'login.html';
    }
}

// Session'ı yenile
function refreshSession() {
    const session = localStorage.getItem('adminSession');
    if (session) {
        try {
            const sessionData = JSON.parse(session);
            sessionData.timestamp = new Date().getTime();
            localStorage.setItem('adminSession', JSON.stringify(sessionData));
        } catch (error) {
            console.error('Session yenilenirken hata:', error);
        }
    }
}

// Kullanıcı aktivitesini takip et ve session'ı yenile
document.addEventListener('mousemove', refreshSession);
document.addEventListener('keypress', refreshSession);
document.addEventListener('click', refreshSession);

// Load menu data from localStorage or use default
function loadMenuData() {
    const savedData = localStorage.getItem('menuData');
    if (savedData) {
        menuData = JSON.parse(savedData);
        // Calculate next ID
        const allItems = getAllItems();
        nextItemId = Math.max(...allItems.map(item => item.id), 0) + 1;
    } else {
        // Default menu data
        menuData = {
            starters: [
                {
                    id: 1,
                    name: "Mercimek Çorbası",
                    description: "Geleneksel Türk mutfağının vazgeçilmezi, ev yapımı mercimek çorbası",
                    price: "₺25",
                    category: "starters",
                    createdAt: new Date().toISOString()
                },
                {
                    id: 2,
                    name: "Humus",
                    description: "Nohut püresi, tahin, zeytinyağı ve baharatlarla hazırlanan lezzetli mezze",
                    price: "₺35",
                    category: "starters",
                    createdAt: new Date().toISOString()
                }
            ],
            main: [
                {
                    id: 3,
                    name: "Mantı",
                    description: "El açması hamur, kıyma harcı, yoğurt ve özel sos ile servis edilir",
                    price: "₺45",
                    category: "main",
                    createdAt: new Date().toISOString()
                }
            ],
            grill: [
                {
                    id: 4,
                    name: "Adana Kebap",
                    description: "Özel baharatlarla hazırlanmış kıyma, şişte ızgara edilir",
                    price: "₺75",
                    category: "grill",
                    createdAt: new Date().toISOString()
                }
            ],
            desserts: [
                {
                    id: 5,
                    name: "Künefe",
                    description: "Kadayıf hamuru, peynir ve şerbetle hazırlanan geleneksel tatlı",
                    price: "₺40",
                    category: "desserts",
                    createdAt: new Date().toISOString()
                }
            ],
            drinks: [
                {
                    id: 6,
                    name: "Türk Çayı",
                    description: "Demli çay, geleneksel Türk çay bardağında servis edilir",
                    price: "₺8",
                    category: "drinks",
                    createdAt: new Date().toISOString()
                }
            ]
        };
        saveMenuData();
    }
}

// Save menu data to localStorage
function saveMenuData() {
    localStorage.setItem('menuData', JSON.stringify(menuData));
    // Also update the main menu script
    updateMainMenuScript();
}

// Update main menu script with current data
function updateMainMenuScript() {
    const scriptContent = `// Menü verileri
const menuData = ${JSON.stringify(menuData, null, 4)};

// ... existing code ...`;
    
    // This would typically update the main script.js file
    // For now, we'll just log it
    console.log('Menu data updated:', menuData);
}

// Setup event listeners
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.dataset.page;
            showPage(page);
        });
    });

    // Sidebar toggle
    document.getElementById('sidebarToggle').addEventListener('click', function() {
        document.querySelector('.sidebar').classList.toggle('active');
    });

    // Modal close events
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            closeAllModals();
        });
    });

    // Form submissions
    document.getElementById('itemForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveItem();
    });

    document.getElementById('categoryForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveCategory();
    });

    // Modal outside click
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeAllModals();
        }
    });
}

// Show specific page
function showPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    document.getElementById(pageName).classList.add('active');

    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-page="${pageName}"]`).classList.add('active');

    // Update page title
    document.getElementById('pageTitle').textContent = getPageTitle(pageName);

    // Load page content
    loadPageContent(pageName);
}

// Get page title
function getPageTitle(pageName) {
    const titles = {
        'dashboard': 'Dashboard',
        'categories': 'Kategoriler',
        'starters': 'Başlangıçlar',
        'main': 'Ana Yemekler',
        'grill': 'Izgara',
        'desserts': 'Tatlılar',
        'drinks': 'İçecekler',
        'settings': 'Ayarlar'
    };
    return titles[pageName] || pageName;
}

// Load page content
function loadPageContent(pageName) {
    switch(pageName) {
        case 'dashboard':
            updateDashboard();
            break;
        case 'categories':
            loadCategories();
            break;
        case 'starters':
        case 'main':
        case 'grill':
        case 'desserts':
        case 'drinks':
            loadCategoryItems(pageName);
            break;
        case 'settings':
            loadSettings();
            break;
    }
}

// Update dashboard
function updateDashboard() {
    const allItems = getAllItems();
    const totalItems = allItems.length;
    const recentItems = allItems
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

    // Update stats
    document.getElementById('totalItems').textContent = totalItems;
    
    // Update recent items
    const recentItemsList = document.getElementById('recentItemsList');
    if (recentItems.length === 0) {
        recentItemsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-utensils"></i>
                <h3>Henüz ürün eklenmemiş</h3>
                <p>İlk ürününüzü ekleyerek başlayın</p>
            </div>
        `;
    } else {
        recentItemsList.innerHTML = recentItems.map(item => `
            <div class="item-card">
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p>${item.description}</p>
                </div>
                <div class="item-price">${item.price}</div>
            </div>
        `).join('');
    }
}

// Load categories
function loadCategories() {
    const categoriesGrid = document.getElementById('categoriesGrid');
    const categories = [
        { name: 'Başlangıçlar', code: 'starters', icon: 'fas fa-appetizers', count: menuData.starters?.length || 0 },
        { name: 'Ana Yemekler', code: 'main', icon: 'fas fa-utensils', count: menuData.main?.length || 0 },
        { name: 'Izgara', code: 'grill', icon: 'fas fa-fire', count: menuData.grill?.length || 0 },
        { name: 'Tatlılar', code: 'desserts', icon: 'fas fa-cake-candles', count: menuData.desserts?.length || 0 },
        { name: 'İçecekler', code: 'drinks', icon: 'fas fa-glass-whiskey', count: menuData.drinks?.length || 0 }
    ];

    categoriesGrid.innerHTML = categories.map(category => `
        <div class="category-card">
            <div class="card-header">
                <div class="card-title">
                    <i class="${category.icon}"></i>
                    ${category.name}
                </div>
                <div class="card-actions">
                    <button class="btn-edit" onclick="editCategory('${category.code}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-delete" onclick="deleteCategory('${category.code}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="card-body">
                <p>${category.count} ürün</p>
                <button class="btn-primary" onclick="showPage('${category.code}')">
                    Ürünleri Görüntüle
                </button>
            </div>
        </div>
    `).join('');
}

// Load category items
function loadCategoryItems(category) {
    const grid = document.getElementById(`${category}Grid`);
    const items = menuData[category] || [];

    if (items.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-utensils"></i>
                <h3>Bu kategoride henüz ürün yok</h3>
                <p>İlk ürününüzü ekleyerek başlayın</p>
            </div>
        `;
    } else {
        grid.innerHTML = items.map(item => `
            <div class="item-card-admin">
                <div class="card-header">
                    <div class="card-title">${item.name}</div>
                    <div class="card-actions">
                        <button class="btn-edit" onclick="editItem(${item.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-delete" onclick="deleteItem(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <p class="card-description">${item.description}</p>
                    <div class="card-price">${item.price}</div>
                    <span class="card-category">${getCategoryName(item.category)}</span>
                </div>
            </div>
        `).join('');
    }
}

// Get all items
function getAllItems() {
    const allItems = [];
    Object.values(menuData).forEach(categoryItems => {
        if (Array.isArray(categoryItems)) {
            allItems.push(...categoryItems);
        }
    });
    return allItems;
}

// Get category name
function getCategoryName(category) {
    const names = {
        'starters': 'Başlangıç',
        'main': 'Ana Yemek',
        'grill': 'Izgara',
        'desserts': 'Tatlı',
        'drinks': 'İçecek'
    };
    return names[category] || category;
}

// Show add item modal
function showAddItemModal(category = null) {
    currentEditingItem = null;
    document.getElementById('itemModalTitle').textContent = 'Yeni Ürün Ekle';
    document.getElementById('itemForm').reset();
    
    if (category) {
        document.getElementById('itemCategory').value = category;
    }
    
    document.getElementById('itemModal').style.display = 'block';
}

// Show edit item modal
function editItem(itemId) {
    const item = findItemById(itemId);
    if (!item) return;

    currentEditingItem = item;
    document.getElementById('itemModalTitle').textContent = 'Ürün Düzenle';
    
    document.getElementById('itemName').value = item.name;
    document.getElementById('itemDescription').value = item.description;
    document.getElementById('itemPrice').value = item.price.replace('₺', '');
    document.getElementById('itemCategory').value = item.category;
    
    document.getElementById('itemModal').style.display = 'block';
}

// Find item by ID
function findItemById(itemId) {
    const allItems = getAllItems();
    return allItems.find(item => item.id === itemId);
}

// Save item
function saveItem() {
    const formData = {
        name: document.getElementById('itemName').value,
        description: document.getElementById('itemDescription').value,
        price: `₺${document.getElementById('itemPrice').value}`,
        category: document.getElementById('itemCategory').value
    };

    if (currentEditingItem) {
        // Edit existing item
        const item = findItemById(currentEditingItem.id);
        if (item) {
            Object.assign(item, formData);
            showMessage('Ürün başarıyla güncellendi!', 'success');
        }
    } else {
        // Add new item
        const newItem = {
            id: nextItemId++,
            ...formData,
            createdAt: new Date().toISOString()
        };

        if (!menuData[formData.category]) {
            menuData[formData.category] = [];
        }
        menuData[formData.category].push(newItem);
        showMessage('Ürün başarıyla eklendi!', 'success');
    }

    saveMenuData();
    closeItemModal();
    loadPageContent(getCurrentPage());
    updateDashboard();
}

// Show category modal
function showCategoryModal() {
    currentEditingCategory = null;
    document.getElementById('categoryForm').reset();
    document.getElementById('categoryModal').style.display = 'block';
}

// Save category
function saveCategory() {
    const formData = {
        name: document.getElementById('categoryName').value,
        code: document.getElementById('categoryCode').value,
        icon: document.getElementById('categoryIcon').value
    };

    // For now, we'll just show a message since categories are predefined
    showMessage('Kategori özelliği yakında eklenecek!', 'info');
    closeCategoryModal();
}

// Delete item
function deleteItem(itemId) {
    const item = findItemById(itemId);
    if (!item) return;

    document.getElementById('deleteMessage').textContent = `"${item.name}" ürününü silmek istediğinizden emin misiniz?`;
    document.getElementById('deleteModal').style.display = 'block';
    
    // Store item ID for confirmation
    window.itemToDelete = itemId;
}

// Confirm delete
function confirmDelete() {
    if (window.itemToDelete) {
        const itemId = window.itemToDelete;
        const item = findItemById(itemId);
        
        if (item) {
            // Remove from category
            const category = item.category;
            menuData[category] = menuData[category].filter(i => i.id !== itemId);
            
            saveMenuData();
            showMessage('Ürün başarıyla silindi!', 'success');
            loadPageContent(getCurrentPage());
            updateDashboard();
        }
        
        window.itemToDelete = null;
    }
    
    closeDeleteModal();
}

// Get current page
function getCurrentPage() {
    const activePage = document.querySelector('.page.active');
    return activePage ? activePage.id : 'dashboard';
}

// Close modals
function closeItemModal() {
    document.getElementById('itemModal').style.display = 'none';
    currentEditingItem = null;
}

function closeCategoryModal() {
    document.getElementById('categoryModal').style.display = 'none';
    currentEditingCategory = null;
}

function closeDeleteModal() {
    document.getElementById('deleteModal').style.display = 'none';
    window.itemToDelete = null;
}

function closeAllModals() {
    closeItemModal();
    closeCategoryModal();
    closeDeleteModal();
}

// Show message
function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    const pageContent = document.querySelector('.page-content');
    pageContent.insertBefore(messageDiv, pageContent.firstChild);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Export menu
function exportMenu() {
    const dataStr = JSON.stringify(menuData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'menu-data.json';
    link.click();
    
    URL.revokeObjectURL(url);
    showMessage('Menü başarıyla dışa aktarıldı!', 'success');
}

// Import menu
function importMenu() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const importedData = JSON.parse(e.target.result);
                    menuData = importedData;
                    saveMenuData();
                    showMessage('Menü başarıyla içe aktarıldı!', 'success');
                    loadPageContent(getCurrentPage());
                    updateDashboard();
                } catch (error) {
                    showMessage('Dosya okunamadı!', 'error');
                }
            };
            reader.readAsText(file);
        }
    };
    
    input.click();
}

// Load settings
function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('restaurantSettings') || '{}');
    
    document.getElementById('restaurantName').value = settings.name || 'Lezzet Durağı';
    document.getElementById('restaurantPhone').value = settings.phone || '+90 555 123 45 67';
    document.getElementById('restaurantAddress').value = settings.address || 'Örnek Mahallesi, Lezzet Sokak No:123';
    document.getElementById('restaurantHours').value = settings.hours || 'Her gün 11:00 - 23:00';
    document.getElementById('facebookUrl').value = settings.facebook || '#';
    document.getElementById('instagramUrl').value = settings.instagram || '#';
    document.getElementById('twitterUrl').value = settings.twitter || '#';
}

// Save settings
function saveSettings() {
    const settings = {
        name: document.getElementById('restaurantName').value,
        phone: document.getElementById('restaurantPhone').value,
        address: document.getElementById('restaurantAddress').value,
        hours: document.getElementById('restaurantHours').value,
        facebook: document.getElementById('facebookUrl').value,
        instagram: document.getElementById('instagramUrl').value,
        twitter: document.getElementById('twitterUrl').value
    };
    
    localStorage.setItem('restaurantSettings', JSON.stringify(settings));
    showMessage('Ayarlar başarıyla kaydedildi!', 'success');
}

// Utility functions
function formatPrice(price) {
    return `₺${parseFloat(price).toFixed(2)}`;
}

function generateId() {
    return Date.now() + Math.random().toString(36).substr(2, 9);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + N for new item
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        showAddItemModal();
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        closeAllModals();
    }
    
    // Ctrl/Cmd + L for logout
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        logout();
    }
});

// Auto-save functionality
setInterval(() => {
    saveMenuData();
}, 30000); // Auto-save every 30 seconds 