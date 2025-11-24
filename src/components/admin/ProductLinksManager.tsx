import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { ExternalLink, Save, CheckCircle, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductLink {
  id: string;
  product_version: string;
  platform: string;
  url: string;
  active: boolean;
}

export function ProductLinksManager() {
  const [links, setLinks] = useState<ProductLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const { data, error } = await supabase
        .from("product_links")
        .select("*")
        .order("product_version")
        .order("platform");

      if (error) throw error;
      setLinks(data || []);
    } catch (error) {
      console.error("Error fetching links:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os links",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: string, url: string) => {
    try {
      const { error } = await supabase
        .from("product_links")
        .update({ url })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Link atualizado com sucesso",
      });

      fetchLinks();
    } catch (error) {
      console.error("Error updating link:", error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o link",
        variant: "destructive",
      });
    }
  };

  const getLinkStatus = (url: string) => {
    if (!url || url.trim() === "") {
      return { icon: AlertCircle, color: "text-yellow-500", label: "Vazio (usa WhatsApp)" };
    }
    return { icon: CheckCircle, color: "text-green-500", label: "Configurado" };
  };

  const getPlatformName = (platform: string) => {
    const names: Record<string, string> = {
      pagseguro: "PagSeguro",
      shopee: "Shopee",
      mercadolivre: "Mercado Livre",
    };
    return names[platform] || platform;
  };

  const getVersionName = (version: string) => {
    return version === "mecanica" ? "Versão Mecânica" : "Versão Óptica";
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  const mecanicaLinks = links.filter((l) => l.product_version === "mecanica");
  const opticaLinks = links.filter((l) => l.product_version === "optica");

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Links de Compra</h2>

      <Card>
        <CardHeader>
          <CardTitle>Versão Mecânica</CardTitle>
          <CardDescription>
            Configure os links de compra para a versão mecânica
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {mecanicaLinks.map((link) => {
            const status = getLinkStatus(link.url);
            const StatusIcon = status.icon;

            return (
              <div key={link.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor={`link-${link.id}`}>
                    {getPlatformName(link.platform)}
                  </Label>
                  <div className="flex items-center gap-2 text-sm">
                    <StatusIcon className={`h-4 w-4 ${status.color}`} />
                    <span className="text-muted-foreground">{status.label}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input
                    id={`link-${link.id}`}
                    placeholder={`URL do ${getPlatformName(link.platform)}`}
                    value={link.url}
                    onChange={(e) => {
                      const newLinks = links.map((l) =>
                        l.id === link.id ? { ...l, url: e.target.value } : l
                      );
                      setLinks(newLinks);
                    }}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleUpdate(link.id, link.url)}
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                  {link.url && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => window.open(link.url, "_blank")}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Versão Óptica</CardTitle>
          <CardDescription>
            Configure os links de compra para a versão óptica
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {opticaLinks.map((link) => {
            const status = getLinkStatus(link.url);
            const StatusIcon = status.icon;

            return (
              <div key={link.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor={`link-${link.id}`}>
                    {getPlatformName(link.platform)}
                  </Label>
                  <div className="flex items-center gap-2 text-sm">
                    <StatusIcon className={`h-4 w-4 ${status.color}`} />
                    <span className="text-muted-foreground">{status.label}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input
                    id={`link-${link.id}`}
                    placeholder={`URL do ${getPlatformName(link.platform)}`}
                    value={link.url}
                    onChange={(e) => {
                      const newLinks = links.map((l) =>
                        l.id === link.id ? { ...l, url: e.target.value } : l
                      );
                      setLinks(newLinks);
                    }}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleUpdate(link.id, link.url)}
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                  {link.url && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => window.open(link.url, "_blank")}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card className="border-yellow-500/20 bg-yellow-500/5">
        <CardHeader>
          <CardTitle className="text-yellow-600 dark:text-yellow-400">
            ⚠️ Importante
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p>
            Quando um link estiver vazio, o botão correspondente redirecionará automaticamente
            para o WhatsApp com uma mensagem personalizada.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
