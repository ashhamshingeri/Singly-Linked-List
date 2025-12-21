// script.js
document.addEventListener("DOMContentLoaded", () => {
  // Theme toggle
  const themeToggle = document.getElementById("theme-toggle");
  themeToggle.addEventListener("click", () => {
    document.body.dataset.theme =
      document.body.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", document.body.dataset.theme);
  });

  // Load saved theme
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.dataset.theme = savedTheme;

  // Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 600,
    easing: "ease-out",
    once: false,
    mirror: true,
    offset: 50,
    delay: 0,
  });

  // Modal functionality
  const modal = document.getElementById("topic-modal");
  const exploreBtn = document.getElementById("explore-btn");
  const closeBtn = document.getElementById("close-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalExplanation = document.getElementById("modal-explanation");
  const modalVisualization = document.getElementById("modal-visualization");

  // Show modal when explore button is clicked
  exploreBtn.addEventListener("click", () => {
    modalTitle.textContent = "Interactive Demo";
    modalExplanation.innerHTML = `
            <h3>Welcome to the Interactive Demo</h3>
            <p>Use the controls below to explore how a singly linked list works. Insert nodes, delete them, traverse the list, or reset it to see the operations in action!</p>
        `;
    modalVisualization.style.display = "block";
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  });

  // Close modal
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
    document.body.style.overflow = "auto";
  });

  // Close modal when clicking outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
      document.body.style.overflow = "auto";
    }
  });

  // Close modal on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      modal.classList.remove("show");
      document.body.style.overflow = "auto";
    }
  });

  // Pill explanations data
  const pillExplanations = {
    // Definition
    "Sequence of nodes": {
      heading: "Sequence of Nodes",
      definition:
        "A singly linked list is a linear data structure consisting of a sequence of nodes where each node contains data and a reference (pointer) to the next node in the sequence. Unlike arrays, linked lists do not require contiguous memory allocation and can grow or shrink dynamically during runtime.",
      howItWorks:
        "Each node in the sequence maintains a 'next' pointer that connects it to the subsequent node, forming a chain-like structure. The list begins with a 'head' node and ends with a node whose next pointer is null. Operations traverse this chain by following the next pointers from one node to the next, allowing for efficient sequential access but requiring linear time for random access.",
      example:
        "Like a chain of people holding hands - each person knows who comes next in line.",
      complexity: "O(n) for traversal, where n is the number of nodes",
      syntax: `// Creating a sequence of nodes
const node1 = { data: 10, next: null };
const node2 = { data: 20, next: null };
const node3 = { data: 30, next: null };

// Link them
node1.next = node2;
node2.next = node3;

// Head points to first node
let head = node1;`,
    },
    "Each node contains Data + Next pointer": {
      heading: "Node Structure",
      definition:
        "Each node in a singly linked list is a fundamental building block that encapsulates two essential components: the data payload (which can be any type of information) and a next pointer (reference) that connects to the subsequent node in the sequence. This self-referential structure enables the dynamic linking mechanism.",
      howItWorks:
        "The data field stores the actual information the node represents, which can range from simple primitive values to complex objects. The next pointer acts as a connector, holding either a reference to another node or null to indicate the end of the list. When nodes are created, they're allocated individually in memory and connected through these pointer assignments, allowing for flexible memory management and dynamic sizing.",
      example:
        "A train car carrying passengers (data) and connected to the next car (next pointer).",
      complexity: "Space complexity: O(n) for n nodes",
      syntax: `// Node using class
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

// Node using object
const node = { data: 10, next: null };`,
    },

    // Structure
    "Head node": {
      heading: "Head Node",
      definition:
        "The head node serves as the primary entry point and reference point for the entire singly linked list. It is a special pointer that always points to the first node in the sequence, providing a consistent starting point for all list operations and traversals.",
      howItWorks:
        "All list operations begin by accessing the head reference. When the list is empty, head is null. When nodes are added or removed from the beginning, the head pointer is updated accordingly. The head provides O(1) access to the first element but doesn't directly give access to other elements, which must be reached through traversal.",
      example:
        "The front door of a house - you must enter through it to access all rooms.",
      complexity: "O(1) access time",
      syntax: `// Initialize head
let head = null; // Empty list

// Or with first node
let head = new Node(10);

// Or
let head = { data: 10, next: null };`,
    },
    "Node = Data + Next": {
      heading: "Node Composition",
      definition:
        "A node represents the atomic unit of a singly linked list, composed of exactly two fields: a data field that holds the actual information and a next field that serves as a pointer to establish the sequential relationship with other nodes. This composition enables the list's dynamic and flexible nature.",
      howItWorks:
        "The data field can contain any data type - from primitive values like numbers and strings to complex objects and structures. The next field is a reference that either points to another node in memory or is set to null to indicate the list's termination. This design allows nodes to be created independently and linked together dynamically, supporting the list's ability to grow, shrink, and reorganize efficiently.",
      example:
        "A bead (data) with a string (next pointer) connecting it to the next bead.",
      complexity: "Fixed size per node regardless of data type",
      syntax: `// Node structure
const node = {
  data: "any type", // number, string, object, etc.
  next: null // or reference to another node
};

// Example
const firstNode = { data: 10, next: null };
const secondNode = { data: 20, next: null };
firstNode.next = secondNode; // Link them`,
    },
    "NULL at the end": {
      heading: "Null Termination",
      definition:
        "Null termination is a critical design principle in singly linked lists where the final node's next pointer is explicitly set to null, serving as a sentinel value that marks the absolute end of the list and prevents infinite traversal loops.",
      howItWorks:
        "Every linked list operation must check for null to determine list boundaries. When traversing, the algorithm continues following next pointers until encountering null, which signals completion. This null-checking mechanism ensures safe iteration and provides a clear termination condition for all list operations, preventing access violations and infinite loops.",
      example:
        "The end of a necklace where the string stops - no more beads to follow.",
      complexity: "O(1) to detect end of list",
      syntax: `// Last node always has next = null
const lastNode = { data: 30, next: null };

// When traversing, check for null
function traverse(head) {
  let current = head;
  while (current !== null) { // or !current
    console.log(current.data);
    current = current.next;
  }
}`,
    },

    // Operations
    Insertion: {
      heading: "Insertion Operation",
      definition:
        "Insertion in a singly linked list involves adding a new node at a specified position within the existing sequence. This operation requires careful pointer manipulation to maintain the list's integrity and connectivity between nodes.",
      howItWorks:
        "To insert a node, first create the new node with the desired data. Then update the pointers: the new node's next pointer should point to the node that will follow it, and the previous node's next pointer (or head if inserting at the beginning) should point to the new node. This pointer rearrangement ensures the list remains properly linked and traversable.",
      example:
        "Inserting a new train car between existing cars by reconnecting the couplings.",
      complexity: "O(1) at head, O(n) at arbitrary position",
      syntax: `// Insert at head
function insertAtHead(head, data) {
  const newNode = { data: data, next: head };
  return newNode;
}

// Insert at end
function insertAtEnd(head, data) {
  if (!head) return { data: data, next: null };
  let current = head;
  while (current.next) {
    current = current.next;
  }
  current.next = { data: data, next: null };
  return head;
}`,
    },
    Deletion: {
      heading: "Deletion Operation",
      definition:
        "Deletion removes a specified node from the singly linked list while preserving the connectivity of remaining nodes. This operation requires identifying the target node and updating surrounding pointers to bridge the gap created by removal.",
      howItWorks:
        "To delete a node, locate the node to be removed and its predecessor. Update the predecessor's next pointer to skip over the target node and point directly to the node that follows it. The target node becomes disconnected from the list and can be garbage collected. Special handling is required for deleting the head node, which involves updating the head reference directly.",
      example:
        "Removing a train car by disconnecting it and reconnecting the remaining cars.",
      complexity:
        "O(1) at head (with previous reference), O(n) at arbitrary position",
      syntax: `// Delete head
function deleteHead(head) {
  if (!head) return null;
  return head.next;
}

// Delete by value
function deleteByValue(head, value) {
  if (!head) return null;
  if (head.data === value) return head.next;
  let current = head;
  while (current.next && current.next.data !== value) {
    current = current.next;
  }
  if (current.next) {
    current.next = current.next.next;
  }
  return head;
}`,
    },
    Traversal: {
      heading: "Traversal Operation",
      definition:
        "Traversal is the fundamental operation of systematically visiting each node in the singly linked list exactly once, processing the data contained in each node in sequential order from head to tail.",
      howItWorks:
        "Begin at the head node and follow the next pointers sequentially. At each node, perform the desired operation on the data (such as printing, modifying, or collecting values). Continue until reaching the null-terminated end of the list. This linear progression ensures every node is visited while maintaining the list's logical order.",
      example:
        "Walking through each room in a house by following the hallway from room to room.",
      complexity: "O(n) time complexity",
      syntax: `function traverse(head) {
  let current = head;
  while (current) {
    console.log(current.data);
    current = current.next;
  }
}`,
    },
    Searching: {
      heading: "Search Operation",
      definition:
        "Searching in a singly linked list involves locating a specific data value or node by traversing the list sequentially and comparing each node's data with the target value until a match is found or the end is reached.",
      howItWorks:
        "Start from the head node and examine each node's data field in order. Use comparison operations to check if the current node's data matches the search target. If found, return the node or its position; if not found after reaching null, indicate that the element doesn't exist. This linear search approach is necessary due to the lack of direct indexing in linked structures.",
      example:
        "Looking for a specific book in a bookshelf by checking each book one by one.",
      complexity: "O(n) worst case, O(1) best case",
      syntax: `function search(head, value) {
  let current = head;
  while (current) {
    if (current.data === value) return true;
    current = current.next;
  }
  return false;
}`,
    },

    // Advantages
    "Dynamic size": {
      heading: "Dynamic Size",
      definition:
        "Singly linked lists provide dynamic memory allocation that allows the data structure to grow and shrink organically during runtime without requiring predefined size constraints or expensive resizing operations.",
      howItWorks:
        "Memory is allocated on-demand for each new node as it's added to the list, and deallocated when nodes are removed. This eliminates the need for contiguous memory blocks and allows the list to adapt to changing data requirements efficiently, using only the memory necessary for current elements.",
      example:
        "A flexible rope that can lengthen or shorten as required, unlike a fixed-length chain.",
      complexity: "No size restrictions",
    },
    "Efficient insertion & deletion": {
      heading: "Efficient Modifications",
      definition:
        "Singly linked lists excel at insertion and deletion operations, particularly when performed at known positions, offering significant performance advantages over contiguous array-based structures.",
      howItWorks:
        "Modifications require only pointer updates rather than element shifting. When inserting or deleting at the head (a frequently accessed position), only the head reference needs updating. At other positions, once the target location is found through traversal, the operation completes in constant time through pointer manipulation.",
      example:
        "Adding/removing cars from the beginning of a train is quick and easy.",
      complexity: "O(1) at known positions",
    },
    "Easy to implement": {
      heading: "Simple Implementation",
      definition:
        "Singly linked lists have a straightforward implementation that requires minimal code and understanding of basic programming concepts, making them accessible for developers at various skill levels.",
      howItWorks:
        "The data structure involves only two main components: node creation with data and next pointer, and pointer manipulation for operations. No complex algorithms or data structure management is required, just basic memory allocation and reference handling. This simplicity reduces development time and potential for bugs.",
      example:
        "Building with LEGO blocks - simple connections create complex structures.",
      complexity: "Basic programming knowledge required",
      syntax: `// Simple linked list implementation
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insert(data) {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
  }
}`,
    },
    "No size limit": {
      heading: "Unlimited Size",
      definition:
        "Unlike static arrays that require predetermined size allocation, singly linked lists have no theoretical upper bound on their capacity, constrained only by available system memory.",
      howItWorks:
        "The list can expand indefinitely by allocating new nodes as needed, without requiring contiguous memory blocks or expensive resizing operations. Each node is allocated independently, allowing the list to grow organically and utilize memory efficiently without pre-allocation overhead.",
      example:
        "A garden hose that can extend as long as needed without fixed length.",
      complexity: "Limited only by available memory",
    },
    "Memory efficient for modifications": {
      heading: "Efficient Memory Usage for Changes",
      definition:
        "Singly linked lists optimize memory operations during frequent insertions and deletions, avoiding the costly element shifting required by arrays and providing superior performance for dynamic data sets.",
      howItWorks:
        "When elements are added or removed, only pointer references need updating rather than copying and moving large blocks of memory. This localized modification approach minimizes memory access patterns and reduces the computational overhead associated with maintaining data structure integrity during changes.",
      example:
        "Rearranging train cars by changing couplings instead of rebuilding the train.",
      complexity: "O(1) for pointer updates",
    },

    // Disadvantages
    "No random access": {
      heading: "No Random Access",
      definition:
        "Singly linked lists lack the ability to directly access elements by their positional index, requiring sequential traversal from the beginning for any element access operation.",
      howItWorks:
        "To reach the nth element, the algorithm must start from the head and follow next pointers n-1 times. This sequential access pattern means that accessing elements near the end requires visiting all preceding elements first, making random access operations inherently inefficient.",
      example:
        "Can't jump to page 50 in a book without flipping through pages 1-49 first.",
      complexity: "O(n) access time",
    },
    "Extra memory for pointers": {
      heading: "Memory Overhead",
      definition:
        "Each node in a singly linked list requires additional memory allocation for the next pointer beyond the actual data payload, resulting in increased memory consumption compared to storing elements in contiguous arrays.",
      howItWorks:
        "Every node stores both its data and a pointer reference (typically 8 bytes on 64-bit systems), doubling the memory requirements for navigation. This overhead becomes significant in large lists where the pointer storage can exceed the data storage, affecting cache performance and overall memory efficiency.",
      example:
        "Each passenger car needs not just space for passengers but also coupling mechanisms.",
      complexity: "O(n) extra space for pointers",
    },
    "Cache unfriendly": {
      heading: "Cache Unfriendly",
      definition:
        "Singly linked lists exhibit poor cache locality due to their non-contiguous memory layout, where nodes are scattered throughout memory rather than stored in adjacent locations, leading to frequent cache misses during traversal.",
      howItWorks:
        "Modern computer systems rely on caching to speed up memory access, but linked list nodes are allocated dynamically and may reside in different memory pages. When traversing the list, each pointer dereference can result in a cache miss, significantly slowing down operations compared to contiguous data structures like arrays.",
      example:
        "Books scattered randomly on shelves instead of organized alphabetically.",
      complexity: "Poor spatial locality",
    },
    "Reverse traversal not possible": {
      heading: "No Reverse Traversal",
      definition:
        "Singly linked lists cannot be traversed backwards due to the unidirectional nature of their pointers, limiting navigation to forward-only movement from head to tail.",
      howItWorks:
        "Each node contains only a next pointer pointing to the subsequent node, with no reference to the previous node. This design prevents reverse iteration without additional data structure modifications or external tracking mechanisms, making backward navigation impossible in the basic implementation.",
      example: "A one-way street where you can only go forward, not backward.",
      complexity: "O(n) to reverse or use doubly linked list",
      syntax: `// To reverse, need to rebuild
function reverseList(head) {
  let prev = null;
  let current = head;
  while (current) {
    let next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}`,
    },
    "Linear search time": {
      heading: "Linear Search Time",
      definition:
        "Searching operations in singly linked lists require examining each element sequentially from the beginning, resulting in linear time complexity that becomes increasingly inefficient as the list grows larger.",
      howItWorks:
        "Without direct indexing capabilities, search algorithms must traverse the entire list from head to tail, comparing each node's data with the target value. The search terminates only when the target is found or the list's end is reached, making it unsuitable for large datasets requiring frequent lookups.",
      example:
        "Looking for a name in a phone book by checking each entry one by one.",
      complexity: "O(n) worst case",
    },

    // Applications
    "Music playlists": {
      heading: "Music Playlists",
      definition:
        "Music streaming applications utilize singly linked lists to maintain ordered sequences of songs, enabling dynamic playlist management with efficient insertion and removal of tracks at any position.",
      howItWorks:
        "Each song becomes a node containing track metadata (title, artist, duration) and points to the next song in the playlist sequence. Users can add songs to the beginning, middle, or end of the playlist, and the linked structure allows for seamless playback navigation and playlist modifications without expensive array shifting operations.",
      example: "Spotify playlists where songs are connected in playback order.",
      complexity: "Dynamic playlist management",
    },
    "Browser history": {
      heading: "Browser History",
      definition:
        "Web browsers implement navigation history using singly linked lists to track the sequence of visited web pages, enabling forward and backward navigation through browsing sessions.",
      howItWorks:
        "Each visited URL becomes a node in the history list, with pointers connecting pages in the order they were accessed. The browser maintains a current position pointer that can move forward and backward through the list, allowing users to navigate their browsing history efficiently without losing their place in the sequence.",
      example:
        "Back/Forward buttons in web browsers navigate through linked page history.",
      complexity: "Efficient navigation",
    },
    "Undo/Redo operations": {
      heading: "Undo/Redo Stack",
      definition:
        "Text editors and graphics applications use singly linked lists to implement undo/redo functionality, maintaining a chronological sequence of operations that can be reversed or reapplied.",
      howItWorks:
        "Each user action (typing, deleting, formatting) creates a node containing operation details and state information. These nodes are linked in chronological order, allowing the application to traverse backward through the history for undo operations or forward for redo operations, with each node containing enough information to reverse or reapply its associated action.",
      example:
        "Ctrl+Z in text editors maintains a linked list of reversible actions.",
      complexity: "O(1) undo/redo operations",
    },
    "Hash tables with chaining": {
      heading: "Hash Table Collision Resolution",
      definition:
        "Hash tables employ singly linked lists as collision resolution mechanism, where multiple key-value pairs that hash to the same bucket are stored in a linked list at that location.",
      howItWorks:
        "When a hash function maps different keys to the same bucket index, instead of overwriting, the system creates a linked list at that bucket. Each node in the list contains a key-value pair, with new collisions added to the head or tail of the list. This approach allows multiple entries to coexist at the same hash location while maintaining efficient lookup capabilities.",
      example: "HashMap in Java uses linked lists for collision handling.",
      complexity: "Average O(1) access, worst case O(n)",
      syntax: `// Simple hash table with chaining
class HashTable {
  constructor(size) {
    this.buckets = new Array(size).fill(null);
  }

  hash(key) {
    return key % this.buckets.length;
  }

  insert(key, value) {
    const index = this.hash(key);
    if (!this.buckets[index]) {
      this.buckets[index] = { key, value, next: null };
    } else {
      let current = this.buckets[index];
      while (current.next) {
        current = current.next;
      }
      current.next = { key, value, next: null };
    }
  }
}`,
    },
    "Graph adjacency lists": {
      heading: "Graph Representations",
      definition:
        "Graph data structures use singly linked lists to implement adjacency lists, where each vertex maintains a linked list of vertices it connects to, providing an efficient representation for sparse graphs.",
      howItWorks:
        "Each vertex in the graph has an associated linked list containing references to all vertices it shares an edge with. This representation is memory-efficient for graphs with few edges relative to possible edges, and allows for quick traversal of a vertex's neighbors during graph algorithms like BFS and DFS.",
      example: "Social network graphs where friends are linked to each person.",
      complexity: "Space efficient for sparse graphs",
      syntax: `// Graph with adjacency list
class Graph {
  constructor() {
    this.adjList = {};
  }

  addVertex(vertex) {
    this.adjList[vertex] = null;
  }

  addEdge(v1, v2) {
    // Add v2 to v1's list
    const newNode = { vertex: v2, next: this.adjList[v1] };
    this.adjList[v1] = newNode;

    // For undirected graph, add reverse
    const newNode2 = { vertex: v1, next: this.adjList[v2] };
    this.adjList[v2] = newNode2;
  }
}`,
    },
    "Memory management": {
      heading: "Memory Allocation",
      definition:
        "Operating systems and memory allocators use singly linked lists to track and manage dynamic memory blocks, maintaining lists of free and allocated memory segments for efficient memory management.",
      howItWorks:
        "Free memory blocks are organized into linked lists where each node represents a contiguous block of available memory. When memory is allocated, the system searches these lists for suitable blocks and updates the pointers accordingly. Deallocated memory gets added back to the free lists, allowing for efficient reuse and coalescing of adjacent free blocks.",
      example: "malloc/free in C uses linked lists to manage heap memory.",
      complexity: "Efficient memory allocation/deallocation",
    },
  };

  // Add click handlers to pills
  document.querySelectorAll(".pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      const pillText = pill.textContent.trim();
      const explanation = pillExplanations[pillText];

      if (explanation) {
        modalTitle.textContent = explanation.heading;
        modalExplanation.innerHTML = `
                    <div class="explanation-content">
                        <div class="explanation-section">
                            <h3>📖 Definition</h3>
                            <p>${explanation.definition}</p>
                        </div>
                        <div class="explanation-section">
                            <h3>⚙️ How It Works</h3>
                            <p>${explanation.howItWorks}</p>
                        </div>
                        <div class="explanation-section">
                            <h3>💡 Example</h3>
                            <p>${explanation.example}</p>
                        </div>
                        <div class="explanation-section">
                            <h3>📊 Complexity</h3>
                            <p>${explanation.complexity}</p>
                        </div>
                        ${
                          explanation.syntax
                            ? `
                        <button id="show-syntax-btn" class="syntax-btn">💻 Show Syntax</button>
                        <div id="syntax-section" class="explanation-section" style="display: none;">
                            <h3>💻 Syntax</h3>
                            <pre><code>${explanation.syntax}</code></pre>
                        </div>
                        `
                            : ""
                        }
                    </div>
                `;
        modalVisualization.style.display = "none";
        modal.classList.add("show");
        document.body.style.overflow = "hidden";

        // Syntax toggle
        if (explanation.syntax) {
          const showSyntaxBtn = document.getElementById("show-syntax-btn");
          const syntaxSection = document.getElementById("syntax-section");
          showSyntaxBtn.addEventListener("click", () => {
            if (syntaxSection.style.display === "none") {
              syntaxSection.style.display = "block";
              showSyntaxBtn.textContent = "💻 Hide Syntax";
            } else {
              syntaxSection.style.display = "none";
              showSyntaxBtn.textContent = "💻 Show Syntax";
            }
          });
        }

        // Highlight clicked pill
        document
          .querySelectorAll(".pill")
          .forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");
      }
    });
  });

  // Interactive Linked List Demo
  const linkedList = document.getElementById("linked-list");
  let listData = [10, 20, 30];

  function renderList() {
    linkedList.innerHTML = "";
    listData.forEach((data, index) => {
      const nodeBox = document.createElement("div");
      nodeBox.className = "node-box";
      nodeBox.id = `node-${index}`;
      nodeBox.innerHTML = `Data: ${data}<br>Next: ${
        index < listData.length - 1 ? "→" : "null"
      }`;
      linkedList.appendChild(nodeBox);
    });
  }

  renderList();

  // Operation functions
  function insertNode() {
    const newValue = Math.floor(Math.random() * 100) + 1;
    listData.push(newValue);
    renderList();
    const newNode = linkedList.lastElementChild;
    newNode.classList.add("inserting");
    setTimeout(() => newNode.classList.remove("inserting"), 500);
  }

  function deleteNode() {
    if (listData.length > 0) {
      const lastNode = linkedList.lastElementChild;
      lastNode.classList.add("deleting");
      setTimeout(() => {
        listData.pop();
        renderList();
      }, 500);
    }
  }

  function traverseList() {
    const nodes = linkedList.querySelectorAll(".node-box");
    nodes.forEach((node, index) => {
      setTimeout(() => {
        node.style.background = "var(--highlight-color)";
        setTimeout(() => (node.style.background = "var(--card-bg)"), 300);
      }, index * 500);
    });
  }

  function resetList() {
    listData = [10, 20, 30];
    renderList();
  }

  // Controls
  document.getElementById("insert-btn").addEventListener("click", insertNode);

  document.getElementById("delete-btn").addEventListener("click", deleteNode);

  document
    .getElementById("traverse-btn")
    .addEventListener("click", traverseList);

  document.getElementById("reset-btn").addEventListener("click", resetList);

  // Keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    if (key === "i") {
      insertNode();
    } else if (key === "d") {
      deleteNode();
    } else if (key === "t") {
      traverseList();
    } else if (key === "r") {
      resetList();
    }
  });

  // Animate on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el);
  });

  // Initial animation on load
  setTimeout(() => {
    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      el.classList.add("visible");
    });
  }, 500);

  // Set current year in footer
  const currentYearElement = document.getElementById("current-year");
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  // About Me button navigation
  const aboutBtn = document.getElementById("about-btn");
  if (aboutBtn) {
    aboutBtn.addEventListener("click", () => {
      window.location.href = "about.html";
    });
  }
});
