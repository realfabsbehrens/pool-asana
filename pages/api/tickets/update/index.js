import clientPromise from "@/lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("poool");
    const {
      asanaGID, // Assuming asanaGID is the unique identifier for the document
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
      res.status(404).json({ error: "Document not found" });
      return;
    }

    res.json({ success: true, message: "Document updated successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
};
