"use client";
import { useQuery } from "@apollo/client";
import { GET_KELOMPOK_KEILMUAN } from "@/graphql/references/kelompok_keilmuan.graphql";
import KelompokKeilmuanForm from "@/components/layout-references/KelompokKeilmuanForm";
import { useParams } from "next/navigation";

export default function EditKelompokKeilmuanPage() {
  const { id } = useParams();
  const { data } = useQuery(GET_KELOMPOK_KEILMUAN);
  const getKelompokKeilmuan = data?.getKelompokKeilmuan?.find((r: any) => r.id === id);

  if (!getKelompokKeilmuan) return <p>Loading...</p>;

  return <KelompokKeilmuanForm getKelompokKeilmuan={getKelompokKeilmuan} />;
}
