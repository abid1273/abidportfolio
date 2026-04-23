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
import { Plus, Pencil, Trash2, Star, Upload, X } from "lucide-react";

interface Review {
  id: string;
  name: string;
  role: string;
  avatar_url: string;
  content: string;
  rating: number;
  project: string;
  display_order: number;
}

const ReviewsManager = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Review | null>(null);
  const [form, setForm] = useState({
    name: "", role: "", content: "", rating: 5, project: "", display_order: 0,
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["admin-reviews"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("client_reviews")
        .select("*")
        .order("display_order");
      if (error) throw error;
      return data as Review[];
    },
  });

  const uploadAvatar = async (file: File): Promise<string> => {
    const ext = file.name.split(".").pop();
    const fileName = `avatars/${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
    const { error } = await supabase.storage.from("admin-uploads").upload(fileName, file);
    if (error) throw error;
    const { data: urlData } = supabase.storage.from("admin-uploads").getPublicUrl(fileName);
    return urlData.publicUrl;
  };

  const saveMutation = useMutation({
    mutationFn: async (data: { id?: string; name: string; role: string; avatar_url: string; content: string; rating: number; project: string; display_order: number }) => {
      const payload = {
        name: data.name,
        role: data.role,
        avatar_url: data.avatar_url,
        content: data.content,
        rating: data.rating,
        project: data.project,
        display_order: data.display_order,
      };
      if (data.id) {
        const { error } = await supabase.from("client_reviews").update(payload).eq("id", data.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("client_reviews").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
      queryClient.invalidateQueries({ queryKey: ["client-reviews"] });
      setDialogOpen(false);
      toast({ title: editing ? "Review updated" : "Review added" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("client_reviews").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
      queryClient.invalidateQueries({ queryKey: ["client-reviews"] });
      toast({ title: "Review deleted" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const openAdd = () => {
    setEditing(null);
    setForm({ name: "", role: "", content: "", rating: 5, project: "", display_order: reviews.length });
    setAvatarFile(null);
    setAvatarPreview("");
    setDialogOpen(true);
  };

  const openEdit = (r: Review) => {
    setEditing(r);
    setForm({
      name: r.name,
      role: r.role,
      content: r.content,
      rating: r.rating,
      project: r.project,
      display_order: r.display_order,
    });
    setAvatarFile(null);
    setAvatarPreview(r.avatar_url || "");
    setDialogOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    try {
      let avatar_url = editing?.avatar_url || "";
      if (avatarFile) {
        avatar_url = await uploadAvatar(avatarFile);
      }
      saveMutation.mutate({
        id: editing?.id,
        ...form,
        avatar_url,
      });
    } catch (err) {
      toast({ title: "Upload failed", description: err instanceof Error ? err.message : "Failed to upload avatar", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Client Reviews</h2>
        <Button onClick={openAdd} className="gap-2">
          <Plus className="w-4 h-4" /> Add Review
        </Button>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : reviews.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>No reviews yet. Add your first review.</p>
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Avatar</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Project</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.display_order}</TableCell>
                  <TableCell>
                    {r.avatar_url ? (
                      <img src={r.avatar_url} alt={r.name} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                        {r.name.charAt(0)}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{r.name}</TableCell>
                  <TableCell>{r.role}</TableCell>
                  <TableCell>
                    <div className="flex gap-0.5">
                      {[...Array(r.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-primary fill-primary" />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{r.project}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(r)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(r.id)}>
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Review" : "Add Review"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Client Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <Input placeholder="Role / Company" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />

            {/* Avatar Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Client Avatar</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="flex items-center gap-3">
                {avatarPreview ? (
                  <div className="relative inline-block">
                    <img src={avatarPreview} alt="Avatar preview" className="w-16 h-16 rounded-full object-cover border border-border" />
                    <button
                      type="button"
                      onClick={() => { setAvatarFile(null); setAvatarPreview(""); }}
                      className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-xs">
                    No photo
                  </div>
                )}
                <Button type="button" variant="outline" size="sm" className="gap-2" onClick={() => fileInputRef.current?.click()}>
                  <Upload className="w-4 h-4" /> {avatarPreview ? "Change" : "Upload"}
                </Button>
              </div>
            </div>

            <Textarea placeholder="Review content" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required />
            <div className="flex gap-4">
              <Input type="number" placeholder="Rating (1-5)" min={1} max={5} value={form.rating} onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) || 5 })} />
              <Input placeholder="Project name" value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })} />
            </div>
            <Input type="number" placeholder="Display Order" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })} />
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

export default ReviewsManager;
