import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductLink {
  platform: string;
  url: string;
}

interface Version {
  name: string;
  price: string;
  badge: string;
  badgeColor: string;
  features: string[];
  links: ProductLink[];
  borderColor: string;
  icon: typeof Zap | typeof Sparkles;
}

export function VersionSelector() {
  const [versions, setVersions] = useState<Version[]>([]);
  const [whatsappNumber, setWhatsappNumber] = useState("5511988121976");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [linksResult, settingsResult] = await Promise.all([
        supabase.from("product_links").select("*").eq("active", true),
        supabase.from("settings").select("*").eq("key", "whatsapp_number").single(),
      ]);

      if (settingsResult.data?.value) {
        setWhatsappNumber(settingsResult.data.value);
      }

      const mecanicaLinks = linksResult.data
        ?.filter((l) => l.product_version === "mecanica")
        .map((l) => ({ platform: l.platform, url: l.url })) || [];

      const opticaLinks = linksResult.data
        ?.filter((l) => l.product_version === "optica")
        .map((l) => ({ platform: l.platform, url: l.url })) || [];

      setVersions([
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
          links: mecanicaLinks,
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
          links: opticaLinks,
          borderColor: "border-primary/50 hover:border-primary",
          icon: Sparkles
        }
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getWhatsAppLink = (versionName: string, platform: string) => {
    const message = encodeURIComponent(
      `Olá! Gostaria de comprar a ${versionName} via ${platform}.`
    );
    return `https://wa.me/${whatsappNumber}?text=${message}`;
  };

  const getButtonLink = (version: Version, platform: string): string => {
    const link = version.links.find((l) => l.platform === platform);
    if (link?.url && link.url.trim() !== "") {
      return link.url;
    }
    return getWhatsAppLink(version.name, getPlatformDisplayName(platform));
  };

  const getPlatformDisplayName = (platform: string): string => {
    const names: Record<string, string> = {
      pagseguro: "PagSeguro",
      shopee: "Shopee",
      mercadolivre: "Mercado Livre",
    };
    return names[platform] || platform;
  };

  if (loading) {
    return (
      <section className="py-24 px-4 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto">
          <div className="text-center mb-16 space-y-4">
            <Skeleton className="h-16 w-96 mx-auto" />
            <Skeleton className="h-6 w-80 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Skeleton className="h-96 w-full" />
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </section>
    );
  }

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
            const pagseguroLink = getButtonLink(version, "pagseguro");
            const shopeeLink = getButtonLink(version, "shopee");
            const mlLink = getButtonLink(version, "mercadolivre");

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

                  <div className="space-y-3">
                    <Button 
                      asChild
                      size="lg"
                      className="w-full text-lg font-bold shadow-lg"
                      variant={index === 1 ? "default" : "secondary"}
                    >
                      <a href={pagseguroLink} target="_blank" rel="noopener noreferrer">
                        Comprar no PagSeguro
                      </a>
                    </Button>

                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground whitespace-nowrap">
                        Ou compre em:
                      </span>
                      
                      <div className="flex items-center gap-4 flex-1 justify-end">
                        <a
                          href={shopeeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="opacity-70 hover:opacity-100 transition-opacity"
                          title="Comprar na Shopee"
                        >
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg"
                            alt="Shopee"
                            className="h-8 w-auto"
                          />
                        </a>
                        
                        <a
                          href={mlLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="opacity-70 hover:opacity-100 transition-opacity"
                          title="Comprar no Mercado Livre"
                        >
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/8/84/Mercado_Libre_logo_%282019%29.svg"
                            alt="Mercado Livre"
                            className="h-8 w-auto"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>

                <div className={`absolute inset-0 -z-10 blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${index === 1 ? 'bg-primary' : 'bg-secondary'}`} />
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
