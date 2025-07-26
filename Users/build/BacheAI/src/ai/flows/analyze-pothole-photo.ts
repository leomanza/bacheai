'use server';

/**
 * @fileOverview An AI agent that analyzes a photo of a street pothole.
 *
 * - analyzePotholePhoto - A function that handles the analysis of the pothole photo.
 * - AnalyzePotholePhotoInput - The input type for the analyzePotholePhoto function.
 * - AnalyzePotholePhotoOutput - The return type for the analyzePotholePhoto function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzePotholePhotoInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a pothole, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzePotholePhotoInput = z.infer<typeof AnalyzePotholePhotoInputSchema>;

const AnalyzePotholePhotoOutputSchema = z.object({
  isPothole: z.boolean().describe('Whether a pothole is clearly visible in the photo.'),
  surfaceArea: z.number().describe('The estimated surface area of the pothole in square meters (m^2).'),
  approxDimensions: z.string().describe('The approximate dimensions of the pothole (e.g., "30cm x 50cm").'),
  approxVolume: z.number().describe('The estimated volume of the pothole in cubic meters (m^3).'),
  aiSummary: z.string().describe('A descriptive summary of the pothole and its surroundings. The description must be in Spanish.'),
  score: z.number().int().describe('A score from 1 to 100 representing the severity of the pothole, considering size, depth, and potential danger.'),
  modelVersion: z.string().describe('The name of the AI model used for the analysis.'),
});
export type AnalyzePotholePhotoOutput = z.infer<typeof AnalyzePotholePhotoOutputSchema>;

export async function analyzePotholePhoto(input: AnalyzePotholePhotoInput): Promise<AnalyzePotholePhotoOutput> {
  return analyzePotholePhotoFlow(input);
}

const MODEL_NAME = 'googleai/gemini-2.0-flash';

const prompt = ai.definePrompt({
  name: 'analyzePotholePhotoPrompt',
  input: {schema: AnalyzePotholePhotoInputSchema},
  output: {schema: AnalyzePotholePhotoOutputSchema.omit({ modelVersion: true })},
  prompt: `You are an expert civil engineer specializing in road maintenance.

  Your task is to analyze the provided photo of a street pothole and return a detailed analysis. Assume there is a standard reference object in the photo, like a coin or a shoe, to estimate dimensions, even if not explicitly visible.

  Provide the following information:
  1.  **isPothole**: A boolean indicating if a pothole is clearly visible.
  2.  **surfaceArea**: Estimate the surface area in square meters (m^2).
  3.  **approxDimensions**: Estimate the approximate dimensions (e.g., "30cm x 50cm").
  4.  **approxVolume**: Estimate the volume in cubic meters (m^3).
  5.  **aiSummary**: A descriptive summary in Spanish, noting the location, apparent cause (e.g., water damage), and any surrounding context (e.g., near a sewer, in a crosswalk).
  6.  **score**: A severity score from 1 to 100, where 1 is a minor crack and 100 is a major, dangerous pothole.

  Analyze the following photo:
  Photo: {{media url=photoDataUri}}`,
  model: MODEL_NAME,
  config: {
    safetySettings: [
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
    ],
  },
});

const analyzePotholePhotoFlow = ai.defineFlow(
  {
    name: 'analyzePotholePhotoFlow',
    inputSchema: AnalyzePotholePhotoInputSchema,
    outputSchema: AnalyzePotholePhotoOutputSchema,
  },
  async input => {
    try {
      const {output} = await prompt(input);
      if (!output) {
        throw new Error("Prompt returned null or undefined output.");
      }
      return {
        ...output,
        modelVersion: MODEL_NAME,
      };
    } catch (error) {
      console.error('analyze-pothole-photo.ts: Error within flow:', error);
      throw error;
    }
  }
);
