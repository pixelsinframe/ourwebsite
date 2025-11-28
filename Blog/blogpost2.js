const query = `
{
  post(slug:"benefits-of-a-website-to-small-businesses-and-creatives-in-south-africa", hostname:"pixelsinframe") {
    title,
    brief,
    slug,
    cuid,
    coverImage,
    content,
    contentMarkdown
  }
}`;
async function getData() {
  const response = await fetch("https://api.hashnode.com", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: query }),
  });
  const body = await response.json();

  document.getElementById("slug").innerHTML = body.data.post.title;
  document.getElementById("imageapp").src = body.data.post.coverImage;
  document.getElementById("brief").innerHTML = body.data.post.brief;
}

getData();


