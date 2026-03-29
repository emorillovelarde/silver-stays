"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
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
import { Loader2, RefreshCw } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import type { Lead } from "@/lib/types/lead";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching leads:", error);
      } else {
        setLeads(data || []);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="shadow-lg border-none">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-1">
            <CardTitle className="text-3xl font-bold text-[#333333]">
              Gestión de Leads (CRM)
            </CardTitle>
            <CardDescription className="text-lg text-slate-500">
              Listado de interesados y respuestas del cuestionario
            </CardDescription>
          </div>
          <Button
            onClick={fetchLeads}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Actualizar
          </Button>
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
                    Intereses
                  </TableHead>
                  <TableHead className="font-bold text-[#333333]">
                    Duración
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      <div className="flex justify-center items-center text-muted-foreground">
                        <Loader2 className="mr-2 h-6 w-6 animate-spin" />{" "}
                        Cargando datos...
                      </div>
                    </TableCell>
                  </TableRow>
                ) : leads.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-24 text-center text-muted-foreground"
                    >
                      No hay leads registrados aún.
                    </TableCell>
                  </TableRow>
                ) : (
                  leads.map((lead) => (
                    <TableRow
                      key={lead.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <TableCell className="font-medium text-slate-600">
                        {format(
                          new Date(lead.created_at),
                          "d MMM yyyy, HH:mm",
                          { locale: es },
                        )}
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
    </div>
  );
}
