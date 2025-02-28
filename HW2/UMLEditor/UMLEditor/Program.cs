using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Runtime.InteropServices;

namespace UMLEditor
{
    static class Program
    {
        /// <summary>
        /// 應用程式的主要進入點。
        /// </summary>
        
        [DllImport("kernel32.dll")]  // debugging console
        private static extern bool AllocConsole();  // debugging console
        [STAThread]
        static void Main()
        {
            AllocConsole();  // debugging console
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new UMLEditorForm());
        }
    }
}
