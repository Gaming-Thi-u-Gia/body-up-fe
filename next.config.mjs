/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "res.cloudinary.com",
            "lh3.googleusercontent.com",
            "static.chloeting.com",
        ],
    },
    reactStrictMode: false,
};

export default nextConfig;
