Bug finding record:
1. 多個 Basic object，如果使用 Group 功能去 group these objects，(不確定有沒有正確 group 成功，要 print out group list 來檢查)，如果再去 drag 整個 group 會有 bug
--> 感覺是 group 在與 view 之間的溝通有問題，多個 group 也可以再 group，但顯示也會有問題

2. SelectedArea 沒辦法 360 度繪製選擇區域
--> 無法反向拖曳

3. 根據 Spec "(x1,y1,x2,y2) 形成一個四方形的區域。在該區域內的基本物件若完全落於此四方形區域，則處於被select的狀態"
--> 不用完全落於 SelectedArea 就可以被選取，且會有明明沒選到某物件，該物件卻被選取的情況發生