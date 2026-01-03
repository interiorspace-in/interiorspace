import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus, ArrowUp, ArrowDown, ExternalLink } from "lucide-react";

const SERVICE_OPTIONS = [
  { value: "full-home-interiors", label: "Full Home Interiors" },
  { value: "modular-kitchens", label: "Modular Kitchens" },
  { value: "living-rooms", label: "Living Rooms" },
  { value: "bedrooms", label: "Bedrooms" },
  { value: "wardrobes", label: "Wardrobes" },
  { value: "sofa-dining", label: "Sofa & Dining" },
  { value: "entrance-foyer", label: "Entrance & Foyer" },
  { value: "office-spaces", label: "Office Spaces" },
];

interface GalleryImage {
  id: string;
  service_slug: string;
  image_url: string;
  alt_text: string;
  display_order: number;
  is_enabled: boolean;
}

const AdminServiceGallery = () => {
  const navigate = useNavigate();
  const { isAdmin, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [selectedService, setSelectedService] = useState<string>("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newAltText, setNewAltText] = useState("");

  const { data: images, isLoading } = useQuery({
    queryKey: ["admin-service-gallery", selectedService],
    queryFn: async () => {
      if (!selectedService) return [];
      const { data, error } = await supabase
        .from("service_gallery_images")
        .select("*")
        .eq("service_slug", selectedService)
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      return data as GalleryImage[];
    },
    enabled: !!selectedService,
  });

  const addImageMutation = useMutation({
    mutationFn: async () => {
      const maxOrder = images?.length ? Math.max(...images.map(i => i.display_order)) : 0;
      const { error } = await supabase.from("service_gallery_images").insert({
        service_slug: selectedService,
        image_url: newImageUrl,
        alt_text: newAltText,
        display_order: maxOrder + 1,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-service-gallery", selectedService] });
      queryClient.invalidateQueries({ queryKey: ["service-gallery", selectedService] });
      setNewImageUrl("");
      setNewAltText("");
      toast({ title: "Image added successfully" });
    },
    onError: (error) => {
      toast({ title: "Failed to add image", description: error.message, variant: "destructive" });
    },
  });

  const updateImageMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<GalleryImage> }) => {
      const { error } = await supabase.from("service_gallery_images").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-service-gallery", selectedService] });
      queryClient.invalidateQueries({ queryKey: ["service-gallery", selectedService] });
    },
    onError: (error) => {
      toast({ title: "Failed to update image", description: error.message, variant: "destructive" });
    },
  });

  const deleteImageMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("service_gallery_images").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-service-gallery", selectedService] });
      queryClient.invalidateQueries({ queryKey: ["service-gallery", selectedService] });
      toast({ title: "Image deleted successfully" });
    },
    onError: (error) => {
      toast({ title: "Failed to delete image", description: error.message, variant: "destructive" });
    },
  });

  const moveImage = (index: number, direction: "up" | "down") => {
    if (!images) return;
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= images.length) return;

    const currentImage = images[index];
    const targetImage = images[newIndex];

    updateImageMutation.mutate({ id: currentImage.id, updates: { display_order: targetImage.display_order } });
    updateImageMutation.mutate({ id: targetImage.id, updates: { display_order: currentImage.display_order } });
  };

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAdmin) {
    navigate("/admin/auth");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Manage Service Gallery Images</h1>
            <Button variant="outline" onClick={() => navigate("/admin/auth")}>
              Back to Admin
            </Button>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Select Service</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger className="w-full max-w-md">
                  <SelectValue placeholder="Choose a service to manage images" />
                </SelectTrigger>
                <SelectContent>
                  {SERVICE_OPTIONS.map((service) => (
                    <SelectItem key={service.value} value={service.value}>
                      {service.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {selectedService && (
            <>
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Add New Image</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="image-url">Image URL</Label>
                      <Input
                        id="image-url"
                        placeholder="https://example.com/image.jpg or social media link"
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="alt-text">Alt Text (Description)</Label>
                      <Input
                        id="alt-text"
                        placeholder="Modern kitchen design"
                        value={newAltText}
                        onChange={(e) => setNewAltText(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button
                    onClick={() => addImageMutation.mutate()}
                    disabled={!newImageUrl || !newAltText || addImageMutation.isPending}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Image
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    Current Images ({images?.length || 0})
                    {selectedService && (
                      <a 
                        href={`/services/${selectedService}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="ml-4 text-sm font-normal text-primary inline-flex items-center hover:underline"
                      >
                        View Page <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <p>Loading images...</p>
                  ) : images?.length === 0 ? (
                    <p className="text-muted-foreground">No images yet. Add images above or fallback images will be shown.</p>
                  ) : (
                    <div className="space-y-4">
                      {images?.map((image, index) => (
                        <div key={image.id} className="flex items-center gap-4 p-4 border rounded-lg">
                          <img 
                            src={image.image_url} 
                            alt={image.alt_text}
                            className="w-24 h-16 object-cover rounded"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://placehold.co/96x64?text=Error";
                            }}
                          />
                          <div className="flex-1 space-y-2">
                            <Input
                              value={image.image_url}
                              onChange={(e) => updateImageMutation.mutate({ 
                                id: image.id, 
                                updates: { image_url: e.target.value } 
                              })}
                              placeholder="Image URL"
                            />
                            <Input
                              value={image.alt_text}
                              onChange={(e) => updateImageMutation.mutate({ 
                                id: image.id, 
                                updates: { alt_text: e.target.value } 
                              })}
                              placeholder="Alt text"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={image.is_enabled}
                              onCheckedChange={(checked) => updateImageMutation.mutate({ 
                                id: image.id, 
                                updates: { is_enabled: checked } 
                              })}
                            />
                            <span className="text-sm text-muted-foreground">
                              {image.is_enabled ? "Visible" : "Hidden"}
                            </span>
                          </div>
                          <div className="flex flex-col gap-1">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => moveImage(index, "up")}
                              disabled={index === 0}
                            >
                              <ArrowUp className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => moveImage(index, "down")}
                              disabled={index === (images?.length || 0) - 1}
                            >
                              <ArrowDown className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => deleteImageMutation.mutate(image.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminServiceGallery;
