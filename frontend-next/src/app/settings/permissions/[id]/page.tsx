"use client";
import { useQuery } from "@apollo/client";
import { GET_PERMISSIONS } from "@/graphql/permissions.graphql";
import PermissionForm from "@/components/layout-settings/PermissionForm";
import { useParams } from "next/navigation";

export default function EditPermissionPage() {
  const { id } = useParams();
  const { data } = useQuery(GET_PERMISSIONS);
  const permission = data?.permissions?.find((p: any) => p.id === id);

  if (!permission) return <p>Loading...</p>;

  return <PermissionForm permission={permission} />;
}
