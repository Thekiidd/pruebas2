# Plan de entrega del proyecto (handoff)

## 1) Entrega técnica mínima
Comparte estos cuatro elementos:

- Carpeta del proyecto (`README.md`, `index.html`, `app.js`, `style.css`)
- URL del repositorio GitHub (`pruebas2`)
- URL de GitHub Pages (si ya está publicado)
- Estado actual (qué sí hace y qué no hace)

## 2) Mensaje de contexto (copiar/pegar)

```text
Este proyecto es un MVP web 100% cliente (sin backend) para demo en clase.
Funciona con OCR de imagen (Tesseract.js), resolución básica lineal/cuadrática y graficación (function-plot).
Se ejecuta local con python3 -m http.server 8000 y se puede publicar en GitHub Pages sin build.
```

## 3) Checklist de traspaso
Validar en este orden:

- [ ] Clona el repo
- [ ] Corre localmente (`python3 -m http.server 8000`)
- [ ] Prueba OCR con una imagen simple
- [ ] Prueba resolver `x^2-5*x+6=0`
- [ ] Prueba graficar `sin(x)` y `x^2`
- [ ] Revisa README de despliegue en Pages
- [ ] Confirma acceso al repo (permisos)

## 4) Pendientes que deben quedar claros

- OCR no es perfecto en notación compleja
- El resolver actual es básico (lineal/cuadrático)
- No hay backend ni historial persistente
- Proyecto pensado para demo, no producción

## 5) Próximas tareas recomendadas

### Prioridad alta

1. Mejorar parser matemático
2. Agregar validación antes de resolver
3. Mostrar pasos de solución más claros

### Prioridad media

4. Soporte para sistemas de ecuaciones
5. Mejor OCR (fallback/híbrido)
6. Historial local en navegador

## 6) Plan de trabajo para otra persona (2 días)

### Día 1

- Montar entorno, probar flujos, corregir bugs de OCR/parsing.

### Día 2

- Mejorar UX, ajustar mensajes de error, preparar demo final.
