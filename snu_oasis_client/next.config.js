/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
          "www.gravatar.com",
          "localhost",
          "ec2-43-200-254-110.ap-northeast-2.compute.amazonaws.com",
          "snu-oasis.com"
        ]
      }
}

module.exports = nextConfig
