"use client";

import React from "react";
import Link from "next/link";
import { Home } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Navbar = () => {
  return (
    <nav className="w-full p-3 shadow-lg mt-1 sticky top-0 z-50 bg-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center space-x-2 hover:text-gray-500 transition-colors duration-200"
        >
          <Home className="h-6 w-6 text-gray-700" />
          <span className="text-lg font-semibold text-gray-700">Home</span>
        </Link>

        <div className="flex items-center space-x-4">
          <Avatar className="hover:scale-105 transform transition duration-300">
            <AvatarImage src="" alt="Profile" />
            <AvatarFallback className="bg-gray-700 text-gray-200">
              CND
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
