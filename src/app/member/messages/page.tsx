
"use client";

import { useState } from "react";
import Link from "next/link";
import MemberTopBar from "../components/MemberTopBar";
import MemberMainHeader from "../components/MemberMainHeader";
import CategoryNavbar from "@/components/layout/CategoryNavbar";
import Footer from "@/components/layout/Footer";

const initialConversations = [
  {
    id: 1,
    name: "Alex Morgan",
    avatar: "https://i.pravatar.cc/100?img=12",
    product: "Classic Denim Jacket",
    lastMessage: "Thank you for your interest!",
    time: "10:45 AM",
    unread: 2,
    online: true,
    messages: [
      {
        id: 1,
        text: "Hello! Is the Classic Denim Jacket still available?",
        time: "10:40 AM",
        mine: true,
      },
      {
        id: 2,
        text: "Yes, it is still available.",
        time: "10:42 AM",
        mine: false,
      },
      {
        id: 3,
        text: "Great! Could you tell me more about the condition?",
        time: "10:43 AM",
        mine: true,
      },
      {
        id: 4,
        text: "Thank you for your interest!",
        time: "10:45 AM",
        mine: false,
      },
    ],
  },
  {
    id: 2,
    name: "Sophie Williams",
    avatar: "https://i.pravatar.cc/100?img=47",
    product: "Minimalist Wrist Watch",
    lastMessage: "I will check the details for you.",
    time: "Yesterday",
    unread: 0,
    online: false,
    messages: [
      {
        id: 1,
        text: "Hi, I have a question about the watch.",
        time: "Yesterday",
        mine: true,
      },
      {
        id: 2,
        text: "I will check the details for you.",
        time: "Yesterday",
        mine: false,
      },
    ],
  },
  {
    id: 3,
    name: "Daniel Carter",
    avatar: "https://i.pravatar.cc/100?img=33",
    product: "Everyday Backpack",
    lastMessage: "Is shipping included?",
    time: "Oct 10",
    unread: 0,
    online: false,
    messages: [
      {
        id: 1,
        text: "Hello, is shipping included in the price?",
        time: "Oct 10",
        mine: true,
      },
    ],
  },
];

const accountLinks = [
  { label: "Profile", href: "/member/profile", icon: "♙" },
  { label: "Wallet", href: "/member/wallet", icon: "▱" },
  { label: "Orders", href: "/member/orders", icon: "▤" },
  { label: "My Coupons", href: "/member/coupons", icon: "◇" },
  { label: "Messages", href: "/member/messages", icon: "▢" },
  { label: "Profile Settings", href: "/member/settings", icon: "⚙" },
];

