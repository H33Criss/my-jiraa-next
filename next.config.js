/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,


  // async headers() {
  //   return [
  //     {
  //       source: "/api/(.*)",
  //       headers: [
  //         { key: "Access-Control-Allow-Credentials", value: "true" },
  //         { key: "Access-Control-Allow-Origin", value: "https://myjiraa-nextjs.herokuapp.com" },

  //       ]
  //     }
  //   ]
  // },
  // headers: [
  //   { key: "Access-Control-Allow-Credentials", value: "true" },
  //   { key: "Access-Control-Allow-Origin", value: "https://myjiraa-nextjs.herokuapp.com" },
  //   // ...
  // ]
}

// module.exports = nextConfig
module.exports = {
  async headers() {
    return [
      {
        source: "/_next/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "https://myjiraa-nextjs.herokuapp.com" },

        ]
      }
    ]
  },
}
