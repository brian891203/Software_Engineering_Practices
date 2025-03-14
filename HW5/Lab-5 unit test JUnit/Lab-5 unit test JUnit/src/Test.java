import static org.junit.jupiter.api.Assertions.*;

class Test {

	@org.junit.jupiter.api.Test
	void test() {
		AvlTree avlTree = new AvlTree();
		avlTree.insert(10);
		avlTree.insert(4);
		assertEquals("10", avlTree.inorder());
	}

}
