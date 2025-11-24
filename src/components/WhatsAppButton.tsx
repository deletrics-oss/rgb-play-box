import { MessageCircle } from "lucide-react";
import { Button } from "./ui/button";

export function WhatsAppButton() {
  const whatsappNumber = "5511988121976";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Fale conosco no WhatsApp"
    >
      <Button
        size="lg"
        className="h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-2xl transition-all duration-300 hover:scale-110 animate-pulse hover:animate-none"
        style={{
          boxShadow: "0 0 20px rgba(37, 211, 102, 0.5), 0 0 40px rgba(37, 211, 102, 0.3)",
        }}
      >
        <MessageCircle className="h-7 w-7" />
      </Button>
      <span className="absolute -top-12 right-0 bg-background/95 text-foreground px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg border border-border">
        Fale conosco no WhatsApp
      </span>
    </a>
  );
}
