using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Calculator
{
	public partial class Form1 : Form
	{
		int currentNum = 1;
		double result, num1, num2, count_0;
		String op;
        bool isUnclick = false;

		public Form1()
		{
			InitializeComponent();
		}

		public void button_show()
		{
            isUnclick = false;
			addition.Enabled = true;
			subtraction.Enabled = true;
			multiplication.Enabled = true;
			division.Enabled = true;
		}

        public void button_unclick()  // for solving bug1
		{
            isUnclick = true;
			addition.Enabled = false;
			subtraction.Enabled = false;
			multiplication.Enabled = false;
			division.Enabled = false;
		}

        private void addition_Click(object sender, EventArgs e)
        {
            Console.WriteLine("=== addition_Click ===");
            if (textBox1.Text == "") return; // for solving bug5

            if (currentNum == 1)
            {
                num1 = Convert.ToDouble(textBox1.Text);
                // addition.Enabled = false;
                button_unclick();
                op = "+";
                textBox1.Text = "";
                currentNum++;

                if (result != 0) {
                    equals_Click();
                }

                Console.WriteLine("currentNum: " + currentNum);
                Console.WriteLine("num1: " + num1);
                Console.WriteLine("num2: " + num2);

            } else if (currentNum == 2) {
                button_unclick();
                equals_Click();

                Console.WriteLine("===========");
                Console.WriteLine("After add");
                Console.WriteLine("num1: " + num1);
                Console.WriteLine("num2: " + num2);
                Console.WriteLine("result: " + result);
                Console.WriteLine("currentNum: " + currentNum);
                Console.WriteLine("===========");
            } else {
                textBox1.Text = "";
                currentNum--;
            }
        }

         private void subtraction_Click(object sender, EventArgs e)
        {
            if (textBox1.Text == "") return; // for solving bug5

            if (currentNum == 1)
            {
                num1 = Convert.ToDouble(textBox1.Text);
                // subtraction.Enabled = false;
                button_unclick();
                op = "-";
                textBox1.Text = "";
                currentNum++;
            }
        }

        private void multiplication_Click(object sender, EventArgs e)
        {
            if (textBox1.Text == "") return; // for solving bug5

            if (currentNum == 1)
            {
                num1 = Convert.ToDouble(textBox1.Text);
                // multiplication.Enabled = false;
                button_unclick();
                op = "*";
                textBox1.Text = "";
                currentNum++;
            }
        }

        private void division_Click(object sender, EventArgs e)
        {
            if (textBox1.Text == "") return; // for solving bug5

            if (currentNum == 1)
            {
                num1 = Convert.ToDouble(textBox1.Text);
                // division.Enabled = false;
                button_unclick();
                op = "/";
                textBox1.Text = "";
                currentNum++;
            }
        }

        private void Number0_Click(object sender, EventArgs e)
        {
            if (count_0 == 0)
                textBox1.Text += "0";
            button_show();
        }

        private void Number1_Click(object sender, EventArgs e)
        {
            button_show();
            // if (isUnclick) {
            //     textBox1.Text = "";
            //     textBox1.Text += "1";
            //     return;
            // }
            // if (textBox1.Text != "") textBox1.Text += "1";
            textBox1.Text += "1";
        }

        private void Number2_Click(object sender, EventArgs e)
        {
            button_show();
            // if (isUnclick) {
            //     textBox1.Text = "";
            //     textBox1.Text += "2";
            //     return;
            // }
            textBox1.Text += "2";
        }

        private void Number3_Click(object sender, EventArgs e)
        {
            textBox1.Text += "3";
            button_show();
        }

        private void Number4_Click(object sender, EventArgs e)
        {
            textBox1.Text += "4";
            button_show();
        }

        private void Number5_Click(object sender, EventArgs e)
        {
            textBox1.Text += "5";
            button_show();
        }

        private void Number6_Click(object sender, EventArgs e)
        {
            textBox1.Text += "6";
            button_show();
        }

        private void Number7_Click(object sender, EventArgs e)
        {
            textBox1.Text += "7";
            button_show();
        }

        private void Number8_Click(object sender, EventArgs e)
        {
            textBox1.Text += "8";
            button_show();
        }

        private void Number9_Click(object sender, EventArgs e)
        {
            textBox1.Text += "9";
            button_show();
        }
     

		// private void button14_Click(object sender, EventArgs e)
		// {
		// 	textBox1.Text += "0";
		// }

        private void decimalPoint_Click(object sender, EventArgs e)
        {
            textBox1.Text += ".";
        }

        private void equals_Click(object sender, EventArgs e)
        {
            Console.WriteLine("currentNum: " + currentNum);

            if (num2 == 0){
                num2 = Convert.ToDouble(textBox1.Text);
            } else {
                num1 = result;
            }  // for solving bug4
            // num2 = Convert.ToDouble(textBox1.Text);
            switch (op)
            {
                case "+":
                    result = num1 + num2;
                    break;
                case "-":
                    result = num1 - num2;
                    break;
                case "*":
                    result = num1 * num2;
                    break;
                case "/":
                    if (num2 == 0)  // for solving bug2
                    {
                        Console.WriteLine("Error");
                        textBox1.Text = "Error";
                        Clear_Click();
                        return;
                    }
                    result = num1 / num2;
                    break;
            }
            textBox1.Text = Convert.ToString(result);
            currentNum++;
            return;
        }

        private void equals_Click()
        {
            Console.WriteLine("=== equals_Click ===");
            Console.WriteLine("currentNum: " + currentNum);

            if (num2 == 0){
                num2 = Convert.ToDouble(textBox1.Text);
            } else {
                num2 = result;
            }  // for solving bug4
            // num2 = Convert.ToDouble(textBox1.Text);
            switch (op)
            {
                case "+":
                    result = num1 + num2;
                    break;
                case "-":
                    result = num1 - num2;
                    break;
                case "*":
                    result = num1 * num2;
                    break;
                case "/":
                    if (num2 == 0)  // for solving bug2
                    {
                        textBox1.Text = "Error";
                        Clear_Click();
                        return;
                    }
                    result = num1 / num2;
                    break;
            }
            Console.WriteLine("result: " + result);

            textBox1.Text = Convert.ToString(result);
            if (result != 0) {
                currentNum--;
            }
            // currentNum++;
            return;
        }

        private void Clear_Click(object sender, EventArgs e)
        {
            button_show();
            num1 = 0;
            num2 = 0;
            textBox1.Text = "";
            currentNum = 1;
        }

        private void Clear_Click()
        {
            button_show();
            num1 = 0;
            num2 = 0;
            // textBox1.Text = "";
            currentNum = 1;
        }
	}
}
