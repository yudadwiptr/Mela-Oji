"use client";

import React, { useState } from "react";
import { config } from "@/lib/config";
import Image from "next/image";

const DigitalWallet = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 3000);
  };

  return (
    <div className="mt-4 text-white overflow-y-auto max-h-[85vh] pb-4">
      <h2 className="text-xl sm:text-3xl text-center font-ovo mb-2.5">{config.digitalWallet.messageTitle}</h2>
      <p className="text-xs sm:text-sm text-center font-legan mb-5 max-w-md mx-auto">
      {config.digitalWallet.message}
      </p>

      <div className="max-w-md mx-auto">
      {/* Bank Accounts Grid */}
      <div className="space-y-4">
        {config.digitalWallet.bankAccounts.map((account, index) => (
        <div 
          key={index} 
          className="bg-black/30 backdrop-blur-md rounded-xl p-4 border border-white/10 shadow-lg transform transition-all hover:shadow-xl hover:border-white/20"
        >
          <div className="flex items-center justify-center mb-3">
            {/* Bank Logo and Name */}
            {account.bank === "BCA" && (
              <span className="text-blue-400 mr-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 7h14c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V9c0-1.1.9-2 2-2zm13.3 2l-5.5 3.5c-.5.3-1.1.3-1.6 0L5.7 9H18.3z" fillRule="evenodd"/>
                </svg>
              </span>
            )}
            {account.bank === "Mandiri" && (
              <span className="text-yellow-500 mr-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 8h16v8H4V8zm1 1v6h14V9H5z" fillRule="evenodd"/>
                  <path d="M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" fillRule="evenodd"/>
                </svg>
              </span>
            )}
            <h3 className="text-xl font-bold font-ovo tracking-wide">Bank {account.bank}</h3>
          </div>
          
          <div className="mt-2">
            <p className="font-legan text-xs opacity-80 text-center mb-1">Nomor Rekening</p>
            <div className="flex items-center justify-between mt-1 bg-white/10 rounded-lg p-3 border border-white/5 transition-all hover:bg-white/15">
              <span className="font-mono text-lg tracking-wide">{account.accountNumber}</span>
              <button 
                onClick={() => copyToClipboard(account.accountNumber, `bank-${index}`)}
                className={`ml-2 p-1.5 rounded-full transition-all transform duration-300 ${
                  copied === `bank-${index}` 
                    ? "bg-green-500/30 text-green-200 scale-110" 
                    : "bg-amber-500/20 text-amber-200 hover:bg-amber-500/30 hover:scale-110"
                }`}
                title="Salin nomor rekening"
              >
                {copied === `bank-${index}` ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
                    <path d="M9.5 1h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"/>
                  </svg>
                )}
              </button>
            </div>
            
            <div className="mt-2 flex justify-center items-center">
              <p className="font-legan text-xs opacity-70 mr-2"></p>
              <p className="font-mono text-sm italic">{account.accountName}</p>
            </div>
          </div>
        </div>
        ))}
      </div>
      </div>
    </div>
  )
};

export default DigitalWallet;
