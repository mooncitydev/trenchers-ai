import TokenDetailPrototype from "@/components/token-detail/TokenDetailPrototype";

interface Props {
  params: { mint: string };
}

export default function AppTokenPage({ params }: Props) {
  return <TokenDetailPrototype mint={decodeURIComponent(params.mint)} />;
}
