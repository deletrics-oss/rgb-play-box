import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface ProductCardProps {
  name: string;
  description: string;
  image_url: string;
  purchase_url: string;
}

export function ProductCard({ name, description, image_url, purchase_url }: ProductCardProps) {
  return (
    <Card className="overflow-hidden border-2 border-primary/20 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
      <div className="aspect-square overflow-hidden">
        <img
          src={image_url}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-2xl text-primary">{name}</CardTitle>
        <CardDescription className="text-foreground/80">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          asChild
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <a href={purchase_url} target="_blank" rel="noopener noreferrer">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Comprar Agora
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
