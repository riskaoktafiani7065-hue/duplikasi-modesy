"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MemberTopBar from "../components/MemberTopBar";
import MemberMainHeader from "../components/MemberMainHeader";
import CategoryNavbar from "@/components/layout/CategoryNavbar";
import Footer from "@/components/layout/Footer";

type WalletTab =
  | "deposits"
  | "expenses"
  | "payouts"
  | "payout-account";

type Transaction = {
  paymentId: string;
  method: string;
  amount: string;
  status: string;
  date: string;
  invoice: string;
};

const tabs: { id: WalletTab; label: string }[] = [
  { id: "deposits", label: "Deposits" },
  { id: "expenses", label: "Expenses" },
  { id: "payouts", label: "Payouts" },
  { id: "payout-account", label: "Set Payout Account" },
];

const transactions: Record<
  Exclude<WalletTab, "payout-account">,
  Transaction[]
> = {
  deposits: [
    {
      paymentId: "BTR-HMDQRCZDHE-CPZTJXWK",
      method: "Bank Transfer",
      amount: "$10 (USD) - Pending Payment",
      status: "Pending",
      date: "2026-09-17 / 17:57",
      invoice: "View Invoice",
    },
    {
      paymentId: "BTR-HMDP9KNW90-1Y394WJO",
      method: "Bank Transfer",
      amount: "$10 (USD) - Pending Payment",
      status: "Pending",
      date: "2026-09-17 / 17:03",
      invoice: "View Invoice",
    },
    {
      paymentId: "BTR-HM95ZHFS7S-369RASZE",
      method: "Bank Transfer",
      amount: "$10 (USD) - Pending Payment",
      status: "Pending",
      date: "2026-09-13 / 14:19",
      invoice: "View Invoice",
    },
    {
      paymentId: "BTR-HM0LWO7M4I-AG10P9OR",
      method: "Bank Transfer",
      amount: "$10 (USD) - Pending Payment",
      status: "Pending",
      date: "2026-09-05 / 20:02",
      invoice: "View Invoice",
    },
  ],

  expenses: [],

  payouts: [],
};

const urlToTab: Record<string, WalletTab> = {
  deposits: "deposits",
  expenses: "expenses",
  payouts: "payouts",
  "set-payout-account": "payout-account",
};

const tabToUrl: Record<WalletTab, string> = {
  deposits: "deposits",
  expenses: "expenses",
  payouts: "payouts",
  "payout-account": "set-payout-account",
};

