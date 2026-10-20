type Props = {
  role: string;
};

const colors: Record<string, string> = {
  ADMIN: "bg-red-100 text-red-700 border-red-200",
  MODERATOR: "bg-orange-100 text-orange-700 border-orange-200",
  VENDOR: "bg-purple-100 text-purple-700 border-purple-200",
  USER: "bg-blue-100 text-blue-700 border-blue-200",
};

export default function RoleBadge({ role }: Props) {
  const style = colors[role] || "bg-gray-100 text-gray-700 border-gray-200";
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold ${style}`}
    >
      {role}
    </span>
  );
}
