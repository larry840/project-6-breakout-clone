網頁連結請點我：https://project-6-breakout-clone.vercel.app/

實作javascript打磚塊小遊戲
![image](https://github.com/larry840/project-6-breakout-clone/assets/137968655/f0a3da65-36f2-4e21-9e4c-51d33a83065e)

學習重點：
遊戲結束的方式判定有兩種方式
1. 利用forEach第二個參數index來splice brickArray，寫法直覺但若考慮時間複雜度則用第二種方法
2. 將brick class新增一個this.visible的property，canvas setInterval在繪圖時額外判定visible是否為true。球打到磚塊時將visible改為false並統計撞擊次數有沒有達到10從而結束遊戲。
