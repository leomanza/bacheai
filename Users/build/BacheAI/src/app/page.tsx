import { Button } from "@/components/ui/button";
import { ArrowRight, HardHat, CheckCircle, Bird, Atom, Users, Shield } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function InstitutionalLandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center md:py-24">
          <div className="flex flex-col items-center">
            <Image
              src="/earth-data-provenance-logo.png"
              alt="Earth Data Provenance Logo"
              width={400}
              height={100}
              className="mb-6"
              data-ai-hint="logo globe"
            />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Datos que construyen un futuro mejor.
            </h1>
            <p className="mt-6 max-w-3xl text-muted-foreground md:text-xl">
              Creamos herramientas de ciencia ciudadana impulsadas por inteligencia artificial para generar datos verificables y de impacto social. Tu participación es la pieza clave del cambio.
            </p>
          </div>
        </section>

        {/* Manifesto Section */}
        <section id="manifesto" className="bg-muted py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Nuestro Manifiesto
            </h2>
             <div className="mt-8 max-w-4xl mx-auto grid gap-8 md:grid-cols-2 text-left">
                <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground flex-shrink-0">
                        <Users className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Ciencia Ciudadana</h3>
                        <p className="mt-2 text-muted-foreground">
                            Creemos en el poder de la comunidad. Cada ciudadano puede ser un científico, un recolector de datos, un agente de cambio. Tu perspectiva única es nuestro activo más valioso.
                        </p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground flex-shrink-0">
                        <CheckCircle className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Datos con Propósito</h3>
                        <p className="mt-2 text-muted-foreground">
                            No recolectamos datos, generamos evidencia. Cada reporte es una pieza de un rompecabezas más grande, con el objetivo de impulsar acciones concretas y mejorar la calidad de vida.
                        </p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground flex-shrink-0">
                        <Atom className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">IA Responsable</h3>
                        <p className="mt-2 text-muted-foreground">
                           Utilizamos la inteligencia artificial como una herramienta para potenciar el análisis y la verificación, garantizando que cada contribución sea precisa, trazable y valiosa.
                        </p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground flex-shrink-0">
                        <Shield className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Privacidad por Diseño</h3>
                        <p className="mt-2 text-muted-foreground">
                           Se preserva la privacidad de los ciudadanos mediante reportes anónimos. Cada usuario es identificado por un alias único, generado a partir del hash de su userId.
                        </p>
                    </div>
                </div>
                 <div className="flex items-start gap-4 md:col-span-2 md:justify-center md:text-center md:items-center">
                   <div className="flex-shrink-0 md:flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <ArrowRight className="h-6 w-6" />
                    </div>
                   </div>
                    <div className="md:text-left">
                        <h3 className="text-xl font-semibold">Acción Abierta</h3>
                        <p className="mt-2 text-muted-foreground">
                           Nuestros proyectos son de código abierto y los datos generados son un bien público. Fomentamos la transparencia y la colaboración para maximizar el impacto positivo.
                        </p>
                    </div>
                </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Nuestros Proyectos Activos
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                Explora nuestras iniciativas y súmate a la que más te interese.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              {/* BacheAI Card */}
              <div className="bg-card border rounded-lg shadow-lg overflow-hidden flex flex-col">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <HardHat className="h-7 w-7" />
                    </div>
                    <h3 className="text-2xl font-bold">BacheAI</h3>
                  </div>
                  <p className="text-muted-foreground mb-6 min-h-[60px]">
                    Reporta baches en tu ciudad. Usa la cámara de tu celular para capturar fotos que nuestra IA analiza para medir su impacto.
                  </p>
                </div>
                <div className="mt-auto bg-muted p-6">
                    <Button asChild className="w-full">
                        <Link href="/bacheai">
                        Ir a BacheAI <ArrowRight className="ml-2" />
                        </Link>
                    </Button>
                </div>
              </div>

              {/* Flockia Card */}
              <div className="bg-card border rounded-lg shadow-lg overflow-hidden flex flex-col">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                     <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white">
                        <Bird className="h-7 w-7" />
                    </div>
                    <h3 className="text-2xl font-bold">Flockia (Palomeitor)</h3>
                  </div>
                  <p className="text-muted-foreground mb-6 min-h-[60px]">
                    Participa en el monitoreo de la paloma manchada (Columba maculosa) para estudios de expansión de especies.
                  </p>
                </div>
                <div className="mt-auto bg-muted p-6">
                    <Button asChild className="w-full" variant="secondary">
                        <Link href="https://flockia.dataprovenance.earth">
                        Ir a Flockia <ArrowRight className="ml-2" />
                        </Link>
                    </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
