"use client";
import { useQuery } from "@apollo/client";
import { GET_KABUPATEN_KOTA } from "@/graphql/references/kabupaten_kota.graphql";
import KabupatenKotaForm from "@/components/layout-references/KabupatenKotaForm";
import { useParams } from "next/navigation";

export default function EditKabupatenKotaPage() {
  const { id } = useParams();
  const { data } = useQuery(GET_KABUPATEN_KOTA);
  const getKabupatenKota = data?.getKabupatenKota?.find((r: any) => r.id === id);

  if (!getKabupatenKota) return <p>Loading...</p>;

  return <KabupatenKotaForm getKabupatenKota={getKabupatenKota} />;
}
