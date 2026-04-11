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
                  Telefono
                </TableHead>
                <TableHead className="font-bold text-[#333333]">
                  Intereses
                </TableHead>
                <TableHead className="font-bold text-[#333333]">
                  Duracion
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialLeads.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No hay leads registrados aun.
                  </TableCell>
                </TableRow>
              ) : (
                initialLeads.map((lead) => (
                  <TableRow
                    key={lead.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <TableCell className="font-medium text-slate-600">
                      {format(new Date(lead.created_at), "d MMM yyyy, HH:mm", {
                        locale: es,
                      })}
                    </TableCell>
                    <TableCell className="font-semibold text-primary">
                      {lead.full_name || "N/A"}
                    </TableCell>
                    <TableCell>{lead.email}</TableCell>
                    <TableCell>{lead.phone || "N/A"}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {lead.data?.questionnaire?.interests?.map(
                          (tag: string) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full text-xs border"
                            >
                              {tag}
                            </span>
                          ),
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        {lead.data?.questionnaire?.duration}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
