import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;


public class TestAVL {
	AvlTree underTestAVL = new AvlTree();

    @Test
	@DisplayName("Tested test")
	void test() {
		underTestAVL.insert(10);
		underTestAVL.insert(4);
		assertEquals("4 10", underTestAVL.inorder(), "Inorder traversal should return '4 10' in sorted order.");
	}

	// Partition Testing
	@Test
	@DisplayName("Test for isEmpty()")
	void isEmpty_WhenNewlyCreated_ShouldReturnTrue() {
		assertTrue(underTestAVL.isEmpty(), "Newly created AVL tree should be empty.");
	}

	@Test
	@DisplayName("Test for sequential ascending insert")
	void insert_WhenSequentialAscending_ShouldReturnBalancedTree() {
		underTestAVL.insert(1);
		underTestAVL.insert(2);
		underTestAVL.insert(3);
		underTestAVL.insert(4);
		underTestAVL.insert(5);
		underTestAVL.insert(6);
		underTestAVL.insert(7);
		underTestAVL.insert(8);
		underTestAVL.insert(9);
		underTestAVL.insert(10);
		assertEquals("1 2 3 4 5 6 7 8 9 10", underTestAVL.inorder(), "Inorder traversal should return '1 2 3 4 5 6 7 8 9 10' in sorted order.");
		assertEquals("4 2 1 3 8 6 5 7 9 10", underTestAVL.preorder(), "Preorder traversal should return '4 2 1 3 8 6 5 7 9 10' in sorted order.");
		assertEquals("1 3 2 5 7 6 10 9 8 4", underTestAVL.postorder(), "Postorder traversal should return '1 3 2 5 7 6 10 9 8 4' in sorted order.");
	}
	
}
