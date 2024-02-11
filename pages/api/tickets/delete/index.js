import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("poool");
    const { asanaGid } = req.query;

    const post = await db.collection("projects").deleteOne({
      asanaGID: asanaGid,
    });

    res.json(post);
  } catch (e) {
    console.error("Error in MongoDB delete operation:", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
