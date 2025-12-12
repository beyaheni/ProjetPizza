import { readJSON } from "../services/jsonService.js";

// Fonction pour gérer la connexion
export function login(req, res) {
  const { email, password } = req.body;

  // Lecture des utilisateurs depuis un fichier JSON (par exemple)
  const users = readJSON("users.json");

  // Recherche de l'utilisateur par email et mot de passe
  const user = users.find(u => u.email === email && u.password === password);

  // Si l'utilisateur n'est pas trouvé
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  // Réponse avec un token et les informations de l'utilisateur
  res.json({
    token: "fake-token-" + user.id,
    user: {
      id: user.id,
      email: user.email,
      role: user.role
    }
  });
}
