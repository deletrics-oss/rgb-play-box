import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent } from "./ui/dialog";

interface GalleryImage {
  id: string;
  image_url: string;
  title: string | null;
  description: string | null;
}

export function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

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

  return (
    <section className="py-20 px-4 bg-muted/20">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-primary">
          Galeria de Designs
        </h2>
        
        {images.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Nenhuma imagem disponível na galeria
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map((image) => (
              <div
                key={image.id}
                className="aspect-square overflow-hidden rounded-lg border-2 border-primary/20 hover:border-primary cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.image_url}
                  alt={image.title || "Gallery image"}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
            ))}
          </div>
        )}

        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl">
            {selectedImage && (
              <div>
                <img
                  src={selectedImage.image_url}
                  alt={selectedImage.title || "Gallery image"}
                  className="w-full h-auto"
                />
                {selectedImage.title && (
                  <h3 className="mt-4 text-xl font-bold text-primary">
                    {selectedImage.title}
                  </h3>
                )}
                {selectedImage.description && (
                  <p className="mt-2 text-foreground/80">{selectedImage.description}</p>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
