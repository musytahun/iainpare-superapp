"use client";
import { useQuery } from "@apollo/client";
import { GET_MODULES } from "@/graphql/modules.graphql";
import ModuleForm from "@/components/modules/ModuleForm";
import { useParams } from "next/navigation";

export default function EditModulePage() {
  const { id } = useParams();
  const { data } = useQuery(GET_MODULES);
  const module = data?.modules?.find((r: any) => r.id === id);

  if (!module) return <p>Loading...</p>;

  return <ModuleForm module={module} />;
}
