export const request_crawlsource = (source) => {
  // console.log(`Crawl request for source ${source.name}`);
  // only request for crawling, no need to get response
  const BACKEND_API_URL = "https://backendapi.raventalk.org/api/v1/source";

  const backend_api = `${BACKEND_API_URL}?source_id=${source.id}`;
  window.fetch(backend_api, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const fetch_linkimage = (source_link) =>
  new Promise((resolve, reject) => {
    const LINKIMAGE_API_URL = "https://searchapi.raventalk.org/link-preview";
    const data = { url: source_link };

    window
      .fetch(LINKIMAGE_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          resolve(null);
        }
      })
      .then((data) => {
        if (!data || data.error) {
          console.log("API error:", data.errorMsg);
          resolve(null);
        } else {
          const images = data.data.images;
          if (images.length > 0) {
            resolve(images[0]);
          } else {
            resolve(null);
          }
        }
      })
      .catch((err) => {
        resolve(null);
      });
  });

export const fetch_linksource = (link) =>
  new Promise((resolve, reject) => {
    const LINKSOURCE_API_URL =
      "https://searchapi.raventalk.org/link-preview";

      const data = { url: link };

    window
      .fetch(LINKSOURCE_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          resolve(null);
        }
      })
      .then((data) => {
        if (!data || data.error) {
          console.log("API error:", data.errorMsg);
          resolve(null);
        } else {
          const linkpreview = {
            title: data.data.title,
            description: data.data.description,
            image: data.data.image,
            domain: data.data.siteName,
            url: data.data.url
          }
          resolve(linkpreview);
        }
      })
      .catch((err) => {
        console.log("fetch linkpreview error :", err);
        resolve(null);
      });
  });

  export const fetch_linkpreview = (link) =>
  new Promise((resolve, reject) => {
    const LINKPREVIEW_API_URL =
      "https://backendapi.raventalk.org/api/v1/linkpreview";

    const data = { url: link };

    window
      .fetch(LINKPREVIEW_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          resolve(null);
        }
      })
      .then((data) => {
        if (!data || data.error) {
          console.log("API error:", data.errorMsg);
          resolve(null);
        } else {
          const linkpreview = {
            title: data.linkpreview.title,
            description: data.linkpreview.description,
            image: data.linkpreview.image,
            domain: data.linkpreview.domain,
            url: data.linkpreview.url
          }
          resolve(linkpreview);
        }
      })
      .catch((err) => {
        console.log("fetch linkpreview error :", err);
        resolve(null);
      });
  });

export const search_articles = (parameters) =>
  new Promise((resolve, reject) => {
    const SEARCH_API_URL = "https://searchapi.raventalk.org/search";

    window.fetch(SEARCH_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(parameters)
    })
    .then(res => res.json())
    .then(result => {
      if (result.error) {
        resolve(null);
      } else {
        // console.log('search result :', result);
        const articles = result.hits.map(hit => hit._source);
        resolve(articles);
      }
    })
    .catch(err => {
      console.log("Failed to get search result :", err);
      resolve(null);
    });
  });

export const send_invitemsg = (msgToken, invite_username, invite_url) =>
  new Promise((resolve, reject) => {
    const USER_INVITE_URL = "https://messaging.raventalk.org/invite2feed";
    const data = { 
      token: msgToken,
      invite_url: invite_url,
      username: invite_username
    };
    // console.log("send invite message body :", data);

    window
      .fetch(USER_INVITE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then((res) => {
        // console.log("send invitemsg result :", res);
        if (res.status === 200) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((err) => {
        resolve(false);
      });
  });
  
export const auth_response = () =>
new Promise((resolve, reject) => {
  const AUTH_REDIRECT_URL = "https://authapi.raventalk.org/";
  window
    .fetch(AUTH_REDIRECT_URL, {
      method: "GET",
      credentials: "include",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error("Failed to authenticate user");
      }
    })
    .then(responseJson => {
      resolve({
        error: false,
        user: responseJson.user
      });
    })
    .catch((err) => {
      resolve({
        error: true,
        msg: "Failed to authenticate user"
      });
    });
});

export const contact_us = (name, email, message) =>
  new Promise((resolve, reject) => {
    const CONTACTUS_MAIL_API_URL =
      "https://mailapi.raventalk.org/contact";

    // console.log("name :", name);

    const data = { 
      name: name,
      email: email,
      message: message
    };

    window
      .fetch(CONTACTUS_MAIL_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          resolve({
            error: true,
            msg: "Failed to send contact email"
          });
        }
      })
      .then((data) => {
        if (!data || data.error) {
          resolve({
            error: true,
            msg: data.message
          });
        } else {
          resolve({
            error: false,
            msg: data.message
          });
        }
      })
      .catch((err) => {
        console.log("Failed to send contact email :", err);
        resolve({
          error: true,
          msg: "Failed to send contact email"
        });
      });
  });


export const moderate_image = (image_url) =>
  new Promise((resolve, reject) => {
    const MODERATE_IMAGE_API = "https://searchapi.raventalk.org/image-moderate";
    const data = { url: image_url };

    window
      .fetch(MODERATE_IMAGE_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          resolve(null);
        }
      })
      .then((data) => {
        if (!data || data.error) {
          console.log("API error:", data.errorMsg);
          resolve(null);
        } else {
          resolve(data.data);
        }
      })
      .catch((err) => {
        resolve(null);
      });
  });


export const moderate_text = (text) =>
  new Promise((resolve, reject) => {
    const MODERATE_TEXT_API = "https://searchapi.raventalk.org/text-moderate";
    const data = { text: text };

    window
      .fetch(MODERATE_TEXT_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          resolve(null);
        }
      })
      .then((data) => {
        if (!data || data.error) {
          console.log("API error:", data.errorMsg);
          resolve(null);
        } else {
          resolve(data.data);
        }
      })
      .catch((err) => {
        resolve(null);
      });
  });
