"use client";
import { useQuery } from "@apollo/client";
import { GET_JENIS_PUBLIKASI } from "@/graphql/references/jenis_publikasi.graphql";
import JenisPublikasiForm from "@/components/layout-references/JenisPublikasiForm";
import { useParams } from "next/navigation";

export default function EditJenisPublikasiPage() {
  const { id } = useParams();
  const { data } = useQuery(GET_JENIS_PUBLIKASI);
  const getJenisPublikasi = data?.getJenisPublikasi?.find((r: any) => r.id === id);

  if (!getJenisPublikasi) return <p>Loading...</p>;

  return <JenisPublikasiForm getJenisPublikasi={getJenisPublikasi} />;
}
