"use client";
import { useQuery } from "@apollo/client";
import { GET_BIDANG_KEPAKARAN } from "@/graphql/references/bidang_kepakaran.graphql";
import BidangKepakaranForm from "@/components/layout-references/BidangKepakaranForm";
import { useParams } from "next/navigation";

export default function EditBidangKepakaranPage() {
  const { id } = useParams();
  const { data } = useQuery(GET_BIDANG_KEPAKARAN);
  const getBidangKepakaran = data?.getBidangKepakaran?.find((r: any) => r.id === id);

  if (!getBidangKepakaran) return <p>Loading...</p>;

  return <BidangKepakaranForm getBidangKepakaran={getBidangKepakaran} />;
}