export default function MemberMessagesPage() {
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedId, setSelectedId] = useState(1);
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState("");

  const selectedConversation = conversations.find(
    (conversation) => conversation.id === selectedId
  );

  const filteredConversations = conversations.filter((conversation) =>
    `${conversation.name} ${conversation.product} ${conversation.lastMessage}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function selectConversation(id: number) {
    setSelectedId(id);
    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === id
          ? { ...conversation, unread: 0 }
          : conversation
      )
    );
  }

  function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const text = draft.trim();

    if (!text || !selectedConversation) {
      return;
    }

    setConversations((current) =>
      current.map((conversation) => {
        if (conversation.id !== selectedId) {
          return conversation;
        }

        return {
          ...conversation,
          lastMessage: text,
          time: "Just now",
          messages: [
            ...conversation.messages,
            {
              id: Date.now(),
              text,
              time: "Just now",
              mine: true,
            },
          ],
        };
      })
    );

    setDraft("");
  }

  return (
    <main className="min-h-screen bg-[#f8f9fc]">
      <MemberTopBar />
      <MemberMainHeader />
      <CategoryNavbar />

      <section className="mx-auto max-w-330 px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link href="/member" className="hover:text-[#00a99d]">
            Home
          </Link>
          <span>/</span>
          <span>My Account</span>
          <span>/</span>
          <span className="text-gray-900">Messages</span>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-[#222222] sm:text-3xl">
            My Messages
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            View your conversations and messages.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
          {/* Sidebar akun */}
          <aside className="overflow-hidden rounded-md border border-gray-200 bg-white">
            <div className="flex flex-col items-center border-b border-gray-100 px-5 py-7">
              <img
                src="https://i.pravatar.cc/160?img=12"
                alt="Foto profil Peter Jone"
                className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-sm"
              />
              <h2 className="mt-4 text-lg font-semibold text-gray-800">
                Peter Jone
              </h2>
              <p className="mt-1 break-all text-sm text-gray-500">
                peter.jone@example.com
              </p>
              <span className="mt-3 rounded-full bg-[#e7f8f5] px-3 py-1 text-xs font-medium text-[#008f85]">
                Member Account
              </span>
            </div>

            <nav className="space-y-1 p-3">
              {accountLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-md px-4 py-3 text-sm transition-colors ${
                    item.href === "/member/messages"
                      ? "bg-[#e8f8f6] font-medium text-[#008f85]"
                      : "text-gray-600 hover:bg-gray-50 hover:text-[#008f85]"
                  }`}
                >
                  <span className="w-4 text-center" aria-hidden="true">
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          {/* Panel pesan */}
          <section className="grid min-w-0 overflow-hidden rounded-md border border-gray-200 bg-white md:grid-cols-[280px_minmax(0,1fr)]">
            {/* Daftar percakapan */}
            <div className="min-w-0 border-b border-gray-200 md:border-r md:border-b-0">
              <div className="border-b border-gray-100 p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Conversations
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  {conversations.reduce(
                    (total, conversation) => total + conversation.unread,
                    0
                  )}{" "}
                  unread messages
                </p>

                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search conversations..."
                  aria-label="Search conversations"
                  className="mt-4 w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#00a99d]"
                />
              </div>

              <div className="max-h-117.5 overflow-y-auto">
                {filteredConversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    type="button"
                    onClick={() => selectConversation(conversation.id)}
                    className={`flex w-full items-start gap-3 border-b border-gray-100 p-4 text-left transition-colors ${
                      selectedId === conversation.id
                        ? "bg-[#e8f8f6]"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <img
                      src={conversation.avatar}
                      alt=""
                      className="h-11 w-11 shrink-0 rounded-full object-cover"
                    />

                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="truncate text-sm font-semibold text-gray-800">
                          {conversation.name}
                        </span>
                        {conversation.unread > 0 && (
                          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#00a99d] px-1 text-xs text-white">
                            {conversation.unread}
                          </span>
                        )}
                      </span>

                      <span className="mt-1 block truncate text-xs text-gray-500">
                        {conversation.product}
                      </span>
                      <span className="mt-1 block truncate text-xs text-gray-400">
                        {conversation.lastMessage}
                      </span>
                      <span className="mt-2 block text-[11px] text-gray-400">
                        {conversation.time}
                      </span>
                    </span>
                  </button>
                ))}

                {filteredConversations.length === 0 && (
                  <p className="px-4 py-8 text-center text-sm text-gray-500">
                    No conversations found.
                  </p>
                )}
              </div>
            </div>

            {/* Isi chat */}
            <div className="flex min-h-125 min-w-0 flex-col">
              {selectedConversation ? (
                <>
                  <div className="flex items-center gap-3 border-b border-gray-100 p-4 sm:p-5">
                    <img
                      src={selectedConversation.avatar}
                      alt=""
                      className="h-11 w-11 rounded-full object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <h2 className="truncate font-semibold text-gray-800">
                        {selectedConversation.name}
                      </h2>
                      <p className="mt-1 truncate text-xs text-gray-500">
                        About: {selectedConversation.product}
                      </p>
                    </div>

                    <span className="hidden rounded-full bg-amber-50 px-3 py-1 text-xs text-amber-700 sm:inline-block">
                      Sample chat
                    </span>
                  </div>

                  <div className="flex-1 space-y-4 overflow-y-auto bg-[#fafbfe] p-4 sm:p-5">
                    {selectedConversation.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.mine ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[85%] rounded-xl px-4 py-3 sm:max-w-[75%] ${
                            message.mine
                              ? "rounded-br-sm bg-[#00a99d] text-white"
                              : "rounded-bl-sm border border-gray-100 bg-white text-gray-700"
                          }`}
                        >
                          <p className="wrap-break-word text-sm leading-6">
                            {message.text}
                          </p>
                          <p
                            className={`mt-2 text-right text-[10px] ${
                              message.mine
                                ? "text-white/75"
                                : "text-gray-400"
                            }`}
                          >
                            {message.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <form
                    onSubmit={sendMessage}
                    className="flex items-center gap-2 border-t border-gray-100 p-3 sm:p-4"
                  >
                    <input
                      type="text"
                      value={draft}
                      onChange={(event) => setDraft(event.target.value)}
                      placeholder="Type a sample message..."
                      aria-label="Message"
                      className="min-w-0 flex-1 rounded-md border border-gray-200 px-3 py-3 text-sm outline-none focus:border-[#00a99d]"
                    />
                    <button
                      type="submit"
                      disabled={!draft.trim()}
                      className="shrink-0 rounded-md bg-[#00a99d] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#008f85] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Send
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex flex-1 items-center justify-center p-8 text-center">
                  <p className="text-sm text-gray-500">
                    Select a conversation to view messages.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>

        <p className="mt-5 text-xs leading-5 text-gray-500">
          Percakapan dan pesan pada halaman ini hanyalah data contoh. Pesan
          baru hanya muncul selama halaman masih terbuka dan tidak dikirim
          kepada pengguna sungguhan.
        </p>
      </section>

      <Footer />
    </main>
  );
}
