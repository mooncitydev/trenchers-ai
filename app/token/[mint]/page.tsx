import { redirect } from "next/navigation";

interface Props {
  params: { mint: string };
}

export default function TokenRedirectPage({ params }: Props) {
  redirect(`/app/token/${encodeURIComponent(params.mint)}`);
}
