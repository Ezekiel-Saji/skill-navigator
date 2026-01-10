import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

import { Project } from "@/lib/types";

export default function ProjectEditor({ onAdd }: { onAdd: (p: Project) => void }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [validated, setValidated] = useState(false);
  const [githubRepo, setGithubRepo] = useState("");

  const reset = () => {
    setTitle("");
    setDescription("");
    setSkills("");
    setValidated(false);
  };

  const save = () => {
    const proj: Project = {
      id: Date.now().toString(),
      title: title.trim() || "Untitled Project",
      description: description.trim() || "",
      skills: skills.split(",").map(s => s.trim()).filter(Boolean),
      validated,
      score: 0,
      githubRepo: githubRepo.trim() || undefined,
    };
    onAdd(proj);
    // close and reset
    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Add Project</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Project</DialogTitle>
        </DialogHeader>

        <div className="grid gap-3 py-2">
          <div>
            <label className="text-sm font-medium mb-1 block">Title</label>
            <Input value={title} onChange={(e) => setTitle((e.target as HTMLInputElement).value)} />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Description</label>
            <Textarea value={description} onChange={(e) => setDescription((e.target as HTMLTextAreaElement).value)} />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Skills (comma separated)</label>
            <Input value={skills} onChange={(e) => setSkills((e.target as HTMLInputElement).value)} placeholder="e.g., React, TypeScript, CSS" />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">GitHub Repo (optional)</label>
            <Input value={githubRepo} onChange={(e) => setGithubRepo((e.target as HTMLInputElement).value)} placeholder="https://github.com/your/repo" />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox checked={validated} onCheckedChange={(c) => setValidated(Boolean(c))} />
            <span className="text-sm">Validated</span>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button onClick={save}>Save Project</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
