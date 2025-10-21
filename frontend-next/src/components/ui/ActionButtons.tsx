"use client";

import Link from "next/link";
import { Plus, Edit, Trash, Trash2 } from "lucide-react";
import Permission from "@/components/Permission";

type ActionButtonsProps = {
  basePath: string; // contoh: "/settings/users"
  id?: number | string;
  entityName?: string; // contoh: "User", "Role", "Module"
  permissions?: {
    create?: string;
    update?: string;
    delete?: string;
  };
  onDelete?: (id: number | string) => void;
  showCreate?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
};

export default function ActionButtons({
  basePath,
  id,
  entityName = "",
  onDelete,
  permissions,
  showCreate = false,
  showEdit = false,
  showDelete = false,
}: ActionButtonsProps) {
  return (
    <div className="flex items-center space-x-2">
      {/* ADD */}
      {showCreate && (
        <Permission check={permissions?.create ?? ""}>
          <Link
            href={`${basePath}/create`}
            className="flex items-center gap-1 px-3 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors shadow-sm text-sm"
          >
            <Plus size={18} />
            <span>Add {entityName}</span>
          </Link>
        </Permission>
      )}

      {/* EDIT */}
      {showEdit && id && (
        <Permission check={permissions?.update ?? ""}>
          <Link
            href={`${basePath}/${id}`}
            className="flex items-center gap-1 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 text-sm"
          >
            <Edit size={14} />
            {/* <span>Edit</span> */}
          </Link>
        </Permission>
      )}

      {/* DELETE */}
      {showDelete && id && onDelete && (
        <Permission check={permissions?.delete ?? ""}>
          <button
            onClick={() => onDelete(id)}
            className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
          >
            <Trash2 size={14} />
            {/* <span>Delete</span> */}
          </button>
        </Permission>
      )}
    </div>
  );
}
