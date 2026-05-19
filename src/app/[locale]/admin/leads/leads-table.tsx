"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { RefreshCw, LogOut } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import type { Lead } from "@/lib/types/lead";
import { useRouter, useParams } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

interface Props {
  initialLeads: Lead[];
}

const EXPERIENCE_LABELS: Record<string, string> = {
  never: "Primera vez",
  tourist: "Turista",
  extended: "Estancia larga",
  regular: "Habitual",
};

const LOCATION_LABELS: Record<string, string> = {
  fuengirola_mijas: "Fuengirola / Mijas",
  malaga_capital: "Málaga Capital",
  rincon_torre: "Rincón / Torre del Mar",
  torrox_nerja: "Torrox / Nerja",
  unsure: "Sin preferencia",
};

const DURATION_LABELS: Record<string, string> = {
  "1_3_months": "1–3 m",
  "3_6_months": "3–6 m",
  "6_9_months": "6–9 m",
  more_9_months: "+9 m",
};

const ARRIVAL_LABELS: Record<string, string> = {
  oct: "Oct",
  nov: "Nov",
  dec: "Dic",
  jan: "Ene",
  feb: "Feb",
  mar: "Mar",
  apr: "Abr",
  other: "Flexible",
};

export function AdminLeadsTable({ initialLeads }: Props) {
  const router = useRouter();
  const { locale } = useParams<{ locale: string }>();

  const handleLogout = async () => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
    await supabase.auth.signOut();
    router.push(`/${locale}/admin/login`);
    router.refresh();
  };

  return (
    <Card className="shadow-lg border-none">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-3xl font-bold text-[#333333]">
            Gestion de Leads (CRM)
          </CardTitle>
          <CardDescription className="text-lg text-slate-500">
            Listado de interesados y respuestas del cuestionario
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => router.refresh()}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualizar
          </Button>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-red-300 text-red-600 hover:bg-red-600 hover:text-white"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Salir
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border bg-white">
          <Table>
            <TableCaption>Lista de leads recientes</TableCaption>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="py-4 font-bold text-[#333333]">
                  Fecha
                </TableHead>
                <TableHead className="font-bold text-[#333333]">
                  Nombre
                </TableHead>
                <TableHead className="font-bold text-[#333333]">
                  Email
                </TableHead>
                <TableHead className="font-bold text-[#333333]">
                  Teléfono
                </TableHead>
                <TableHead className="font-bold text-[#333333]">
                  Experiencia
                </TableHead>
                <TableHead className="font-bold text-[#333333]">
                  Ubicación
                </TableHead>
                <TableHead className="font-bold text-[#333333]">
                  Duración / Llegada
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialLeads.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No hay leads registrados aun.
                  </TableCell>
                </TableRow>
              ) : (
                initialLeads.map((lead) => {
                  const q = lead.data?.questionnaire ?? {};
                  const experience = q.costaDelSolExperience as
                    | string
                    | undefined;
                  const location = q.preferredLocation as string | undefined;
                  const duration = q.stayDuration as string | undefined;
                  const arrival = q.arrivalMonth as string | undefined;

                  return (
                    <TableRow
                      key={lead.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <TableCell className="font-medium text-slate-600">
                        {format(
                          new Date(lead.created_at),
                          "d MMM yyyy, HH:mm",
                          {
                            locale: es,
                          },
                        )}
                      </TableCell>
                      <TableCell className="font-semibold text-primary">
                        {lead.full_name || "N/A"}
                      </TableCell>
                      <TableCell>{lead.email}</TableCell>
                      <TableCell>{lead.phone || "—"}</TableCell>
                      <TableCell>
                        {experience ? (
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-full text-xs border">
                            {EXPERIENCE_LABELS[experience] ?? experience}
                          </span>
                        ) : (
                          <span className="text-slate-400 text-xs">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {location ? (
                          <span className="text-sm text-slate-700">
                            {LOCATION_LABELS[location] ?? location}
                          </span>
                        ) : (
                          <span className="text-slate-400 text-xs">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {duration || arrival ? (
                          <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                            {DURATION_LABELS[duration ?? ""] ?? duration ?? "—"}
                            {arrival
                              ? ` · ${ARRIVAL_LABELS[arrival] ?? arrival}`
                              : ""}
                          </span>
                        ) : (
                          <span className="text-slate-400 text-xs">—</span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
