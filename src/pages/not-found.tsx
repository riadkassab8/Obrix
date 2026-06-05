import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function NotFound() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen w-full flex items-center justify-center" style={{ backgroundColor: "var(--bg)" }}>
      <Card className="w-full max-w-md mx-4" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}>
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8" style={{ color: "var(--accent4)" }} />
            <h1 className="text-2xl font-bold" style={{ color: "var(--text)" }}>404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm" style={{ color: "var(--text-muted)" }}>
            Did you forget to add the page to the router?
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
