# APK kabuğu (Capacitor 7)

Web uygulamasını (repo kökü) Android uygulamasına çevirir ve **yerel bildirim** desteği ekler.

```bash
npm ci
npm run sync                 # ../index.html, css, js, icons, pdf -> www/ ve android/app/src/main/assets/public
cd android && ./gradlew assembleDebug
```

- Uygulama kimliği: `com.sinavkampi.app` · ad: **Sınav Kampı**
- Simge, açılış ekranı, bildirim simgesi (`ic_stat_icon`) ve `beep.wav` özelleştirildi.
- `www/` derleme sırasında üretilir (repoda tutulmaz).
- CI: `.github/workflows/android.yml` → debug APK artifact + etiketli sürümlerde Release'e APK.
