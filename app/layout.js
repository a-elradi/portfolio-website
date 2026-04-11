import './globals.css'

export const metadata = {
  title: 'Abdalla Elsiddig | AI & Robotics Engineer',
  description: 'Professional portfolio of Abdalla Elsiddig - AI, Computer Vision & Robotics Engineer',
  keywords: 'AI, Robotics, Computer Vision, IoT, Engineer, Portfolio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
