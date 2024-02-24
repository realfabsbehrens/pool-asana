import clientPromise from "@/lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("poool");
    const {
      asanaGID,
      name,
      assignee,
      workspace,
      nummer,
      project,
      status,
      termin,
    } = req.body;

    const filter = { asanaGID: asanaGID };

    const updateDoc = {
      $set: {
        name,
        assignee,
        workspace,
        nummer,
        project,
        status,
        termin,
      },
    };

    const result = await db.collection("projects").updateOne(filter, updateDoc);

    if (result.modifiedCount === 0) {
      res.status(404).json({ error: "Fehler! Ticket wurde nicht gefunden!" });
      return;
    }

    res.json({ success: true, message: "Ticket erfolgreich aktualisiert." });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
};
