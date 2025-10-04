"use client";

import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import TableSkeleton from "./skeletons/TableSkeleton";

type QueryHandlerProps = {
  loading: boolean;
  error?: Error;
  children: React.ReactNode;
  skeleton?: React.ReactNode; // opsional custom skeleton
};

export default function QueryHandler({ loading, error, children, skeleton, }: QueryHandlerProps) {
//   if (loading) return <LoadingSpinner />;
  if (loading) return skeleton || <TableSkeleton />;
  if (error) return <ErrorMessage message={error.message || "Something went wrong."} />;
  return <>{children}</>;
}
