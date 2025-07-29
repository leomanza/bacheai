import { Button } from "@/components/ui/button";
import { ArrowRight, HardHat, CheckCircle, Camera } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function BacheAILandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center md:py-24">
          <div className="flex flex-col items-center">
            <div className="flex justify-center mb-4">
              <Image
                src="/bacheai-isologo.png"
                alt="BacheAI Isologo"
                width={300}
                height={75}
              />
            </div>
            <p className="max-w-2xl text-muted-foreground md:text-xl">
              Una herramienta de ciencia ciudadana para el monitoreo de baches
              en las calles. Ayuda a mejorar tu ciudad reportando problemas
              de infraestructura de forma rápida y sencilla.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/reportar">
                  Comenzar a Reportar <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="bg-muted py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                ¿Cómo funciona?
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                Participar es muy fácil. Sigue estos simples pasos para
                convertirte en un científico ciudadano.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                  <Camera className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">1. Toma una foto</h3>
                <p className="mt-2 text-muted-foreground">
                  Usa la app para activar tu cámara y tomar una foto del bache.
                  Esto garantiza la ubicación y hora exactas del reporte.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                  <HardHat className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">2. Análisis con IA</h3>
                <p className="mt-2 text-muted-foreground">
                  Nuestra inteligencia artificial analizará la foto para estimar
                  el tamaño, volumen y otras características del bache.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">3. Confirma y Envía</h3>
                <p className="mt-2 text-muted-foreground">
                  Revisa los datos, confirma la ubicación (detectada
                  automáticamente) y envía tu reporte. ¡Así de simple!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Project Motivation Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                El por qué de BacheAI
              </h2>
              <p className="mt-4 text-muted-foreground">
                Esta aplicación fue creada como una herramienta independiente
                para que los ciudadanos puedan reportar de manera fácil y eficiente
                los problemas de infraestructura urbana, comenzando por los baches.
              </p>
              <p className="mt-4 text-muted-foreground">
                El objetivo es facilitar y agilizar la recolección de datos
                que puedan ser utilizados por las municipalidades para priorizar
                reparaciones y mejorar la calidad de vida de todos.
                <strong>
                  BacheAI es un proyecto no oficial y sin afiliación directa
                  con ninguna entidad gubernamental.
                </strong>
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src="/landing-image.png"
                data-ai-hint="pothole street"
                alt="Bache en una calle urbana"
                width={500}
                height={300}
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
