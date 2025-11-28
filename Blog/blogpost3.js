const query = `
{
  post(slug:"importance-of-a-good-website-design", hostname:"pixelsinframe") {
    title,
    brief,
    slug,
    cuid,
    coverImage,
    content,
    contentMarkdown
  }
}`;
async function getData2() {
  const response = await fetch("https://api.hashnode.com", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: query }),
  });
  const body = await response.json();

  document.getElementById("slug2").innerHTML = body.data.post.title;
  document.getElementById("imageapp2").src = body.data.post.coverImage;
  document.getElementById("brief2").innerHTML = body.data.post.brief;
}

getData2();
