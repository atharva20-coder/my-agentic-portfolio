"use client";

import React from 'react';
import Link from 'next/link';
import { metaData } from '../../config';

export default function SpendElonMuskMoneyPage() {
  return (
    <iframe
      src="https://spend-elon-musk-money-eight.vercel.app"
      style={{
        width: '100vw',
        height: '100vh',
        border: 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
    />
  );
}