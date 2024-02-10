import { getTasks } from "/lib/mongo/tasks";

const handler = async (req, res) => {
  // expexting get request
  if (req.method === "GET") {
    try {
      // call get movies function
      const { tasks, error } = await getTasks();
      if (error) throw new Error(error);

      // return json data
      return res.status(200).json({ tasks });
    } catch (error) {
      // return error if something goes wrong
      return res.status(500).json({ error: error.message });
    }
  }
  res.setHeader("Allow", ["GET"]);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
