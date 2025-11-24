import { Zap, Shield, Gamepad2, Palette, Trophy, Plug } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "Zero Delay",
    description: "Placa óptica com precisão instantânea para resposta imediata em cada movimento",
    color: "neon-yellow"
  },
  {
    icon: Shield,
    title: "Construção em Metal",
    description: "Estrutura premium em metal que garante durabilidade e estabilidade profissional",
    color: "neon-cyan"
  },
  {
    icon: Gamepad2,
    title: "Componentes Premium",
    description: "Botões e joystick de alta qualidade para máxima precisão e conforto",
    color: "neon-red"
  },
  {
    icon: Palette,
    title: "Design Ergonômico",
    description: "Tampa acrílica com arte exclusiva e layout otimizado para longas sessões",
    color: "neon-purple"
  },
  {
    icon: Trophy,
    title: "Edição Exclusiva",
    description: "Arte customizada de Mortal Kombat, Street Fighter e outros clássicos",
    color: "neon-yellow"
  },
  {
    icon: Plug,
    title: "Plug & Play",
    description: "Compatível com PC, PlayStation, Xbox e Nintendo Switch sem configuração",
    color: "neon-cyan"
  }
];

export function PerformanceSection() {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl md:text-6xl font-black">
            <span className="text-primary text-glow-red">PERFORMANCE</span>{" "}
            <span className="text-foreground">PROFISSIONAL</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cada detalhe foi pensado para proporcionar a melhor experiência de jogo competitivo
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="group p-8 bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className={`inline-flex p-4 rounded-xl bg-${feature.color}/10 border border-${feature.color}/30 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-8 w-8 text-${feature.color}`} style={{ color: `hsl(var(--${feature.color}))` }} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
