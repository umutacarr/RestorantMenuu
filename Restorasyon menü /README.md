# 🍽️ QR Kodlu Restoran Menü

Modern, responsive ve kullanıcı dostu QR kodlu restoran menü sistemi.

## ✨ Özellikler

- 📱 **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm
- 🎨 **Modern UI/UX**: Glassmorphism ve gradient tasarım
- 📋 **Kategori Filtreleme**: Başlangıçlar, Ana Yemekler, Izgara, Tatlılar, İçecekler
- 🔍 **QR Kod Sistemi**: Müşteriler menüye kolayca erişebilir
- ⚡ **Hızlı Yükleme**: Optimize edilmiş performans
- 🎭 **Animasyonlar**: Smooth geçişler ve hover efektleri
- 📞 **İletişim Bilgileri**: Restoran bilgileri ve sosyal medya linkleri

## 🚀 Kurulum

1. Dosyaları bilgisayarınıza indirin
2. `index.html` dosyasını web tarayıcınızda açın
3. Veya bir web sunucusunda barındırın

## 📁 Dosya Yapısı

```
├── index.html          # Ana HTML dosyası
├── style.css           # CSS stilleri
├── script.js           # JavaScript fonksiyonları
└── README.md           # Bu dosya
```

## 🛠️ Özelleştirme

### Menü Öğelerini Düzenleme

`script.js` dosyasındaki `menuData` objesini düzenleyerek menü öğelerini değiştirebilirsiniz:

```javascript
const menuData = {
    starters: [
        {
            id: 1,
            name: "Yemek Adı",
            description: "Yemek açıklaması",
            price: "₺25",
            category: "starters"
        }
    ]
    // Diğer kategoriler...
};
```

### Renk Temasını Değiştirme

`style.css` dosyasındaki CSS değişkenlerini düzenleyerek renk temasını değiştirebilirsiniz:

```css
body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Restoran Bilgilerini Güncelleme

`index.html` dosyasındaki footer bölümünü düzenleyerek restoran bilgilerini güncelleyebilirsiniz.

## 📱 QR Kod Kullanımı

1. "QR Kod Göster" butonuna tıklayın
2. Açılan modal'da QR kod görünecek
3. Müşteriler telefonlarıyla bu QR kodu tarayarak menüye erişebilir

## 🎯 Kategoriler

- **Başlangıçlar**: Çorbalar, mezeler
- **Ana Yemekler**: Geleneksel Türk yemekleri
- **Izgara**: Kebap çeşitleri, pirzola
- **Tatlılar**: Geleneksel Türk tatlıları
- **İçecekler**: Çay, ayran, meşrubat

## 🔧 Teknik Detaylar

- **HTML5**: Semantic markup
- **CSS3**: Flexbox, Grid, Animations
- **JavaScript ES6+**: Modern JavaScript özellikleri
- **QRCode.js**: QR kod oluşturma kütüphanesi
- **Font Awesome**: İkonlar

## 📞 İletişim

Restoran bilgilerini `index.html` dosyasındaki footer bölümünden güncelleyebilirsiniz:

```html
<div class="contact-info">
    <h3>İletişim</h3>
    <p><i class="fas fa-phone"></i> +90 555 123 45 67</p>
    <p><i class="fas fa-map-marker-alt"></i> Adres bilgisi</p>
    <p><i class="fas fa-clock"></i> Çalışma saatleri</p>
</div>
```

## 🌟 Özellikler Detayı

### Responsive Tasarım
- Mobil cihazlarda optimize edilmiş görünüm
- Tablet ve desktop uyumlu
- Touch-friendly butonlar

### Performans
- Lazy loading animasyonları
- Optimize edilmiş CSS ve JavaScript
- Hızlı sayfa yükleme

### Erişilebilirlik
- Semantic HTML yapısı
- Klavye navigasyonu desteği
- Screen reader uyumlu

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

1. Projeyi fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Branch'inizi push edin (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

---

**Not**: Bu menü sistemi tamamen statiktir ve backend gerektirmez. Tüm veriler JavaScript dosyasında saklanır. 