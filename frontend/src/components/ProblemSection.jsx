import React from 'react'
import {Badge} from '@/components/ui/badge'
/*

Pakai bahasa yang dekat dengan keseharian pekerja.

    Label: FAKTA HARI INI

    Headline: AI Makin Pintar, Nasib Pekerjaan Kita Gimana?

    Deskripsi: Mulai dari urusan admin, jaga kasir, sampai pabrik, pelan-pelan mulai digantikan teknologi. Sayangnya, banyak dari kita yang belum sadar dan bingung harus siap-siap mulai dari mana. WorkSafe AI hadir buat bantu kamu menjawab kebingungan itu.

    Statistik Cepat (Biar meyakinkan):

        23 Juta+ Pekerja Terancam

        Paling Rawan: Admin, Kasir, Manufaktur

        Solusinya: Upgrade Skill (Belajar Keahlian Baru)

*/


const ProblemSection = () => {
  return (
    <section className="py-16 bg-">
      <div className="container">
        <Badge className="mb-4">FAKTA HARI INI</Badge>
        <h2 className="text-3xl font-bold mb-4">AI Makin Pintar, Nasib Pekerjaan Kita Gimana?</h2>
        <p className="text-lg mb-6">
          Mulai dari urusan admin, jaga kasir, sampai pabrik, pelan-pelan mulai digantikan teknologi. Sayangnya, banyak dari kita yang belum sadar dan bingung harus siap-siap mulai dari mana. WorkSafe AI hadir buat bantu kamu menjawab kebingungan itu.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-primary text-primary-foreground p-4 rounded-lg">
            <h3 className="text-xl font-bold">23 Juta+ Pekerja Terancam</h3>
          </div>
          <div className="bg-secondary text-secondary-foreground p-4 rounded-lg">
            <h3 className="text-xl font-bold">Paling Rawan: Admin, Kasir, Manufaktur</h3>
          </div>
          <div className="bg-accent text-accent-foreground p-4 rounded-lg">
            <h3 className="text-xl font-bold">Solusinya: Upgrade Skill (Belajar Keahlian Baru)</h3>
          </div>
        </div>

      </div>
    </section>
  )
}

export default ProblemSection