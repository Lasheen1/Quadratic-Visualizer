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
  // Setup Desmos
  calculator = Desmos.GraphingCalculator(document.getElementById("calculator"), { expressions: true });

  // Load lessons
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

  // Load first lesson
  loadLesson("basics");
};

function loadLesson(key) {
  const lesson = lessons[key];
  document.getElementById("lesson-title").textContent = lesson.title;
  document.getElementById("lesson-text").textContent = lesson.content;
}

function handleSolve() {
  const a = parseFloat(document.getElementById("a").value);
  const b = parseFloat(document.getElementById("b").value);
  const c = parseFloat(document.getElementById("c").value);
  const output = document.getElementById("solution-output");

  if (isNaN(a) || isNaN(b) || isNaN(c)) {
    output.innerHTML = "Please enter valid numbers.";
    return;
  }

  const disc = b * b - 4 * a * c;
  let steps = `Discriminant: ${disc}<br>`;

  if (disc < 0) {
    steps += "No real roots.";
  } else if (disc === 0) {
    const root = (-b / (2 * a)).toFixed(2);
    steps += `One real root: x = ${root}`;
  } else {
    const root1 = ((-b + Math.sqrt(disc)) / (2 * a)).toFixed(2);
    const root2 = ((-b - Math.sqrt(disc)) / (2 * a)).toFixed(2);
    steps += `Two real roots: x₁ = ${root1}, x₂ = ${root2}`;
  }

  output.innerHTML = steps;
}

function handleCoefficientSolve() {
  const aVal = document.getElementById("coef-a").value;
  const bVal = document.getElementById("coef-b").value;
  const cVal = document.getElementById("coef-c").value;
  const x = parseFloat(document.getElementById("x-point").value);
  const y = parseFloat(document.getElementById("y-point").value);
  const output = document.getElementById("coef-output");

  if (isNaN(x) || isNaN(y)) {
    output.textContent = "Invalid point.";
    return;
  }

  let result;
  if (aVal === "?" && !isNaN(bVal) && !isNaN(cVal)) {
    result = (y - bVal * x - cVal) / (x * x);
  } else if (bVal === "?" && !isNaN(aVal) && !isNaN(cVal)) {
    result = (y - aVal * x * x - cVal) / x;
  } else if (cVal === "?" && !isNaN(aVal) && !isNaN(bVal)) {
    result = y - aVal * x * x - bVal * x;
  } else {
    result = "Invalid or unsupported input.";
  }

  output.textContent = `Solved coefficient: ${result}`;
}
