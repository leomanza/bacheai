"use client";

import { useState, useTransition, useEffect, type ChangeEvent } from "react";
import Image from "next/image";
import {
  Loader2,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Camera,
  BookOpen,
  ShieldCheck,
  Info,
  MapPinOff,
  Ruler,
  Cuboid,
  AreaChart,
} from "lucide-react";
import { analyzePotholePhoto, submitPotholeReport } from "@/app/actions";
import { useLocation } from "@/hooks/use-location";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import type { Dictionary } from "@/lib/i18n";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import type { PotholeReport } from "@/lib/types";
import { useAuth } from "@/hooks/use-auth";

type Stage =
  | "idle"
  | "previewing"
  | "analyzing"
  | "confirming"
  | "submitting"
  | "success"
  | "error";

interface PotholeUploaderProps {
  dict: Dictionary["potholeUploader"];
}

const MAX_WIDTH = 800;
const COMPRESSION_QUALITY = 0.7;

async function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = document.createElement('img');
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const scaleFactor = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleFactor;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error("Could not get canvas context"));
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', COMPRESSION_QUALITY));
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
}

export default function PotholeUploader({ dict }: PotholeUploaderProps) {
  const [stage, setStage] = useState<Stage>("idle");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dataUri, setDataUri] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const [aiSummary, setAiSummary] = useState("");
  const [isPothole, setIsPothole] = useState(false);
  const [surfaceArea, setSurfaceArea] = useState(0);
  const [approxDimensions, setApproxDimensions] = useState("");
  const [approxVolume, setApproxVolume] = useState(0);
  const [score, setScore] = useState(0);
  const [modelVersion, setModelVersion] = useState("");
  
  const { user, loading: authLoading } = useAuth();
  const [lastError, setLastError] = useState<string | null>(null);

  const { toast } = useToast();
  const location = useLocation();

  const handleError = (error: string | undefined, stageOnError: Stage) => {
    const errorMessage = error || "An unknown error occurred.";
    setLastError(errorMessage);
    toast({
      variant: "destructive",
      title: stageOnError === 'analyzing' ? dict.toast.analysisFailed.title : dict.toast.submissionFailed.title,
      description: errorMessage,
    });
    setStage("error");
  }

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
        try {
            const compressedDataUri = await compressImage(selectedFile);
            setPreviewUrl(compressedDataUri);
            setDataUri(compressedDataUri);
            setStage("previewing");
        } catch (error) {
            console.error("Image compression failed:", error);
            toast({
                variant: "destructive",
                title: "Error al procesar la imagen",
                description: "No se pudo comprimir la imagen. Inténtalo de nuevo."
            });
        }
    }
  };

  const handleAnalyze = () => {
    if (!dataUri) return;

    setStage("analyzing");

    startTransition(async () => {
      const result = await analyzePotholePhoto(dataUri);
      if (result.success) {
        setIsPothole(result.isPothole!);
        setAiSummary(result.aiSummary!);
        setSurfaceArea(result.surfaceArea!);
        setApproxDimensions(result.approxDimensions!);
        setApproxVolume(result.approxVolume!);
        setScore(result.score!);
        setModelVersion(result.modelVersion!);
        setStage("confirming");
      } else {
        handleError(result.error, 'analyzing');
      }
    });
  };

  const handleSubmit = () => {
    if (!dataUri || !user?.uid || !location.coordinates || !isPothole) return;

    setStage("submitting");

    const finalLocation = `${location.coordinates.lat.toFixed(5)}, ${location.coordinates.lng.toFixed(5)}`;

    const reportData: Omit<PotholeReport, "id" | "alias" | "photoUrl" | "photoHash"> & { photoDataUri: string } = {
      userId: user.uid,
      timestamp: new Date().toISOString(),
      location: finalLocation,
      aiSummary,
      surfaceArea,
      approxDimensions,
      approxVolume,
      score,
      isPothole,
      modelVersion,
      photoDataUri: dataUri,
    };

    startTransition(async () => {
      const result = await submitPotholeReport(reportData);
      if (result.success) {
        setStage("success");
      } else {
        handleError(result.error, 'submitting');
      }
    });
  };

  const reset = () => {
    setStage("idle");
    setPreviewUrl(null);
    setDataUri(null);
    setAiSummary("");
    setIsPothole(false);
    setSurfaceArea(0);
    setApproxDimensions("");
    setApproxVolume(0);
    setScore(0);
    setModelVersion("");
    setLastError(null);
  };

  const isLoading = stage === 'analyzing' || stage === 'submitting' || authLoading;
  const canUpload = !!user;
  const canSubmit = !isLoading && isPothole && !!location.coordinates;

  return (
    <Card className="w-full max-w-lg shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-center">
          {dict.cardTitle}
        </CardTitle>
        <CardDescription className="text-center">
          {dict.cardDescription}
        </CardDescription>
      </CardHeader>
      <CardContent className="min-h-[320px] flex flex-col justify-center items-center">
        {authLoading && (
            <Loader2 className="h-8 w-8 animate-spin text-primary"/>
        )}

        {stage === "idle" && !authLoading && canUpload && (
          <div className="w-full space-y-4 text-center">
            <div className="w-full px-6">
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ShieldCheck className="h-4 w-4"/>
                        <span>{dict.privacy.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground text-left">
                       {dict.privacy.description}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
            </div>
            <Button
              onClick={() => document.getElementById("file-upload")?.click()}
              size="lg"
            >
              <Camera className="mr-2 h-5 w-5" />
              {dict.idle.uploadButton}
            </Button>
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept="image/*"
              capture="environment"
              onChange={handleFileChange}
              disabled={!canUpload}
            />
          </div>
        )}

        {(isLoading && stage !== 'idle') && (
            <div className="flex flex-col items-center justify-center gap-4">
                <Loader2 className="h-16 w-16 animate-spin text-primary"/>
                <p className="text-lg text-muted-foreground">{stage === 'analyzing' ? dict.loading.analyzing : dict.loading.submitting}</p>
            </div>
        )}

        {stage === "previewing" && previewUrl && (
          <div className="w-full space-y-4">
            <Image
              src={previewUrl}
              alt={dict.previewing.imageAlt}
              width={400}
              height={300}
              className="rounded-lg object-cover w-full aspect-[4/3]"
            />
            <Button onClick={handleAnalyze} className="w-full" disabled={isPending}>
              {dict.previewing.analyzeButton}
            </Button>
          </div>
        )}

        {stage === 'confirming' && previewUrl && (
            <div className="w-full space-y-4 text-left">
                <Image src={previewUrl} alt={dict.confirming.imageAlt} width={400} height={300} className="rounded-lg object-cover w-full aspect-[4/3]"/>
                
                {!isPothole && (
                    <Alert variant="default" className="border-yellow-500 text-yellow-700">
                        <Info className="h-4 w-4" />
                        <AlertTitle>{dict.confirming.noPotholeFound.title}</AlertTitle>
                        <AlertDescription>
                            {dict.confirming.noPotholeFound.description}
                        </AlertDescription>
                    </Alert>
                )}

                {location.error && (
                     <Alert variant="destructive">
                        <MapPinOff className="h-4 w-4" />
                        <AlertTitle>{dict.confirming.locationError.title}</AlertTitle>
                        <AlertDescription>
                            {dict.confirming.locationError.description}
                        </AlertDescription>
                    </Alert>
                )}

                <Card>
                  <CardHeader><CardTitle>{dict.confirming.analysisResults}</CardTitle></CardHeader>
                  <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2"><AreaChart className="h-5 w-5 text-primary"/><p><strong>{surfaceArea.toFixed(2)}</strong> m²</p></div>
                    <div className="flex items-center gap-2"><Ruler className="h-5 w-5 text-primary"/><p>{approxDimensions}</p></div>
                    <div className="flex items-center gap-2"><Cuboid className="h-5 w-5 text-primary"/><p><strong>{approxVolume.toFixed(3)}</strong> m³</p></div>
                    <div className="flex items-center gap-2"><MapPin className="h-5 w-5 text-primary"/>{location.coordinates ? `${location.coordinates.lat.toFixed(4)}, ${location.coordinates.lng.toFixed(4)}` : dict.confirming.locationUnavailable}</div>
                  </CardContent>
                </Card>

                <div className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
                    <BookOpen className="h-5 w-5 text-primary mt-1 flex-shrink-0"/>
                    <div>
                        <p className="font-semibold">{dict.confirming.aiSummary}</p>
                        <p className="text-sm text-muted-foreground">{aiSummary}</p>
                    </div>
                </div>
            </div>
        )}
        
        {stage === "success" && (
          <div className="text-center space-y-4">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
            <h3 className="text-2xl font-semibold">{dict.success.title}</h3>
            <p className="text-muted-foreground">
              {dict.success.description}
            </p>
            <Button onClick={reset}>{dict.success.resetButton}</Button>
          </div>
        )}
        
        {stage === "error" && (
            <div className="text-center space-y-4">
            <AlertTriangle className="h-16 w-16 text-destructive mx-auto" />
            <h3 className="text-2xl font-semibold">{dict.error.title}</h3>
            <p className="text-muted-foreground max-w-sm">
              {lastError || dict.error.description}
            </p>
            <Button onClick={reset} variant="destructive">{dict.error.resetButton}</Button>
          </div>
        )}

      </CardContent>
      {stage === "confirming" && (
        <CardFooter className="grid grid-cols-2 gap-4">
          <Button variant="outline" onClick={reset} disabled={isLoading}>
            {dict.confirming.discardButton}
          </Button>
          <Button onClick={handleSubmit} disabled={!canSubmit}>
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {dict.loading.submitting}
                </>
            ) : (
                dict.confirming.submitButton
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
