const imageInput = document.getElementById('imageInput');
const ocrBtn = document.getElementById('ocrBtn');
const ocrStatus = document.getElementById('ocrStatus');
const ocrOutput = document.getElementById('ocrOutput');

const equationInput = document.getElementById('equationInput');
const solveBtn = document.getElementById('solveBtn');
const solveOutput = document.getElementById('solveOutput');

const plotInput = document.getElementById('plotInput');
const plotBtn = document.getElementById('plotBtn');
const plotError = document.getElementById('plotError');

const x0Input = document.getElementById('x0Input');
const aInput = document.getElementById('aInput');
const bInput = document.getElementById('bInput');
const calcBtn = document.getElementById('calcBtn');
const calcOutput = document.getElementById('calcOutput');

function normalizeExpression(raw) {
  return raw
    .replace(/\s+/g, '')
    .replace(/(\d)(x)/g, '$1*$2')
    .replace(/(\))(x|\d)/g, '$1*$2')
    .replace(/(x)(\d)/g, '$1*$2');
}

function evaluateExpression(expression, xValue) {
  const safeExpr = normalizeExpression(expression).replace(/\^/g, '**');
  const evaluator = new Function('x', `return ${safeExpr};`);
  return evaluator(xValue);
}

ocrBtn.addEventListener('click', async () => {
  const file = imageInput.files?.[0];
  if (!file) {
    ocrStatus.textContent = 'Selecciona una imagen primero.';
    return;
  }

  ocrStatus.textContent = 'Procesando OCR...';
  const result = await Tesseract.recognize(file, 'eng', {
    logger: (m) => {
      if (m.status === 'recognizing text') {
        ocrStatus.textContent = `OCR: ${(m.progress * 100).toFixed(0)}%`;
      }
    },
  });

  const text = result.data.text.trim();
  ocrOutput.value = text;

  if (text) {
    const firstLine = text.split('\n')[0].trim();
    plotInput.value = firstLine;
    equationInput.value = firstLine.includes('=') ? firstLine : equationInput.value;
  }

  ocrStatus.textContent = 'OCR completado.';
});

function parsePolynomialSide(raw) {
  const compact = normalizeExpression(raw).replace(/\*/g, '');
  const normalized = compact.replace(/-/g, '+-');
  const terms = normalized.split('+').filter(Boolean);

  let a = 0;
  let b = 0;
  let c = 0;

  for (const term of terms) {
    if (term.includes('x^2')) {
      const coeff = term.replace('x^2', '');
      const value = coeff === '' || coeff === '+' ? 1 : coeff === '-' ? -1 : Number(coeff);
      if (Number.isNaN(value)) {
        return null;
      }
      a += value;
      continue;
    }

    if (term.includes('x')) {
      const coeff = term.replace('x', '');
      const value = coeff === '' || coeff === '+' ? 1 : coeff === '-' ? -1 : Number(coeff);
      if (Number.isNaN(value)) {
        return null;
      }
      b += value;
      continue;
    }

    const value = Number(term);
    if (Number.isNaN(value)) {
      return null;
    }
    c += value;
  }

  return { a, b, c };
}

solveBtn.addEventListener('click', () => {
  const equation = equationInput.value.trim();
  if (!equation || !equation.includes('=')) {
    solveOutput.textContent = 'Formato inválido. Usa algo como: x^2-5*x+6=0';
    return;
  }

  const [left, right] = equation.split('=');
  const leftTerms = parsePolynomialSide(left);
  const rightTerms = parsePolynomialSide(right);

  if (!leftTerms || !rightTerms) {
    solveOutput.textContent = 'No pude interpretar esa ecuación (solo lineal/cuadrática).';
    return;
  }

  const a = leftTerms.a - rightTerms.a;
  const b = leftTerms.b - rightTerms.b;
  const c = leftTerms.c - rightTerms.c;

  if (a === 0 && b === 0) {
    solveOutput.textContent = c === 0 ? 'Infinitas soluciones.' : 'Sin solución.';
    return;
  }

  if (a === 0) {
    const x = -c / b;
    solveOutput.textContent = `Ecuación lineal\nCoeficientes: a=0, b=${b}, c=${c}\nSolución: x=${x}`;
    return;
  }

  const d = b * b - 4 * a * c;
  if (d < 0) {
    solveOutput.textContent = `Ecuación cuadrática\nCoeficientes: a=${a}, b=${b}, c=${c}\nDiscriminante: ${d}\nSin raíces reales.`;
    return;
  }

  const sqrtD = Math.sqrt(d);
  const x1 = (-b + sqrtD) / (2 * a);
  const x2 = (-b - sqrtD) / (2 * a);
  solveOutput.textContent = `Ecuación cuadrática\nCoeficientes: a=${a}, b=${b}, c=${c}\nDiscriminante: ${d}\nRaíces: x1=${x1}, x2=${x2}`;
});

plotBtn.addEventListener('click', () => {
  const expr = plotInput.value.trim();
  plotError.textContent = '';

  if (!expr) {
    plotError.textContent = 'Escribe una función para graficar.';
    return;
  }

  try {
    const normalizedExpr = normalizeExpression(expr);
    functionPlot({
      target: '#plot',
      width: 860,
      height: 380,
      grid: true,
      data: [{ fn: normalizedExpr }],
    });
  } catch (error) {
    plotError.textContent = `No se pudo graficar: ${error.message}`;
  }
});

function derivativeAt(expression, x0) {
  const h = 1e-5;
  return (evaluateExpression(expression, x0 + h) - evaluateExpression(expression, x0 - h)) / (2 * h);
}

function simpsonIntegral(expression, a, b, n = 500) {
  if (n % 2 !== 0) {
    n += 1;
  }

  const h = (b - a) / n;
  let sum = evaluateExpression(expression, a) + evaluateExpression(expression, b);

  for (let i = 1; i < n; i += 1) {
    const x = a + i * h;
    const factor = i % 2 === 0 ? 2 : 4;
    sum += factor * evaluateExpression(expression, x);
  }

  return (h / 3) * sum;
}

calcBtn.addEventListener('click', () => {
  const expr = plotInput.value.trim();
  const x0 = Number(x0Input.value);
  const a = Number(aInput.value);
  const b = Number(bInput.value);

  if (!expr) {
    calcOutput.textContent = 'Primero escribe una función en el bloque de gráfica.';
    return;
  }

  if ([x0, a, b].some((v) => Number.isNaN(v))) {
    calcOutput.textContent = 'x0, a y b deben ser valores numéricos válidos.';
    return;
  }

  try {
    const fx0 = evaluateExpression(expr, x0);
    const dfx0 = derivativeAt(expr, x0);
    const integral = simpsonIntegral(expr, a, b);

    calcOutput.textContent = [
      `Función: f(x) = ${expr}`,
      `f(${x0}) = ${fx0}`,
      `f'(${x0}) ≈ ${dfx0}`,
      `∫[${a}, ${b}] f(x) dx ≈ ${integral}`,
    ].join('\n');
  } catch (error) {
    calcOutput.textContent = `No se pudo calcular: ${error.message}`;
  }
});
