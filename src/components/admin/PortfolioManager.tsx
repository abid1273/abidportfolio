import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Upload, X, ExternalLink } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image_url: string;
  tags: string[];
  display_order: number;
  live_project_link: string;
}

const PortfolioManager = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState({
    title: "", category: "", description: "", tags: "", display_order: 0, live_project_link: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["admin-portfolio"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portfolio_projects")
        .select("*")
        .order("display_order");
      if (error) throw error;
      return data as Project[];
    },
  });

  const uploadImage = async (file: File): Promise<string> => {
    const ext = file.name.split(".").pop();
    const fileName = `portfolio/${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
    const { error } = await supabase.storage.from("admin-uploads").upload(fileName, file);
    if (error) throw error;
    const { data: urlData } = supabase.storage.from("admin-uploads").getPublicUrl(fileName);
    return urlData.publicUrl;
  };

  const saveMutation = useMutation({
    mutationFn: async (data: Omit<Project, "id"> & { id?: string }) => {
      const payload = {
        title: data.title,
        category: data.category,
        description: data.description,
        image_url: data.image_url,
        tags: data.tags,
        display_order: data.display_order,
        live_project_link: data.live_project_link,
      };
      if (data.id) {
        const { error } = await supabase.from("portfolio_projects").update(payload).eq("id", data.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("portfolio_projects").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["portfolio-projects"] });
      setDialogOpen(false);
      toast({ title: editing ? "Project updated" : "Project added" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("portfolio_projects").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["portfolio-projects"] });
      toast({ title: "Project deleted" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const openAdd = () => {
    setEditing(null);
    setForm({ title: "", category: "", description: "", tags: "", display_order: projects.length, live_project_link: "" });
    setImageFile(null);
    setImagePreview("");
    setDialogOpen(true);
  };

  const openEdit = (p: Project) => {
    setEditing(p);
    setForm({
      title: p.title,
      category: p.category,
      description: p.description,
      tags: p.tags.join(", "),
      display_order: p.display_order,
      live_project_link: p.live_project_link || "",
    });
    setImageFile(null);
    setImagePreview(p.image_url || "");
    setDialogOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    try {
      let image_url = editing?.image_url || "";
      if (imageFile) {
        image_url = await uploadImage(imageFile);
      }
      saveMutation.mutate({
        id: editing?.id,
        title: form.title,
        category: form.category,
        description: form.description,
        image_url,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        display_order: form.display_order,
        live_project_link: form.live_project_link,
      });
    } catch (err) {
      toast({ title: "Upload failed", description: err instanceof Error ? err.message : "Failed to upload image", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Portfolio Projects</h2>
        <Button onClick={openAdd} className="gap-2">
          <Plus className="w-4 h-4" /> Add Project
        </Button>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : projects.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>No projects yet. Add your first project.</p>
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Link</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{p.display_order}</TableCell>
                  <TableCell>
                    {p.image_url ? (
                      <img src={p.image_url} alt={p.title} className="w-12 h-12 rounded-lg object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground">No img</div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{p.title}</TableCell>
                  <TableCell>{p.category}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{p.tags.join(", ")}</TableCell>
                  <TableCell>
                    {p.live_project_link ? (
                      <a href={p.live_project_link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : (
                      <span className="text-muted-foreground text-xs">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(p)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(p.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Project" : "Add Project"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Category</label>
              <Input placeholder="e.g. WooCommerce, Theme Development" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Project Image</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              {imagePreview ? (
                <div className="relative inline-block">
                  <img src={imagePreview} alt="Preview" className="w-32 h-24 rounded-lg object-cover border border-border" />
                  <button
                    type="button"
                    onClick={() => { setImageFile(null); setImagePreview(""); }}
                    className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <Button type="button" variant="outline" className="gap-2" onClick={() => fileInputRef.current?.click()}>
                  <Upload className="w-4 h-4" /> Choose Image
                </Button>
              )}
              {imagePreview && (
                <Button type="button" variant="ghost" size="sm" className="ml-2" onClick={() => fileInputRef.current?.click()}>
                  Change
                </Button>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Title</label>
              <Input placeholder="Project title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Description</label>
              <Textarea placeholder="Describe the project..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Tags (comma separated)</label>
              <Input placeholder="WordPress, PHP, API" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Live Project Link</label>
              <Input placeholder="https://example.com" value={form.live_project_link} onChange={(e) => setForm({ ...form, live_project_link: e.target.value })} />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Display Order</label>
              <Input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })} />
            </div>

            <DialogFooter>
              <Button type="submit" disabled={saveMutation.isPending || uploading}>
                {uploading ? "Uploading..." : saveMutation.isPending ? "Saving..." : editing ? "Update" : "Add"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PortfolioManager;
