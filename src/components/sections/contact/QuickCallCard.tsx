import { Video } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";

export function QuickCallCard() {
  return (
    <FadeIn delay={0.15}>
      <div className="rounded-[var(--radius-lg)] border border-accent/15 bg-accent-muted p-7 shadow-glow-sm">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-accent/15">
          <Video className="h-5 w-5 text-accent" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-text-primary">
          Liever direct sparren?
        </h3>
        <p className="mb-5 text-sm leading-relaxed text-text-secondary">
          Denis kijkt graag mee naar de zakelijke kant van je idee via een korte
          video call.
        </p>
        <Button href="/contact" className="w-full">
          Plan een introductiegesprek
        </Button>
      </div>
    </FadeIn>
  );
}
