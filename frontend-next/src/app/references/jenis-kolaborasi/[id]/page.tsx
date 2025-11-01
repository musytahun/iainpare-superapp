"use client";
import { useQuery } from "@apollo/client";
import { GET_JENIS_KOLABORASI } from "@/graphql/references/jenis_kolaborasi.graphql";
import JenisKolaborasiForm from "@/components/layout-references/JenisKolaborasiForm";
import { useParams } from "next/navigation";

export default function EditJenisKolaborasiPage() {
  const { id } = useParams();
  const { data } = useQuery(GET_JENIS_KOLABORASI);
  const getJenisKolaborasi = data?.getJenisKolaborasi?.find((r: any) => r.id === id);

  if (!getJenisKolaborasi) return <p>Loading...</p>;

  return <JenisKolaborasiForm getJenisKolaborasi={getJenisKolaborasi} />;
}
