"use client";

import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { GET_USER_BY_ID } from "@/graphql/users.graphql";
import UserForm from "@/components/users/UserForm";
import QueryHandler from "@/components/QueryHandler";
import TableSkeleton from "@/components/skeletons/TableSkeleton";

export default function EditUserPage() {
  const params = useParams();
  const id = Number(params.id);
  const { data, loading, error } = useQuery(GET_USER_BY_ID, {
    variables: { id },
    skip: !id,
  });

  console.log("USER DETAIL:", data);

  return (
    <QueryHandler loading={loading} error={error} skeleton={<TableSkeleton rows={6} />}>
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">Edit User</h1>
        {data?.userById ? <UserForm user={data.userById} /> : <p>Tidak ada data user</p>}
      </div>
    </QueryHandler>
  );
}
