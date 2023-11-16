import express from "express";

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use('/blog', blogPostController);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
