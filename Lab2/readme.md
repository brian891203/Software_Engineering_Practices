### compile to the executable file
''' "C:\Program Files (x86)\Microsoft Visual Studio\2019\BuildTools\MSBuild\Current\Bin\MSBuild.exe" Calculator.csproj /t:Rebuild /p:Configuration=Debug'''

### Debugging Record
1. 只有被點擊的操作符按鈕會被禁用，但正確的做法應該是在選擇一個操作符後，同時禁用所有操作符按鈕
2. 除以零的問題
3. 按 00000003 -> 連續按 0 只顯示 0
4. 連續按 "=" 的計算邏輯

### exe file debugging in console
''' [DllImport("kernel32.dll")]
        private static extern bool AllocConsole(); '''