import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Upload, Trash2, ArrowUp, ArrowDown, Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Edition {
  id: string;
  name: string;
  badge: string;
  image_url: string;
  display_order: number;
  active: boolean;
}

export function ExclusiveEditionsManager() {
  const [editions, setEditions] = useState<Edition[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  useEffect(() => {
    fetchEditions();
  }, []);

  const fetchEditions = async () => {
    try {
      const { data, error } = await supabase
        .from("exclusive_editions")
        .select("*")
        .order("display_order");

      if (error) throw error;
      setEditions(data || []);
    } catch (error) {
      console.error("Error fetching editions:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as edições",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (editionId: string, file: File) => {
    setUploadingId(editionId);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${editionId}-${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("exclusive-editions")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("exclusive-editions")
        .getPublicUrl(fileName);

      const { error: updateError } = await supabase
        .from("exclusive_editions")
        .update({ image_url: publicUrl })
        .eq("id", editionId);

      if (updateError) throw updateError;

      toast({
        title: "Sucesso",
        description: "Imagem atualizada com sucesso",
      });

      fetchEditions();
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Erro",
        description: "Não foi possível fazer upload da imagem",
        variant: "destructive",
      });
    } finally {
      setUploadingId(null);
    }
  };

  const handleUpdate = async (id: string, field: keyof Edition, value: string | boolean) => {
    try {
      const { error } = await supabase
        .from("exclusive_editions")
        .update({ [field]: value })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Edição atualizada",
      });

      fetchEditions();
    } catch (error) {
      console.error("Error updating edition:", error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar",
        variant: "destructive",
      });
    }
  };

  const handleMove = async (id: string, direction: "up" | "down") => {
    const index = editions.findIndex((e) => e.id === id);
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === editions.length - 1)
    ) {
      return;
    }

    const newIndex = direction === "up" ? index - 1 : index + 1;
    const newEditions = [...editions];
    [newEditions[index], newEditions[newIndex]] = [
      newEditions[newIndex],
      newEditions[index],
    ];

    try {
      await Promise.all(
        newEditions.map((edition, idx) =>
          supabase
            .from("exclusive_editions")
            .update({ display_order: idx + 1 })
            .eq("id", edition.id)
        )
      );

      toast({
        title: "Sucesso",
        description: "Ordem atualizada",
      });

      fetchEditions();
    } catch (error) {
      console.error("Error updating order:", error);
      toast({
        title: "Erro",
        description: "Não foi possível reordenar",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja deletar esta edição?")) return;

    try {
      const { error } = await supabase
        .from("exclusive_editions")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Edição deletada",
      });

      fetchEditions();
    } catch (error) {
      console.error("Error deleting edition:", error);
      toast({
        title: "Erro",
        description: "Não foi possível deletar",
        variant: "destructive",
      });
    }
  };

  const handleAddNew = async () => {
    try {
      const { error } = await supabase.from("exclusive_editions").insert({
        name: "Nova Edição",
        badge: "Novo",
        image_url: "/placeholder.svg",
        display_order: editions.length + 1,
        active: false,
      });

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Nova edição criada",
      });

      fetchEditions();
    } catch (error) {
      console.error("Error adding edition:", error);
      toast({
        title: "Erro",
        description: "Não foi possível criar nova edição",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Edições Exclusivas</h2>
        <Button onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Edição
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {editions.map((edition, index) => (
          <Card
            key={edition.id}
            className={`${
              edition.badge === "LENDÁRIO"
                ? "border-2 border-orange-500 bg-gradient-to-br from-orange-500/10 to-yellow-500/10"
                : ""
            }`}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{edition.name}</span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleMove(edition.id, "up")}
                    disabled={index === 0}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleMove(edition.id, "down")}
                    disabled={index === editions.length - 1}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(edition.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted">
                <img
                  src={edition.image_url}
                  alt={edition.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`name-${edition.id}`}>Nome</Label>
                <Input
                  id={`name-${edition.id}`}
                  value={edition.name}
                  onChange={(e) => handleUpdate(edition.id, "name", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`badge-${edition.id}`}>Badge</Label>
                <Input
                  id={`badge-${edition.id}`}
                  value={edition.badge}
                  onChange={(e) => handleUpdate(edition.id, "badge", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`image-${edition.id}`}>Imagem</Label>
                <div className="flex gap-2">
                  <Input
                    id={`image-${edition.id}`}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(edition.id, file);
                    }}
                    disabled={uploadingId === edition.id}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={uploadingId === edition.id}
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id={`active-${edition.id}`}
                  checked={edition.active}
                  onCheckedChange={(checked) =>
                    handleUpdate(edition.id, "active", checked)
                  }
                />
                <Label htmlFor={`active-${edition.id}`}>
                  {edition.active ? "Ativo" : "Inativo"}
                </Label>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
