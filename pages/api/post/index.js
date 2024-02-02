// pages/post.js

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Hier können Sie die empfangenen Daten verarbeiten
      const data = req.body;

      // Fügen Sie hier Ihre Verarbeitungslogik ein

      // Senden Sie eine Antwort
      res
        .status(200)
        .json({
          success: true,
          message: "Daten erfolgreich empfangen und verarbeitet.",
        });
    } catch (error) {
      console.error("Fehler bei der Verarbeitung der Daten:", error);
      res
        .status(500)
        .json({ success: false, message: "Interner Serverfehler." });
    }
  } else {
    res.status(405).json({ success: false, message: "Methode nicht erlaubt." });
  }
}
