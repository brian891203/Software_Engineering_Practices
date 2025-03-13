#!/bin/bash
# run.sh:

while true; do
    echo "Select execution order to test (or 'q' to quit):"
    echo "1) Order: p1 -> p2 -> p3"
    echo "2) Order: p3 -> p2 -> p1"
    echo "3) Order: p1 -> p3 -> p2"
    echo "4) Order: p2 -> p1 -> p3"
    echo "5) Order: p2 -> p3 -> p1"
    echo "6) Order: p3 -> p1 -> p2"
    read -p "Enter choice (1-6 or q to quit): " choice

    if [ "$choice" = "q" ] || [ "$choice" = "Q" ]; then
        echo "Exiting test loop."
        break
    fi

    case "$choice" in
        1)
            echo "Running order1 (p1 -> p2 -> p3)..."
            make order1
            ;;
        2)
            echo "Running order2 (p3 -> p2 -> p1)..."
            make order2
            ;;
        3)
            echo "Running order3 (p1 -> p3 -> p2)..."
            make order3
            ;;
        4)
            echo "Running order4 (p2 -> p1 -> p3)..."
            make order4
            ;;
        5)
            echo "Running order5 (p2 -> p3 -> p1)..."
            make order5
            ;;
        6)
            echo "Running order6 (p3 -> p1 -> p2)..."
            make order6
            ;;
        *)
            echo "Invalid choice. Running default test (p1 -> p2 -> p3)."
            make test
            ;;
    esac

    echo "Test completed."
    echo ""
done
