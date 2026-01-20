import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

const paymentMethods = [
    { id: "paypal", label: "PayPal", detail: "Balance + cards", badge: "PP", badgeClass: "bg-blue-600" },
    { id: "apple", label: "Apple Pay", detail: "Touch ID", badge: "AP", badgeClass: "bg-gray-900" },
    { id: "google", label: "Google Pay", detail: "One tap", badge: "G", badgeClass: "bg-emerald-500" },
    { id: "card", label: "Credit Card", detail: "Visa / Master", badge: "CC", badgeClass: "bg-amber-500" }
];

export default function StudentPaymentMethod() {
    const [selected, setSelected] = useState("paypal");

    return (
        <div className="profile-section">
            <div className="profile-section-header">
                <h2 className="profile-section-title">Payment method</h2>
                <p className="profile-section-subtitle">Select your payment method.</p>
            </div>

            <section className="w-full max-w-xl rounded-2xl border border-gray-100 bg-gray-50/80 p-5">
                <div className="space-y-3">
                    {paymentMethods.map((method) => (
                        <button
                            key={method.id}
                            type="button"
                            onClick={() => setSelected(method.id)}
                            className={`flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition ${selected === method.id ? "border-teal-500 bg-teal-50" : "border-gray-200 bg-white"
                                }`}
                        >
                            <span className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold text-white ${method.badgeClass}`}>
                                {method.badge}
                            </span>
                            <div className="flex-1">
                                <div className="text-sm font-medium text-gray-700">{method.label}</div>
                                <div className="text-xs text-gray-400">{method.detail}</div>
                            </div>
                            <span className={`h-3 w-3 rounded-full border ${selected === method.id ? "border-teal-500 bg-teal-500" : "border-gray-300 bg-white"}`} />
                        </button>
                    ))}
                </div>

                <div className="mt-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400">Others</p>
                    <div className="mt-3 flex gap-3">
                        <div className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-center text-xs font-semibold text-gray-600">VISA</div>
                        <div className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-center text-xs font-semibold text-gray-600">Master</div>
                    </div>
                </div>

                <Link
                    to="/student/profile/payment/info"
                    className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-teal-800"
                >
                    Add
                </Link>
            </section>
        </div>
    );
}
