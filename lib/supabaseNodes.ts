import { supabase } from "./supabaseClient";

export async function updateNode(node: any) {
  const { error } = await supabase
    .from("nodes")
    .upsert(node, { onConflict: "id" });

  if (error) throw error;
}
