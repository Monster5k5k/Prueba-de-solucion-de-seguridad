/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Permite cargar imágenes de cualquier dominio externo
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
