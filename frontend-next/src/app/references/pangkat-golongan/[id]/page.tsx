"use client";
import { useQuery } from "@apollo/client";
import { GET_PANGKAT_GOLONGAN } from "@/graphql/references/pangkat_golongan.graphql";
import PangkatGolonganForm from "@/components/layout-references/PangkatGolonganForm";
import { useParams } from "next/navigation";

export default function EditPangkatGolonganPage() {
  const { id } = useParams();
  const { data } = useQuery(GET_PANGKAT_GOLONGAN);
  const getPangkatGolongan = data?.getPangkatGolongan?.find((r: any) => r.id === id);

  if (!getPangkatGolongan) return <p>Loading...</p>;

  return <PangkatGolonganForm getPangkatGolongan={getPangkatGolongan} />;
}
