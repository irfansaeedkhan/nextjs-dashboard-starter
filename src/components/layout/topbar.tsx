import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export function Topbar({ title }: { title: string }) {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-card px-4 sm:px-6">
      <h1 className="text-base font-semibold tracking-tight">{title}</h1>
      <div className="ml-auto flex items-center gap-3">
        <Badge variant="secondary">Mock data</Badge>
        <Input
          type="search"
          placeholder="Search (demo, does nothing)"
          aria-label="Search"
          className="hidden w-56 sm:block"
        />
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground"
          aria-label="Signed in as Demo User"
          title="Demo User"
        >
          DU
        </span>
      </div>
    </header>
  );
}
