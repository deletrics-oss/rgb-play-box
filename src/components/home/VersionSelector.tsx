import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Sparkles } from "lucide-react";

const versions = [
  {
    name: "Versão Mecânica",
    price: "R$ 999",
    badge: "Popular",
    badgeColor: "bg-secondary text-secondary-foreground",
    features: [
      "Botões mecânicos premium",
      "Joystick Sanwa compatível",
      "Resposta tátil precisa",
      "Durabilidade superior",
      "Ideal para todos os jogos",
      "Manutenção facilitada"
    ],
    purchaseUrl: "https://pag.ae/7-gCVPVdY",
    borderColor: "border-secondary/50 hover:border-secondary",
    icon: Zap
  },
  {
    name: "Versão Óptica",
    price: "R$ 1.299",
    badge: "Pro",
    badgeColor: "bg-primary text-primary-foreground",
    features: [
      "Tecnologia óptica avançada",
      "Zero delay garantido",
      "Precisão máxima",
      "Ideal para competições",
      "Componentes profissionais",
      "Resposta instantânea"
    ],
    purchaseUrl: "https://pag.ae/7-gD1yxaF",
    borderColor: "border-primary/50 hover:border-primary",
    icon: Sparkles
  }
];

export function VersionSelector() {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl md:text-6xl font-black">
            <span className="text-foreground">ESCOLHA SUA</span>{" "}
            <span className="text-secondary text-glow-cyan">VERSÃO</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mecânica para versatilidade ou Óptica para performance competitiva
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {versions.map((version, index) => {
            const Icon = version.icon;
            return (
              <Card 
                key={index}
                className={`group relative overflow-hidden bg-card border-2 ${version.borderColor} transition-all duration-300 hover:shadow-2xl hover:-translate-y-2`}
              >
                <CardHeader className="space-y-4 pb-6">
                  <Badge className={`w-fit ${version.badgeColor}`}>
                    <Icon className="h-3 w-3 mr-1" />
                    {version.badge}
                  </Badge>
                  
                  <CardTitle className="text-3xl font-bold text-foreground">
                    {version.name}
                  </CardTitle>
                  
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-foreground group-hover:text-primary transition-colors">
                      {version.price}
                    </span>
                    <span className="text-muted-foreground">/unidade</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {version.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    asChild
                    size="lg"
                    className="w-full text-lg font-bold shadow-lg"
                    variant={index === 1 ? "default" : "secondary"}
                  >
                    <a href={version.purchaseUrl} target="_blank" rel="noopener noreferrer">
                      Comprar Agora
                    </a>
                  </Button>
                </CardContent>

                {/* Glow Effect */}
                <div className={`absolute inset-0 -z-10 blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${index === 1 ? 'bg-primary' : 'bg-secondary'}`} />
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
