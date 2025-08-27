"use client";

import React, { useState } from "react";
import { config } from "@/lib/config";

const recipientInfo = {
  name: "Melani Alvina |",
  phone: "081906604942",
  address: "Jl. Pangeran Asogiri Rt.03 Rw.04 Tanah Baru No.10 Bogor Utara Kota Bogor (16154)",
};

const DigitalWallet = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const [showAll, setShowAll] = useState<Record<number, boolean>>({});

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 1800);
  };

  const toggleMask = (idx: number) =>
    setShowAll((s) => ({ ...s, [idx]: !s[idx] }));

  const mask = (v: string, visible = 4) =>
    v.length <= visible ? v : "•".repeat(v.length - visible) + v.slice(-visible);

  return (
    <section className="text-black mb-10">
      {/* Header */}
      <div className="text-center p">
        <h2 className="text-2xl sm:text-3xl font-ovo mb-">Amplop Digital</h2>
        <p className="text-xs sm:text-sm font-legan text-black/70 max-w-md mx-auto mb-4">
          Apabila Bapak/Ibu/Saudara berkenan memberikan tanda kasih, dapat melalui rekening & alamat berikut.
        </p>
      </div>

      {/* Grid rekening */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 max-w-lg md:max-w-3xl mx-auto">
        {config.digitalWallet.bankAccounts.map((acc, i) => {
          const isShown = !!showAll[i];
          const accNumber = String(acc.accountNumber);
          return (
            <div
              key={`${acc.bank}-${i}`}
              className="rounded-xl border border-black/10 bg-black/70 backdrop-blur-md shadow-sm"
            >
              <div className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={` 
                    ${acc.bank === "BCA" ? "" : ""}
                    ${acc.bank === "Mandiri" ? "" : ""}`}
                    aria-hidden
                  >
                  </span>
                  <p className="font-ovo text-base text-amber-200">Bank {acc.bank}</p>
                </div>

                {/* Copy */}
                <button
                  onClick={() => copyToClipboard(accNumber, `bank-${i}`)}
                  className={`text-xs text-white rounded-full px-2 py-1 border border-amber-200
                    ${copied === `bank-${i}` ? "border-black-400 text-white-700 bg-black-50" : "border-black/15 text-black/70 hover:bg-black/5"}`}
                  aria-label="Salin nomor rekening"
                  title="Salin nomor rekening"
                >
                  {copied === `bank-${i}` ? "Tersalin" : "Salin"}
                </button>
              </div>

              <div className="px-4 pb-3">
                <div className="rounded-lg bg-black/5 border border-black/10 px-3 py-2 flex items-center justify-between">
                  <code className="font-mono text-sm tracking-wide text-white">
                    {isShown ? accNumber : mask(accNumber)}
                  </code>

                  <button
                    onClick={() => toggleMask(i)}
                    className="text-[11px] text-white px-2 py-1 rounded border border-amber-200 hover:bg-black/5"
                    aria-label={isShown ? "Sembunyikan nomor" : "Tampilkan nomor"}
                  >
                    {isShown ? "Sembunyi" : "Tampilkan"}
                  </button>
                </div>

                <p className="text-s text-center mt-2 font-legan text-white">
                  {acc.accountName}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recipient Information */}
      <div className="max-w-lg md:max-w-3xl mx-auto mt-4">
        <div className="rounded-xl border border-black/10 bg-black/70 backdrop-blur-md shadow-sm">
          <div className="px-4 py-3">
            <p className="text-center font-ovo text-s text-amber-200">ALAMAT LENGKAP</p>

            <p className="text-s font-legan text-center text-white mt-1 flex justify-center gap-2">
              <span>{}</span>
              <span>{}</span>
            </p>
            <p className="text-s font-legan text-center text-white mt-1">
              {recipientInfo.address}
            </p>

            <div className="flex justify-center mt-3 hidden">
              <button
                className="text-xs font-legan text-white bg-black/40 px-3 py-1 rounded-md border border-amber-200 hover:bg-white/20 transition"
                onClick={() => navigator.clipboard.writeText(`${recipientInfo.name} ${recipientInfo.phone}\n${recipientInfo.address}`)}
              >
                Salin Alamat
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitalWallet;
