"use client";
import { useQuery } from "@apollo/client";
import { GET_JABATAN_FUNGSIONAL } from "@/graphql/references/jabatan_fungsional.graphql";
import JabatanFungsionalForm from "@/components/layout-references/JabatanFungsionalForm";
import { useParams } from "next/navigation";

export default function EditJabatanFungsionalPage() {
  const { id } = useParams();
  const { data } = useQuery(GET_JABATAN_FUNGSIONAL);
  const getJabatanFungsional = data?.getJabatanFungsional?.find((r: any) => r.id === id);

  if (!getJabatanFungsional) return <p>Loading...</p>;

  return <JabatanFungsionalForm getJabatanFungsional={getJabatanFungsional} />;
}
