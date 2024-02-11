import clientPromise from "@/lib/mongodbneu";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("poool");

    const posts = await db.collection("projects").find({}).limit(20).toArray();

    res.json(posts);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
