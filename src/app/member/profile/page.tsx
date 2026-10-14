"use client";

import { useState } from "react";
import Link from "next/link";
import MemberTopBar from "../components/MemberTopBar";
import MemberMainHeader from "../components/MemberMainHeader";
import CategoryNavbar from "@/components/layout/CategoryNavbar";
import Footer from "@/components/layout/Footer";

type ProfileTab = "Followers" | "Following" | "My Reviews";

export default function MemberProfilePage() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("Followers");
  const [isFollowing, setIsFollowing] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [question, setQuestion] = useState("");
  const [message, setMessage] = useState("");

  function handleQuestionSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!question.trim()) return;

    setMessage("Fitur pertanyaan masih berupa simulasi frontend.");
    setQuestion("");
    setShowQuestion(false);
  }

  return (
    <main className="min-h-screen bg-white text-[#333]">
      <MemberTopBar />
      <MemberMainHeader />
      <CategoryNavbar />

      <div className="mx-auto min-h-97.5 max-w-7xl px-4 pb-12 pt-5 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-4 text-[11px] text-[#777]"
        >
          <Link href="/member" className="hover:text-[#00a99d]">
            Home
          </Link>
          <span className="mx-1.5">/</span>
          <span>Peter Jone</span>
        </nav>

        {/* Profile header */}
        <section className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-4">
          <div className="h-22.5 w-22.5 shrink-0 overflow-hidden rounded-xs bg-[#f2d5cb]">
            <svg
              viewBox="0 0 180 180"
              className="h-full w-full"
              role="img"
              aria-label="Profile cover illustration"
            >
              <rect width="180" height="180" fill="#f0d0c4" />
              <circle cx="125" cy="48" r="42" fill="#e89b81" />
              <path
                d="M0 44 Q24 20 50 48 T98 45 L130 74 L180 66 V115 H0Z"
                fill="#fff7f1"
              />
              <path
                d="M0 76 Q24 56 46 78 T94 83 T145 78 L180 93 V135 H0Z"
                fill="#d6d0ca"
              />
              <path
                d="M0 119 Q30 96 61 121 T116 122 T180 113 V180 H0Z"
                fill="#82949a"
              />
              <path
                d="M0 147 Q35 124 67 146 T127 145 T180 138 V180 H0Z"
                fill="#45515f"
              />
              <path
                d="M0 164 Q31 151 56 166 T110 166 T180 158 V180 H0Z"
                fill="#202536"
              />
            </svg>
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="text-[22px] font-medium leading-7 text-[#222]">
              Peter Jone
            </h1>

            <p className="mt-0.5 flex items-center gap-1.5 text-[10px] text-[#888]">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-[#b7b7b7]"
                aria-hidden="true"
              />
              Last seen: 4 minutes ago
            </p>

            <p className="mt-3 text-[11px] text-[#888]">
              Member since August 2026
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowQuestion((current) => !current);
                  setMessage("");
                }}
                className="border border-[#00a99d] bg-[#00a99d] px-3 py-2 text-[11px] text-white transition hover:bg-[#008f85]"
              >
                Ask Question
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsFollowing((current) => !current);
                  setMessage(
                    isFollowing
                      ? "Kamu berhenti mengikuti Peter Jone."
                      : "Kamu sekarang mengikuti Peter Jone.",
                  );
                }}
                className={`border px-3 py-2 text-[11px] transition ${
                  isFollowing
                    ? "border-gray-300 bg-gray-100 text-gray-700"
                    : "border-[#ddd] bg-white text-[#555] hover:border-[#00a99d] hover:text-[#008f85]"
                }`}
              >
                {isFollowing ? "✓ Following" : "♡ Follow"}
              </button>
            </div>
          </div>
        </section>

        {/* Question form */}
        {showQuestion && (
          <form
            onSubmit={handleQuestionSubmit}
            className="mt-6 max-w-155 border border-[#e8e8e8] p-4"
          >
            <label
              htmlFor="profile-question"
              className="mb-2 block text-xs font-medium text-[#444]"
            >
              Ask Peter Jone a question
            </label>

            <textarea
              id="profile-question"
              rows={3}
              required
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Write your question..."
              className="w-full resize-y border border-[#ddd] px-3 py-2 text-xs outline-none focus:border-[#00a99d]"
            />

            <button
              type="submit"
              className="mt-3 bg-[#00a99d] px-4 py-2 text-[11px] text-white hover:bg-[#008f85]"
            >
              Send Question
            </button>
          </form>
        )}

        {message && (
          <p role="status" className="mt-3 text-xs text-[#008f85]">
            {message}
          </p>
        )}

        {/* Profile content */}
        <section className="mt-7">
          <div className="flex border-b border-[#e5e5e5]">
            <button
              type="button"
              onClick={() => setActiveTab("Followers")}
              className={`border-b px-4 py-3 text-[11px] transition ${
                activeTab === "Followers"
                  ? "border-[#222] text-[#222]"
                  : "border-transparent text-[#666] hover:text-[#00a99d]"
              }`}
            >
              Followers (0)
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("Following")}
              className={`border-b px-4 py-3 text-[11px] transition ${
                activeTab === "Following"
                  ? "border-[#222] text-[#222]"
                  : "border-transparent text-[#666] hover:text-[#00a99d]"
              }`}
            >
              Following (0)
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("My Reviews")}
              className={`border-b px-4 py-3 text-[11px] transition ${
                activeTab === "My Reviews"
                  ? "border-[#222] text-[#222]"
                  : "border-transparent text-[#666] hover:text-[#00a99d]"
              }`}
            >
              My Reviews (0)
            </button>
          </div>

          <div className="flex min-h-37.5 items-start justify-center pt-6">
            <p className="text-[11px] text-[#888]">
              {activeTab === "Followers"
                ? "No records found!"
                : activeTab === "Following"
                ? "No records found!"
                : activeTab === "My Reviews"
                ? "No records found!"
                : "No records found!"}
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
