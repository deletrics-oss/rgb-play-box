import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { BannerManager } from "@/components/admin/BannerManager";
import { ProductManager } from "@/components/admin/ProductManager";
import { GalleryManager } from "@/components/admin/GalleryManager";
import { VideoManager } from "@/components/admin/VideoManager";
import { ExclusiveEditionsManager } from "@/components/admin/ExclusiveEditionsManager";
import { ProductLinksManager } from "@/components/admin/ProductLinksManager";
import { SettingsManager } from "@/components/admin/SettingsManager";

export default function Admin() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/auth");
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-foreground">Carregando...</p>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Painel Administrativo</h1>
          <Button asChild variant="outline">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao Site
            </Link>
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="text-3xl text-primary">Dashboard</CardTitle>
            <CardDescription className="text-foreground/80">
              Gerencie todo o conteúdo do site
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="banners" className="w-full">
              <TabsList className="grid w-full grid-cols-7 gap-1">
                <TabsTrigger value="banners">Banners</TabsTrigger>
                <TabsTrigger value="products">Produtos</TabsTrigger>
                <TabsTrigger value="editions">Edições</TabsTrigger>
                <TabsTrigger value="gallery">Galeria</TabsTrigger>
                <TabsTrigger value="videos">Vídeos</TabsTrigger>
                <TabsTrigger value="links">Links</TabsTrigger>
                <TabsTrigger value="settings">Config</TabsTrigger>
              </TabsList>

              <TabsContent value="banners" className="mt-6">
                <BannerManager />
              </TabsContent>

              <TabsContent value="products" className="mt-6">
                <ProductManager />
              </TabsContent>

              <TabsContent value="editions" className="mt-6">
                <ExclusiveEditionsManager />
              </TabsContent>

              <TabsContent value="gallery" className="mt-6">
                <GalleryManager />
              </TabsContent>

              <TabsContent value="videos" className="mt-6">
                <VideoManager />
              </TabsContent>

              <TabsContent value="links" className="mt-6">
                <ProductLinksManager />
              </TabsContent>

              <TabsContent value="settings" className="mt-6">
                <SettingsManager />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
