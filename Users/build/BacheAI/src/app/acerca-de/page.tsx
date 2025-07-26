import { Info } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Info className="h-8 w-8 text-primary" />
        <h1 className="text-4xl font-bold font-headline">Acerca de BacheAI</h1>
      </div>

      <div className="prose prose-lg max-w-none text-foreground">
        <p>
          <strong>BacheAI</strong> es una aplicación de ciencia ciudadana diseñada para que reportar baches en las calles sea rápido, fácil y accesible para todos.
        </p>

        <h2 className="text-2xl font-semibold mt-8 border-b pb-2">Nuestra Misión</h2>
        <p>
          Esta herramienta fue creada como un proyecto comunitario e independiente para mejorar la infraestructura de nuestras ciudades. 
          Creemos en el poder de la tecnología y la colaboración ciudadana para generar un impacto positivo.
        </p>
        <p>
          El objetivo es facilitar la recolección de datos precisos y verificables sobre el estado de las calles, para que las autoridades locales puedan tomar decisiones informadas y priorizar las reparaciones de manera más eficiente.
        </p>
        
        <blockquote className="border-l-4 border-primary pl-4 py-2 my-6 bg-muted">
          <p className="text-base font-medium text-foreground">
            <strong>Nota Importante:</strong> BacheAI es una aplicación no oficial y sin afiliación directa con ninguna entidad gubernamental. Es una contribución independiente a la participación ciudadana y la mejora urbana.
          </p>
        </blockquote>

        <h2 className="text-2xl font-semibold mt-8 border-b pb-2">¿Cómo Funciona?</h2>
        <ol className="list-decimal pl-5 space-y-2 mt-4">
          <li><strong>Toma una Foto:</strong> Usa la cámara de tu dispositivo a través de la app. No se permite subir fotos de la galería para asegurar la trazabilidad y la ubicación precisa del reporte.</li>
          <li><strong>Análisis con IA:</strong> La aplicación utiliza inteligencia artificial para analizar la foto y estimar el área de superficie, las dimensiones y el volumen aproximado del bache.</li>
          <li><strong>Confirma y Envía:</strong> Revisa los datos, confirma tu ubicación (detectada automáticamente) y envía el reporte. ¡Tus datos se agregan al mapa global al instante!</li>
        </ol>

        <p className="mt-8">
          ¡Gracias por tu interés y por ayudarnos a construir una mejor ciudad!
        </p>
      </div>
    </div>
  );
}
