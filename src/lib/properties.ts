
import { supabase } from "./supabase";

export interface Property {
    id: string;
    title: string;
    description: string;
    price_per_month: number;
    location: string;
    accessibility_rating: number;
    clima_data: {
        jan_temp: number;
        humidity: number;
    };
}

export async function getProperties(): Promise<Property[]> {
    const { data, error } = await supabase
        .from("properties")
        .select("*");

    if (error) {
        console.error("Error fetching properties:", error);
        return [];
    }

    // Cast JSONB safely if needed, though supabase-js usually tries to match
    return data as unknown as Property[];
}
