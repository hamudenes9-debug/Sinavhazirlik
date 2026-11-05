/* Çevrimiçi beyin (OpenRouter) yapılandırması.
 *
 * Anahtar BİLEREK burada tutulmaz: herkese açık bir depoda duran anahtar
 * herkesin kullanımına açılır ve GitHub gizli anahtar koruması bunu engeller.
 * Anahtar iki yoldan gelir:
 *   1) Uygulamada Ayarlar → Koç → "Panodan yapıştır" (cihazda saklanır).
 *   2) Derlemede OPENROUTER_API_KEY ortam değişkeni (GitHub Actions secret).
 * Ortam değişkeni varsa derleme bu dosyanın yerine anahtarlı sürümü yazar;
 * o çıktı .gitignore içindedir. */
window.KAMP_AI_CONFIG = window.KAMP_AI_CONFIG || {};
