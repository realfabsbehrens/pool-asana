import clientPromise from "@/lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("poool");
    const {
      name,
      assignee,
      workspace,
      asanaGID,
      nummer,
      project,
      status,
      termin,
    } = req.body;

    const post = await db.collection("projects").insertOne({
      name,
      assignee,
      workspace,
      asanaGID,
      nummer,
      project,
      status,
      termin,
    });

    res.json(post);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
