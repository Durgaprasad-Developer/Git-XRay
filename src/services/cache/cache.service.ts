import { createClient } from "@supabase/supabase-js";
import { AnalysisReport } from "@/types/report.types";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Create Supabase client only if keys are present
const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

// Simple in-memory fallback cache
const memoryCache = new Map<string, { report: AnalysisReport; timestamp: number }>();
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours TTL

export class CacheService {
  /**
   * Tries to fetch a cached report for a username.
   * If Supabase is configured, queries database; otherwise falls back to memory.
   */
  static async getCachedReport(username: string): Promise<AnalysisReport | null> {
    const cleanUsername = username.toLowerCase().trim();

    // 1. Memory cache check
    const cachedMem = memoryCache.get(cleanUsername);
    if (cachedMem) {
      if (Date.now() - cachedMem.timestamp < CACHE_TTL_MS) {
        console.log(`[Cache Hit - Memory] Found cached report for: ${cleanUsername}`);
        return cachedMem.report;
      } else {
        memoryCache.delete(cleanUsername); // Expired
      }
    }

    // 2. Supabase cache check
    if (supabase) {
      console.log(`[Cache] Checking Supabase cache for: ${cleanUsername}`);
      try {
        const { data, error } = await supabase
          .from("cached_reports")
          .select("report_json, created_at")
          .eq("username", cleanUsername)
          .single();

        if (error || !data) {
          return null;
        }

        const createdAt = new Date(data.created_at).getTime();
        if (Date.now() - createdAt < CACHE_TTL_MS) {
          console.log(`[Cache Hit - Supabase] Found cached report for: ${cleanUsername}`);
          const report = data.report_json as AnalysisReport;
          // Sync to memory cache for fast subsequent hits
          memoryCache.set(cleanUsername, { report, timestamp: createdAt });
          return report;
        } else {
          // Stale cache, delete it
          await supabase.from("cached_reports").delete().eq("username", cleanUsername);
        }
      } catch (err) {
        console.warn("[Cache Warning] Supabase read failed:", err);
      }
    }

    return null;
  }

  /**
   * Caches a newly generated report.
   */
  static async setCachedReport(username: string, report: AnalysisReport): Promise<void> {
    const cleanUsername = username.toLowerCase().trim();
    const now = Date.now();

    // 1. Set in memory
    memoryCache.set(cleanUsername, { report, timestamp: now });

    // 2. Set in Supabase
    if (supabase) {
      console.log(`[Cache] Writing report to Supabase cache for: ${cleanUsername}`);
      try {
        const { error } = await supabase.from("cached_reports").upsert({
          username: cleanUsername,
          report_json: report,
          created_at: new Date().toISOString(),
        }, { onConflict: "username" });

        if (error) {
          console.warn("[Cache Warning] Supabase upsert failed:", error.message);
        }
      } catch (err) {
        console.warn("[Cache Warning] Supabase write failed:", err);
      }
    }
  }
}
