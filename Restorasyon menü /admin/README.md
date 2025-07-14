# 🛠️ Admin Panel - QR Kodlu Menü Sistemi

Bu admin paneli, QR kodlu menü sisteminizi kolayca yönetmenizi sağlar. Tüm menü öğelerini, kategorileri ve restoran ayarlarını tek bir yerden kontrol edebilirsiniz.

## 🔐 Güvenlik Sistemi

### Giriş Sistemi
Admin paneline erişim için güvenli giriş sistemi bulunmaktadır:

- **Varsayılan Kullanıcı Adı**: `admin`
- **Varsayılan Şifre**: `123456`
- **Session Yönetimi**: 24 saat geçerli oturum
- **Otomatik Çıkış**: 30 dakika inaktivite sonrası
- **Güvenlik Önlemleri**: 
  - 5 başarısız deneme sonrası 15 dakika hesap kilidi
  - Şifre göster/gizle özelliği
  - "Beni hatırla" seçeneği

### Giriş Yapma
1. Ana menü sayfasındaki "Admin Panel" butonuna tıklayın
2. Veya doğrudan `admin/login.html` adresine gidin
3. Kullanıcı adı ve şifrenizi girin
4. "Beni hatırla" seçeneğini işaretleyebilirsiniz
5. "Giriş Yap" butonuna tıklayın

### Çıkış Yapma
- Header'daki "Çıkış" butonuna tıklayın
- Veya `Ctrl/Cmd + L` kısayolunu kullanın
- Otomatik çıkış: 30 dakika inaktivite sonrası

## 🚀 Özellikler

### 📊 Dashboard
- **İstatistikler**: Toplam ürün sayısı, kategori sayısı, görüntülenme ve QR tarama sayıları
- **Hızlı İşlemler**: Yeni ürün ekleme, kategori yönetimi, menü dışa/içe aktarma
- **Son Eklenen Ürünler**: En son eklenen 5 ürünün listesi

### 📋 Menü Yönetimi
- **Kategori Bazlı Yönetim**: Her kategori için ayrı sayfa
- **CRUD İşlemleri**: Ürün ekleme, düzenleme, silme
- **Gerçek Zamanlı Güncelleme**: Değişiklikler anında ana menüye yansır
- **Bulk İşlemler**: Toplu ürün yönetimi

### ⚙️ Ayarlar
- **Restoran Bilgileri**: Ad, telefon, adres, çalışma saatleri
- **Sosyal Medya**: Facebook, Instagram, Twitter linkleri
- **Otomatik Kaydetme**: Ayarlar otomatik olarak kaydedilir

### 📱 Veri Yönetimi
- **LocalStorage**: Tüm veriler tarayıcıda güvenli şekilde saklanır
- **Dışa Aktarma**: Menü verilerini JSON formatında dışa aktarma
- **İçe Aktarma**: Mevcut menü verilerini yedekleme ve geri yükleme

## 🎯 Kullanım Kılavuzu

### 1. Giriş Yapma
- Ana menü sayfasındaki "Admin Panel" butonuna tıklayın
- Veya doğrudan `admin/login.html` adresine gidin
- Varsayılan giriş bilgilerini kullanın:
  - **Kullanıcı Adı**: `admin`
  - **Şifre**: `123456`

### 2. Yeni Ürün Ekleme
1. Dashboard'da "Yeni Ürün Ekle" butonuna tıklayın
2. Veya ilgili kategori sayfasındaki "Yeni Ürün Ekle" butonunu kullanın
3. Formu doldurun:
   - **Ürün Adı**: Yemek adı
   - **Açıklama**: Detaylı açıklama
   - **Fiyat**: ₺ sembolü otomatik eklenir
   - **Kategori**: Ürünün ait olduğu kategori
4. "Kaydet" butonuna tıklayın

### 3. Ürün Düzenleme
1. İlgili ürünün yanındaki düzenleme (kalem) ikonuna tıklayın
2. Formdaki bilgileri güncelleyin
3. "Kaydet" butonuna tıklayın

### 4. Ürün Silme
1. İlgili ürünün yanındaki silme (çöp kutusu) ikonuna tıklayın
2. Onay modalında "Sil" butonuna tıklayın

### 5. Kategori Yönetimi
- **Kategoriler Sayfası**: Tüm kategorileri görüntüleme
- **Kategori Detayları**: Her kategorideki ürün sayısı
- **Hızlı Erişim**: Kategorilere doğrudan erişim

### 6. Ayarları Güncelleme
1. "Ayarlar" sayfasına gidin
2. Restoran bilgilerini güncelleyin:
   - Restoran adı
   - Telefon numarası
   - Adres
   - Çalışma saatleri
   - Sosyal medya linkleri
3. "Ayarları Kaydet" butonuna tıklayın

### 7. Veri Yedekleme
- **Dışa Aktarma**: "Menüyü Dışa Aktar" butonu ile JSON dosyası indirin
- **İçe Aktarma**: "Menüyü İçe Aktar" butonu ile yedek dosyasını yükleyin

## ⌨️ Klavye Kısayolları

- **Ctrl/Cmd + N**: Yeni ürün ekleme modalını açar
- **Ctrl/Cmd + L**: Çıkış yapar
- **Escape**: Açık modalları kapatır

## 🔒 Güvenlik Özellikleri

### Hesap Kilidi
- 5 başarısız giriş denemesi sonrası hesap 15 dakika kilitlenir
- Kilit süresi dolduktan sonra tekrar giriş yapılabilir
- Başarılı giriş sonrası deneme sayacı sıfırlanır

