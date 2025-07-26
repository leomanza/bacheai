import { z } from "zod";

export type PotholeReport = {
  id: string;
  userId: string;
  userEmail: string;
  alias: string;
  timestamp: string;
  location: string;
  aiSummary: string;
  photoUrl: string;
  photoHash: string;
  modelVersion: string;
  surfaceArea: number; // in square meters
  approxDimensions: string; // e.g., "30cm x 50cm"
  approxVolume: number; // in cubic meters
  score: number; // Calculated score for leaderboard
};

export type LeaderboardEntry = {
  userId: string;
  alias: string;
  totalScore: number;
  reportCount: number;
  rank: number;
};

export const ReportIssueInputSchema = z.object({
  issueType: z.string().describe("The type of issue being reported (e.g., 'bug', 'suggestion', 'other')."),
  description: z.string().min(10, { message: "Please provide a more detailed description." }).describe('A detailed description of the issue.'),
  userEmail: z.string().email().optional().describe("The user's email, if they are logged in."),
  userId: z.string().optional().describe("The user's ID, if they are logged in."),
  page: z.string().optional().describe("The page the user was on when they reported the issue."),
});
export type ReportIssueInput = z.infer<typeof ReportIssueInputSchema>;
