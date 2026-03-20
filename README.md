# pruebas2

MVP web 100% cliente (sin backend) para demo en clase.

## Funcionalidades

- OCR de imagen con **Tesseract.js**.
- Resolución básica de ecuaciones lineales y cuadráticas.
- Graficación de funciones con **function-plot**.

## Ejecutar localmente

```bash
python3 -m http.server 8000
```

Luego abre:

- http://localhost:8000

## Pruebas rápidas sugeridas

1. OCR: subir una imagen con texto matemático simple.
2. Resolver: `x^2-5*x+6=0`.
3. Graficar: `sin(x)` y `x^2`.

## Limitaciones actuales

- OCR no es perfecto para notación compleja.
- Solver solo cubre casos lineales/cuadráticos básicos.
- No hay backend ni historial persistente.

## Publicar en GitHub Pages

Como es estático, se puede publicar sin build:

1. Push a `main`.
2. En GitHub: **Settings → Pages**.
3. Source: `Deploy from a branch`.
4. Branch: `main` / folder `/root`.
