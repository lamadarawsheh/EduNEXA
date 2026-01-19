import React, { useState } from "react";
import { ShieldCheck } from "lucide-react";
import "./Profile.css";

const cardBrands = [
    { id: "visa", label: "VISA", style: "bg-slate-900 text-white" },
    { id: "amex", label: "AMEX", style: "bg-sky-600 text-white" },
    { id: "master", label: "Mastercard", style: "bg-amber-500 text-white" }
];

export default function StudentPaymentInfo() {
    const [brand, setBrand] = useState("visa");

    return (
        <div className="profile-section">
            <div className="profile-section-header">
                <h2 className="profile-section-title">Payment details</h2>
                <p className="profile-section-subtitle">Add or update your card information.</p>
            </div>

            <section className="w-full max-w-xl rounded-2xl border border-gray-100 bg-gray-50/80 p-5">
                <div className="flex flex-wrap gap-2">
                    {cardBrands.map((card) => (
                        <button
                            key={card.id}
                            type="button"
                            onClick={() => setBrand(card.id)}
                            className={`flex-1 rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                                brand === card.id ? "border-teal-500 shadow-sm" : "border-gray-200"
                            } ${card.style}`}
                        >
                            {card.label}
                        </button>
                    ))}
                </div>

                <div className="mt-5 space-y-4">
                    <div>
                        <label className="text-xs font-semibold text-gray-500" htmlFor="card-holder">Card holder</label>
                        <input
                            id="card-holder"
                            type="text"
                            placeholder="Adam Smith"
                            className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400/60"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-gray-500" htmlFor="card-number">Card number</label>
                        <input
                            id="card-number"
                            type="text"
                            placeholder="1234 5678 9000 2458"
                            className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400/60"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-semibold text-gray-500" htmlFor="expiry">Expire date</label>
                            <input
                                id="expiry"
                                type="text"
                                placeholder="04/2030"
                                className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400/60"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-gray-500" htmlFor="cvv">CVC</label>
                            <input
                                id="cvv"
                                type="password"
                                placeholder="***"
                                className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400/60"
                            />
                        </div>
                    </div>
                </div>

                <label className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                    Save as payment method
                </label>

                <button
                    type="button"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-teal-800"
                >
                    <ShieldCheck className="h-4 w-4" />
                    Done
                </button>
            </section>
        </div>
    );
}
