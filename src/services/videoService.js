import {createClient} from "@supabase/supabase-js";

const PROJECT_URL = "https://fopcsuwtdbaxyryfnquv.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvcGNzdXd0ZGJheHlyeWZucXV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyMTI5MDYsImV4cCI6MTk4Mzc4ODkwNn0.UTE_UvzwSCWnmD8XYzyspT2-qZZOzvjgPh4wtnlSoMw";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("video")
                .select("*")

        }
    }
}