export default function WalletPage() {
  const [activeTab, setActiveTab] =
    useState<WalletTab>("deposits");

  const [showDepositForm, setShowDepositForm] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  const [notice, setNotice] = useState("");
  const [reportedPayments, setReportedPayments] = useState<string[]>(
    [],
  );

  // Membaca parameter URL saat halaman pertama kali dibuka.
  useEffect(() => {
    const url = new URL(window.location.href);
    const tabFromUrl = url.searchParams.get("tab");

    if (!tabFromUrl || !urlToTab[tabFromUrl]) {
      url.searchParams.set("tab", "deposits");
      window.history.replaceState({}, "", url.toString());
      setActiveTab("deposits");
      return;
    }

    setActiveTab(urlToTab[tabFromUrl]);
  }, []);

  const currentTransactions =
    activeTab === "payout-account"
      ? []
      : transactions[activeTab];

  // Mengubah tab sekaligus memperbarui URL.
  function changeTab(tab: WalletTab) {
    setActiveTab(tab);
    setNotice("");

    const url = new URL(window.location.href);
    url.searchParams.set("tab", tabToUrl[tab]);

    window.history.replaceState({}, "", url.toString());
  }

  function handleDeposit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const amount = Number(depositAmount);

    if (!depositAmount || !Number.isFinite(amount) || amount <= 0) {
      setNotice("Masukkan nominal deposit yang valid.");
      return;
    }

    setNotice(
      `Simulasi frontend: permintaan deposit sebesar $${amount.toFixed(
        2,
      )} berhasil disiapkan. Belum ada transaksi nyata.`,
    );

    setDepositAmount("");
    setShowDepositForm(false);
  }

  function reportBankTransfer(paymentId: string) {
    setReportedPayments((previous) =>
      previous.includes(paymentId)
        ? previous
        : [...previous, paymentId],
    );

    setNotice(
      `Laporan transfer ${paymentId} disimulasikan. Belum ada laporan nyata yang dikirim.`,
    );
  }

  return (
    <main className="min-h-screen bg-white text-[#222]">
      <MemberTopBar />
      <MemberMainHeader />
      <CategoryNavbar />

      <div className="mx-auto w-full max-w-7xl px-4 pb-12 pt-5 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-5 flex items-center gap-2 text-xs text-[#777]"
        >
          <Link href="/member" className="hover:text-[#00a99d]">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#555]">Wallet</span>
        </nav>

        {/* Page title */}
        <h1 className="mb-6 text-2xl font-medium text-[#333]">
          Wallet
        </h1>

        {/* Wallet balance card */}
        <section className="relative mb-8 min-h-62.5 rounded-md border border-[#eee] bg-white px-5 py-10 text-center shadow-[0_3px_8px_rgba(0,0,0,0.04)] sm:px-10">
          <button
            type="button"
            onClick={() => {
              setShowDepositForm((current) => !current);
              setNotice("");
            }}
            className="absolute right-5 top-5 inline-flex items-center gap-2 rounded bg-[#e5e7eb] px-4 py-3 text-sm font-medium text-[#111827] transition hover:bg-gray-300 sm:right-6 sm:top-6"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <rect x="3" y="5" width="18" height="14" rx="1.5" />
              <path d="M3 9h18M12 15h6M15 12v6" />
            </svg>

            {showDepositForm ? "Cancel" : "Add Funds"}
          </button>

          <div className="mx-auto flex max-w-md flex-col items-center pt-6">
            <svg
              viewBox="0 0 96 80"
              fill="none"
              className="mb-4 h-19 w-23 text-[#00a99d]"
              aria-hidden="true"
            >
              <path
                d="M13 10h48"
                stroke="currentColor"
                strokeWidth="9"
                strokeLinecap="round"
              />
              <rect
                x="7"
                y="17"
                width="82"
                height="61"
                rx="11"
                fill="currentColor"
              />
              <circle cx="63" cy="47" r="7" fill="white" />
            </svg>

            <h2 className="text-xl font-medium text-[#111]">
              Wallet Balance
            </h2>

            <p className="mt-3 text-[44px] font-bold leading-tight tracking-tight text-[#262626] sm:text-[54px]">
              $9.95
            </p>
          </div>

          {/* Add Funds form */}
          {showDepositForm && (
            <form
              onSubmit={handleDeposit}
              className="mx-auto mt-6 max-w-sm border-t border-gray-100 pt-5 text-left"
            >
              <label
                htmlFor="deposit-amount"
                className="mb-2 block text-sm text-[#555]"
              >
                Deposit Amount (USD)
              </label>

              <input
                id="deposit-amount"
                type="number"
                min="0.01"
                step="0.01"
                required
                value={depositAmount}
                onChange={(event) =>
                  setDepositAmount(event.target.value)
                }
                placeholder="Enter amount"
                className="h-11 w-full rounded border border-[#ddd] px-3 text-sm outline-none focus:border-[#00a99d]"
              />

              <button
                type="submit"
                className="mt-3 rounded bg-[#00a99d] px-5 py-2.5 text-sm text-white transition hover:bg-[#008f85]"
              >
                Continue
              </button>
            </form>
          )}
        </section>

        {/* Notification */}
        {notice && (
          <p
            role="status"
            className="mb-5 rounded border border-[#d5f1ed] bg-[#f0fbf9] px-4 py-3 text-sm text-[#087f75]"
          >
            {notice}
          </p>
        )}

        {/* Wallet tabs */}
        <section>
          <div className="mb-5 flex flex-wrap items-center justify-center gap-3">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => changeTab(tab.id)}
                  aria-pressed={isActive}
                  className={`min-h-14 rounded border px-6 py-3 text-base transition ${
                    isActive
                      ? "border-[#00a99d] bg-[#00a99d] text-white"
                      : "border-[#e8e8e8] bg-[#f8f8f8] text-[#222] hover:border-[#00a99d] hover:text-[#008f85]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Payout account form */}
          {activeTab === "payout-account" ? (
            <div className="mt-8 border border-[#eee] p-5 sm:p-8">

              <form
                className="mt-6 max-w-xl space-y-5"
                onSubmit={(event) => {
                  event.preventDefault();
                  setNotice(
                    "Data akun payout tersimpan dalam simulasi frontend.",
                  );
                }}
              >
                <div>
                  <label
                    htmlFor="account-holder"
                    className="mb-2 block text-sm text-[#555]"
                  >
                    Account Holder Name
                  </label>

                  <input
                    id="account-holder"
                    required
                    placeholder="Enter account holder name"
                    className="h-11 w-full rounded border border-[#ddd] px-3 text-sm outline-none focus:border-[#00a99d]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="payout-method"
                    className="mb-2 block text-sm text-[#555]"
                  >
                    Payout Method
                  </label>

                  <select
                    id="payout-method"
                    required
                    defaultValue=""
                    className="h-11 w-full rounded border border-[#ddd] bg-white px-3 text-sm outline-none focus:border-[#00a99d]"
                  >
                    <option value="" disabled>
                      Select payout method
                    </option>
                    <option value="bank">Bank Transfer</option>
                    <option value="paypal">PayPal</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="payout-details"
                    className="mb-2 block text-sm text-[#555]"
                  >
                    Account Details
                  </label>

                  <input
                    id="payout-details"
                    required
                    placeholder="Enter demo account details"
                    className="h-11 w-full rounded border border-[#ddd] px-3 text-sm outline-none focus:border-[#00a99d]"
                  />
                </div>

                <button
                  type="submit"
                  className="rounded bg-[#00a99d] px-5 py-3 text-sm text-white transition hover:bg-[#008f85]"
                >
                  Save Changes
                </button>
              </form>
            </div>
          ) : (
            /* Transaction table */
            <div className="mt-8 overflow-x-auto border border-[#f0f0f0]">
              <table className="w-full min-w-212.5 border-collapse text-left text-base">
                <thead>
                  <tr className="text-[#111]">
                    <th className="border-b border-[#eee] px-5 py-5 font-semibold">
                      Payment Id
                    </th>
                    <th className="border-b border-[#eee] px-5 py-5 font-semibold">
                      Payment Method
                    </th>
                    <th className="border-b border-[#eee] px-5 py-5 font-semibold">
                      {activeTab === "deposits"
                        ? "Deposit Amount"
                        : activeTab === "expenses"
                          ? "Expense Amount"
                          : "Payout Amount"}
                    </th>
                    <th className="border-b border-[#eee] px-5 py-5 font-semibold">
                      Date
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {currentTransactions.length > 0 ? (
                    currentTransactions.map((transaction) => (
                      <tr
                        key={transaction.paymentId}
                        className="transition hover:bg-gray-50"
                      >
                        <td className="border-b border-[#eee] px-5 py-6 text-sm text-[#183047]">
                          {transaction.paymentId}
                        </td>

                        <td className="border-b border-[#eee] px-5 py-6 text-sm text-[#183047]">
                          {transaction.method}
                        </td>

                        <td className="border-b border-[#eee] px-5 py-6 text-sm text-[#183047]">
                          <p>{transaction.amount}</p>

                          {activeTab === "deposits" && (
                            <>
                              <p className="mt-1 text-[#20a6c5]">
                                ({transaction.status})
                              </p>

                              {!reportedPayments.includes(
                                transaction.paymentId,
                              ) && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    reportBankTransfer(
                                      transaction.paymentId,
                                    )
                                  }
                                  className="mt-2 inline-flex items-center gap-2 rounded bg-[#1ba5bd] px-4 py-2.5 text-sm text-white transition hover:bg-[#148ba0]"
                                >
                                  <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  >
                                    <path d="M2.5 11.3 21 3.5l-5.5 17-4.1-6.1-4.1-2.1 9.1-5.2-11 4.1-2.9.1Z" />
                                  </svg>
                                  Report Bank Transfer
                                </button>
                              )}
                            </>
                          )}
                        </td>

                        <td className="border-b border-[#eee] px-5 py-6 text-sm text-[#183047]">
                          <p>{transaction.date}</p>

                          <button
                            type="button"
                            onClick={() =>
                              setNotice(
                                `${transaction.invoice}: ${transaction.paymentId}. Data ini merupakan contoh frontend.`,
                              )
                            }
                            className="mt-1 text-[#20a6c5] underline underline-offset-2 hover:text-[#008f85]"
                          >
                            {transaction.invoice}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-5 py-12 text-center text-sm text-[#999]"
                      >
                        No records found!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      <Footer />
    </main>
  );
}