### Session Yönetimi
- **Oturum Süresi**: 24 saat
- **Otomatik Yenileme**: Kullanıcı aktivitesi ile oturum yenilenir
- **Güvenli Çıkış**: Çıkış sonrası tüm session verileri temizlenir

### Şifre Güvenliği
- Şifre göster/gizle özelliği
- "Beni hatırla" seçeneği (24 saat oturum)
- Şifremi unuttum fonksiyonu (simüle edilmiş)

## 📱 Responsive Tasarım

Admin paneli tüm cihazlarda mükemmel çalışır:
- **Desktop**: Tam özellikli arayüz
- **Tablet**: Optimize edilmiş layout
- **Mobil**: Touch-friendly butonlar ve responsive grid

## 🔧 Teknik Detaylar

### Veri Saklama
- **LocalStorage**: Tüm veriler tarayıcının localStorage'ında saklanır
- **Otomatik Senkronizasyon**: Admin panelindeki değişiklikler ana menüye anında yansır
- **Veri Bütünlüğü**: JSON formatında güvenli veri saklama

### Performans
- **Lazy Loading**: Sayfa içerikleri ihtiyaç duyulduğunda yüklenir
- **Optimize Edilmiş DOM**: Minimal DOM manipülasyonu
- **Debounced Events**: Scroll ve input olayları optimize edilmiştir

### Güvenlik
- **Client-Side Validation**: Form doğrulama
- **XSS Koruması**: HTML içerik güvenli şekilde işlenir
- **Veri Doğrulama**: Tüm giriş verileri kontrol edilir
- **Session Kontrolü**: Her sayfa yüklendiğinde oturum kontrolü

## 🎨 Özelleştirme

### Renk Teması
CSS değişkenlerini düzenleyerek renk temasını değiştirebilirsiniz:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --success-color: #28a745;
    --danger-color: #dc3545;
    --warning-color: #ffc107;
    --info-color: #17a2b8;
}
```

### Yeni Kategoriler
JavaScript dosyasında kategori tanımlarını güncelleyebilirsiniz:

```javascript
const categories = [
    { name: 'Yeni Kategori', code: 'new-category', icon: 'fas fa-star' }
];
```

### Şifre Değiştirme
Varsayılan şifreyi değiştirmek için `login-script.js` dosyasındaki `DEFAULT_CREDENTIALS` objesini güncelleyin:

```javascript
const DEFAULT_CREDENTIALS = {
    username: 'yeni-kullanici',
    password: 'yeni-sifre'
};
```

## 🔄 Güncelleme ve Bakım

### Otomatik Kaydetme
- Veriler her 30 saniyede bir otomatik kaydedilir
- Sayfa yenilendiğinde veriler korunur
- Tarayıcı kapatılıp açıldığında veriler mevcuttur

### Yedekleme Stratejisi
1. **Düzenli Yedekleme**: Haftalık menü verilerini dışa aktarın
2. **Ayarlar Yedekleme**: Restoran ayarlarını ayrıca yedekleyin
3. **Test Ortamı**: Büyük değişiklikler öncesi test edin

## 🆘 Sorun Giderme

### Yaygın Sorunlar

**Q: Giriş yapamıyorum**
A: Varsayılan giriş bilgilerini kontrol edin (admin/123456)

**Q: Hesabım kilitlendi**
A: 15 dakika bekleyin veya tarayıcı localStorage'ını temizleyin

**Q: Veriler kayboldu**
A: localStorage'ı kontrol edin, yedek dosyanızı içe aktarın

**Q: Değişiklikler ana menüde görünmüyor**
A: Ana menü sayfasını yenileyin, localStorage senkronizasyonunu kontrol edin

**Q: Modal açılmıyor**
A: JavaScript konsolunu kontrol edin, tarayıcıyı yenileyin

**Q: Responsive tasarım bozuk**
A: CSS medya sorgularını kontrol edin, tarayıcı cache'ini temizleyin

### Debug Modu
Tarayıcı konsolunda debug bilgilerini görmek için:

```javascript
localStorage.setItem('debug', 'true');
```

### Güvenlik Sorunları
**Q: Şifremi unuttum**
A: Tarayıcı localStorage'ını temizleyin ve varsayılan şifreyi kullanın

**Q: Hesap kilitlendi**
A: localStorage'dan `failedLoginAttempts` ve `lastFailedLogin` verilerini silin

## 📞 Destek

Herhangi bir sorun yaşarsanız:
1. Tarayıcı konsolunu kontrol edin
2. localStorage verilerini kontrol edin
3. Yedek dosyanızı kullanarak verileri geri yükleyin
4. Tarayıcı cache'ini temizleyin

## 🔮 Gelecek Özellikler

- **Kullanıcı Yönetimi**: Çoklu kullanıcı desteği
- **Görsel Yükleme**: Ürün fotoğrafları
- **Analytics**: Detaylı istatistikler
- **API Entegrasyonu**: Backend bağlantısı
- **Çoklu Dil**: Uluslararası dil desteği
- **İki Faktörlü Doğrulama**: SMS/Email ile doğrulama
- **Şifre Değiştirme**: Güvenli şifre güncelleme

---

**Not**: Bu admin paneli tamamen client-side çalışır ve herhangi bir sunucu gerektirmez. Tüm veriler tarayıcınızda güvenli şekilde saklanır. Güvenlik için varsayılan şifreyi değiştirmeniz önerilir. 