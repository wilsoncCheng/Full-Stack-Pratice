const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

//Get Post
router.get("/", async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});
//Add Post
router.post("/", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    text: req.body,
    createTime: new Date(),
  });
  res.status(201).send();
});

//Delete Post
router.delete("/:id", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
  res.status(200).send();
});

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb+srv://wilsoncheng0704wc:20230704Abcde104@cluster0.xe797jd.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  );

  return client.db("FULLSTACK_EXCERCISE").collection("posts");
}

module.exports = router;
