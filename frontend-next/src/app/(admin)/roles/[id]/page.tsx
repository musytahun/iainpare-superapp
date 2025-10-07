"use client";
import { useQuery } from "@apollo/client";
import { GET_ROLES } from "@/graphql/roles.graphql";
import RoleForm from "@/components/roles/RoleForm";
import { useParams } from "next/navigation";

export default function EditRolePage() {
  const { id } = useParams();
  const { data } = useQuery(GET_ROLES);
  const role = data?.roles?.find((r: any) => r.id === id);

  if (!role) return <p>Loading...</p>;

  return <RoleForm role={role} />;
}
