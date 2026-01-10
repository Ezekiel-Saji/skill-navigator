import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type StoredGoal = {
  title: string;
  period: string;
  notes?: string;
};

const STORAGE_KEY = "studentGoal";

export default function GoalEditor({ onSave }: { onSave?: (g: StoredGoal | null) => void }) {
  const [title, setTitle] = useState("");
  const [period, setPeriod] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as StoredGoal;
        setTitle(parsed.title || "");
        setPeriod(parsed.period || "");
        setNotes(parsed.notes || "");
      }
    } catch (e) {
      // ignore parse errors
    }
  }, []);

  const save = () => {
    const payload: StoredGoal = { title: title.trim(), period: period.trim(), notes: notes.trim() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    onSave && onSave(payload);
    // notify other parts of the app in the same window
    try {
      window.dispatchEvent(new CustomEvent("studentGoalChanged", { detail: payload }));
    } catch (e) {
      // ignore if dispatch fails
    }
  };

  const clear = () => {
    localStorage.removeItem(STORAGE_KEY);
    setTitle("");
    setPeriod("");
    setNotes("");
    onSave && onSave(null);
    try {
      window.dispatchEvent(new CustomEvent("studentGoalChanged", { detail: null }));
    } catch (e) {
      // ignore
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Set Your Ambition</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          <div>
            <label className="text-sm font-medium mb-1 block">Ambition / Goal</label>
            <Input value={title} onChange={(e) => setTitle((e.target as HTMLInputElement).value)} placeholder="e.g., Become a Frontend Engineer" />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Time period</label>
            <Input value={period} onChange={(e) => setPeriod((e.target as HTMLInputElement).value)} placeholder="e.g., 6 months, by Dec 2026" />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Notes (optional)</label>
            <Textarea value={notes} onChange={(e) => setNotes((e.target as HTMLTextAreaElement).value)} placeholder="Anything to help contextualize this goal" />
          </div>

          <div className="flex gap-2 justify-end">
            <Button variant="ghost" onClick={clear}>Clear</Button>
            <Button onClick={save}>Save Goal</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
