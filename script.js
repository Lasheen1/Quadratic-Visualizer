window.addEventListener("DOMContentLoaded", () => {
  const lessons = {
    basics: {
      title: "Quadratic Basics",
      content: "Quadratics are second-degree polynomial equations in the form ax² + bx + c = 0."
    },
    standardForm: {
      title: "Standard Form",
      content: "Standard form is f(x) = ax² + bx + c. It's how quadratics usually appear."
    },
    factorization: {
      title: "Factorization",
      content: "Find two numbers that multiply to ac and add to b, then split the middle term."
    },
    rootsForm: {
      title: "Roots Form",
      content: "Also called factored form: f(x) = a(x - r₁)(x - r₂)"
    },
    vertexForm: {
      title: "Vertex Form",
      content: "Vertex form is f(x) = a(x - h)² + k. Great for identifying the vertex."
    },
    quadraticFormula: {
      title: "Quadratic Formula",
      content: "Use x = [-b ± √(b² - 4ac)] / 2a when factorization fails."
    },
    discriminant: {
      title: "Discriminant",
      content: "It's b² - 4ac. Tells you how many real roots you have."
    },
    disguisedQuadratic: {
      title: "Disguised Quadratics",
      content: "Equations like x⁴ + 3x² + 2 = 0 can be solved like normal quadratics by substitution."
    }
  };

  const lessonList = document.getElementById("lesson-list");
  const lessonTitle = document.getElementById("lesson-title");
  const lessonContent = document.getElementById("lesson-content");

  for (let key in lessons) {
    const btn = document.createElement("button");
    btn.textContent = lessons[key].title;
    btn.className = "lesson-btn";
    btn.addEventListener("click", () => {
      lessonTitle.textContent = lessons[key].title;
      lessonContent.textContent = lessons[key].content;
    });
    lessonList.appendChild(btn);
  }

  // Desmos Graph
  const elt = document.getElementById("calculator");
  if (elt && window.Desmos) {
    Desmos.GraphingCalculator(elt, {
      expressions: true,
      keypad: true
    });
  }

  // Quadratic Solver
  document.getElementById("solve-btn").addEventListener("click", () => {
    const a = parseFloat(document.getElementById("solver-a").value);
    const b = parseFloat(document.getElementById("solver-b").value);
    const c = parseFloat(document.getElementById("solver-c").value);
    const output = document.getElementById("solver-output");

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
      output.innerHTML = "Please enter valid numbers.";
      return;
    }

    const disc = b * b - 4 * a * c;
    let result = `Discriminant: ${disc}<br>`;

    if (disc < 0) {
      result += "No real roots.";
    } else if (disc === 0) {
      const root = (-b / (2 * a)).toFixed(2);
      result += `One real root: x = ${root}`;
    } else {
      const root1 = ((-b + Math.sqrt(disc)) / (2 * a)).toFixed(2);
      const root2 = ((-b - Math.sqrt(disc)) / (2 * a)).toFixed(2);
      result += `Two real roots: x₁ = ${root1}, x₂ = ${root2}`;
    }

    output.innerHTML = result;
  });

  // Coefficient Finder
  document.getElementById("find-coeff-btn").addEventListener("click", () => {
    const r1 = parseFloat(document.getElementById("root-1").value);
    const r2 = parseFloat(document.getElementById("root-2").value);
    const a = parseFloat(document.getElementById("root-a").value);
    const output = document.getElementById("coeff-output");

    if (isNaN(r1) || isNaN(r2) || isNaN(a)) {
      output.innerHTML = "Enter valid numbers for both roots and a.";
      return;
    }

    const b = -a * (r1 + r2);
    const c = a * r1 * r2;
    output.innerHTML = `Standard form: f(x) = ${a}x² + ${b}x + ${c}`;
  });
});
