import static org.junit.jupiter.api.Assertions.*;

import java.util.concurrent.TimeUnit;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Timeout;


public class TestAVL {
	AvlTree underTestAVL = new AvlTree();

	/**
	 * Partition Testing
	 * 1. Test for case in ascending order
	 * 2. Test for case in descending order
	 * 3. Test for case in random order
	 * 4. Test for case with duplicate data
	 * 5. Test for case with left heavy tree
	 * 6. Test for case with right heavy tree
	 */

	/**
	 * Test: insert() -Partition Testing
	 * Given: A new created AVL tree
	 * When: insert() is called with data in ascending order
	 * Then: It should return a balanced tree
	 */
	@Test
	@DisplayName("Test for sequential ascending insert")
	void insert_WhenSequentialAscending_ShouldReturnBalancedTree_byPartition() {
		int ascendingData[] = {1, 2, 3};
		for (int data : ascendingData) {
			underTestAVL.insert(data);
		}
		assertEquals("1 2 3", underTestAVL.inorder(), "Inorder traversal should return '1 2 3' in sorted order.");
		assertEquals("2 1 3", underTestAVL.preorder(), "Preorder traversal should return '2 1 3' in sorted order.");
		assertEquals("1 3 2", underTestAVL.postorder(), "Postorder traversal should return '1 3 2' in sorted order.");
	}

	/**
	 * Test: insert() -Partition Testing
	 * Given: A new created AVL tree
	 * When: insert() is called with data in descending order
	 * Then: It should return a balanced tree
	 */
	@Test
	@DisplayName("Test for sequential descending insert")
	void insert_WhenSequentialDescending_ShouldReturnBalancedTree_byPartition() {
		int [] descendingData = {10, 9, 8};
		for (int data : descendingData) {
			underTestAVL.insert(data);
		}
		assertEquals("8 9 10", underTestAVL.inorder(), "Inorder traversal should return '8 9 10' in sorted order.");
		assertEquals("9 8 10", underTestAVL.preorder(), "Preorder traversal should return '9 8 10' in sorted order.");
		assertEquals("8 10 9", underTestAVL.postorder(), "Postorder traversal should return '8 10 9 ' in sorted order.");
	}

	/**
	 * Test: insert() -Partition Testing
	 * Given: A new created AVL tree
	 * When: insert() is called with data in random order
	 * Then: It should return a balanced tree
	 */
	@Test
	@DisplayName("Test for random insert")
	void insert_WhenRandom_ShouldReturnBalancedTree_byPartition() {
		int [] randomData = {5, 3, 7, 2, 4, 6, 8, 1, 9, 10};
		for (int data : randomData) {
			underTestAVL.insert(data);
		}
		assertEquals("1 2 3 4 5 6 7 8 9 10", underTestAVL.inorder(), "Inorder traversal should return '1 2 3 4 5 6 7 8 9 10' in sorted order.");
		assertEquals("5 3 2 1 4 7 6 9 8 10", underTestAVL.preorder(), "Preorder traversal should return '5 3 2 1 4 7 6 9 8 10' in sorted order.");
		assertEquals("1 2 4 3 6 8 10 9 7 5", underTestAVL.postorder(), "Postorder traversal should return '1 2 4 3 6 8 10 9 7 5' in sorted order.");
	}
	
	/**
	 * Test: insert() -Partition Testing
	 * Given: A new created AVL tree
	 * When: insert() is called with duplicate data
	 * Then: It should return a balanced tree
	 */
	@Test
	@DisplayName("Test for duplicate insert")
	void insert_WhenDuplicate_ShouldReturnOnlyOneNode_byPartition() {
		int duplicateData = 5;
		for (int i = 0; i < 10; i++) {
			underTestAVL.insert(duplicateData);
		}
		assertEquals("5", underTestAVL.inorder(), "Inorder traversal should return '5' in sorted order.");
		assertEquals(1, underTestAVL.countNodes(), "There should be only one node in the AVL tree.");
	}

