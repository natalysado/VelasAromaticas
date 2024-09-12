import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Head>
        <title>Sobre Nosotros - Velas Aromáticas</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar cartItemsCount={0} />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Sobre Nosotros</h1>
        <div className="bg-white p-8 rounded shadow">
          <p className="mb-4">
            En Velas Aromáticas, nos apasiona crear ambientes acogedores y relajantes a través de nuestras velas artesanales.
            Fundada en 2020, nuestra empresa se dedica a producir velas de la más alta calidad, utilizando ingredientes naturales y fragancias cuidadosamente seleccionadas.
          </p>
          <p className="mb-4">
            Nuestro equipo de artesanos trabaja con dedicación para asegurar que cada vela sea una obra maestra de aroma y diseño.
            Creemos en la sostenibilidad y el cuidado del medio ambiente, por lo que utilizamos ceras naturales y envases reciclables en todos nuestros productos.
          </p>
          <p>
            Ya sea que busques crear un ambiente relajante en tu hogar, encontrar el regalo perfecto, o simplemente disfrutar de hermosas fragancias,
            en Velas Aromáticas tenemos la vela perfecta para ti.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}