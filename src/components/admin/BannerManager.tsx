import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Upload } from "lucide-react";

interface Banner {
  id: string;
  position: number;
  image_url: string;
  link_url: string | null;
  active: boolean;
}

export function BannerManager() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    const { data } = await supabase
      .from("banners")
      .select("*")
      .order("position");
    
    if (data) {
      setBanners(data);
    }
  };

  const handleImageUpload = async (position: number, file: File) => {
    setLoading(true);
    
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("banners")
      .upload(filePath, file);

    if (uploadError) {
      toast({
        title: "Erro ao fazer upload",
        description: uploadError.message,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from("banners")
      .getPublicUrl(filePath);

    const existingBanner = banners.find((b) => b.position === position);

    if (existingBanner) {
      const { error } = await supabase
        .from("banners")
        .update({ image_url: publicUrl })
        .eq("id", existingBanner.id);

      if (error) {
        toast({
          title: "Erro ao atualizar banner",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Banner atualizado!",
        });
        fetchBanners();
      }
    } else {
      const { error } = await supabase
        .from("banners")
        .insert({
          position,
          image_url: publicUrl,
          active: true,
        });

      if (error) {
        toast({
          title: "Erro ao criar banner",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Banner criado!",
        });
        fetchBanners();
      }
    }

    setLoading(false);
  };

  const updateBanner = async (id: string, updates: Partial<Banner>) => {
    const { error } = await supabase
      .from("banners")
      .update(updates)
      .eq("id", id);

    if (error) {
      toast({
        title: "Erro ao atualizar",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Atualizado com sucesso!",
      });
      fetchBanners();
    }
  };

  const deleteBanner = async (id: string) => {
    const { error } = await supabase
      .from("banners")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Erro ao excluir",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Banner excluído!",
      });
      fetchBanners();
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4, 5, 6].map((position) => {
          const banner = banners.find((b) => b.position === position);
          
          return (
            <Card key={position} className="border-2 border-accent/20">
              <CardHeader>
                <CardTitle className="text-accent">Banner #{position}</CardTitle>
                <CardDescription>
                  {banner ? "Banner ativo" : "Slot vazio"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {banner && banner.image_url && (
                  <div className="aspect-video overflow-hidden rounded-lg">
                    <img
                      src={banner.image_url}
                      alt={`Banner ${position}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor={`upload-${position}`}>
                    <Button asChild variant="outline" className="w-full" disabled={loading}>
                      <span className="cursor-pointer">
                        <Upload className="mr-2 h-4 w-4" />
                        {banner ? "Alterar Imagem" : "Upload Imagem"}
                      </span>
                    </Button>
                  </Label>
                  <Input
                    id={`upload-${position}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(position, file);
                    }}
                  />
                </div>

                {banner && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor={`link-${position}`}>Link (opcional)</Label>
                      <Input
                        id={`link-${position}`}
                        value={banner.link_url || ""}
                        onChange={(e) =>
                          updateBanner(banner.id, { link_url: e.target.value })
                        }
                        placeholder="https://..."
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={banner.active}
                          onCheckedChange={(checked) =>
                            updateBanner(banner.id, { active: checked })
                          }
                        />
                        <Label>Ativo</Label>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteBanner(banner.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
