import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Login from "@/components/Login";
import { GetUsers } from "@/components/GetUsers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div>
      <Login />
      <GetUsers />
    </div>
  );
}
