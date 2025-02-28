using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Runtime.InteropServices;

namespace Calculator
{
	static class Program
	{
		[DllImport("kernel32.dll")]
        private static extern bool AllocConsole();

		/// <summary>
		/// 應用程式的主要進入點。
		/// </summary>
		[STAThread]
		static void Main()
		{
			// AllocConsole();  // for debugging
			Application.EnableVisualStyles();
			Application.SetCompatibleTextRenderingDefault(false);
			// MessageBox.Show("New version：" + DateTime.Now.ToString());
			Application.Run(new Form1());
		}
	}
}
