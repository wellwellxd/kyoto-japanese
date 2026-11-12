# 京都日和 · Kyoto Biyori

從零走向日文 N4 核心、為京都旅行準備的手機優先學習網站。

網站：<https://wellwellxd.github.io/kyoto-japanese/>

## 學習方式

- **免看螢幕聽說**：中文提示 → 日文示範 → 4 秒跟讀 → 6 秒開口回答 → 示範答案。80 個獨立課程 MP3，另有 20 段每四課連續的 MP3，適合手機、鎖屏與車用藍牙。每課約 2–3 分鐘，共約 3.2 小時的不同內容。
- **每天十分鐘文字練習**：依當前課程混合假名、單字、文法、句意、漢字例詞與短文。間隔複習為 1、2、4、7、14、30 天。錯題當輪重練、隔日複習。計時只計前景練習頁的實際時間，完成一輪後可繼續。
- **四階段路線**：8 課發音與假名、24 課 N5、32 課 N4 核心、16 課京都情境。另有文法延伸、366 個常用漢字例詞和 16 篇原創短文。
- **本機進度**：教材完成與已聽過分開記錄；音訊依實際播放過的秒數覆蓋率約 85% 標記已聽，拖曳進度不會直接算完成。支援收藏、JSON 匯出／匯入。
- **離線**：Service Worker 快取網站教材；音檔需手動「存到離線」，也能下載 MP3。包含快取音檔的 HTTP Range 回應，支援離線拖曳播放。

開車前在停車時選好課程並測試鎖屏與藍牙。網頁不是原生 CarPlay／Android Auto App，硬體鍵和背景播放依裝置而異。四課 MP3 內不需要 JavaScript 換課；也可下載到常用播放器。

## 課程範圍

這是一條從零走向 N4 的核心路線，不能取代完整詞彙量、長篇閱讀與模考，也不保證通過 JLPT。課程分類是教學安排，不是官方必考清單。網站設定頁連結 JLPT 官方題型樣本、IRODORI 與艾琳學日語作為延伸學習。

課程與練習為原創。MP3 為 macOS **Kyoko（日文）**與 **Meijia（台灣華語）**合成語音，非真人錄音。單字個別播放使用裝置 Speech Synthesis。選用 SpeechRecognition 的內容可能由瀏覽器供應商以雲端處理；只做句子文字比對，不提供發音評分。

## 部署

無建置程序、無後端、無 API 金鑰。所有網站檔案均在儲存庫根目錄，使用相對路徑，支援 GitHub Pages 子路徑。

GitHub → Settings → Pages → Deploy from a branch → `main` → `/ (root)`。

本機預覽：

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

更新教材修改 `content.js`，假名／漢字／短文修改 `extras.js`。`audio.js` 是獨立音檔時長、時間軸提示與連續段落索引。`app.js` 是應用程式，`sw.js` 是離線處理；核心快取採網路優先，更新後重載會取新版本，離線仍回退快取。

## 隱私與資料

進度存於 localStorage，沒有帳號或雲端同步。音檔存於 Cache Storage。清除瀏覽資料或裝置儲存壓力可能刪除紀錄與離線檔案，請匯出 JSON 備份。匯入會取代本機紀錄。Google Fonts 為選用字型來源，離線時使用系統字型。

## 參考

- [JLPT 能力說明](https://www.jlpt.jp/e/about/levelsummary.html)
- [JLPT 官方練習](https://www.jlpt.jp/e/samples/forlearners.html)
- [IRODORI](https://www.irodori.jpf.go.jp/)
- [艾琳學日語](https://www.erin.jpf.go.jp/)
- [MDN Media Session](https://developer.mozilla.org/en-US/docs/Web/API/Media_Session_API)
- [MDN SpeechRecognition](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition)
