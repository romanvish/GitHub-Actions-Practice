import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import Card from "@mui/material/Card";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
export default function DevProfileDashboard() {
    const [username, setUsername] = useState("");
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const fetchRepos = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await fetch(`https://api.github.com/users/${username}/repos`);
            if (!response.ok)
                throw new Error("GitHub user not found");
            const data = await response.json();
            setRepos(data);
        }
        catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
            else {
                setError("An unknown error occurred.");
            }
            setRepos([]);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "max-w-3xl mx-auto p-6", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Developer Profile Dashboard" }), _jsxs("div", { className: "flex gap-2 mb-4", children: [_jsx(Input, { placeholder: "Enter GitHub username", value: username, onChange: (e) => setUsername(e.target.value) }), _jsx(Button, { onClick: fetchRepos, children: "Fetch Repos" })] }), loading && _jsx("p", { children: "Loading..." }), error && _jsx("p", { className: "text-red-500", children: error }), !loading && repos.length > 0 && (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: repos.map((repo) => (_jsx(Card, { children: _jsxs("div", { className: "p-4", children: [_jsx("h2", { className: "font-semibold text-lg", children: repo.name }), _jsx("p", { className: "text-sm text-gray-600", children: repo.description || "No description" }), _jsx("a", { href: repo.html_url, target: "_blank", rel: "noopener noreferrer", className: "text-blue-500 text-sm", children: "View on GitHub" })] }) }, repo.id))) }))] }));
}
