"use client";
import { useQuery } from "@apollo/client";
import { GET_FAKULTAS } from "@/graphql/references/fakultas.graphql";
import FakultasForm from "@/components/layout-references/FakultasForm";
import { useParams } from "next/navigation";

export default function EditBidangKepakaranPage() {
  const { id } = useParams();
  const { data } = useQuery(GET_FAKULTAS);
  const getFakultas = data?.getFakultas?.find((r: any) => r.id === id);

  if (!getFakultas) return <p>Loading...</p>;

  return <FakultasForm getFakultas={getFakultas} />;
}
