
const utilityLinks = [
  "Contact",
  "Sell on Modesy",
];

export default function TopBar() {
  return (
    <div className="flex min-h-16 items-center justify-between border-b border-gray-200 bg-white px-5 text-base text-[#666666]">
      <div className="flex items-center gap-6">
        {utilityLinks.map((link) => (
          <a
            key={link}
            href="#"
            className="transition-colors hover:text-[#00a99d]"
          >
            {link}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-6">
        <button className="hover:text-[#00a99d]">
          📍 Location
        </button>

        <button className="hover:text-[#00a99d]">
          USD ($)⌄
        </button>

        <button className="hover:text-[#00a99d]">
          🇺🇸 English⌄
        </button>

        <div className="flex items-center gap-3">
          <a href="/login" className="hover:text-[#00a99d]">
            Login
          </a>
          <span>/</span>
          <a href="/register" className="hover:text-[#00a99d]">
            Register
          </a>
        </div>
      </div>
    </div>
  );
}
