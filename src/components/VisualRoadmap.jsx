import React, { useState, useEffect } from 'react';

const VisualRoadmap = () => {
  const [activeTab, setActiveTab] = useState('schedule');
  const [timerActive, setTimerActive] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isWorkSession, setIsWorkSession] = useState(true);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  
  // Emoji icons para cada tipo de actividad
  const activityIcons = {
    work: '💻',
    techLearning: '💡',
    english: '📚',
    freelance: '💼',
    family: '👨‍👩‍👧',
    exercise: '🏋️',
    food: '🍽️',
    projects: '🎨',
    rest: '🛋️'
  };
  
  // Datos para la visualización
  const roadmapData = {
    // Meses para ambas rutas
    months: ['Mes 1', 'Mes 2', 'Mes 3', 'Mes 4', 'Mes 5', 'Mes 6'],
    
    // Niveles de inglés
    englishLevels: ['B1', 'B1+', 'B2-', 'B2', 'B2+', 'C1'],
    
    // Contenido principal para cada mes
    englishContent: [
      { 
        title: 'Fortaleciendo Bases',
        phase: 'Gramática intermedia',
        activities: ['Gramática: 30 min/día', 'Vocabulario: 100 palabras/semana', 'Podcasts técnicos: 20 min/día'],
        resources: ['Duolingo', 'Anki', 'BBC Learning']
      },
      { 
        title: 'Vocabulario Técnico',
        phase: 'Comprensión auditiva',
        activities: ['Leer documentación técnica', 'Ver videos con subtítulos', 'Crear flashcards técnicas'],
        resources: ['Stack Overflow', 'Syntax.fm', 'CodeNewbie']
      },
      { 
        title: 'Expansión B2',
        phase: 'Estructuras complejas',
        activities: ['Conversación con nativos', 'Documentación técnica', 'Tutoriales sin subtítulos'],
        resources: ['iTalki', 'Cambly', 'Discord']
      },
      { 
        title: 'Comunicación Profesional',
        phase: 'Fluidez conversacional',
        activities: ['Escribir emails', 'Documentar código', 'Explicar conceptos'],
        resources: ['Grammarly', 'GitHub', 'DEV Community']
      },
      { 
        title: 'Perfeccionamiento',
        phase: 'Matices avanzados',
        activities: ['Simulacros de entrevistas', 'Conferencias técnicas', 'Documentación compleja'],
        resources: ['Pramp.com', 'LeetCode', 'InfoQ']
      },
      { 
        title: 'Nivel C1',
        phase: 'Entrevistas técnicas',
        activities: ['Mock interviews', 'Preparación certificaciones', 'Debates técnicos'],
        resources: ['Cambridge CAE', 'TOEFL Practice', 'Meetup']
      }
    ],
    
    techContent: [
      { 
        title: 'Bases de Java',
        phase: 'Actualización Java 8-11',
        activities: ['Java SE OOP', 'Programación Funcional', 'Refactorización OOP'],
        tools: ['Platzi', 'Java Brains', 'Baeldung']
      },
      { 
        title: 'Testing y BD',
        phase: 'JUnit, Mockito, SQL',
        activities: ['Testing en Java', 'SQL y Bases de Datos', 'JPA básico'],
        tools: ['Platzi', 'Amigoscode', 'Modern Java in Action']
      },
      { 
        title: 'Spring Framework',
        phase: 'Core Spring',
        activities: ['IoC, DI, Bean lifecycle', 'Spring Data JPA', 'API REST'],
        tools: ['Curso Java Spring', 'Spring Boot in Action', 'Spring Developer']
      },
      { 
        title: 'Spring Boot Avanzado',
        phase: 'Seguridad y Testing',
        activities: ['Spring Security', 'JWT/OAuth2', 'Test suite completo'],
        tools: ['Platzi Security', 'Baeldung', 'Java Techie']
      },
      { 
        title: 'Microservicios',
        phase: 'Spring Cloud',
        activities: ['Service discovery', 'Docker', 'CI/CD'],
        tools: ['Spring Cloud', 'TechPrimers', 'Docker Hub']
      },
      { 
        title: 'Especialización',
        phase: 'Performance y WebFlux',
        activities: ['Optimización', 'Programación reactiva', 'Preparación entrevistas'],
        tools: ['Reactive Spring', 'WebFlux', 'Proyectos Open Source']
      }
    ]
  };
  
  // Timer Pomodoro
  useEffect(() => {
    let interval = null;
    
    if (timerActive) {
      interval = setInterval(() => {
        if (timerSeconds > 0) {
          setTimerSeconds(timerSeconds - 1);
        } else if (timerMinutes > 0) {
          setTimerMinutes(timerMinutes - 1);
          setTimerSeconds(59);
        } else {
          // Timer completed
          clearInterval(interval);
          const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
          audio.play();
          
          if (isWorkSession) {
            // Switch to break
            setPomodoroCount(pomodoroCount + 1);
            setIsWorkSession(false);
            setTimerMinutes(pomodoroCount % 4 === 3 ? 15 : 5); // Long break after 4 pomodoros
          } else {
            // Switch to work
            setIsWorkSession(true);
            setTimerMinutes(25);
          }
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [timerActive, timerMinutes, timerSeconds, isWorkSession, pomodoroCount]);
  
  const startStopTimer = () => {
    setTimerActive(!timerActive);
  };
  
  const resetTimer = () => {
    setTimerActive(false);
    setIsWorkSession(true);
    setTimerMinutes(25);
    setTimerSeconds(0);
  };
  
  // Componentes para cada tab
  
  // Componente Pomodoro
  const PomodoroComponent = () => {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">⏱️ Técnica Pomodoro</h2>
        
        <div className="flex items-center justify-center bg-gray-100 p-8 rounded-full w-64 h-64 mb-6">
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">
              {String(timerMinutes).padStart(2, '0')}:{String(timerSeconds).padStart(2, '0')}
            </div>
            <div className="text-sm text-gray-600">
              {isWorkSession ? "Trabajo" : pomodoroCount % 4 === 3 ? "Descanso largo" : "Descanso corto"}
            </div>
          </div>
        </div>
        
        <div className="flex space-x-4 mb-6">
          <button 
            className={`py-2 px-6 rounded-lg font-medium ${timerActive ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
            onClick={startStopTimer}
          >
            {timerActive ? "Pausar" : "Iniciar"}
          </button>
          <button 
            className="py-2 px-6 rounded-lg bg-gray-300 font-medium"
            onClick={resetTimer}
          >
            Reiniciar
          </button>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg w-full max-w-lg">
          <h3 className="font-bold mb-2">Técnica Personalizada:</h3>
          <ul className="list-disc pl-5 text-sm">
            <li><b>Mañanas:</b> 25 minutos de trabajo / 5 minutos de descanso</li>
            <li><b>Tardes/Noches:</b> 30 minutos de trabajo / 10 minutos de descanso</li>
            <li><b>Después de 4 ciclos:</b> Descanso largo de 15-30 minutos</li>
          </ul>
        </div>
        
        <div className="mt-6 grid grid-cols-4 gap-2 w-full max-w-lg">
          {Array(pomodoroCount).fill().map((_, i) => (
            <div key={i} className="bg-red-500 h-4 rounded-full"></div>
          ))}
          {Array(Math.max(0, 12 - pomodoroCount)).fill().map((_, i) => (
            <div key={i} className="bg-gray-200 h-4 rounded-full"></div>
          ))}
        </div>
        <div className="text-sm text-gray-600 mt-2">
          Pomodoros completados hoy: {pomodoroCount}
        </div>
      </div>
    );
  };
  
  // Visualización de la agenda semanal
  const ScheduleComponent = () => {
    // Días de la semana
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    
    // Tipos de actividades
    const activityTypes = [
      { name: 'Trabajo Principal', icon: '💻', key: 'work' },
      { name: 'Aprendizaje Técnico', icon: '💡', key: 'techLearning' },
      { name: 'Estudio de Inglés', icon: '📚', key: 'english' },
      { name: 'Trabajo Freelance', icon: '💼', key: 'freelance' },
      { name: 'Familia', icon: '👨‍👩‍👧', key: 'family' },
      { name: 'Ejercicio', icon: '🏋️', key: 'exercise' },
      { name: 'Comidas', icon: '🍽️', key: 'food' },
      { name: 'Proyectos Personales', icon: '🎨', key: 'projects' },
      { name: 'Descanso', icon: '🛋️', key: 'rest' }
    ];
    
    // Agenda para la semana en casa con formato de 12 horas
    const homeSchedule = {
      'Lunes': [
        { time: '6:30 am - 7:00 am', activity: 'Despertar y preparación', type: 'rest' },
        { time: '7:00 am - 7:30 am', activity: 'Estudio de inglés', type: 'english' },
        { time: '7:30 am - 8:00 am', activity: 'Desayuno', type: 'food' },
        { time: '8:00 am - 11:00 am', activity: 'Trabajo principal', type: 'work' },
        { time: '11:00 am - 12:00 pm', activity: 'Aprendizaje técnico', type: 'techLearning' },
        { time: '12:00 pm - 2:00 pm', activity: 'Trabajo principal', type: 'work' },
        { time: '2:00 pm - 3:00 pm', activity: 'Comida y descanso', type: 'food' },
        { time: '3:00 pm - 6:00 pm', activity: 'Trabajo principal', type: 'work' },
        { time: '6:00 pm - 6:30 pm', activity: 'Paseo con perrito', type: 'exercise' },
        { time: '6:30 pm - 7:30 pm', activity: 'Inglés (audio/videos)', type: 'english' },
        { time: '7:30 pm - 8:30 pm', activity: 'Cena y familia', type: 'family' },
        { time: '8:30 pm - 9:30 pm', activity: 'Trabajo freelance', type: 'freelance' },
        { time: '9:30 pm - 10:00 pm', activity: 'Inglés (lectura)', type: 'english' },
        { time: '10:00 pm - 10:30 pm', activity: 'Ejercicio ligero', type: 'exercise' }
      ]
    };
    
    // Agenda para la semana en oficina con formato de 12 horas
    const officeSchedule = {
      'Lunes': [
        { time: '6:00 am - 6:30 am', activity: 'Despertar y preparación', type: 'rest' },
        { time: '6:30 am - 7:30 am', activity: 'Traslado + Podcasts inglés', type: 'english' },
        { time: '8:00 am - 10:30 am', activity: 'Trabajo principal', type: 'work' },
        { time: '10:30 am - 11:30 am', activity: 'Aprendizaje técnico', type: 'techLearning' },
        { time: '11:30 am - 1:00 pm', activity: 'Trabajo principal', type: 'work' },
        { time: '1:00 pm - 2:00 pm', activity: 'Comida + Lectura inglés', type: 'food' },
        { time: '2:00 pm - 6:00 pm', activity: 'Trabajo principal', type: 'work' },
        { time: '6:00 pm - 7:00 pm', activity: 'Traslado + Podcasts inglés', type: 'english' },
        { time: '7:00 pm - 7:30 pm', activity: 'Paseo con perrito', type: 'exercise' },
        { time: '7:30 pm - 8:30 pm', activity: 'Cena y familia', type: 'family' },
        { time: '8:30 pm - 9:30 pm', activity: 'Trabajo freelance', type: 'freelance' },
        { time: '9:30 pm - 10:30 pm', activity: 'Inglés (gramática/escritura)', type: 'english' }
      ]
    };
    
    // Agenda para el fin de semana con formato de 12 horas
    const weekendSchedule = {
      'Sábado': [
        { time: '8:00 am - 9:00 am', activity: 'Despertar y desayuno familia', type: 'family' },
        { time: '9:00 am - 10:00 am', activity: 'Estudio inglés intensivo', type: 'english' },
        { time: '10:00 am - 12:00 pm', activity: 'Trabajo freelance', type: 'freelance' },
        { time: '12:00 pm - 1:00 pm', activity: 'Ejercicio', type: 'exercise' },
        { time: '1:00 pm - 2:00 pm', activity: 'Comida', type: 'food' },
        { time: '2:00 pm - 4:00 pm', activity: 'Proyectos personales', type: 'projects' },
        { time: '4:00 pm - 7:00 pm', activity: 'Tiempo familia', type: 'family' },
        { time: '7:00 pm - 8:00 pm', activity: 'Inglés (conversación/escritura)', type: 'english' },
        { time: '8:00 pm - 11:00 pm', activity: 'Tiempo libre/social', type: 'rest' }
      ],
      'Domingo': [
        { time: '8:00 am - 10:00 am', activity: 'Despertar y desayuno familia', type: 'family' },
        { time: '10:00 am - 11:00 am', activity: 'Estudio inglés (lectura/audio)', type: 'english' },
        { time: '11:00 am - 12:00 pm', activity: 'Proyectos personales', type: 'projects' },
        { time: '12:00 pm - 1:00 pm', activity: 'Planificación semanal', type: 'rest' },
        { time: '1:00 pm - 2:00 pm', activity: 'Comida familiar', type: 'family' },
        { time: '2:00 pm - 5:00 pm', activity: 'Tiempo familia', type: 'family' },
        { time: '5:00 pm - 7:00 pm', activity: 'Trabajo freelance', type: 'freelance' },
        { time: '7:00 pm - 8:00 pm', activity: 'Cena', type: 'food' },
        { time: '8:00 pm - 9:00 pm', activity: 'Preparación para la semana', type: 'rest' },
        { time: '9:00 pm - 10:00 pm', activity: 'Relax', type: 'rest' }
      ]
    };
    
    const [scheduleType, setScheduleType] = useState('home');
    
    // Visualización de la agenda según tipo seleccionado
    const getSchedule = () => {
      if (scheduleType === 'home') {
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Semana en Casa</h3>
            <ScheduleTable day="Lunes" activities={homeSchedule['Lunes']} />
          </div>
        );
      } else if (scheduleType === 'office') {
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Semana en Oficina</h3>
            <ScheduleTable day="Lunes" activities={officeSchedule['Lunes']} />
          </div>
        );
      } else {
        return (
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Sábado</h3>
              <ScheduleTable day="Sábado" activities={weekendSchedule['Sábado']} />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Domingo</h3>
              <ScheduleTable day="Domingo" activities={weekendSchedule['Domingo']} />
            </div>
          </div>
        );
      }
    };
    
    // Componente de tabla para la agenda
    const ScheduleTable = ({ day, activities }) => {
      return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left w-1/4">Horario</th>
                <th className="py-2 px-4 text-left w-3/4">Actividad</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((item, index) => {
                return (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="py-2 px-4 text-sm">{item.time}</td>
                    <td className="py-2 px-4">
                      <div className="flex items-center">
                        <span className="mr-2">{activityIcons[item.type]}</span>
                        <span>{item.activity}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    };
    
    return (
      <div>
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Agenda Semanal</h2>
          
          <div className="flex mb-4 bg-gray-100 rounded-lg p-1">
            <button 
              className={`flex-1 py-2 px-4 rounded-md ${scheduleType === 'home' ? 'bg-white shadow' : ''}`}
              onClick={() => setScheduleType('home')}
            >
              Semana en Casa
            </button>
            <button 
              className={`flex-1 py-2 px-4 rounded-md ${scheduleType === 'office' ? 'bg-white shadow' : ''}`}
              onClick={() => setScheduleType('office')}
            >
              Semana en Oficina
            </button>
            <button 
              className={`flex-1 py-2 px-4 rounded-md ${scheduleType === 'weekend' ? 'bg-white shadow' : ''}`}
              onClick={() => setScheduleType('weekend')}
            >
              Fin de Semana
            </button>
          </div>
          
          {getSchedule()}
        </div>
        
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Leyenda de Actividades</h3>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="grid grid-cols-2 gap-2">
              {activityTypes.map((type, index) => (
                <div key={index} className="flex items-center p-2 rounded-md bg-gray-50">
                  <span className="text-xl mr-2">{type.icon}</span>
                  <span>{type.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Visualización de la ruta de aprendizaje técnico
  const TechRoadmapComponent = () => {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Ruta de Aprendizaje Técnico</h2>
        
        <div className="relative">
          {/* Línea de tiempo */}
          <div className="absolute left-4 top-0 bottom-0 w-1 bg-blue-200" style={{ zIndex: 0 }}></div>
          
          {roadmapData.techContent.map((month, index) => (
            <div key={index} className="relative z-10 mb-6 pl-16 pb-2">
              {/* Círculo de mes */}
              <div 
                className="absolute left-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: '#4285F4', zIndex: 2 }}
              >
                {index + 1}
              </div>
              
              {/* Contenido del mes */}
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-lg font-bold text-blue-600">{month.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{month.phase}</p>
                
                <div className="mb-3">
                  <h4 className="font-medium text-gray-700 mb-1">Actividades:</h4>
                  <ul className="list-disc pl-5">
                    {month.activities.map((activity, i) => (
                      <li key={i} className="text-sm">{activity}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Herramientas:</h4>
                  <div className="flex flex-wrap gap-2">
                    {month.tools.map((tool, i) => (
                      <span key={i} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-2">Proyectos Recomendados</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <h4 className="font-medium text-blue-700">API REST Completa</h4>
              <ul className="text-sm list-disc pl-5 mt-1">
                <li>CRUD completo</li>
                <li>Autenticación JWT</li>
                <li>Test suite completo</li>
                <li>Documentación API</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <h4 className="font-medium text-blue-700">Microservicios</h4>
              <ul className="text-sm list-disc pl-5 mt-1">
                <li>3-4 microservicios</li>
                <li>Service discovery</li>
                <li>Circuit breakers</li>
                <li>Tracing distribuido</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <h4 className="font-medium text-blue-700">WebFlux Reactivo</h4>
              <ul className="text-sm list-disc pl-5 mt-1">
                <li>API reactiva</li>
                <li>BD reactiva</li>
                <li>Testing reactivo</li>
                <li>Optimización</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Visualización de la ruta de aprendizaje de inglés
  const EnglishRoadmapComponent = () => {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Ruta de Aprendizaje de Inglés: B1 → C1</h2>
        
        {/* Barra de progreso de nivel */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {roadmapData.englishLevels.map((level, index) => (
              <div key={index} className="text-center">
                <div className="text-sm font-medium">{level}</div>
              </div>
            ))}
          </div>
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-4 bg-yellow-500 rounded-full" style={{ width: '100%' }}></div>
          </div>
          <div className="flex justify-between mt-1">
            {roadmapData.months.map((month, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-gray-500">{month}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roadmapData.englishContent.map((month, index) => (
            <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="py-2 px-4 text-white font-medium bg-yellow-500">
                {roadmapData.months[index]}: {month.title}
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-500 mb-3">{month.phase}</p>
                
                <div className="mb-3">
                  <h4 className="font-medium text-gray-700 mb-1">Actividades:</h4>
                  <ul className="list-disc pl-5">
                    {month.activities.map((activity, i) => (
                      <li key={i} className="text-sm">{activity}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Recursos:</h4>
                  <div className="flex flex-wrap gap-2">
                    {month.resources.map((resource, i) => (
                      <span key={i} className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                        {resource}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-3">Distribución de Estudio (14h semanales)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-yellow-50 p-3 rounded-lg">
              <h4 className="font-medium text-yellow-700">Días Laborables (10h)</h4>
              <ul className="text-sm pl-5 mt-1 list-disc">
                <li>⏰ Mañanas: Gramática/vocabulario (30 min)</li>
                <li>🚗 Traslados: Podcasts/audio (60-90 min total)</li>
                <li>🌙 Noches: Lectura/escritura/práctica (45-60 min)</li>
              </ul>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <h4 className="font-medium text-yellow-700">Fin de Semana (4h)</h4>
              <ul className="text-sm pl-5 mt-1 list-disc">
                <li>📚 Sábado: 2 horas (estudio intensivo + conversación)</li>
                <li>📚 Domingo: 2 horas (lectura + planificación)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Visualización de las estrategias anti-procrastinación
  const ToolboxComponent = () => {
    const strategies = [
      {
        title: "Sistema Pomodoro Personalizado",
        icon: "⏱️",
        description: "Mañanas: 25min trabajo/5min descanso. Tardes: 30min trabajo/10min descanso.",
        tools: ["Forest", "Focus To-Do", "Pomodoro Timer"]
      },
      {
        title: "Preparación Previa",
        icon: "📋",
        description: "Cada noche prepara materiales y plan para el día siguiente.",
        tools: ["Notas adhesivas", "Checklists", "Planificador diario"]
      },
      {
        title: "Sistema de Recompensas",
        icon: "🏆",
        description: "Recompensas diarias, semanales y mensuales por cumplir objetivos.",
        tools: ["Habitica", "Streaks", "Diario de logros"]
      },
      {
        title: "Accountabilidad Social",
        icon: "👥",
        description: "Comparte tu progreso con personas cercanas o compañeros de estudio.",
        tools: ["Discord", "Reddit r/EnglishLearning", "Accountability partner"]
      },
      {
        title: "Tracker de Hábitos",
        icon: "📊",
        description: "Seguimiento diario de tiempo dedicado y progreso en cada área.",
        tools: ["Loop Habit Tracker", "Habitica", "Notion"]
      },
      {
        title: "Evaluación y Adaptación",
        icon: "🔍",
        description: "Evaluación semanal (domingo) y ajustes al plan según resultados.",
        tools: ["Tests mensuales", "Diario de aprendizaje", "Retroalimentación"]
      }
    ];
    
    const contingencyPlans = [
      {
        scenario: "Días de Baja Energía",
        solution: "30 minutos de estudio pasivo (listening mientras descansas).",
        tip: "Prepara una lista de podcasts/videos 'ligeros' para estos días."
      },
      {
        scenario: "Semanas Ocupadas",
        solution: "Reduce a 1 hora diaria, priorizando escucha y lectura.",
        tip: "Nunca elimines completamente el estudio, mantén la consistencia."
      },
      {
        scenario: "Caídas de Motivación",
        solution: "Revisa tu lista de 'porqués' - razones para mejorar tu inglés.",
        tip: "Calcula el beneficio económico potencial (diferencia salarial)."
      }
    ];
    
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Caja de Herramientas Anti-Procrastinación</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {strategies.map((strategy, index) => (
            <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="flex items-center p-3 bg-orange-100">
                <span className="text-2xl mr-2">{strategy.icon}</span>
                <h3 className="font-medium text-orange-800">{strategy.title}</h3>
              </div>
              <div className="p-4">
                <p className="text-sm mb-3">{strategy.description}</p>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Herramientas:</h4>
                  <div className="flex flex-wrap gap-2">
                    {strategy.tools.map((tool, i) => (
                      <span key={i} className="bg-orange-50 text-orange-700 text-xs px-2 py-1 rounded-full">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <h3 className="text-lg font-semibold mb-3">Planes de Contingencia</h3>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead>
              <tr className="bg-orange-100">
                <th className="text-left p-3">Escenario</th>
                <th className="text-left p-3">Solución</th>
                <th className="text-left p-3">Consejo</th>
              </tr>
            </thead>
            <tbody>
              {contingencyPlans.map((plan, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-orange-50' : 'bg-white'}>
                  <td className="p-3 text-sm font-medium">{plan.scenario}</td>
                  <td className="p-3 text-sm">{plan.solution}</td>
                  <td className="p-3 text-sm text-gray-600">{plan.tip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  // Integración de ambos caminos
  const IntegrationComponent = () => {
    const phases = [
      {
        title: "Fase 1 (Mes 1-2)",
        tech: ["Estudia conceptos técnicos en español", "Refuerza bases de Java moderno", "Familiarízate con testing"],
        english: ["Vocabulario técnico básico", "Escribe código y comentarios en inglés", "Lee documentación básica en inglés"],
        color: "#E6F2FF"
      },
      {
        title: "Fase 2 (Mes 3-4)",
        tech: ["Domina Spring Framework", "Implementa seguridad con Spring Security", "Desarrolla APIs REST completas"],
        english: ["Alterna entre recursos en español e inglés", "Participa en foros técnicos en inglés", "Documenta tus proyectos en inglés"],
        color: "#CCE5FF"
      },
      {
        title: "Fase 3 (Mes 5-6)",
        tech: ["Implementa arquitecturas de microservicios", "Explora programación reactiva", "Optimiza aplicaciones Spring Boot"],
        english: ["Prioriza recursos técnicos en inglés", "Practica explicar conceptos técnicos", "Prepárate para entrevistas técnicas"],
        color: "#99CCFF"
      }
    ];
    
    const milestones = [
      {
        month: 2,
        tech: "Dominio de Java moderno y testing",
        english: "Entender 70% de tutoriales técnicos",
        project: "API CRUD básica con tests"
      },
      {
        month: 4,
        tech: "Dominio de Spring Boot y seguridad",
        english: "Mantener conversaciones técnicas básicas",
        project: "API REST completa con autenticación"
      },
      {
        month: 6,
        tech: "Especialización avanzada",
        english: "Entrevistas técnicas en inglés",
        project: "Portfolio de 3 proyectos + GitHub activo"
      }
    ];
    
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Integración de Aprendizaje Técnico e Inglés</h2>
        
        <div className="mb-8">
          {phases.map((phase, index) => (
            <div 
              key={index} 
              className="mb-4 rounded-lg overflow-hidden shadow"
              style={{ backgroundColor: phase.color }}
            >
              <div className="p-3 bg-blue-600 text-white font-medium">
                {phase.title}
              </div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2 text-blue-800">💻 Aprendizaje Técnico</h3>
                  <ul className="list-disc pl-5">
                    {phase.tech.map((item, i) => (
                      <li key={i} className="text-sm mb-1">{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2 text-yellow-800">📚 Aprendizaje de Inglés</h3>
                  <ul className="list-disc pl-5">
                    {phase.english.map((item, i) => (
                      <li key={i} className="text-sm mb-1">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <h3 className="text-lg font-semibold mb-3">Hitos de Evaluación</h3>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-3">Mes</th>
                <th className="text-left p-3">Nivel Técnico</th>
                <th className="text-left p-3">Nivel de Inglés</th>
                <th className="text-left p-3">Proyecto Integrador</th>
              </tr>
            </thead>
            <tbody>
              {milestones.map((milestone, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="p-3 text-sm font-medium">Mes {milestone.month}</td>
                  <td className="p-3 text-sm">{milestone.tech}</td>
                  <td className="p-3 text-sm">{milestone.english}</td>
                  <td className="p-3 text-sm text-blue-600">{milestone.project}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
          <h3 className="text-lg font-medium text-yellow-800 mb-2">Consejo para el Éxito</h3>
          <p className="text-sm">
            Para maximizar la eficiencia, combina el aprendizaje técnico y de inglés siempre que sea posible. 
            Por ejemplo, cuando estudies Spring Security, hazlo con tutoriales en inglés, documenta tu código
            en inglés, y practica explicar el concepto a ti mismo en inglés. Esta integración refuerza ambos
            objetivos simultáneamente.
          </p>
        </div>
      </div>
    );
  };
  
  return (
    <div className="bg-gray-100 p-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">
          Plan Visual: De Desarrollador Java a Senior Spring Boot Developer Internacional
        </h1>
        
        <div className="bg-white rounded-lg shadow mb-6 overflow-hidden">
          <div className="flex flex-wrap">
            <button 
              className={`py-3 px-4 ${activeTab === 'schedule' ? 'bg-gray-100 font-medium' : ''}`}
              onClick={() => setActiveTab('schedule')}
            >
              📅 Agenda Semanal
            </button>
            <button 
              className={`py-3 px-4 ${activeTab === 'tech' ? 'bg-gray-100 font-medium' : ''}`}
              onClick={() => setActiveTab('tech')}
            >
              💻 Ruta Técnica
            </button>
            <button 
              className={`py-3 px-4 ${activeTab === 'english' ? 'bg-gray-100 font-medium' : ''}`}
              onClick={() => setActiveTab('english')}
            >
              🌎 Ruta de Inglés
            </button>
            <button 
              className={`py-3 px-4 ${activeTab === 'toolbox' ? 'bg-gray-100 font-medium' : ''}`}
              onClick={() => setActiveTab('toolbox')}
            >
              🧰 Anti-Procrastinación
            </button>
            <button 
              className={`py-3 px-4 ${activeTab === 'integration' ? 'bg-gray-100 font-medium' : ''}`}
              onClick={() => setActiveTab('integration')}
            >
              🔄 Integración
            </button>
            <button 
              className={`py-3 px-4 ${activeTab === 'pomodoro' ? 'bg-gray-100 font-medium' : ''}`}
              onClick={() => setActiveTab('pomodoro')}
            >
              ⏱️ Pomodoro
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === 'schedule' && <ScheduleComponent />}
          {activeTab === 'tech' && <TechRoadmapComponent />}
          {activeTab === 'english' && <EnglishRoadmapComponent />}
          {activeTab === 'toolbox' && <ToolboxComponent />}
          {activeTab === 'integration' && <IntegrationComponent />}
          {activeTab === 'pomodoro' && <PomodoroComponent />}
        </div>
      </div>
    </div>
  );
};

export default VisualRoadmap;