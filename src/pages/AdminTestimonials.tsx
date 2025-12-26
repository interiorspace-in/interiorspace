import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAllVideoTestimonials, getYouTubeThumbnail, getYouTubeVideoId } from "@/hooks/useVideoTestimonials";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, GripVertical, LogOut, ArrowUp, ArrowDown, Loader2, Home } from "lucide-react";

interface TestimonialForm {
  client_name: string;
  project_type: string;
  testimonial_text: string;
  youtube_url: string;
  is_enabled: boolean;
  display_order: number;
}

const initialForm: TestimonialForm = {
  client_name: "",
  project_type: "",
  testimonial_text: "",
  youtube_url: "",
  is_enabled: true,
  display_order: 0,
};

const AdminTestimonials = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const { data: testimonials, isLoading: testimonialsLoading, refetch } = useAllVideoTestimonials();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<TestimonialForm>(initialForm);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/admin/auth");
    } else if (!loading && user && !isAdmin) {
      navigate("/admin/auth");
    }
  }, [user, isAdmin, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/auth");
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const openAddDialog = () => {
    resetForm();
    const maxOrder = testimonials?.reduce((max, t) => Math.max(max, t.display_order), 0) ?? 0;
    setForm({ ...initialForm, display_order: maxOrder + 1 });
    setIsDialogOpen(true);
  };

  const openEditDialog = (testimonial: any) => {
    setEditingId(testimonial.id);
    setForm({
      client_name: testimonial.client_name,
      project_type: testimonial.project_type,
      testimonial_text: testimonial.testimonial_text,
      youtube_url: testimonial.youtube_url,
      is_enabled: testimonial.is_enabled,
      display_order: testimonial.display_order,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.client_name || !form.project_type || !form.testimonial_text || !form.youtube_url) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!getYouTubeVideoId(form.youtube_url)) {
      toast.error("Please enter a valid YouTube URL");
      return;
    }

    setIsSaving(true);

    try {
      if (editingId) {
        const { error } = await supabase
          .from("video_testimonials")
          .update(form)
          .eq("id", editingId);

        if (error) throw error;
        toast.success("Testimonial updated!");
      } else {
        const { error } = await supabase
          .from("video_testimonials")
          .insert([form]);

        if (error) throw error;
        toast.success("Testimonial added!");
      }

      queryClient.invalidateQueries({ queryKey: ["all-video-testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["video-testimonials"] });
      setIsDialogOpen(false);
      resetForm();
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      const { error } = await supabase
        .from("video_testimonials")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Testimonial deleted!");
      queryClient.invalidateQueries({ queryKey: ["all-video-testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["video-testimonials"] });
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete");
    }
  };

  const handleToggleEnabled = async (id: string, currentValue: boolean) => {
    try {
      const { error } = await supabase
        .from("video_testimonials")
        .update({ is_enabled: !currentValue })
        .eq("id", id);

      if (error) throw error;
      queryClient.invalidateQueries({ queryKey: ["all-video-testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["video-testimonials"] });
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Failed to update");
    }
  };

  const handleReorder = async (id: string, direction: "up" | "down") => {
    if (!testimonials) return;
    
    const index = testimonials.findIndex((t) => t.id === id);
    if (index === -1) return;
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === testimonials.length - 1) return;

    const swapIndex = direction === "up" ? index - 1 : index + 1;
    const current = testimonials[index];
    const swap = testimonials[swapIndex];

    try {
      await supabase
        .from("video_testimonials")
        .update({ display_order: swap.display_order })
        .eq("id", current.id);

      await supabase
        .from("video_testimonials")
        .update({ display_order: current.display_order })
        .eq("id", swap.id);

      queryClient.invalidateQueries({ queryKey: ["all-video-testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["video-testimonials"] });
      refetch();
    } catch (error: any) {
      toast.error("Failed to reorder");
    }
  };

  if (loading || testimonialsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Video Testimonials Admin</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Add Button */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-muted-foreground">
            {testimonials?.length || 0} testimonials total
          </p>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAddDialog}>
                <Plus className="w-4 h-4 mr-2" />
                Add Testimonial
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? "Edit Testimonial" : "Add New Testimonial"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="youtube_url">YouTube URL</Label>
                  <Input
                    id="youtube_url"
                    placeholder="https://www.youtube.com/shorts/..."
                    value={form.youtube_url}
                    onChange={(e) => setForm({ ...form, youtube_url: e.target.value })}
                  />
                  {form.youtube_url && getYouTubeVideoId(form.youtube_url) && (
                    <img
                      src={getYouTubeThumbnail(form.youtube_url)}
                      alt="Video thumbnail"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client_name">Client Name</Label>
                  <Input
                    id="client_name"
                    placeholder="Priya Sharma"
                    value={form.client_name}
                    onChange={(e) => setForm({ ...form, client_name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project_type">Project Type</Label>
                  <Input
                    id="project_type"
                    placeholder="3BHK Apartment"
                    value={form.project_type}
                    onChange={(e) => setForm({ ...form, project_type: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="testimonial_text">Testimonial Text</Label>
                  <Textarea
                    id="testimonial_text"
                    placeholder="Their testimonial..."
                    value={form.testimonial_text}
                    onChange={(e) => setForm({ ...form, testimonial_text: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="is_enabled">Enable Video</Label>
                  <Switch
                    id="is_enabled"
                    checked={form.is_enabled}
                    onCheckedChange={(checked) => setForm({ ...form, is_enabled: checked })}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : editingId ? (
                    "Update Testimonial"
                  ) : (
                    "Add Testimonial"
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Testimonials List */}
        <div className="space-y-4">
          {testimonials?.map((testimonial, index) => (
            <Card key={testimonial.id} className={!testimonial.is_enabled ? "opacity-60" : ""}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {/* Thumbnail */}
                  <div className="relative w-20 h-28 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                    <img
                      src={getYouTubeThumbnail(testimonial.youtube_url)}
                      alt={testimonial.client_name}
                      className="w-full h-full object-cover"
                    />
                    {!testimonial.is_enabled && (
                      <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
                        <span className="text-xs text-background font-medium">Disabled</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-foreground">{testimonial.client_name}</h3>
                        <p className="text-sm text-primary">{testimonial.project_type}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Switch
                          checked={testimonial.is_enabled}
                          onCheckedChange={() => handleToggleEnabled(testimonial.id, testimonial.is_enabled)}
                        />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      "{testimonial.testimonial_text}"
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleReorder(testimonial.id, "up")}
                      disabled={index === 0}
                    >
                      <ArrowUp className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleReorder(testimonial.id, "down")}
                      disabled={index === testimonials.length - 1}
                    >
                      <ArrowDown className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditDialog(testimonial)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(testimonial.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {testimonials?.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No testimonials yet. Add your first one!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminTestimonials;
