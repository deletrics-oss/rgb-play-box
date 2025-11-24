import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Shield, Award } from "lucide-react";
import arcadeHero from "@/assets/products/arcade-hero.png";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-gradient-to-b from-background via-background to-muted/20">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-red/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-4 pt-20 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
              <Award className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                Exclusivo & Premium
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none">
                <span className="text-secondary text-glow-cyan">ARCADE</span>
                <br />
                <span className="text-foreground">FIGHT STICK</span>
                <br />
                <span className="text-primary text-glow-red">PREMIUM</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                Experimente a precisão profissional com nossos arcade boxes premium. 
                Construção em metal, componentes de alta qualidade e design ergonômico.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="text-lg px-8 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/50">
                Ver Modelos
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-2 border-secondary text-secondary hover:bg-secondary/10">
                Especificações
              </Button>
            </div>

            {/* Price Cards */}
            <div className="grid sm:grid-cols-2 gap-4 pt-8">
              <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 group">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground uppercase tracking-wide">Versão Mecânica</p>
                  <p className="text-4xl font-bold text-foreground group-hover:text-primary transition-colors">R$ 999</p>
                  <a 
                    href="https://pag.ae/7-gCVPVdY" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block text-sm text-primary hover:underline"
                  >
                    Comprar agora →
                  </a>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-card border border-border hover:border-secondary/50 transition-all duration-300 group">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground uppercase tracking-wide">Versão Óptica</p>
                  <p className="text-4xl font-bold text-foreground group-hover:text-secondary transition-colors">R$ 1.299</p>
                  <a 
                    href="https://pag.ae/7-gD1yxaF" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block text-sm text-secondary hover:underline"
                  >
                    Comprar agora →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Product Image */}
          <div className="relative">
            <div className="relative z-10">
              <img 
                src={arcadeHero} 
                alt="Arcade Fight Stick Premium" 
                className="w-full h-auto drop-shadow-2xl animate-float"
              />
              
              {/* Floating Badges */}
              <Badge 
                className="absolute top-1/4 -left-4 bg-secondary/90 text-secondary-foreground border-secondary animate-float px-4 py-2 text-sm font-bold shadow-lg shadow-secondary/50"
                style={{ animationDelay: '0.5s', animationDuration: '4s' }}
              >
                <Shield className="h-4 w-4 mr-2" />
                Premium Quality
              </Badge>
              
              <Badge 
                className="absolute bottom-1/4 -right-4 bg-primary/90 text-primary-foreground border-primary animate-float px-4 py-2 text-sm font-bold shadow-lg shadow-primary/50"
                style={{ animationDelay: '1s', animationDuration: '5s' }}
              >
                <Zap className="h-4 w-4 mr-2" />
                Zero Delay
              </Badge>
            </div>

            {/* Glow Effect Behind Product */}
            <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 to-neon-red/20 blur-3xl -z-10" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
