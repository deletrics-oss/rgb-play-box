import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Upload } from "lucide-react";

interface GalleryImage {
  id: string;
  image_url: string;
  title: string | null;
  description: string | null;
}

export function GalleryManager() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const { data } = await supabase
      .from("gallery_images")
      .select("*")
      .order("display_order");
    
    if (data) {
      setImages(data);
    }
  };

  const handleImageUpload = async (files: FileList) => {
    setLoading(true);

    for (const file of Array.from(files)) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(filePath, file);

      if (uploadError) {
        toast({
          title: "Erro ao fazer upload",
          description: uploadError.message,
          variant: "destructive",
        });
        continue;
      }

      const { data: { publicUrl } } = supabase.storage
        .from("gallery")
        .getPublicUrl(filePath);

      const { error } = await supabase
        .from("gallery_images")
        .insert({
          image_url: publicUrl,
          display_order: images.length,
        });

      if (error) {
        toast({
          title: "Erro ao salvar imagem",
          description: error.message,
          variant: "destructive",
        });
      }
    }

    toast({
      title: "Imagens adicionadas!",
    });
    fetchImages();
    setLoading(false);
  };

  const updateImage = async (id: string, title: string | null, description: string | null) => {
    const { error } = await supabase
      .from("gallery_images")
      .update({ title, description })
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
      fetchImages();
    }
  };

  const deleteImage = async (id: string) => {
    const { error } = await supabase
      .from("gallery_images")
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
        title: "Imagem excluída!",
      });
      fetchImages();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Label htmlFor="upload-multiple">
          <Button asChild variant="default" disabled={loading}>
            <span className="cursor-pointer">
              <Upload className="mr-2 h-4 w-4" />
              Upload Imagens
            </span>
          </Button>
        </Label>
        <Input
          id="upload-multiple"
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) handleImageUpload(e.target.files);
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((image) => (
          <Card key={image.id} className="border-2 border-primary/20">
            <CardContent className="p-4 space-y-3">
              <div className="aspect-square overflow-hidden rounded-lg">
                <img
                  src={image.image_url}
                  alt={image.title || "Gallery image"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-2">
                <Input
                  placeholder="Título (opcional)"
                  value={image.title || ""}
                  onChange={(e) => updateImage(image.id, e.target.value, image.description)}
                />
                <Input
                  placeholder="Descrição (opcional)"
                  value={image.description || ""}
                  onChange={(e) => updateImage(image.id, image.title, e.target.value)}
                />
              </div>
              <Button
                variant="destructive"
                size="sm"
                className="w-full"
                onClick={() => deleteImage(image.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Excluir
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
