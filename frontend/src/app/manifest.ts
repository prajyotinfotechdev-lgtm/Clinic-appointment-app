import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Star Clinic & Women Care',
        short_name: 'StarClinic',
        description: 'Premium healthcare management platform.',
        start_url: '/',
        display: 'standalone',
        background_color: '#f3f8fd',
        theme_color: '#043b4d',
        icons: [
            {
                src: '/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'maskable',
            },
            {
                src: '/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any',
            },
            {
                src: '/apple-icon.png',
                sizes: '180x180',
                type: 'image/png',
            },
        ],
    }
}
