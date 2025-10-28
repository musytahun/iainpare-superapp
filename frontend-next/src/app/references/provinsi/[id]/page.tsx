"use client";
import { useQuery } from "@apollo/client";
import { GET_PROVINSI } from "@/graphql/references/provinsi.graphql";
import ProvinsiForm from "@/components/layout-references/ProvinsiForm";
import { useParams } from "next/navigation";

export default function EditProvinsiPage() {
  const { id } = useParams();
  const { data } = useQuery(GET_PROVINSI);
  const getProvinsi = data?.getProvinsi?.find((r: any) => r.id === id);

  if (!getProvinsi) return <p>Loading...</p>;

  return <ProvinsiForm getProvinsi={getProvinsi} />;
}
