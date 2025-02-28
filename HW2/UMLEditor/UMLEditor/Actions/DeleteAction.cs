using System;
using UMLEditor.Shapes;
using UMLEditor.Shapes.BasicObjects;
using UMLEditor.Views;
using UMLEditor.Shapes.ConnectionLines;

namespace UMLEditor.Actions
{
    /// <summary>
    /// An <see cref="UMLAction"/> which performs the delete operation to
    /// all selected <see cref="Shape"/>s on <see cref="Canvas"/>.
    /// </summary>
    /// <seealso cref="UMLAction"/>
    internal class DeleteAction : UMLAction
    {
        /// <summary>
        /// Generates an <see cref="DeleteAction"/> instance.
        /// </summary>
        /// <seealso cref="UMLAction()"/>
        internal DeleteAction()
        {
            
        }

        /// <summary>
        /// Triggers and performs the to-do action.
        /// Deletes all selected <see cref="Shape"/>s
        /// on the <see cref="Canvas"/>.
        /// </summary>
        /// <remarks>
        /// If the <see cref="Shape"/> to be deleted contains any <see cref="CompositionObject"/>,
        /// then the <see cref="Shape"/>s hold by the same <see cref="CompositionObject"/> will
        /// be deleted, too.
        /// </remarks>
        /// <seealso cref="UMLAction.Trigger()"/>
        public override void Trigger()
        {
            foreach (Shape shape in Canvas.SelectedShapes)
            {
                Console.WriteLine("shape check : " + shape);
                // If the shape is a line, then break the loop --> Solved the bug4
                if (shape is Line) break;
                
                shape.DestroyAllCombinations();
                Console.WriteLine("DestroyAllCombinations() check");

                Canvas.RemoveShape(shape);
                Console.WriteLine("RemoveShape() check");
            }

            base.Trigger();
        }
    }
}
