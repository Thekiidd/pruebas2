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

  ocrOutput.value = result.data.text.trim();
  ocrStatus.textContent = 'OCR completado.';
});

function parsePolynomialSide(raw) {
  const compact = raw.replace(/\s+/g, '').replace(/\*/g, '');
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
    solveOutput.textContent = 'No pude interpretar esa ecuación.';
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
    functionPlot({
      target: '#plot',
      width: 800,
      height: 360,
      grid: true,
      data: [{ fn: expr }],
    });
  } catch (error) {
    plotError.textContent = `No se pudo graficar: ${error.message}`;
  }
});
