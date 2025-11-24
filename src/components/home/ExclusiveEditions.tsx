import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import arcadeBox1 from "@/assets/products/arcade-box-1.png";
import arcadeBox2 from "@/assets/products/arcade-box-2.png";
import arcadeBox3 from "@/assets/products/arcade-box-3.png";
import arcadeBox4 from "@/assets/products/arcade-box-4.png";
import arcadeBox5 from "@/assets/products/arcade-box-5.png";
import arcadeBox6 from "@/assets/products/arcade-box-6.png";

const editions = [
  {
    id: 1,
    name: "Mortal Kombat Edition",
    image: arcadeBox1,
    badge: "Exclusivo"
  },
  {
    id: 2,
    name: "Street Fighter Edition",
    image: arcadeBox2,
    badge: "Premium"
  },
  {
    id: 3,
    name: "Tekken Edition",
    image: arcadeBox3,
    badge: "Limited"
  },
  {
    id: 4,
    name: "Dragon Ball Edition",
    image: arcadeBox4,
    badge: "Especial"
  },
  {
    id: 5,
    name: "Retro Classic Edition",
    image: arcadeBox5,
    badge: "Clássico"
  },
  {
    id: 6,
    name: "Custom Art Edition",
    image: arcadeBox6,
    badge: "Personalizado"
  }
];

export function ExclusiveEditions() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
            {editions.map((edition) => (
              <Card 
                key={edition.id}
                className="group relative overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:shadow-primary/20"
                onClick={() => setSelectedImage(edition.image)}
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={edition.image} 
                    alt={edition.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <Badge className="w-fit mb-3 bg-primary text-primary-foreground">
                    {edition.badge}
                  </Badge>
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {edition.name}
                  </h3>
                  <Button size="sm" variant="secondary" className="w-fit">
                    Ver Detalhes
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Dialog */}
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
