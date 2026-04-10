import { getSupabaseAdmin } from "@/lib/supabase-admin";
import type { Lead } from "@/lib/types/lead";
import { AdminLeadsTable } from "./leads-table";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[AdminLeads] Error fetching leads:", error);
  }

  const leads: Lead[] = data ?? [];

  return (
    <div className="container mx-auto py-10 px-4">
      <AdminLeadsTable initialLeads={leads} />
    </div>
  );
}
