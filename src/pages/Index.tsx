import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { HeroCarousel } from "@/components/HeroCarousel";
import { ProductCard } from "@/components/ProductCard";
import { PartnerSection } from "@/components/PartnerSection";
import { Gallery } from "@/components/Gallery";
import { VideoSection } from "@/components/VideoSection";
import { Button } from "@/components/ui/button";
import { LogIn, Settings } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  image_url: string;
  purchase_url: string;
  display_order: number;
}

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("active", true)
      .order("display_order");
    
    if (data) {
      setProducts(data);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Arcade Box Designs</h1>
          <div className="flex gap-4">
            {user ? (
              <>
                {isAdmin && (
                  <Button asChild variant="outline">
                    <Link to="/admin">
                      <Settings className="mr-2 h-4 w-4" />
                      Admin
                    </Link>
                  </Button>
                )}
                <Button onClick={handleSignOut} variant="outline">
                  Sair
                </Button>
              </>
            ) : (
              <Button asChild variant="outline">
                <Link to="/auth">
                  <LogIn className="mr-2 h-4 w-4" />
                  Entrar
                </Link>
              </Button>
            )}
          </div>
        </div>
      </nav>

      <HeroCarousel />

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary">
            Nossos Produtos
          </h2>
          {products.length === 0 ? (
            <p className="text-center text-muted-foreground">
              Nenhum produto disponível no momento
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <PartnerSection />
      <Gallery />
      <VideoSection />

      <footer className="border-t border-border py-8 px-4 mt-20">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2024 Arcade Box Designs. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
