import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Save } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Settings {
  whatsapp_number: string;
  whatsapp_message: string;
  site_name: string;
  site_description: string;
}

export function SettingsManager() {
  const [settings, setSettings] = useState<Settings>({
    whatsapp_number: "",
    whatsapp_message: "",
    site_name: "",
    site_description: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("settings")
        .select("*");

      if (error) throw error;

      const settingsObj: Settings = {
        whatsapp_number: "",
        whatsapp_message: "",
        site_name: "",
        site_description: "",
      };

      data?.forEach((setting) => {
        settingsObj[setting.key as keyof Settings] = setting.value;
      });

      setSettings(settingsObj);
    } catch (error) {
      console.error("Error fetching settings:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as configurações",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updates = Object.entries(settings).map(([key, value]) =>
        supabase
          .from("settings")
          .update({ value })
          .eq("key", key)
      );

      await Promise.all(updates);

      toast({
        title: "Sucesso",
        description: "Configurações salvas com sucesso",
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar as configurações",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const formatWhatsAppNumber = (number: string) => {
    const cleaned = number.replace(/\D/g, "");
    if (cleaned.length !== 13) return number;
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4, 9)}-${cleaned.slice(9)}`;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Configurações Gerais</h2>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="mr-2 h-4 w-4" />
          {saving ? "Salvando..." : "Salvar Configurações"}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>WhatsApp</CardTitle>
          <CardDescription>
            Configure o número do WhatsApp e a mensagem padrão
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="whatsapp_number">Número do WhatsApp</Label>
            <Input
              id="whatsapp_number"
              placeholder="5511988121976"
              value={settings.whatsapp_number}
              onChange={(e) =>
                setSettings({ ...settings, whatsapp_number: e.target.value })
              }
            />
            <p className="text-sm text-muted-foreground">
              Formato: {formatWhatsAppNumber(settings.whatsapp_number)}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsapp_message">Mensagem Padrão</Label>
            <Textarea
              id="whatsapp_message"
              placeholder="Olá! Gostaria de saber mais sobre..."
              value={settings.whatsapp_message}
              onChange={(e) =>
                setSettings({ ...settings, whatsapp_message: e.target.value })
              }
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Site</CardTitle>
          <CardDescription>
            Configure o nome e descrição do site
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="site_name">Nome do Site</Label>
            <Input
              id="site_name"
              placeholder="Fight Arcade"
              value={settings.site_name}
              onChange={(e) =>
                setSettings({ ...settings, site_name: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="site_description">Descrição do Site</Label>
            <Input
              id="site_description"
              placeholder="Arcade Sticks Premium para Luta"
              value={settings.site_description}
              onChange={(e) =>
                setSettings({ ...settings, site_description: e.target.value })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle>Preview do WhatsApp</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
            <div className="h-14 w-14 rounded-full bg-[#25D366] flex items-center justify-center">
              <span className="text-white text-2xl">💬</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold">WhatsApp</p>
              <p className="text-sm text-muted-foreground">
                {formatWhatsAppNumber(settings.whatsapp_number)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
