import { TimelineEvent, Concept } from './types';

// A subset of the 30 events to demonstrate structure. 
// In a full app, this would be 30 items.
export const INITIAL_TIMELINE: TimelineEvent[] = [
  { year: 1973, month: 'Septiembre', title: 'El Golpe de Estado', shortDescription: 'Bombardeo a La Moneda y junta militar asume el poder.' },
  { year: 1974, month: 'Junio', title: 'Creación de la DINA', shortDescription: 'Se oficializa la Dirección de Inteligencia Nacional.' },
  { year: 1975, month: 'Enero', title: 'Operación Cóndor', shortDescription: 'Coordinación entre dictaduras del Cono Sur.' },
  { year: 1978, month: 'Abril', title: 'Ley de Amnistía', shortDescription: 'Decreto ley para eximir de responsabilidad penal a implicados en delitos.' },
  { year: 1980, month: 'Septiembre', title: 'Constitución de 1980', shortDescription: 'Plebiscito aprueba la nueva carta fundamental.' },
  { year: 1982, month: 'Enero', title: 'Muerte de Eduardo Frei Montalva', shortDescription: 'Fallecimiento del ex presidente en circunstancias investigadas.' },
  { year: 1983, month: 'Mayo', title: 'Primeras Protestas Nacionales', shortDescription: 'La Confederación de Trabajadores del Cobre convoca movilizaciones.' },
  { year: 1985, month: 'Marzo', title: 'Caso Degollados', shortDescription: 'Secuestro y asesinato de tres profesionales comunistas.' },
  { year: 1986, month: 'Septiembre', title: 'Atentado a Pinochet', shortDescription: 'El FPMR embosca la comitiva presidencial en el Cajón del Maipo.' },
  { year: 1988, month: 'Octubre', title: 'Plebiscito del NO', shortDescription: 'Triunfo de la opción NO marca el inicio del fin de la dictadura.' },
  { year: 1989, month: 'Diciembre', title: 'Elecciones Presidenciales', shortDescription: 'Patricio Aylwin es elegido presidente.' },
  { year: 1990, month: 'Marzo', title: 'Retorno a la Democracia', shortDescription: 'Asunción de Patricio Aylwin y fin del régimen militar.' }
];

// Subset of 30 concepts
export const INITIAL_CONCEPTS: Concept[] = [
  { term: 'Toque de Queda', shortDefinition: 'Prohibición de circular libremente por las calles en determinados horarios.' },
  { term: 'Recurso de Amparo', shortDefinition: 'Acción legal para proteger la libertad personal, sistemáticamente rechazados.' },
  { term: 'Exilio', shortDefinition: 'Expulsión forzada de miles de chilenos fuera del territorio nacional.' },
  { term: 'Detenido Desaparecido', shortDefinition: 'Persona arrestada por agentes del Estado cuyo paradero se mantiene oculto.' },
  { term: 'Vicaría de la Solidaridad', shortDefinition: 'Organismo de la Iglesia Católica que prestó asistencia a las víctimas.' },
  { term: 'Chicago Boys', shortDefinition: 'Economistas que implementaron el modelo neoliberal en Chile.' },
  { term: 'Censura', shortDefinition: 'Control y supresión de información en medios de comunicación y arte.' },
  { term: 'Allanamientos', shortDefinition: 'Operativos militares masivos en poblaciones en busca de opositores.' },
  { term: 'Hornada', shortDefinition: 'Término coloquial para referirse a grupos de detenidos.' },
  { term: 'Peña Folclórica', shortDefinition: 'Espacios de resistencia cultural y música de raíz.' },
  { term: 'Cacerolazo', shortDefinition: 'Forma de protesta haciendo ruido con ollas y sartenes.' },
  { term: 'Plebiscito', shortDefinition: 'Consulta ciudadana realizada en 1980 y 1988.' }
];