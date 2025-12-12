export function isAdmin(req, res, next) {
    const token = req.headers.authorization;

    // Pas de token ⇒ accès refusé
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    // Fake token check (exemple : "fake-token-1")
    if (!token.startsWith("Bearer fake-token-")) {
        return res.status(403).json({ error: "Forbidden: Admin only" });
    }

    // OK
    next();
}

export default isAdmin;
