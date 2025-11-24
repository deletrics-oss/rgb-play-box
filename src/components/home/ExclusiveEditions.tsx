import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

// Import images
import arcadeBox1 from "@/assets/products/arcade-box-1.png";
import arcadeBox2 from "@/assets/products/arcade-box-2.png";
import arcadeBox3 from "@/assets/products/arcade-box-3.png";
import arcadeBox4 from "@/assets/products/arcade-box-4.png";
import arcadeBox5 from "@/assets/products/arcade-box-5.png";
import arcadeBoxKof from "@/assets/products/arcade-box-kof.png";
import arcadeKofComplete from "@/assets/products/arcade-kof-complete.png";
import arcadeKofCompleteV2 from "@/assets/products/arcade-kof-complete-v2.png";
import arcadeKofOrange from "@/assets/products/arcade-kof-orange.jpg";

// Image mapping
const imageMap: Record<string, string> = {
  "/src/assets/products/arcade-box-1.png": arcadeBox1,
  "/src/assets/products/arcade-box-2.png": arcadeBox2,
  "/src/assets/products/arcade-box-3.png": arcadeBox3,
  "/src/assets/products/arcade-box-4.png": arcadeBox4,
  "/src/assets/products/arcade-box-5.png": arcadeBox5,
  "/src/assets/products/arcade-box-kof.png": arcadeBoxKof,
  "/src/assets/products/arcade-kof-complete.png": arcadeKofComplete,
  "/src/assets/products/arcade-kof-complete-v2.png": arcadeKofCompleteV2,
  "/src/assets/products/arcade-kof-orange.jpg": arcadeKofOrange,
  "arcade-box-1.png": arcadeBox1,
  "arcade-box-2.png": arcadeBox2,
  "arcade-box-3.png": arcadeBox3,
  "arcade-box-4.png": arcadeBox4,
  "arcade-box-5.png": arcadeBox5,
  "arcade-box-kof.png": arcadeBoxKof,
  "arcade-kof-complete.png": arcadeKofComplete,
  "arcade-kof-complete-v2.png": arcadeKofCompleteV2,
  "arcade-kof-orange.jpg": arcadeKofOrange,
};

interface Edition {
  id: string;
  name: string;
  badge: string;
  image_url: string;
  display_order: number;
  active: boolean;
}

export function ExclusiveEditions() {
  const [editions, setEditions] = useState<Edition[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEditions();
  }, []);

  const fetchEditions = async () => {
    try {
      const { data, error } = await supabase
        .from("exclusive_editions")
        .select("*")
        .eq("active", true)
        .order("display_order");

      if (error) throw error;
      
      // Map database image paths to imported images
      const mappedData = (data || []).map(edition => ({
        ...edition,
        image_url: imageMap[edition.image_url] || edition.image_url
      }));
      
      setEditions(mappedData);
    } catch (error) {
      console.error("Error fetching editions:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16 space-y-4">
            <Skeleton className="h-16 w-96 mx-auto" />
            <Skeleton className="h-6 w-80 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="aspect-square w-full" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl md:text-6xl font-black">
              <span className="text-primary text-glow-red">EDIÇÕES</span>{" "}
              <span className="text-foreground">EXCLUSIVAS</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Artes personalizadas dos seus games favoritos com qualidade premium
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {editions.map((edition) => {
              const isLegendary = edition.badge === "LENDÁRIO";
              
              return (
                <Card 
                  key={edition.id}
                  className={`group relative overflow-hidden border-2 transition-all duration-300 cursor-pointer hover:shadow-2xl ${
                    isLegendary
                      ? "border-orange-500 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 hover:shadow-orange-500/20"
                      : "bg-card border-border hover:border-primary/50 hover:shadow-primary/20"
                  }`}
                  onClick={() => setSelectedImage(edition.image_url)}
                >
                  {isLegendary && (
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 animate-pulse pointer-events-none" />
                  )}

                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={edition.image_url} 
                      alt={edition.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <Badge 
                      className={`w-fit mb-3 ${
                        isLegendary
                          ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white border-0"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      {edition.badge}
                    </Badge>
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      {edition.name}
                    </h3>
                    <Button 
                      size="sm" 
                      variant={isLegendary ? "default" : "secondary"}
                      className={
                        isLegendary
                          ? "w-fit bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
                          : "w-fit"
                      }
                    >
                      Ver Detalhes
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl p-0 border-0">
          {selectedImage && (
            <img 
              src={selectedImage} 
              alt="Preview" 
              className="w-full h-auto rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
