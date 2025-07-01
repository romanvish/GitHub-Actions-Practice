import { useState } from "react";
import  Card from "@mui/material/Card";
import  Input  from "@mui/material/Input";
import  Button  from "@mui/material/Button";

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
}

export default function DevProfileDashboard(): React.JSX.Element {
  const [username, setUsername] = useState<string>("");
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchRepos = async (): Promise<void> => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos`);
      if (!response.ok) throw new Error("GitHub user not found");
      const data: Repo[] = await response.json();
      setRepos(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred.");
      }
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Developer Profile Dashboard</h1>
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
        />
        <Button onClick={fetchRepos}>Fetch Repos</Button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && repos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {repos.map((repo) => (
            <Card key={repo.id}>
              <div className="p-4">
                <h2 className="font-semibold text-lg">{repo.name}</h2>
                <p className="text-sm text-gray-600">{repo.description || "No description"}</p>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-sm"
                >
                  View on GitHub
                </a>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
