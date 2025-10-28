"use client";
import { useQuery } from "@apollo/client";
import { GET_PENERBIT } from "@/graphql/references/penerbit.graphql";
import PenerbitForm from "@/components/layout-references/PenerbitForm";
import { useParams } from "next/navigation";

export default function EditPenerbitPage() {
  const { id } = useParams();
  const { data } = useQuery(GET_PENERBIT);
  const getPenerbit = data?.getPenerbit?.find((r: any) => r.id === id);

  if (!getPenerbit) return <p>Loading...</p>;

  return <PenerbitForm getPenerbit={getPenerbit} />;
}
