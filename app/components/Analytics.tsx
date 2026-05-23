'use client'
 
import Script from 'next/script'
import { Analytics as VercelAnalytics } from '@vercel/analytics/react'
import { GA_MEASUREMENT_ID } from '../lib/gtag'
 
const Analytics = () => {
  return (
    <>
      {/* Vercel Analytics */}
      <VercelAnalytics />

      {/* Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  )
}
 
export default Analytics