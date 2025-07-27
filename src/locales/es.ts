export const dictionary = {
  metadata: {
    title: "BacheAI",
    description: "Una aplicación de ciencia ciudadana para reportar baches y contribuir a los datos de infraestructura urbana.",
  },
  header: {
    title: "BacheAI",
    home: "Inicio",
    report: "Reportar Bache",
    reports: "Reportes",
    about: "Acerca de",
  },
  potholeUploader: {
    cardTitle: "Reportar un Bache",
    cardDescription: "Usa la cámara de tu dispositivo para reportar un bache. Esto asegura la trazabilidad y ubicación del reporte.",
    idle: {
      uploadButton: "Tomar Foto",
    },
    privacy: {
        title: "¿Cómo se usan mis datos?",
        description: "Tu correo electrónico e información de usuario se mantienen privados y nunca se comparten. La ubicación de tu reporte se usa de forma anónima para crear mapas de calor agregados para el análisis de infraestructura. Tu contribución es valiosa y confidencial.",
    },
    loading: {
      analyzing: "La IA está analizando tu foto...",
      submitting: "Enviando...",
    },
    previewing: {
      imageAlt: "Vista previa del bache",
      analyzeButton: "Analizar Bache",
    },
    confirming: {
      imageAlt: "Bache",
      analysisResults: "Resultados del Análisis",
      surfaceArea: "Área de Superficie",
      approxDimensions: "Dimensiones Aprox.",
      approxVolume: "Volumen Aprox.",
      location: "Ubicación",
      gettingLocation: "Obteniendo ubicación...",
      locationUnavailable: "No disponible",
      aiSummary: "Resumen de IA",
      discardButton: "Descartar",
      submitButton: "Confirmar y Enviar",
      noPotholeFound: {
        title: "No se Detectó un Bache",
        description: "La IA no pudo identificar un bache en esta foto. Solo se pueden enviar reportes si se detecta un bache."
      },
      locationError: {
        title: "Se Requiere Acceso a la Ubicación",
        description: "El acceso al GPS es obligatorio. Por favor, habilita los permisos de ubicación en tu navegador y en los ajustes de tu teléfono para poder enviar un reporte."
      }
    },
    success: {
      title: "¡Reporte Enviado!",
      description: "¡Gracias por tu contribución para mejorar las calles de nuestra ciudad!",
      resetButton: "Enviar Otro Reporte",
    },
    error: {
      title: "Ocurrió un Error",
      description: "Algo salió mal. Por favor, inténtalo de nuevo.",
      resetButton: "Intentar de Nuevo",
    },
    toast: {
        analysisFailed: {
            title: "El Análisis de IA Falló"
        },
        submissionFailed: {
            title: "El Envío Falló"
        }
    }
  },
  reportsPage: {
    title: "Reportes de Baches",
    description: "Datos agregados de todos los reportes de baches enviados por los ciudadanos.",
    tableView: "Tabla",
    mapView: "Mapa",
    leaderboardView: "Líderes"
  },
  reportTable: {
    exportButton: "Exportar a CSV",
    noReports: "Aún no se han enviado reportes.",
    photoAlt: "Foto del reporte de bache",
    anonymous: "Anónimo",
    headers: {
        photo: "Foto",
        dateTime: "Fecha y Hora",
        reporter: "Reportado por",
        location: "Ubicación",
        analysis: "Análisis IA",
        aiDescription: "Descripción de IA"
    }
  },
  leaderboard: {
      title: "Tabla de Líderes",
      noData: "No hay datos suficientes para mostrar la tabla de líderes.",
      headers: {
          rank: "Puesto",
          reporter: "Reportero",
          score: "Puntaje",
          reports: "Reportes"
      }
  }
};