	/**
	 * Test:Right rotation -Partition Testing
	 * Given: A new created AVL tree
	 * When: the tree is left heavy
	 * Then: It should return a balanced tree and right rotation should be performed
	 */
	@Test
	@DisplayName("Test for right rotation")
	void testRightRotation_givenAVLTreeIsLeftHeavy_ShouldReturnBalancedTree_byPartition() {
		int [] leftHeavyData = {5, 4, 3, 2, 1};
		for (int data : leftHeavyData) {
			underTestAVL.insert(data);
		}
		assertEquals("1 2 3 4 5", underTestAVL.inorder(), "Inorder traversal should return '1 2 3 4 5' in sorted order.");
		assertEquals("4 2 1 3 5", underTestAVL.preorder(), "Preorder traversal should return '4 2 1 3 5' in sorted order.");
		assertEquals("1 3 2 5 4", underTestAVL.postorder(), "Postorder traversal should return '1 3 2 5 4' in sorted order.");
	}

	/**
	 * Test:Left rotation -Partition Testing
	 * Given: A new created AVL tree
	 * When: the tree is right heavy
	 * Then: It should return a balanced tree and left rotation should be performed
	 */
	@Test
	@DisplayName("Test for right rotation")
	void testLeftRotation_givenAVLTreeIsRightHeavy_ShouldReturnBalancedTree_byPartition() {
		int [] rightHeavyData = {1, 2, 3, 4, 5};
		for (int data : rightHeavyData) {
			underTestAVL.insert(data);
		}
		assertEquals("1 2 3 4 5", underTestAVL.inorder(), "Inorder traversal should return '1 2 3 4 5' in sorted order.");
		assertEquals("2 1 4 3 5", underTestAVL.preorder(), "Preorder traversal should return '2 1 4 3 5' in sorted order.");
		assertEquals("1 3 5 4 2", underTestAVL.postorder(), "Postorder traversal should return '1 3 5 4 2' in sorted order.");
	}

	/**
	 * Boundary Testing
	 * 1. Test for case with empty tree
	 * 2. Test for case with continuously ascending data
	 * 3. Test for case with continuously descending data
	 * 4. Test for case with single node tree
	 */

	/**
	 * Test: Empty tree -Boundary Testing
	 * Given: A new created AVL tree
	 * When: isEmpty() is called
	 * Then: It should return true
	 */
	@Test
	@DisplayName("Test for isEmpty()")
	void isEmpty_WhenNewlyCreated_ShouldReturnTrue_byBoundary() {
		assertTrue(underTestAVL.isEmpty(), "Newly created AVL tree should be empty.");
	}

