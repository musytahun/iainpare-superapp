"use client";
import { useQuery } from "@apollo/client";
import { GET_INDEKSASI } from "@/graphql/references/indeksasi.graphql";
import IndeksasiForm from "@/components/layout-references/IndeksasiForm";
import { useParams } from "next/navigation";

export default function EditIndeksasiPage() {
  const { id } = useParams();
  const { data } = useQuery(GET_INDEKSASI);
  const getIndeksasi = data?.getIndeksasi?.find((r: any) => r.id === id);

  if (!getIndeksasi) return <p>Loading...</p>;

  return <IndeksasiForm getIndeksasi={getIndeksasi} />;
}
