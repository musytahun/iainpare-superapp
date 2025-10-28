"use client";
import { useQuery } from "@apollo/client";
import { GET_SUMBER_DANA } from "@/graphql/references/sumber_dana.graphql";
import SumberDanaForm from "@/components/layout-references/SumberDanaForm";
import { useParams } from "next/navigation";

export default function EditSumberDanaPage() {
  const { id } = useParams();
  const { data } = useQuery(GET_SUMBER_DANA);
  const getSumberDana = data?.getSumberDana?.find((r: any) => r.id === id);

  if (!getSumberDana) return <p>Loading...</p>;

  return <SumberDanaForm getSumberDana={getSumberDana} />;
}
