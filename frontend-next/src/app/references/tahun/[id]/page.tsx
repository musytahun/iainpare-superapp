"use client";
import { useQuery } from "@apollo/client";
import { GET_TAHUN } from "@/graphql/references/tahun.graphql";
import TahunForm from "@/components/layout-references/TahunForm";
import { useParams } from "next/navigation";

export default function EditTahunPage() {
  const { id } = useParams();
  const { data } = useQuery(GET_TAHUN);
  const getTahun = data?.getTahun?.find((r: any) => r.id === id);

  if (!getTahun) return <p>Loading...</p>;

  return <TahunForm getTahun={getTahun} />;
}
