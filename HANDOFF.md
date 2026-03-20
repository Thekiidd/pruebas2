# Plan de entrega del proyecto (handoff)

## 1) Entrega técnica mínima
Compartir estos elementos:

- Código fuente (`README.md`, `index.html`, `app.js`, `style.css`)
- URL del repositorio GitHub (`pruebas2`)
- URL de GitHub Pages (si está desplegado)
- Estado actual y limitaciones conocidas

## 2) Resumen funcional actual

Proyecto MVP web para uso en clase, ejecutado completamente en cliente:

- OCR de imagen con Tesseract.js.
- Resolución básica de ecuaciones lineales/cuadráticas.
- Graficación de funciones (incluyendo polinomios tipo cálculo).
- Cálculo numérico: `f(x0)`, `f'(x0)` e `∫[a,b] f(x) dx`.

## 3) Checklist de validación de traspaso

- [ ] Clonar repositorio
- [ ] Ejecutar local (`python3 -m http.server 8000`)
- [ ] Probar OCR con `x^4 + 3x^3 - 2`
- [ ] Probar gráfica de `x^4 + 3x^3 - 2`
- [ ] Probar cálculo con `x0=1`, `a=0`, `b=2`
- [ ] Probar solver `x^2-5*x+6=0`
- [ ] Verificar permisos de acceso al repo

## 4) Pendientes y límites a comunicar

- OCR no garantiza precisión total en notación compleja.
- Solver algebraico se limita a lineal/cuadrático.
- El módulo de cálculo usa aproximación numérica (no CAS simbólico).
- No hay backend ni persistencia de historial.

## 5) Próximas mejoras recomendadas

### Prioridad alta

1. Parser matemático más robusto (funciones compuestas y mejor validación).
2. Validaciones previas y mensajes de error más guiados.
3. Vista de pasos de solución más detallada.

### Prioridad media

4. Soporte para sistemas de ecuaciones.
5. OCR híbrido/fallback para entradas difíciles.
6. Historial local y exportación de resultados.

## 6) Plan sugerido (2 días)

### Día 1

- Validar flujos OCR/grafica/cálculo y corregir casos límite de parsing.

### Día 2

- Mejorar UX, pulir textos de error y preparar guion de demo.
