import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";

interface Video {
  id: string;
  position: number;
  title: string;
  description: string | null;
  video_url: string;
  video_type: string;
  active: boolean;
}

export function VideoManager() {
  const [videos, setVideos] = useState<Video[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const { data } = await supabase
      .from("videos")
      .select("*")
      .order("position");
    
    if (data) {
      setVideos(data);
    }
  };

  const saveVideo = async (
    position: number,
    title: string,
    description: string,
    video_url: string,
    video_type: string
  ) => {
    const existingVideo = videos.find((v) => v.position === position);

    if (existingVideo) {
      const { error } = await supabase
        .from("videos")
        .update({
          title,
          description,
          video_url,
          video_type,
        })
        .eq("id", existingVideo.id);

      if (error) {
        toast({
          title: "Erro ao atualizar vídeo",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Vídeo atualizado!",
        });
        fetchVideos();
      }
    } else {
      const { error } = await supabase
        .from("videos")
        .insert({
          position,
          title,
          description,
          video_url,
          video_type,
          active: true,
        });

      if (error) {
        toast({
          title: "Erro ao criar vídeo",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Vídeo criado!",
        });
        fetchVideos();
      }
    }
  };

  const updateVideo = async (id: string, updates: Partial<Video>) => {
    const { error } = await supabase
      .from("videos")
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
      fetchVideos();
    }
  };

  const deleteVideo = async (id: string) => {
    const { error } = await supabase
      .from("videos")
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
        title: "Vídeo excluído!",
      });
      fetchVideos();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, position: number) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get(`title-${position}`) as string;
    const description = formData.get(`description-${position}`) as string;
    const video_url = formData.get(`url-${position}`) as string;
    const video_type = formData.get(`type-${position}`) as string;

    saveVideo(position, title, description, video_url, video_type);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((position) => {
          const video = videos.find((v) => v.position === position);
          
          return (
            <Card key={position} className="border-2 border-accent/20">
              <CardHeader>
                <CardTitle className="text-accent">Vídeo #{position}</CardTitle>
                <CardDescription>
                  {video ? "Vídeo ativo" : "Slot vazio"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => handleSubmit(e, position)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`title-${position}`}>Título</Label>
                    <Input
                      id={`title-${position}`}
                      name={`title-${position}`}
                      defaultValue={video?.title}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`description-${position}`}>Descrição</Label>
                    <Input
                      id={`description-${position}`}
                      name={`description-${position}`}
                      defaultValue={video?.description || ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`type-${position}`}>Tipo</Label>
                    <Select
                      name={`type-${position}`}
                      defaultValue={video?.video_type || "youtube"}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="youtube">YouTube</SelectItem>
                        <SelectItem value="vimeo">Vimeo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`url-${position}`}>URL do Vídeo</Label>
                    <Input
                      id={`url-${position}`}
                      name={`url-${position}`}
                      defaultValue={video?.video_url}
                      placeholder="https://..."
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Salvar
                  </Button>

                  {video && (
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={video.active}
                          onCheckedChange={(checked) =>
                            updateVideo(video.id, { active: checked })
                          }
                        />
                        <Label>Ativo</Label>
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteVideo(video.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
