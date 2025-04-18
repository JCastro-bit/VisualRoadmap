# Plan Visual: De Desarrollador Java a Senior Spring Boot C1

![Estado del Proyecto](https://img.shields.io/badge/Estado-Activo-green)
![Licencia](https://img.shields.io/badge/Licencia-MIT-blue)
![Versión](https://img.shields.io/badge/Versión-1.0.0-orange)

Una aplicación web interactiva que visualiza un plan de 6 meses para convertirse en un Senior Spring Boot Developer con nivel C1 de inglés. Incluye planificación diaria, ruta de aprendizaje técnico, ruta de aprendizaje de inglés, herramientas anti-procrastinación y un temporizador Pomodoro funcional.

![Vista previa del proyecto](https://via.placeholder.com/800x400?text=Vista+Previa+del+Proyecto)

## 🚀 Características Principales

- **📅 Agenda visual semanal** con horarios en formato 12h (AM/PM)
- **💻 Ruta de aprendizaje técnico** estructurada por meses
- **🌎 Ruta de aprendizaje de inglés** de B1 a C1
- **🧰 Estrategias anti-procrastinación** con herramientas prácticas
- **⏱️ Temporizador Pomodoro interactivo**
- **🔄 Plan de integración** de ambos caminos de aprendizaje
- **📱 Diseño responsivo** para todos los dispositivos

## 📋 Requisitos Previos

- [Node.js](https://nodejs.org/) (v14.0.0 o superior)
- [npm](https://www.npmjs.com/) (v6.0.0 o superior)

## 🛠️ Instalación y Configuración

### Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/plan-visual.git
cd plan-visual
```

### Instalar dependencias

```bash
npm install
```

### Ejecutar en modo desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173/`

### Compilar para producción

```bash
npm run build
```

Los archivos compilados se guardarán en la carpeta `dist/`

## 🚢 Despliegue en Netlify

### Método 1: Despliegue desde la interfaz de Netlify

1. Crea una cuenta en [Netlify](https://www.netlify.com/) si aún no tienes una
2. Haz clic en "New site from Git"
3. Selecciona GitHub y autoriza a Netlify
4. Selecciona tu repositorio
5. Configura los siguientes ajustes:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Haz clic en "Deploy site"

### Método 2: Despliegue con Netlify CLI

1. Instala Netlify CLI

```bash
npm install netlify-cli -g
```

2. Inicia sesión en Netlify

```bash
netlify login
```

3. Vincula tu proyecto

```bash
netlify init
```

4. Despliega tu sitio

```bash
netlify deploy --prod
```

## 📁 Estructura del Proyecto

```
plan-visual/
├── public/             # Archivos públicos
├── src/                # Código fuente
│   ├── components/     # Componentes React
│   │   └── VisualRoadmap.jsx  # Componente principal
│   ├── App.jsx         # Componente raíz
│   ├── main.jsx        # Punto de entrada
│   └── App.css         # Estilos globales
├── index.html          # Archivo HTML principal
├── vite.config.js      # Configuración de Vite
├── package.json        # Dependencias y scripts
└── README.md           # Este archivo
```

## 🧩 Componentes Principales

### VisualRoadmap

Este componente contiene toda la lógica y visualización del plan de 6 meses. Incluye:

- **ScheduleComponent**: Visualización de la agenda semanal
- **TechRoadmapComponent**: Ruta de aprendizaje técnico
- **EnglishRoadmapComponent**: Ruta de aprendizaje de inglés
- **ToolboxComponent**: Herramientas anti-procrastinación
- **IntegrationComponent**: Integración de los dos caminos
- **PomodoroComponent**: Temporizador Pomodoro interactivo

## 💻 Tecnologías Utilizadas

- [React](https://reactjs.org/) - Biblioteca JS para construir interfaces
- [Vite](https://vitejs.dev/) - Herramienta de construcción frontend
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Netlify](https://www.netlify.com/) - Plataforma de hosting

## 📱 Uso del Temporizador Pomodoro

1. Navega a la pestaña "⏱️ Pomodoro"
2. Haz clic en "Iniciar" para comenzar un ciclo de trabajo (25 minutos)
3. Cuando termine el tiempo, sonará una alarma
4. Toma un descanso de 5 minutos (o 15 minutos tras 4 ciclos)
5. Repite el proceso

## 🎨 Personalización

Puedes personalizar varios aspectos del plan visual:

### Modificar la agenda

Edita los arrays `homeSchedule`, `officeSchedule` y `weekendSchedule` en el componente `ScheduleComponent` para ajustar los horarios y actividades.

### Cambiar rutas de aprendizaje

Modifica los arrays `techContent` y `englishContent` en el objeto `roadmapData` para actualizar las rutas de aprendizaje.

### Ajustar el temporizador Pomodoro

Cambia los valores de tiempo en el componente `PomodoroComponent` para personalizar la duración de los períodos de trabajo y descanso.

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios importantes, por favor abre primero un issue para discutir lo que te gustaría cambiar.

1. Haz un fork del proyecto
2. Crea una rama para tu característica (`git checkout -b feature/amazing-feature`)
3. Haz commit de tus cambios (`git commit -m 'Add some amazing feature'`)
4. Haz push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - consulta el archivo LICENSE para más detalles.

## 🙏 Agradecimientos

- [Tailwind CSS](https://tailwindcss.com/) por el framework CSS
- [React](https://reactjs.org/) por la biblioteca de interfaz
- [Vite](https://vitejs.dev/) por la herramienta de construcción
- [Netlify](https://www.netlify.com/) por el hosting

---

Desarrollado con ❤️ por [Tu Nombre]

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
