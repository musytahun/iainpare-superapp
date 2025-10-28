"use client";
import { useQuery } from "@apollo/client";
import { GET_PROGRAM_STUDI } from "@/graphql/references/program_studi.graphql";
import ProgramStudiForm from "@/components/layout-references/ProgramStudiForm";
import { useParams } from "next/navigation";

export default function EditProgramStudiPage() {
  const { id } = useParams();
  const { data } = useQuery(GET_PROGRAM_STUDI);
  const getProgramStudi = data?.getProgramStudi?.find((r: any) => r.id === id);

  if (!getProgramStudi) return <p>Loading...</p>;

  return <ProgramStudiForm getProgramStudi={getProgramStudi} />;
}