	/**
	 * Test: Continuously ascending -Boundary Testing
	 * Given: A new created AVL tree
	 * When: insert() is called with data in ascending order
	 * Then: It should return a balanced tree
	 */
	@Test
	@DisplayName("Test for sequential ascending insert")
	void insert_WhenContinuouslyAscending_ShouldReturnBalancedTree_byBoundary() {
		int ascendingData[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
		for (int data : ascendingData) {
			underTestAVL.insert(data);
		}
		assertEquals("1 2 3 4 5 6 7 8 9 10", underTestAVL.inorder(), "Inorder traversal should return '1 2 3 4 5 6 7 8 9 10' in sorted order.");
		assertEquals("4 2 1 3 8 6 5 7 9 10", underTestAVL.preorder(), "Preorder traversal should return '4 2 1 3 8 6 5 7 9 10' in sorted order.");
		assertEquals("1 3 2 5 7 6 10 9 8 4", underTestAVL.postorder(), "Postorder traversal should return '1 3 2 5 7 6 10 9 8 4' in sorted order.");
	}

	/**
	 * Test: Continuously descending -Boundary Testing
	 * Given: A new created AVL tree
	 * When: insert() is called with data in descending order
	 * Then: It should return a balanced tree
	 */
	@Test
	@DisplayName("Test for sequential descending insert")
	void insert_WhenContinuouslyDescending_ShouldReturnBalancedTree_byBoundary() {
		int [] descendingData = {10, 9, 8, 7, 6, 5, 4, 3, 2, 1};
		for (int data : descendingData) {
			underTestAVL.insert(data);
		}
		assertEquals("1 2 3 4 5 6 7 8 9 10", underTestAVL.inorder(), "Inorder traversal should return '1 2 3 4 5 6 7 8 9 10' in sorted order.");
		assertEquals("7 3 2 1 5 4 6 9 8 10", underTestAVL.preorder(), "Preorder traversal should return '7 3 2 1 5 4 6 9 8 10' in sorted order.");
		assertEquals("1 2 4 6 5 3 8 10 9 7", underTestAVL.postorder(), "Postorder traversal should return '1 2 4 6 5 3 8 10 9 7' in sorted order.");
	}

	/**
	 * Test: Single node tree -Boundary Testing
	 * Given: A new created AVL tree
	 * When: insert() is called with duplicate data
	 * Then: It should return a balanced tree
	 */
	@Test
	@DisplayName("Test for duplicate insert")
	void insert_WhenSingleNode_ShouldReturSingleNodeTree_byBoundary() {
		int data = 5;
		underTestAVL.insert(data);
		assertEquals("5", underTestAVL.inorder(), "Inorder traversal should return '5' in sorted order.");
		assertEquals(1, underTestAVL.countNodes(), "There should be only one node in the AVL tree.");
	}

	/**
	 * Coverage Testing
	 * 1. Test for all public methods
	 * 	● AVLtree()
	 * 	● isEmpty()
	 * 	● makeEmpty()
	 * 	● insert()
	 * 	● countNodes
	 * 	● search()
	 * 	● inorder()
	 * 	● preorder()
	 * 	● postorder()
	 * 2. Test for all rotation branches
	 * 	● RR
	 * 	● LL
	 * 	● RL
	 * 	● LR
	 */

	/** 
	 * Test: Public method AVLtree() -Coverage Testing
	 * Given: A new created AVL tree
	 * When: AVLtree() is called
	 * Then: It should return a new AVL tree
	 */
	@Test
	@DisplayName("Test for AVLtree()")
	void testAVLtree_ShouldReturnNewAVLTree_byCoverage() {
		AvlTree newAVLTree = new AvlTree();
		assertTrue(newAVLTree instanceof AvlTree, "Newly created AVL tree should be an instance of AVL tree.");
	}

	/** 
	 * Test: Public method isEmpty() -Coverage Testing
	 * Given: A new created AVL tree
	 * When: isEmpty() is called
	 * Then: It should return true
	 */
	@Test
	@DisplayName("Test for isEmpty()")
	void isEmpty_WhenNewlyCreated_ShouldReturnTrue_byCoverage() {
		assertTrue(underTestAVL.isEmpty(), "Newly created AVL tree should be empty.");
	}

	/** 
	 * Test: Public method makeEmpty() -Coverage Testing
	 * Given: A new created AVL tree
	 * When: makeEmpty() is called
	 * Then: It should return an empty AVL tree
	 */
	@Test
	@DisplayName("Test for makeEmpty()")
	void makeEmpty_WhenCalled_ShouldReturnEmptyAVLTree_byCoverage() {
		int [] insertData = {10, 9, 8, 7, 6, 5, 4, 3, 2, 1};
		for (int data : insertData) {
			underTestAVL.insert(data);
		}
		underTestAVL.makeEmpty();
		assertTrue(underTestAVL.isEmpty(), "AVL tree should be empty after calling makeEmpty().");
	}

	/** 
	 * Test: Public method insert() -Coverage Testing
	 * Given: A new created AVL tree
	 * When: insert() is called with data
	 * Then: It should return a balanced AVL tree
	 */
	@Test
	@DisplayName("Test for insert()")
	void insert_WhenCalled_ShouldReturnBalancedAVLTree_byCoverage() {
		int [] insertData = {10, 9, 8, 7, 6, 5, 4, 3, 2, 1};
		for (int data : insertData) {
			underTestAVL.insert(data);
		}
		assertEquals("1 2 3 4 5 6 7 8 9 10", underTestAVL.inorder(), "Inorder traversal should return '1 2 3 4 5 6 7 8 9 10' in sorted order.");
		assertEquals("7 3 2 1 5 4 6 9 8 10", underTestAVL.preorder(), "Preorder traversal should return '7 3 2 1 5 4 6 9 8 10' in sorted order.");
		assertEquals("1 2 4 6 5 3 8 10 9 7", underTestAVL.postorder(), "Postorder traversal should return '1 2 4 6 5 3 8 10 9 7' in sorted order.");
	}

	/** 
	 * Test: Public method countNodes() -Coverage Testing
	 * Given: A new created AVL tree
	 * When: countNodes() is called
	 * Then: It should return the number of nodes in the AVL tree
	 */
	@Test
	@DisplayName("Test for countNodes()")
	void countNodes_WhenCalled_ShouldReturnNumberOfNodes_byCoverage() {
		int [] insertData = {10, 9, 8, 7, 6, 5, 4, 3, 2, 1};
		for (int data : insertData) {
			underTestAVL.insert(data);
		}
		assertEquals(10, underTestAVL.countNodes(), "There should be 10 nodes in the AVL tree.");
	}

	/** 
	 * Test: Public method search() -Coverage Testing
	 * Given: A new created AVL tree
	 * When: search() is called with data
	 * Then: It should return true if the data is found in the AVL tree
	 */
	@Test
	@DisplayName("Test for search()")
	void search_WhenDataFound_ShouldReturnTrue_byCoverage() {
		int [] insertData = {10, 9, 8, 7, 6, 5, 4, 3, 2, 1};
		for (int data : insertData) {
			underTestAVL.insert(data);
		}
		assertTrue(underTestAVL.search(5), "Data 5 should be found in the AVL tree.");
		assertTrue(underTestAVL.search(10), "Data 10 should be found in the AVL tree.");
		assertFalse(underTestAVL.search(11), "Data 11 should not be found in the AVL tree.");
	}

	/** 
	 * Test: Public method inorder() -Coverage Testing
	 * Given: A new created AVL tree
	 * When: inorder() is called
	 * Then: It should return the inorder traversal of the AVL tree
	 */
	@Test
	@DisplayName("Test for inorder()")
	void inorder_WhenCalled_ShouldReturnInorderTraversal_byCoverage() {
		int [] insertData = {10, 9, 8, 7, 6, 5, 4, 3, 2, 1};
		for (int data : insertData) {
			underTestAVL.insert(data);
		}
		assertEquals("1 2 3 4 5 6 7 8 9 10", underTestAVL.inorder(), "Inorder traversal should return '1 2 3 4 5 6 7 8 9 10' in sorted order.");
	}

	/** 
	 * Test: Public method preorder() -Coverage Testing
	 * Given: A new created AVL tree
	 * When: preorder() is called
	 * Then: It should return the preorder traversal of the AVL tree
	 */
	@Test
	@DisplayName("Test for preorder()")
	void preorder_WhenCalled_ShouldReturnPreorderTraversal_byCoverage() {
		int [] insertData = {10, 9, 8, 7, 6, 5, 4, 3, 2, 1};
		for (int data : insertData) {
			underTestAVL.insert(data);
		}
		assertEquals("7 3 2 1 5 4 6 9 8 10", underTestAVL.preorder(), "Preorder traversal should return '7 3 2 1 5 4 6 9 8 10' in sorted order.");
	}

	/** 
	 * Test: Public method postorder() -Coverage Testing
	 * Given: A new created AVL tree
	 * When: postorder() is called
	 * Then: It should return the postorder traversal of the AVL tree
	 */
	@Test
	@DisplayName("Test for postorder()")
	void postorder_WhenCalled_ShouldReturnPostorderTraversal_byCoverage() {
		int [] insertData = {10, 9, 8, 7, 6, 5, 4, 3, 2, 1};
		for (int data : insertData) {
			underTestAVL.insert(data);
		}
		assertEquals("1 2 4 6 5 3 8 10 9 7", underTestAVL.postorder(), "Postorder traversal should return '1 2 4 6 5 3 8 10 9 7' in sorted order.");
	}

	/**
	 * Test: Branches of RR -Coverage Testing
	 * Given: A new created AVL tree
	 * When: insert() is called with data in left heavy tree
	 * Then: It should return a balanced tree
	 */
	@Test
	@DisplayName("Test for RR rotation")
	void testRRRotation_givenAVLTreeIsLeftHeavy_ShouldReturnBalancedTree_byCoverage() {
		int [] leftHeavyData = {5, 4, 3, 2, 1};
		for (int data : leftHeavyData) {
			underTestAVL.insert(data);
		}
		assertEquals("1 2 3 4 5", underTestAVL.inorder(), "Inorder traversal should return '1 2 3 4 5' in sorted order.");
		assertEquals("4 2 1 3 5", underTestAVL.preorder(), "Preorder traversal should return '4 2 1 3 5' in sorted order.");
		assertEquals("1 3 2 5 4", underTestAVL.postorder(), "Postorder traversal should return '1 3 2 5 4' in sorted order.");
	}

	/**
	 * Test: Branches of LL -Coverage Testing
	 * Given: A new created AVL tree
	 * When: insert() is called with data in right heavy tree
	 * Then: It should return a balanced tree
	 */
	@Test
	@DisplayName("Test for LL rotation")
	void testLLRotation_givenAVLTreeIsRightHeavy_ShouldReturnBalancedTree_byCoverage() {
		int [] rightHeavyData = {1, 2, 3, 4, 5};
		for (int data : rightHeavyData) {
			underTestAVL.insert(data);
		}
		assertEquals("1 2 3 4 5", underTestAVL.inorder(), "Inorder traversal should return '1 2 3 4 5' in sorted order.");
		assertEquals("2 1 4 3 5", underTestAVL.preorder(), "Preorder traversal should return '2 1 4 3 5' in sorted order.");
		assertEquals("1 3 5 4 2", underTestAVL.postorder(), "Postorder traversal should return '1 3 5 4 2' in sorted order.");
	}

	/**
	 * Test: Branches of RL -Coverage Testing
	 * Given: A new created AVL tree
	 * When: insert() is called with data in right heavy tree
	 * Then: It should return a balanced tree
	 */
	@Test
	@DisplayName("Test for RL rotation")
	void testRLRotation_givenAVLTreeIsRightHeavy_ShouldReturnBalancedTree_byCoverage() {
		int [] rightHeavyData = {1, 3, 2};
		for (int data : rightHeavyData) {
			underTestAVL.insert(data);
		}
		assertEquals("1 2 3", underTestAVL.inorder(), "Inorder traversal should return '1 2 3' in sorted order.");
		assertEquals("2 1 3", underTestAVL.preorder(), "Preorder traversal should return '2 1 3' in sorted order.");
		assertEquals("1 3 2", underTestAVL.postorder(), "Postorder traversal should return '1 3 2' in sorted order.");
	}

	/**
	 * Test: Branches of LR -Coverage Testing
	 * Given: A new created AVL tree
	 * When: insert() is called with data in left heavy tree
	 * Then: It should return a balanced tree
	 */
	@Test
	@DisplayName("Test for LR rotation")
	void testLRRotation_givenAVLTreeIsLeftHeavy_ShouldReturnBalancedTree_byCoverage() {
		int [] leftHeavyData = {3, 1, 2};
		for (int data : leftHeavyData) {
			underTestAVL.insert(data);
		}
		assertEquals("1 2 3", underTestAVL.inorder(), "Inorder traversal should return '1 2 3' in sorted order.");
		assertEquals("2 1 3", underTestAVL.preorder(), "Preorder traversal should return '2 1 3' in sorted order.");
		assertEquals("1 3 2", underTestAVL.postorder(), "Postorder traversal should return '1 3 2' in sorted order.");
	}

	/**
	 * Nagative Testing
	 * 1. Test for case with invalid data
	 * 2. Test for case with invalid search data
	 */

	/**
	 * Test: Invalid data -Negative Testing
	 * Given: A new created AVL tree
	 * When: insert() is called with invalid data
	 * Then: It should throw an exception
	 */
	@Test
	@DisplayName("Test for invalid data")
	void insert_WhenInvalidData_ShouldThrowException_byNegative() {
		assertThrows(IllegalArgumentException.class, () -> underTestAVL.insert("abc"), "Inserting invalid data should throw an exception.");
	}

	/**
	 * Test: Invalid search data -Negative Testing
	 * Given: A new created AVL tree
	 * When: search() is called with invalid data
	 * Then: It should return false
	 */
	@Test
	@DisplayName("Test for invalid search data")
	void search_WhenInvalidData_ShouldReturnFalse_byNegative() {
		int [] insertData = {3, 1, 2};
		for (int data : insertData) {
			underTestAVL.insert(data);
		}
		assertFalse(underTestAVL.search(4), "Data 4 should not be found in the AVL tree.");
	}

	/**
	 * Performance Testing
	 * 1. Test for case with large data
	 */

	/**
	 * Test: Large data -Performance Testing
	 * Given: A new created AVL tree
	 * When: insert() is called with large data
	 * Then: It should complete within timeout
	 */
	@Test
    @Timeout(value = 5, unit = TimeUnit.SECONDS)
    void insert_PerformanceTest_WithLargeNumberOfNodes_ShouldCompleteWithinTimeout() {
        AvlTree underTest = new AvlTree();
        int n = 100000;
        for (int i = 0; i < n; i++) {
            underTest.insert(i);
        }
        assertEquals(n, underTest.countNodes(), "All nodes should be present after bulk insertion");
    }
}
