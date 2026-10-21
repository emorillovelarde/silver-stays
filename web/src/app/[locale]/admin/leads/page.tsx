import { getSupabaseAdmin } from "@/lib/supabase-admin";
import type { Lead } from "@/lib/types/lead";
import { AdminLeadsTable } from "./leads-table";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  let leads: Lead[] = [];
  let configError = false;

  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { data, error } = await supabaseAdmin
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[AdminLeads] Error fetching leads:", error);
    }

    leads = data ?? [];
  } catch (err) {
    console.error("[AdminLeads] Configuration error:", err);
    configError = true;
  }

  if (configError) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold text-red-800 mb-2">
            Configuration Error
          </h2>
          <p className="text-red-700">
            SUPABASE_SERVICE_ROLE_KEY is not configured. Add it to your
            environment variables in Vercel and redeploy.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <AdminLeadsTable initialLeads={leads} />
    </div>
  );
}
