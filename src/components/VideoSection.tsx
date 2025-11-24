import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface Video {
  id: string;
  position: number;
  title: string;
  description: string | null;
  video_url: string;
  video_type: string;
}

export function VideoSection() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const { data } = await supabase
      .from("videos")
      .select("*")
      .eq("active", true)
      .order("position");
    
    if (data) {
      setVideos(data);
    }
  };

  const getEmbedUrl = (url: string, type: string) => {
    if (type === "youtube") {
      const videoId = url.split("v=")[1] || url.split("/").pop();
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (type === "vimeo") {
      const videoId = url.split("/").pop();
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return url;
  };

  if (videos.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-primary">
          Vídeos em Destaque
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <Card key={video.id} className="border-2 border-accent/20 hover:border-accent transition-all">
              <CardHeader>
                <CardTitle className="text-accent">{video.title}</CardTitle>
                {video.description && (
                  <CardDescription className="text-foreground/80">
                    {video.description}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <div className="aspect-video">
                  <iframe
                    src={getEmbedUrl(video.video_url, video.video_type)}
                    title={video.title}
                    className="w-full h-full rounded-md"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
