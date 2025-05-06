const lessons = {
  basics: { title: "Quadratic Basics", content: "y = ax² + bx + c..." },
  standardForm: { title: "Standard Form", content: "Standard form is y = ax² + bx + c." },
  Factorization: { title: "Factorization", content: "Factor by grouping or using the ac method." },
  rootsForm: { title: "Roots Form", content: "y = a(x - r₁)(x - r₂)" },
  vertexForm: { title: "Vertex Form", content: "y = a(x - h)² + k" },
  quadraticFormula: { title: "Quadratic Formula", content: "x = (-b ± √(b² - 4ac)) / 2a" },
  discriminant: { title: "Discriminant", content: "b² - 4ac tells you the nature of the roots." },
  disguisedQuadratic: { title: "Disguised Quadratics", content: "e.g., x⁴ + 5x² + 4 = 0 becomes u² + 5u + 4 = 0" }
};

let calculator;

window.onload = () => {
  // Setup Desmos (Make sure to add your API key here)
  const script = document.createElement('script');
  script.src = 'https://www.desmos.com/api/v1.6/calculator.js?apiKey=YOUR_API_KEY';
  document.head.appendChild(script);

  // Load lessons when Desmos is ready
  script.onload = () => {
    // Initialize the Desmos graphing calculator
    calculator = Desmos.GraphingCalculator(document.getElementById("calculator"), { expressions: true });
  };

  // Load lessons list
  const lessonList = document.getElementById("lesson-list");
  Object.entries(lessons).forEach(([key, value], index) => {
    const btn = document.createElement("button");
    btn.textContent = value.title;
    if (index === 0) btn.classList.add("active");
    btn.onclick = () => {
      document.querySelectorAll(".sidebar button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      loadLesson(key);
    };
    const li = document.createElement("li");
    li.appendChild(btn);
    lessonList.appendChild(li);
  });

  // Load the first lesson by default
  loadLesson("basics");
};

function loadLesson(key) {
  const lesson = lessons[key];
  document.getElementById("lesson-title").textContent = lesson.title;
  document
