# pruebas2

Aplicación web (100% cliente, sin backend) para demo académica de OCR matemático, álgebra básica y cálculo numérico.

## Funcionalidades

- OCR de imagen con **Tesseract.js** para extraer expresiones matemáticas.
- Resolución de ecuaciones **lineales/cuadráticas** (casos básicos).
- Graficación de funciones con **function-plot**.
- Módulo de cálculo numérico para:
  - evaluación puntual `f(x0)`
  - derivada aproximada `f'(x0)` (diferencia central)
  - integral definida `∫[a,b] f(x)dx` (regla de Simpson)

## Ejecutar localmente

```bash
python3 -m http.server 8000
```

Abrir en navegador:

- http://localhost:8000

## Casos de prueba sugeridos

1. OCR: imagen con `x^4 + 3x^3 - 2`.
2. Graficar: `x^4 + 3x^3 - 2`.
3. Cálculo numérico:
   - `x0 = 1`
   - `a = 0`, `b = 2`
4. Solver: `x^2 - 5*x + 6 = 0`.

## Limitaciones actuales

- OCR puede fallar en notación compleja o imágenes de baja calidad.
- El solver algebraico no cubre ecuaciones de grado mayor ni sistemas.
- Derivada e integral son aproximaciones numéricas (no simbólicas).

## Publicar en GitHub Pages

1. Push a `main`.
2. En GitHub: **Settings → Pages**.
3. Source: `Deploy from a branch`.
4. Branch: `main` y carpeta `/root`.
