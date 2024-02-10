import clientPromise from "@/lib/mongodbneu";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("poool");
    const { asanaGid } = req.query;

    const post = await db.collection("projects").deleteOne({
      asanaGID: asanaGid,
    });

    res.json(post);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
