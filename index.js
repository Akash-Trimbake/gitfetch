const express = require("express");
const axios = require("axios");
const app = express();

const port = process.env.PORT || 5000;

// Define a route for the root path
app.get("/", (req, res) => {
  res.send("Hello World! Welcome to the gitfetchAPI");
});

app.get("/searchreposbystars/:language/:stars", async (req, res) => {
  const { language, stars } = req.params;

  try {
    const githubApiUrl = "https://api.github.com/search/repositories";
    const queryParams = {
      q: `language:${language} stars:>${stars}`,
      sort: "stars",
      order: "desc",
      per_page: 100,
      page: 1,
    };

    const response = await axios.get(githubApiUrl, { params: queryParams });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/searchreposbyforks/:language/:forks", async (req, res) => {
  const { language, forks } = req.params;

  try {
    const githubApiUrl = "https://api.github.com/search/repositories";
    const queryParams = {
      q: `language:${language} forks:>${forks}`,
      sort: "forks",
      order: "desc",
      per_page: 100,
      page: 1,
    };

    const response = await axios.get(githubApiUrl, { params: queryParams });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/repodetails/:owner/:repo", async (req, res) => {
  const { owner, repo } = req.params;
  try {
    const githubRepoUrl = `https://api.github.com/repos/${owner}/${repo}`;

    const response = await axios.get(githubRepoUrl);

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/toprepos", async (req, res) => {
  try {
    const githubApiUrl = "https://api.github.com/search/repositories";
    const queryParams = {
      q: "stars:>50000",
      sort: "stars",
      order: "desc",
      per_page: 100,
      page: 1,
    };

    const response = await axios.get(githubApiUrl, { params: queryParams });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/trendingrepos", async (req, res) => {
  try {
    const githubApiUrl = "https://api.github.com/search/repositories";

    // Calculate date range for the past month
    const currentDate = new Date();
    const oneMonthAgo = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      currentDate.getDate()
    );
    const formattedOneMonthAgo = oneMonthAgo.toISOString();

    const queryParams = {
      q: `stars:>25000 pushed:>=${formattedOneMonthAgo}`,
      sort: "stars",
      order: "desc",
      per_page: 100,
      page: 1,
    };
    const response = await axios.get(githubApiUrl, { params: queryParams });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
