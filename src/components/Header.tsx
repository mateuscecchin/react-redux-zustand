import { useCurrentLeason, useStore } from "../store";

export function Header() {
  const { currentLeason, currentModule } = useCurrentLeason();
  const isLoading = useStore((store) => store.isLoading);

  if (isLoading) {
    return <h1 className="text-2xl font-bold">Carregando...</h1>;
  }

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold">{currentLeason?.title}</h1>
      <span className="text-sm text-zinc-400">{currentModule?.title}</span>
    </div>
  );
}
