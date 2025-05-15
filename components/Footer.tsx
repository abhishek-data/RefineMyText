import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white/80 py-4 px-8 flex items-center justify-between mt-auto">
      <div className="flex items-center gap-3">
        <Image src="/logo.png" alt="RefineMyText Logo" width={120} height={36} className="h-8 w-auto object-contain" />
        <span className="text-sm text-gray-700">© {new Date().getFullYear()} RefineMyText. All rights reserved.</span>
      </div>
    </footer>
  );
} 