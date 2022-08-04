type BodyType = {
  type: string;
  source: string;
  description: string;
};

export function analyse(type: string) {
  console.log("analysing");
  try {
    fetch(process.env.NEXT_PUBLIC_MY_ANALYTICS_SERVER! + "/analytics", {
      method: "POST",
      headers: [["Content-Type", "application/json"]],
      body: JSON.stringify(getAnalyticsBody(type)),
    });
  } catch (err) {
    console.log(err);
  }
}

function getAnalyticsBody(type: string): BodyType {
  switch (type) {
    case "search-scroll":
      return {
        source: "[blognado]- search results page",
        type: "[scroll]",
        description: "scrolled search results page",
      };
    case "home-scroll":
      return {
        source: "[blognado]- home page",
        type: "[scroll]",
        description: "scrolled home page",
      };
    case "blog-details":
      return {
        source: "[blognado] - scroll blog details page",
        type: "[scroll]",
        description: "scrolled blog details page",
      };
    case "login-page":
      return {
        source: "[blognado] - open login page",
        type: "[open]",
        description: "opened login page",
      };
    case "profile-page":
      return {
        source: "[blognado] - open profile page",
        type: "[scroll]",
        description: "opened profile page",
      };
    default:
      return {} as BodyType;
  }
}
