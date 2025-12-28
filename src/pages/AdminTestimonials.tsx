import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAllVideoTestimonials, getYouTubeThumbnail, getYouTubeVideoId, PROJECT_TYPES } from "@/hooks/useVideoTestimonials";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, LogOut, ArrowUp, ArrowDown, Loader2, Home, Eye, MapPin, Star, Calendar, Play, MessageCircle } from "lucide-react";
import StarRating from "@/components/StarRating";
import { format } from "date-fns";

interface TestimonialForm {
  client_name: string;
  project_type: string;
  testimonial_text: string;
  youtube_url: string;
  is_enabled: boolean;
  display_order: number;
  location: string;
  star_rating: number;
}

const initialForm: TestimonialForm = {
  client_name: "",
  project_type: "",
  testimonial_text: "",
  youtube_url: "",
  is_enabled: true,
  display_order: 0,
  location: "",
  star_rating: 5,
};

const AdminTestimonials = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const { data: testimonials, isLoading: testimonialsLoading, refetch } = useAllVideoTestimonials();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<TestimonialForm>(initialForm);
  const [isSaving, setIsSaving] = useState(false);
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");

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
      location: testimonial.location || "",
      star_rating: testimonial.star_rating || 5,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.client_name || !form.project_type || !form.testimonial_text || !form.youtube_url) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (form.testimonial_text.length > 120) {
      toast.error("Testimonial text must be 120 characters or less");
      return;
    }

    if (!getYouTubeVideoId(form.youtube_url)) {
      toast.error("Please enter a valid YouTube URL");
      return;
    }

    setIsSaving(true);

    try {
      const payload = {
        client_name: form.client_name,
        project_type: form.project_type,
        testimonial_text: form.testimonial_text,
        youtube_url: form.youtube_url,
        is_enabled: form.is_enabled,
        display_order: form.display_order,
        location: form.location || null,
        star_rating: form.star_rating,
      };

      if (editingId) {
        const { error } = await supabase
          .from("video_testimonials")
          .update(payload)
          .eq("id", editingId);

        if (error) throw error;
        toast.success("Testimonial updated!");
      } else {
        const { error } = await supabase
          .from("video_testimonials")
          .insert([payload]);

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
      toast.success(currentValue ? "Testimonial deactivated" : "Testimonial activated");
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

  const filteredTestimonials = testimonials?.filter((t) => {
    if (filter === "active") return t.is_enabled;
    if (filter === "inactive") return !t.is_enabled;
    return true;
  });

  const activeCount = testimonials?.filter((t) => t.is_enabled).length || 0;
  const inactiveCount = testimonials?.filter((t) => !t.is_enabled).length || 0;

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
          <div>
            <h1 className="text-xl font-bold text-foreground">Video Testimonials</h1>
            <p className="text-sm text-muted-foreground">Manage client story videos</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate("/admin/whatsapp-leads")}>
              <MessageCircle className="w-4 h-4 mr-2" />
              Leads
            </Button>
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
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{testimonials?.length || 0}</p>
              <p className="text-sm text-muted-foreground">Total</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{activeCount}</p>
              <p className="text-sm text-muted-foreground">Active</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-muted-foreground">{inactiveCount}</p>
              <p className="text-sm text-muted-foreground">Inactive</p>
            </CardContent>
          </Card>
        </div>

        {/* Filter Tabs & Add Button */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Tabs value={filter} onValueChange={(v) => setFilter(v as any)} className="w-full md:w-auto">
            <TabsList>
              <TabsTrigger value="all">All ({testimonials?.length || 0})</TabsTrigger>
              <TabsTrigger value="active">Active ({activeCount})</TabsTrigger>
              <TabsTrigger value="inactive">Inactive ({inactiveCount})</TabsTrigger>
            </TabsList>
          </Tabs>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAddDialog}>
                <Plus className="w-4 h-4 mr-2" />
                Add Testimonial
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? "Edit Testimonial" : "Add New Testimonial"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* YouTube URL with Preview */}
                <div className="space-y-2">
                  <Label htmlFor="youtube_url">YouTube URL *</Label>
                  <Input
                    id="youtube_url"
                    placeholder="https://www.youtube.com/shorts/... or https://www.youtube.com/watch?v=..."
                    value={form.youtube_url}
                    onChange={(e) => setForm({ ...form, youtube_url: e.target.value })}
                  />
                  {form.youtube_url && getYouTubeVideoId(form.youtube_url) && (
                    <div className="relative rounded-lg overflow-hidden bg-muted aspect-video max-w-xs">
                      <img
                        src={getYouTubeThumbnail(form.youtube_url)}
                        alt="Video thumbnail"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-foreground/30">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                          <Play className="w-5 h-5 text-primary-foreground fill-current ml-0.5" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Client Name */}
                  <div className="space-y-2">
                    <Label htmlFor="client_name">Client Name *</Label>
                    <Input
                      id="client_name"
                      placeholder="Priya Sharma"
                      value={form.client_name}
                      onChange={(e) => setForm({ ...form, client_name: e.target.value })}
                    />
                  </div>

                  {/* Project Type Dropdown */}
                  <div className="space-y-2">
                    <Label htmlFor="project_type">Project Type *</Label>
                    <Select
                      value={form.project_type}
                      onValueChange={(value) => setForm({ ...form, project_type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent>
                        {PROJECT_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Location */}
                  <div className="space-y-2">
                    <Label htmlFor="location">Project Location (Optional)</Label>
                    <Input
                      id="location"
                      placeholder="Mumbai, Bangalore, etc."
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                    />
                  </div>

                  {/* Star Rating */}
                  <div className="space-y-2">
                    <Label>Star Rating</Label>
                    <div className="pt-1">
                      <StarRating
                        rating={form.star_rating}
                        size="lg"
                        interactive
                        onChange={(rating) => setForm({ ...form, star_rating: rating })}
                      />
                    </div>
                  </div>
                </div>

                {/* Testimonial Text */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="testimonial_text">Testimonial Quote *</Label>
                    <span className={`text-xs ${form.testimonial_text.length > 120 ? 'text-destructive' : 'text-muted-foreground'}`}>
                      {form.testimonial_text.length}/120
                    </span>
                  </div>
                  <Textarea
                    id="testimonial_text"
                    placeholder="A short impactful quote from the client..."
                    value={form.testimonial_text}
                    onChange={(e) => setForm({ ...form, testimonial_text: e.target.value.slice(0, 120) })}
                    rows={3}
                    maxLength={120}
                  />
                </div>

                {/* Status Toggle */}
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <Label htmlFor="is_enabled" className="font-medium">Status</Label>
                    <p className="text-sm text-muted-foreground">
                      {form.is_enabled ? "Video is visible on the website" : "Video is hidden from the website"}
                    </p>
                  </div>
                  <Switch
                    id="is_enabled"
                    checked={form.is_enabled}
                    onCheckedChange={(checked) => setForm({ ...form, is_enabled: checked })}
                  />
                </div>

                {/* Preview Button */}
                {form.youtube_url && getYouTubeVideoId(form.youtube_url) && (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => setIsPreviewOpen(true)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview Testimonial
                  </Button>
                )}

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

        {/* Preview Modal */}
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="max-w-md p-0 overflow-hidden">
            <div className="relative aspect-[9/16] bg-foreground">
              {form.youtube_url && getYouTubeVideoId(form.youtube_url) && (
                <>
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(form.youtube_url)}?autoplay=1&mute=1`}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground via-transparent to-foreground/30 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
                    <Badge className="mb-2 bg-primary">{form.project_type || "Project Type"}</Badge>
                    {form.location && (
                      <div className="flex items-center gap-1 text-background/70 text-xs mb-2">
                        <MapPin className="w-3 h-3" />
                        {form.location}
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-background mb-1">
                      {form.client_name || "Client Name"}
                    </h3>
                    <StarRating rating={form.star_rating} size="sm" className="mb-2" />
                    <p className="text-background/90 text-sm">
                      "{form.testimonial_text || "Testimonial text..."}"
                    </p>
                  </div>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Testimonials List */}
        <div className="space-y-3">
          {filteredTestimonials?.map((testimonial, index) => (
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
                        <span className="text-xs text-background font-medium">Hidden</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-foreground">{testimonial.client_name}</h3>
                          <Badge variant="secondary" className="text-xs">{testimonial.project_type}</Badge>
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          {testimonial.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {testimonial.location}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {format(new Date(testimonial.created_at), "MMM d, yyyy")}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <StarRating rating={testimonial.star_rating || 5} size="sm" />
                        <Switch
                          checked={testimonial.is_enabled}
                          onCheckedChange={() => handleToggleEnabled(testimonial.id, testimonial.is_enabled)}
                        />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
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
                      className="h-8 w-8"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleReorder(testimonial.id, "down")}
                      disabled={index === (filteredTestimonials?.length || 0) - 1}
                      className="h-8 w-8"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditDialog(testimonial)}
                      className="h-8 w-8"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => handleDelete(testimonial.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredTestimonials?.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  {filter === "all" 
                    ? "No testimonials yet. Add your first one!"
                    : `No ${filter} testimonials found.`}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminTestimonials;
