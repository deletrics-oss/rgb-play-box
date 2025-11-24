import { Badge } from "./ui/badge";
import { Mail, Instagram, Youtube } from "lucide-react";
import partnerImage from "@/assets/partner-drops-games.jpg";

export function PartnerSection() {
  return (
    <section className="py-24 px-4 bg-muted/20">
      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden border-4 border-secondary/30 shadow-2xl shadow-secondary/20">
                <img
                  src={partnerImage}
                  alt="Drops Games"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-secondary/90 text-secondary-foreground px-6 py-3 rounded-xl shadow-lg font-bold text-lg">
                Parceiro Oficial
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <Badge className="bg-secondary/10 text-secondary border-secondary/30 px-4 py-2 text-sm font-bold">
                PARCERIA OFICIAL
              </Badge>

              <div>
                <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
                  Drops Games
                </h2>
                <p className="text-xl text-secondary font-semibold mb-4">
                  Parceiro Oficial em Entretenimento e Gaming
                </p>
              </div>

              <p className="text-muted-foreground leading-relaxed text-lg">
                A Drops Games é nossa parceira oficial, trazendo inovação e qualidade 
                no desenvolvimento de experiências arcade únicas. Juntos, criamos os 
                melhores arcade fight sticks do mercado com tecnologia de ponta e 
                design exclusivo.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <a 
                  href="mailto:contato@dropsgames.com" 
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-secondary transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  <span>Contato</span>
                </a>
                <a 
                  href="https://instagram.com/dropsgames" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-secondary transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                  <span>Instagram</span>
                </a>
                <a 
                  href="https://youtube.com/@DroopsGames" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-secondary transition-colors"
                >
                  <Youtube className="h-5 w-5" />
                  <span>YouTube</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
