export const dictionary = {
  metadata: {
    title: "BacheAI",
    description: "A citizen science app for reporting potholes and contributing to urban infrastructure data.",
  },
  header: {
    title: "BacheAI",
    home: "Home",
    report: "Report Pothole",
    reports: "Reports",
    about: "About",
  },
  loginForm: {
    login: {
      title: "Login",
      description: "Enter your credentials to access your account.",
      submitButton: "Login",
      switchText: "Don't have an account?",
      switchButton: "Sign up",
    },
    register: {
      title: "Create an Account",
      description: "Enter your email and password to get started.",
      submitButton: "Create Account",
      switchText: "Already have an account?",
      switchButton: "Login",
    },
    form: {
      email: "Email",
      password: "Password",
      forgotPassword: "Forgot your password?",
    },
    errors: {
      title: "Authentication Error",
      emailNotVerified: "Your email is not verified. Please check your inbox for the verification link.",
      emailRequiredForReset: "Please enter your email to reset your password.",
      invalidEmail: "The email address is not valid.",
      userDisabled: "This user account has been disabled.",
      userNotFound: "No account found with this email.",
      wrongPassword: "The password is incorrect.",
      emailInUse: "This email address is already in use by another account.",
      tooManyRequests: "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.",
      default: "An unknown error occurred. Please try again.",
    },
    info: {
      title: "Check your Email",
      verificationEmailSent: "Registration successful! A verification link has been sent to your email address. Please verify it before logging in.",
      passwordResetSent: "A password reset link has been sent to your email.",
    },
    toasts: {
      loginSuccess: {
        title: "Welcome!",
        description: "You have successfully logged in.",
      },
    },
  },
  potholeUploader: {
    cardTitle: "Report a Pothole",
    cardDescription: "Use your device's camera to report a pothole. This ensures the traceability and location of the report.",
    idle: {
      uploadButton: "Take Photo",
    },
    privacy: {
      title: "How is my data used?",
      description: "Your email and user information are kept private and never shared. The location of your report is used anonymously to create aggregated heatmaps for infrastructure analysis. Your contribution is valuable and confidential.",
    },
    loading: {
      analyzing: "AI is analyzing your photo...",
      submitting: "Submitting...",
    },
    previewing: {
      imageAlt: "Pothole preview",
      analyzeButton: "Analyze Pothole",
    },
    confirming: {
      imageAlt: "Pothole",
      analysisResults: "Analysis Results",
      surfaceArea: "Surface Area",
      approxDimensions: "Approx. Dimensions",
      approxVolume: "Approx. Volume",
      location: "Location",
      gettingLocation: "Getting location...",
      locationUnavailable: "Unavailable",
      aiSummary: "AI Summary",
      discardButton: "Discard",
      submitButton: "Confirm & Submit",
      noPotholeFound: {
        title: "No Pothole Detected",
        description: "The AI could not identify a pothole in this photo. Reports can only be submitted if a pothole is detected."
      },
      locationError: {
        title: "Location Access Required",
        description: "GPS access is mandatory. Please enable location permissions in your browser and phone settings to submit a report."
      }
    },
    success: {
      title: "Report Submitted!",
      description: "Thank you for your contribution to improving our city's streets!",
      resetButton: "Submit Another Report",
    },
    error: {
      title: "An Error Occurred",
      description: "Something went wrong. Please try again.",
      resetButton: "Try Again",
    },
    toast: {
        analysisFailed: {
            title: "AI Analysis Failed"
        },
        submissionFailed: {
            title: "Submission Failed"
        }
    }
  },
  reportsPage: {
    title: "Pothole Reports",
    description: "Aggregated data from all citizen-submitted pothole reports.",
    tableView: "Table",
    mapView: "Map",
    leaderboardView: "Leaders"
  },
  reportTable: {
    exportButton: "Export to CSV",
    noReports: "No reports submitted yet.",
    photoAlt: "Pothole report photo",
    anonymous: "Anonymous",
    headers: {
        photo: "Photo",
        dateTime: "Date & Time",
        reporter: "Reporter",
        location: "Location",
        analysis: "AI Analysis",
        aiDescription: "AI Description"
    }
  },
  leaderboard: {
      title: "Leaderboard",
      noData: "Not enough data to display the leaderboard.",
      headers: {
          rank: "Rank",
          reporter: "Reporter",
          score: "Score",
          reports: "Reports"
      }
  }
};
