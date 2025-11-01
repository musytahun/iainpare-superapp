"use client";
import { useQuery } from "@apollo/client";
import { GET_KARYA_ILMIAH } from "@/graphql/references/karya_ilmiah.graphql";
import KaryaIlmiahForm from "@/components/layout-references/KaryaIlmiahForm";
import { useParams } from "next/navigation";

export default function EditKaryaIlmiahPage() {
  const { id } = useParams();
  const { data } = useQuery(GET_KARYA_ILMIAH);
  const getKaryaIlmiah = data?.getKaryaIlmiah?.find((r: any) => r.id === id);

  if (!getKaryaIlmiah) return <p>Loading...</p>;

  return <KaryaIlmiahForm getKaryaIlmiah={getKaryaIlmiah} />;
}
