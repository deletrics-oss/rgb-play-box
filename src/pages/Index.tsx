import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { HeroSection } from "@/components/home/HeroSection";
import { PerformanceSection } from "@/components/home/PerformanceSection";
import { ExclusiveEditions } from "@/components/home/ExclusiveEditions";
import { VersionSelector } from "@/components/home/VersionSelector";
import { PartnerSection } from "@/components/PartnerSection";
import { Gallery } from "@/components/Gallery";
import { VideoSection } from "@/components/VideoSection";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { SupportSection } from "@/components/SupportSection";
import { LogIn, Settings, Youtube } from "lucide-react";
const Index = () => {
  const {
    user,
    isAdmin,
    signOut
  } = useAuth();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };
  return <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="group">
            <h1 className="text-2xl md:text-3xl font-black">
              <span className="text-secondary text-glow-cyan group-hover:text-secondary/80 transition-colors">FIGHT</span>
              <span className="text-foreground"> ARCADE</span>
            </h1>
          </Link>
          <div className="flex gap-3 items-center">
            
            {user ? <>
                {isAdmin && <Button asChild variant="outline" size="sm" className="border-secondary text-secondary hover:bg-secondary/10">
                    <Link to="/edicao">
                      <Settings className="mr-2 h-4 w-4" />
                      Admin
                    </Link>
                  </Button>}
                <Button onClick={handleSignOut} variant="outline" size="sm">
                  Sair
                </Button>
              </> : <Button asChild variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10">
                <Link to="/auth">
                  <LogIn className="mr-2 h-4 w-4" />
                  Entrar
                </Link>
              </Button>}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <HeroSection />
      <PerformanceSection />
      <ExclusiveEditions />
      <VersionSelector />
      <PartnerSection />
      <Gallery />
      <VideoSection />
      <SupportSection />

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-secondary mb-4">Fight Arcade Designs</h3>
              <p className="text-muted-foreground">
                Arcade fight sticks premium com a melhor qualidade e performance do mercado.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-foreground mb-4">Contato</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Email: contato@fightarcade.com.br</li>
                <li>
                  <a href="https://wa.me/5511988121976" target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors">
                    WhatsApp: (11) 98812-1976
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-foreground mb-4">Redes Sociais</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="https://youtube.com/@DroopsGames" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF0000] transition-colors">
                    YouTube
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com/dropsgames" target="_blank" rel="noopener noreferrer" className="hover:text-[#E4405F] transition-colors">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center text-muted-foreground pt-8 border-t border-border">
            <p>© 2024 Fight Arcade Designs. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </div>;
};
export default Index;