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
    profile: "Perfil"
  },
  potholeUploader: {
    cardTitle: "Reportar un Bache",
    cardDescription: "Usa la cámara de tu dispositivo para reportar un bache. Esto asegura la trazabilidad y ubicación del reporte.",
    idle: {
      uploadButton: "Tomar Foto",
    },
    privacy: {
        title: "¿Cómo se usan mis datos?",
        description: "Tu identidad es anónima. No se recopila información personal. La ubicación de tu reporte se usa de forma anónima para crear mapas de calor agregados para el análisis de infraestructura. Tu contribución es valiosa y confidencial.",
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
  },
  loginForm: {
    title: {
      signIn: "Iniciar Sesión",
      signUp: "Crear Cuenta",
      forgotPassword: "Restablecer Contraseña",
      awaitingVerification: "Verifica tu Email",
      resetSent: "Revisa tu Correo"
    },
    description: {
      signIn: "¡Bienvenido de nuevo! Ingresa tus credenciales para continuar.",
      signUp: "Crea una cuenta permanente para desbloquear todas las funciones.",
      forgotPassword: "Ingresa tu email para recibir un enlace de restablecimiento.",
      awaitingVerification: "Te hemos enviado un enlace de verificación a tu correo. Por favor, revisa tu bandeja de entrada y haz clic en el enlace para continuar.",
      resetSent: "Se ha enviado un enlace para restablecer tu contraseña a tu dirección de correo electrónico."
    },
    emailLabel: "Correo Electrónico",
    passwordLabel: "Contraseña",
    button: {
      signIn: "Iniciar Sesión",
      signUp: "Crear Cuenta",
      forgotPassword: "Enviar Enlace",
    },
    prompt: {
      signIn: {
        prefix: "¿No tienes una cuenta?",
        link: "Regístrate",
        forgotPassword: "¿Olvidaste tu contraseña?"
      },
      signUp: {
        prefix: "¿Ya tienes una cuenta?",
        link: "Inicia Sesión"
      }
    },
    awaitingVerification: {
        instructions: "Hemos enviado un enlace de verificación a tu correo. Por favor, revisa tu bandeja de entrada y haz clic para activar tu cuenta.",
        signInButton: "Volver a Iniciar Sesión"
    },
    resetSent: {
        instructions: "Se ha enviado un enlace para restablecer tu contraseña a tu correo. Sigue las instrucciones para continuar.",
        signInButton: "Volver a Iniciar Sesión"
    },
    errors: {
      'auth/invalid-email': "La dirección de correo electrónico no es válida.",
      'auth/user-disabled': "Esta cuenta de usuario ha sido deshabilitada.",
      'auth/user-not-found': "No se encontró ninguna cuenta con este correo electrónico.",
      'auth/wrong-password': "Contraseña incorrecta. Por favor, inténtalo de nuevo.",
      'auth/email-already-in-use': "Ya existe una cuenta con esta dirección de correo electrónico.",
      'auth/weak-password': "La contraseña es demasiado débil. Por favor, utiliza una contraseña más segura.",
      'auth/requires-recent-login': 'Esta acción es sensible y requiere autenticación reciente. Por favor, inicia sesión de nuevo antes de reintentar.',
      'auth/credential-already-in-use': 'Este correo electrónico ya está asociado con otra cuenta.',
      default: 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.'
    }
  }
};
