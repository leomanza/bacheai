"use server";

import { analyzePotholePhoto as analyzePotholePhotoFlow } from "@/ai/flows/analyze-pothole-photo";
import { db, storage } from "@/lib/firebase";
import { addDoc, collection, getDocs, query, orderBy } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import type { PotholeReport, ReportIssueInput } from "@/lib/types";
import { z } from "zod";
import { generateAlias } from "@/lib/utils";
import { createHash } from "crypto";
import { reportIssue as reportIssueFlow } from "@/ai/flows/report-issue";

export async function analyzePotholePhoto(photoDataUri: string) {
  try {
    const result = await analyzePotholePhotoFlow({ photoDataUri });
    return { success: true, ...result };
  } catch (e: any) {
    console.error("actions.ts: Caught error in analyzePotholePhoto:", e);
    return { success: false, error: `Failed to analyze photo with AI. Details: ${e.message}` };
  }
}

const ReportSchema = z.object({
  userId: z.string(),
  userEmail: z.string().email(),
  alias: z.string(),
  timestamp: z.string().datetime(),
  location: z.string(),
  aiSummary: z.string(),
  photoUrl: z.string().url(),
  photoHash: z.string(),
  modelVersion: z.string(),
  surfaceArea: z.number(),
  approxDimensions: z.string(),
  approxVolume: z.number(),
  score: z.number().int(),
  isPothole: z.boolean(),
});

export async function submitPotholeReport(
  reportData: Omit<PotholeReport, "id" | "alias" | "photoUrl" | "photoHash"> & { photoDataUri: string }
) {
  // 1. Calculate photo hash
  const photoBuffer = Buffer.from(reportData.photoDataUri.split(",")[1], 'base64');
  const photoHash = createHash('sha256').update(photoBuffer).digest('hex');
  
  // 2. Upload photo to Storage
  const storageRef = ref(storage, `pothole_reports/${photoHash}.jpg`);
  let photoUrl = "";
  try {
    const uploadResult = await uploadString(storageRef, reportData.photoDataUri, 'data_url', {
        contentType: 'image/jpeg'
    });
    photoUrl = await getDownloadURL(uploadResult.ref);
  } catch(error: any) {
      console.error("Error uploading photo to Firebase Storage:", error);
      return { success: false, error: `Failed to upload photo: ${error.message}`};
  }

  const finalReportData = {
    ...reportData,
    alias: generateAlias(reportData.userId),
    photoUrl,
    photoHash,
  };
  
  // remove photoDataUri before saving to DB
  const { photoDataUri, ...dbData } = finalReportData;
  
  const validation = ReportSchema.safeParse(dbData);
  if (!validation.success) {
    console.error("Invalid report data:", validation.error.flatten());
    return { success: false, error: "Invalid report data." };
  }

  try {
    const docRef = await addDoc(collection(db, "reports"), validation.data);
    const newReport: PotholeReport = {
      ...validation.data,
      id: docRef.id,
    };
    return { success: true, report: newReport };
  } catch (error: any) {
    console.error("Error submitting report to Firestore:", error);
    return { success: false, error: `Failed to save report to database: ${error.message}` };
  }
}

export type PotholeReportsResponse = {
    success: boolean;
    reports: PotholeReport[];
    error?: string;
}

export async function getPotholeReports(): Promise<PotholeReportsResponse> {
    try {
        const reportsCol = collection(db, "reports");
        const q = query(reportsCol, orderBy("timestamp", "desc"));
        const reportSnapshot = await getDocs(q);
        const reports: PotholeReport[] = reportSnapshot.docs.map(doc => ({
            id: doc.id,
            ...(doc.data() as Omit<PotholeReport, "id">),
        }));
        return { success: true, reports: reports };
    } catch (error) {
        console.error("Error fetching reports:", error);
        return { success: false, reports: [], error: "Could not fetch reports." };
    }
}

export async function updateUserProfilePhoto(userId: string, photoDataUrl: string) {
    if (!userId) {
        return { success: false, error: "User not authenticated." };
    }
    try {
        const storageRef = ref(storage, `avatars/${userId}.jpg`);
        const uploadResult = await uploadString(storageRef, photoDataUrl, 'data_url', {
            contentType: 'image/jpeg'
        });
        const downloadURL = await getDownloadURL(uploadResult.ref);
        return { success: true, photoUrl: downloadURL };
    } catch (error: any) {
        console.error("Error updating profile photo:", error);
        return { success: false, error: `Failed to update profile picture: ${error.message}` };
    }
}

export async function reportIssue(
  data: ReportIssueInput
): Promise<{ success: boolean; error?: string }> {
  try {
    const result = await reportIssueFlow(data);
    return { success: result.success };
  } catch (e: any) {
    console.error('actions.ts: Error reporting issue', e);
    return { success: false, error: e.message || 'An unknown error occurred.' };
  }
}
