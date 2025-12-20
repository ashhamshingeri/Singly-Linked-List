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
        "A singly linked list is a sequence of nodes where each node points to the next node in the sequence.",
      howItWorks:
        "Nodes are connected through pointers, forming a linear chain from the first node (head) to the last node.",
      example:
        "Like a chain of people holding hands - each person knows who comes next in line.",
      complexity: "O(n) for traversal, where n is the number of nodes",
    },
    "Each node contains Data + Next pointer": {
      heading: "Node Structure",
      definition:
        "Each node in a singly linked list contains two main components: data and a next pointer.",
      howItWorks:
        "The data field stores the actual information, while the next pointer references the subsequent node in the sequence.",
      example:
        "A train car carrying passengers (data) and connected to the next car (next pointer).",
      complexity: "Space complexity: O(n) for n nodes",
    },

    // Structure
    "Head node": {
      heading: "Head Node",
      definition:
        "The head is a reference to the first node in the singly linked list.",
      howItWorks:
        "All operations start from the head node. It's the entry point to access the entire list.",
      example:
        "The front door of a house - you must enter through it to access all rooms.",
      complexity: "O(1) access time",
    },
    "Node = Data + Next": {
      heading: "Node Composition",
      definition:
        "A node consists of data (payload) and a next pointer (reference to next node).",
      howItWorks:
        "Data can be any type (integers, objects, etc.), next pointer can be null or reference another node.",
      example:
        "A bead (data) with a string (next pointer) connecting it to the next bead.",
      complexity: "Fixed size per node regardless of data type",
    },
    "NULL at the end": {
      heading: "Null Termination",
      definition:
        "The last node's next pointer is set to null, marking the end of the list.",
      howItWorks:
        "Null indicates no more nodes exist, preventing infinite traversal and signaling list termination.",
      example:
        "The end of a necklace where the string stops - no more beads to follow.",
      complexity: "O(1) to detect end of list",
    },

    // Operations
    Insertion: {
      heading: "Insertion Operation",
      definition:
        "Adding a new node to the singly linked list at a specified position.",
      howItWorks:
        "Update pointers: new node's next points to current node at position, previous node's next points to new node.",
      example:
        "Inserting a new train car between existing cars by reconnecting the couplings.",
      complexity: "O(1) at head, O(n) at arbitrary position",
    },
    Deletion: {
      heading: "Deletion Operation",
      definition:
        "Removing a node from the singly linked list at a specified position.",
      howItWorks:
        "Update pointers: previous node's next points to node after deleted node, then free deleted node.",
      example:
        "Removing a train car by disconnecting it and reconnecting the remaining cars.",
      complexity:
        "O(1) at head (with previous reference), O(n) at arbitrary position",
    },
    Traversal: {
      heading: "Traversal Operation",
      definition: "Visiting each node in the singly linked list sequentially.",
      howItWorks:
        "Start from head, follow next pointers until null is reached, processing each node's data.",
      example:
        "Walking through each room in a house by following the hallway from room to room.",
      complexity: "O(n) time complexity",
    },
    Searching: {
      heading: "Search Operation",
      definition:
        "Finding a specific node or data value in the singly linked list.",
      howItWorks:
        "Traverse from head, compare each node's data with target value until found or end reached.",
      example:
        "Looking for a specific book in a bookshelf by checking each book one by one.",
      complexity: "O(n) worst case, O(1) best case",
    },

    // Advantages
    "Dynamic size": {
      heading: "Dynamic Size",
      definition:
        "Singly linked lists can grow and shrink dynamically without predefined size limits.",
      howItWorks:
        "Memory is allocated as needed, no wasted space from unused array slots.",
      example:
        "A flexible rope that can lengthen or shorten as required, unlike a fixed-length chain.",
      complexity: "No size restrictions",
    },
    "Efficient insertion & deletion": {
      heading: "Efficient Modifications",
      definition:
        "Insertions and deletions are efficient when the position is known or at the beginning.",
      howItWorks:
        "Only pointer updates required, no element shifting like in arrays.",
      example:
        "Adding/removing cars from the beginning of a train is quick and easy.",
      complexity: "O(1) at known positions",
    },

    // Disadvantages
    "No random access": {
      heading: "No Random Access",
      definition:
        "Cannot directly access elements by index - must traverse from the beginning.",
      howItWorks:
        "To reach the 100th element, you must visit elements 1 through 99 first.",
      example:
        "Can't jump to page 50 in a book without flipping through pages 1-49 first.",
      complexity: "O(n) access time",
    },
    "Extra memory for pointers": {
      heading: "Memory Overhead",
      definition:
        "Each node requires additional memory for the next pointer beyond the data itself.",
      howItWorks:
        "For each data element, an extra pointer (typically 8 bytes) is needed for navigation.",
      example:
        "Each passenger car needs not just space for passengers but also coupling mechanisms.",
      complexity: "O(n) extra space for pointers",
    },

    // Applications
    "Music playlists": {
      heading: "Music Playlists",
      definition: "Songs are linked in the order they should be played.",
      howItWorks:
        "Each song node contains track info and points to the next song in the playlist.",
      example: "Spotify playlists where songs are connected in playback order.",
      complexity: "Dynamic playlist management",
    },
    "Browser history": {
      heading: "Browser History",
      definition: "Visited web pages are stored as a linked list of URLs.",
      howItWorks:
        "Each history entry links to the previous and next pages visited.",
      example:
        "Back/Forward buttons in web browsers navigate through linked page history.",
      complexity: "Efficient navigation",
    },
    "Undo/Redo operations": {
      heading: "Undo/Redo Stack",
      definition:
        "Operations are stored as a linked list for undo/redo functionality.",
      howItWorks:
        "Each operation node contains action details and links to previous/next operations.",
      example:
        "Ctrl+Z in text editors maintains a linked list of reversible actions.",
      complexity: "O(1) undo/redo operations",
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
                    </div>
                `;
        modalVisualization.style.display = "none";
        modal.classList.add("show");
        document.body.style.overflow = "hidden";

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

  // Controls
  document.getElementById("insert-btn").addEventListener("click", () => {
    const newValue = Math.floor(Math.random() * 100) + 1;
    listData.push(newValue);
    renderList();
    const newNode = linkedList.lastElementChild;
    newNode.classList.add("inserting");
    setTimeout(() => newNode.classList.remove("inserting"), 500);
  });

  document.getElementById("delete-btn").addEventListener("click", () => {
    if (listData.length > 0) {
      const lastNode = linkedList.lastElementChild;
      lastNode.classList.add("deleting");
      setTimeout(() => {
        listData.pop();
        renderList();
      }, 500);
    }
  });

  document.getElementById("traverse-btn").addEventListener("click", () => {
    const nodes = linkedList.querySelectorAll(".node-box");
    nodes.forEach((node, index) => {
      setTimeout(() => {
        node.style.background = "var(--highlight-color)";
        setTimeout(() => (node.style.background = "var(--card-bg)"), 300);
      }, index * 500);
    });
  });

  document.getElementById("reset-btn").addEventListener("click", () => {
    listData = [10, 20, 30];
    renderList();
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

