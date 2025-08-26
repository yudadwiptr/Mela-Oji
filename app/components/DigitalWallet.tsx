"use client";

import React, { useState } from "react";
import { config } from "@/lib/config";

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
    <section className="text-black">
      {/* Header */}
      <div className="text-center space-y-2 mb-5">
        <h2 className="text-xl sm:text-2xl font-ovo">Amplop Digital</h2>
        <p className="text-xs sm:text-sm font-legan text-black/70 max-w-md mx-auto">
          Doa restu Anda adalah hadiah terbaik. Bila berkenan memberi hadiah,
          berikut detail rekening & alamat.
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
              className="rounded-xl border border-black/10 bg-white/70 backdrop-blur-md shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[10px] 
                    ${acc.bank === "BCA" ? "bg-blue-600/10 text-blue-700" : ""}
                    ${acc.bank === "Mandiri" ? "bg-yellow-500/10 text-yellow-700" : ""}`}
                    aria-hidden
                  >
                    ●
                  </span>
                  <p className="font-ovo text-base">Bank {acc.bank}</p>
                </div>

                {/* Copy */}
                <button
                  onClick={() => copyToClipboard(accNumber, `bank-${i}`)}
                  className={`text-xs rounded-full px-2 py-1 border
                    ${copied === `bank-${i}` ? "border-green-400 text-green-700 bg-green-50" : "border-black/15 text-black/70 hover:bg-black/5"}`}
                  aria-label="Salin nomor rekening"
                  title="Salin nomor rekening"
                >
                  {copied === `bank-${i}` ? "Tersalin" : "Salin"}
                </button>
              </div>

              <div className="px-4 pb-3">
                <div className="rounded-lg bg-black/5 border border-black/10 px-3 py-2 flex items-center justify-between">
                  <code className="font-mono text-sm tracking-wide">
                    {isShown ? accNumber : mask(accNumber)}
                  </code>

                  <button
                    onClick={() => toggleMask(i)}
                    className="text-[11px] px-2 py-1 rounded border border-black/10 text-black/60 hover:bg-black/5"
                    aria-label={isShown ? "Sembunyikan nomor" : "Tampilkan nomor"}
                  >
                    {isShown ? "Sembunyi" : "Tampilkan"}
                  </button>
                </div>

                <p className="text-xs text-center mt-2 font-legan">
                  {acc.accountName}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Alamat pengiriman */}
      {config.digitalWallet.address && (
        <div className="max-w-lg md:max-w-3xl mx-auto mt-4">
          <div className="rounded-xl border border-black/10 bg-white/70 backdrop-blur-md shadow-sm">
            <div className="px-4 py-3">
              <p className="text-center font-ovo text-sm">Alamat untuk kirim hadiah</p>
              <p className="text-xs font-legan text-center text-black/70 mt-1">
                {config.digitalWallet.address}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DigitalWallet;
