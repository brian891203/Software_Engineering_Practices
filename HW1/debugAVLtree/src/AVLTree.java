/* Class AVLTree */
class AVLTree
{
    private AVLNode root;     

    /* Constructor */
    public AVLTree()
    {
        root = null;
    }
    /* Function to check if tree is empty */
    public boolean isEmpty()
    {
        return root == null;
    }
    /* Make the tree logically empty */
    public void makeEmpty()
    {
        root = null;
    }
    /* Function to insert data */
    public void insert(int data)
    {
        root = insert(data, root);
    }
    /* Function to get height of node */
    private int height(AVLNode t )
    {
        return t == null ? -1 : t.height;
    }
    /* Function to max of left/right node */
    private int max(int lhs, int rhs)
    {
        return lhs > rhs ? lhs : rhs;
    }
    /* Function to insert data recursively */
    private AVLNode insert(int x, AVLNode t)
    {
        if (t == null)           // When confirming that t is null--> means that is the insertion position for the data x
            t = new AVLNode(x);  // Create a new node with data x --> sucessfully inserted the node with data x into the tree (Cause t will be like leafNode.left, and that position is null) 
        else if (x < t.data)
        {
            t.left = insert( x, t.left );
            if( height( t.left ) - height( t.right ) == 2 )
                if( x < t.left.data )    // means the situation of "LL"
                    // t = rotateWithLeftChild( t.left ); // It causes the BUGGGGG!!!
                    t = rotateWithLeftChild( t );   // SINGLE ROTATION
                    // Before debugging, "t" here is the root node.
                    //But only pass the t.left, you can't get the root node when you do the LL rotation
                    // changed t.left to t --> To get the whole tree from root node
                else
                    t = doubleWithLeftChild( t );
        }
        else if( x > t.data )
        {
            t.right = insert( x, t.right );
            if( height( t.right ) - height( t.left ) == 2 )
                if( x > t.right.data)
                    // t = rotateWithLeftChild( t.right ); // It causes the BUGGGGG!!!
                    t = rotateWithRightChild( t );
                else
                    t = doubleWithRightChild( t );
        }
        else
          ;  // Duplicate; do nothing
        t.height = max( height( t.left ), height( t.right ) ) + 1;
        return t;
    }
    /* Rotate binary tree node with left child */     
    private AVLNode rotateWithLeftChild(AVLNode k2)  // LL pattern
    {
        // Following codes are incorrect for the LL right rotation
        // AVLNode k1 = k2.left;
        // k2.right = k1.left;
        // k1.left = k2;
        // k2.height = max( height( k2.left ), height( k2.right ) ) + 1;
        // k1.height = max( height( k1.left ), k2.height ) + 1;

        // Correct version of the LL right rotation
        AVLNode k1 = k2.left;
        k2.left = k1.right;
        k1.right = k2;
        k2.height = max( height( k2.left ), height( k2.right ) ) + 1;
        k1.height = max(height(k1.left), height(k1.right)) + 1;

        return k1;
    }

    /* Rotate binary tree node with right child */
    private AVLNode rotateWithRightChild(AVLNode k1) // RR pattern
    {
        // Following codes are incorrect for the RR left rotation
        // AVLNode k2 = k1.right;
        // k1.left = k2.right;
        // k2.right = k1;
        // k1.height = max( height( k1.left ), height( k1.right ) ) + 1;
        // k2.height = max( height( k2.right ), k1.height ) + 1;

        // Correct version of the RR left rotation5
        AVLNode k2 = k1.right;
        k1.right = k2.left;
        k2.left = k1;
        k1.height = max( height( k1.left ), height( k1.right ) ) + 1;
        k2.height = max(height(k2.left), height(k2.right)) + 1;

        return k2;
    }
    /**
     * Double rotate binary tree node: first left child
     * with its right child; then node k3 with new left child */
    private AVLNode doubleWithLeftChild(AVLNode k3)  // LR pattern
    {
        k3.left = rotateWithRightChild( k3.left );
        return rotateWithLeftChild( k3 );
    }
    /**
     * Double rotate binary tree node: first right child
     * with its left child; then node k1 with new right child */
    private AVLNode doubleWithRightChild(AVLNode k1)  // RL pattern
    {
        k1.right = rotateWithLeftChild( k1.right );
        return rotateWithRightChild( k1 );
    }    
    /* Functions to count number of nodes */
    public int countNodes()
    {
        return countNodes(root);
    }
    private int countNodes(AVLNode r)
    {
        if (r == null)
            return 0;
        else
        {
            int l = 1;
            l += countNodes(r.left);
            l += countNodes(r.right);
            return l;
        }
    }
    /* Functions to search for an element */
    public boolean search(int val)
    {
        return search(root, val);
    }
    private boolean search(AVLNode r, int val)
    {
        // Mixed use the operation of recursion and loop
        // --> the recursion operation is not necessary because we can only traverse the tree by loops
        // boolean found = false;
        // while ((r != null) && !found)
        // {
        //     int rval = r.data;
        //     if (val < rval)
        //         r = r.left;
        //     else if (val > rval)
        //         r = r.right;
        //     else
        //     {
        //         found = true;
        //         break;
        //     }
        //     found = search(r, val);
        // }
        // return found;

        // Correct version by only using the loop operation
        // while (r != null) {
        //     if (val < r.data)
        //         r = r.left;
        //     else if (val > r.data)
        //         r = r.right;
        //     else
        //         return true;
        // }
        // return false;

        // Correct version by only using the recursion operation
        if (r == null)
            return false;
        if (val == r.data)
            return true;
        else if (val < r.data)
            return search(r.left, val);
        else // val > r.data
            return search(r.right, val);
    }
    /* Function for inorder traversal */
    public void inorder()
    {
        inorder(root);
    }
    private void inorder(AVLNode r)
    {
        if (r != null)
        {
            inorder(r.left);
            System.out.print(r.data +" ");
            inorder(r.right);
        }
    }
    /* Function for preorder traversal */
    public void preorder()
    {
        preorder(root);
    }
    private void preorder(AVLNode r)
    {
        if (r != null)
        {
            System.out.print(r.data +" ");
            preorder(r.left);             
            preorder(r.right);
        }
    }
    /* Function for postorder traversal */
    public void postorder()
    {
        postorder(root);
    }
    private void postorder(AVLNode r)
    {
        if (r != null)
        {
            postorder(r.left);    // based on the incorrect version, there is a finite loop here --> maybe use some term of the recursion will be better
            postorder(r.right);
            System.out.print(r.data +" ");
        }
    }     
}