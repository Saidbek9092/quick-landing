import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        howItWorks: 'How it works',
        features: 'Features',
      },
      hero: {
        titleLine1: 'Simplify Job Ticketing',
        titleLine2: 'and Invoicing with AI',
        subtitle:
          'QuickTicketAI helps energy and field service teams create, track, and manage job tickets effortlessly — in any language',
        cta: 'Register for early access',
      },
      featureCards: [
        {
          heading: 'Convert jobs to invoices',
          supporting:
            'Automatically prepare invoice-ready summaries from completed job tickets and approved work.',
          checkItems: [
            'Generate invoice-ready job data',
            'Reduce billing mistakes and missing information',
            'Speed up approval and billing cycles',
          ],
          position: 'left',
        },
        {
          heading: 'Monitor jobs and teams live',
          supporting:
            'Follow every job from creation to completion with live updates from your field technicians.',
          checkItems: [
            'Live job status and progress updates',
            'Technician activity and assignment tracking',
            'Instant notifications for changes and approvals',
          ],
          position: 'right',
        },
        {
          heading: 'Create tickets with voice or text',
          supporting:
            'Create job tickets in seconds by speaking or typing. QuickTicketAI understands your request and builds a structured ticket automatically.',
          checkItems: [
            'Convert voice notes into complete job tickets',
            'Automatically detect customer, location, and job type',
            'Reduce manual data entry and errors',
          ],
          position: 'left',
        },
      ],
      grid: {
        heading: 'Main features built for field service teams',
        subheading:
          'Core tools to create, manage, and close job tickets faster — with AI, real-time collaboration, and built-in invoicing.',
        items: [
          {
            title: 'Voice Ticketing',
            description:
              'Log job tickets hands-free using AI voice capture — ideal for technicians on site.',
          },
          {
            title: 'Multilingual Support',
            description:
              'Create and review tickets in multiple languages for global and distributed teams.',
          },
          {
            title: 'Automated Invoicing',
            description:
              'Generate invoice-ready data directly from approved job tickets.',
          },
          {
            title: 'Real-Time Sync',
            description:
              'Keep all ticket data instantly synced across devices, teams, and roles.',
          },
          {
            title: 'AI-Powered Insights',
            description:
              'Understand job trends, technician performance, and billing accuracy with AI analytics.',
          },
          {
            title: 'Secure Cloud Storage',
            description:
              'Protect your data with encryption, backups, and role-based access control.',
          },
          {
            title: 'Manual Ticketing',
            description:
              'Create and edit tickets manually when voice input is not available.',
          },
          {
            title: 'Dashboard Reporting',
            description:
              'View operational and financial performance in one unified dashboard.',
          },
          {
            title: 'High Volume Ready',
            description:
              'Built to support large teams and high job volumes with scalable infrastructure.',
          },
        ],
      },
      cta: {
        heading: 'Transform the way you manage job tickets',
        body:
          'From voice-based ticket creation to automated invoicing, QuickTicketAI helps field teams manage jobs faster and with fewer errors.',
        emailPlaceholder: 'Enter your email',
        submit: 'Submit',
      },
      footer: {
        rights: '© 2026 QuickTicketAI. All rights reserved.',
      },
      language: {
        english: 'English US',
        spanish: 'Español',
      },
    },
  },
  es: {
    translation: {
      nav: {
        howItWorks: 'Cómo funciona',
        features: 'Funciones',
      },
      hero: {
        titleLine1: 'Simplifica las órdenes de trabajo',
        titleLine2: 'y la facturación con IA',
        subtitle:
          'QuickTicketAI ayuda a los equipos de energía y servicios de campo a crear, seguir y gestionar órdenes de trabajo sin esfuerzo, en cualquier idioma.',
        cta: 'Regístrate para acceso anticipado',
      },
      featureCards: [
        {
          heading: 'Convierte trabajos en facturas',
          supporting:
            'Prepara automáticamente resúmenes listos para facturar a partir de órdenes de trabajo completadas y aprobadas.',
          checkItems: [
            'Genera datos de trabajo listos para facturar',
            'Reduce errores de facturación e información incompleta',
            'Acelera los ciclos de aprobación y facturación',
          ],
          position: 'left',
        },
        {
          heading: 'Supervisa trabajos y equipos en vivo',
          supporting:
            'Sigue cada trabajo desde la creación hasta la finalización con actualizaciones en tiempo real de tus técnicos de campo.',
          checkItems: [
            'Estado y progreso de trabajos en tiempo real',
            'Seguimiento de actividades y asignaciones de técnicos',
            'Notificaciones instantáneas de cambios y aprobaciones',
          ],
          position: 'right',
        },
        {
          heading: 'Crea tickets por voz o texto',
          supporting:
            'Crea órdenes de trabajo en segundos hablando o escribiendo. QuickTicketAI entiende tu solicitud y construye automáticamente un ticket estructurado.',
          checkItems: [
            'Convierte notas de voz en órdenes de trabajo completas',
            'Detecta automáticamente cliente, ubicación y tipo de trabajo',
            'Reduce la introducción manual de datos y los errores',
          ],
          position: 'left',
        },
      ],
      grid: {
        heading: 'Funciones principales para equipos de campo',
        subheading:
          'Herramientas clave para crear, gestionar y cerrar órdenes de trabajo más rápido, con IA, colaboración en tiempo real y facturación integrada.',
        items: [
          {
            title: 'Ticketing por voz',
            description:
              'Registra órdenes de trabajo sin usar las manos con captura de voz impulsada por IA, ideal para técnicos en sitio.',
          },
          {
            title: 'Soporte multilingüe',
            description:
              'Crea y revisa tickets en varios idiomas para equipos globales y distribuidos.',
          },
          {
            title: 'Facturación automatizada',
            description:
              'Genera datos listos para facturar directamente desde órdenes de trabajo aprobadas.',
          },
          {
            title: 'Sincronización en tiempo real',
            description:
              'Mantén toda la información de tickets sincronizada al instante entre dispositivos, equipos y roles.',
          },
          {
            title: 'Información impulsada por IA',
            description:
              'Comprende tendencias de trabajo, rendimiento de técnicos y precisión de facturación con análisis de IA.',
          },
          {
            title: 'Almacenamiento seguro en la nube',
            description:
              'Protege tus datos con encriptación, copias de seguridad y control de acceso basado en roles.',
          },
          {
            title: 'Ticketing manual',
            description:
              'Crea y edita tickets manualmente cuando la entrada por voz no esté disponible.',
          },
          {
            title: 'Panel de informes',
            description:
              'Visualiza el rendimiento operativo y financiero en un panel unificado.',
          },
          {
            title: 'Listo para alto volumen',
            description:
              'Diseñado para soportar grandes equipos y altos volúmenes de trabajo con infraestructura escalable.',
          },
        ],
      },
      cta: {
        heading: 'Transforma la forma en que gestionas las órdenes de trabajo',
        body:
          'Desde la creación de tickets por voz hasta la facturación automatizada, QuickTicketAI ayuda a los equipos de campo a gestionar trabajos más rápido y con menos errores.',
        emailPlaceholder: 'Introduce tu correo electrónico',
        submit: 'Enviar',
      },
      footer: {
        rights: '© 2026 QuickTicketAI. Todos los derechos reservados.',
      },
      language: {
        english: 'Inglés EE. UU.',
        spanish: 'Español',
      },
    },
  },
} as const;

void i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

