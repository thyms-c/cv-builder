"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { ChevronRight, GlobeIcon } from "lucide-react";

export default function Hero() {
  return (
    <>
      <div className="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-[1] before:transform before:-translate-x-1/2">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
          <div className="flex justify-center">
            <Button variant="outline" className="rounded-full space-x-2">
              <GlobeIcon size={16} strokeWidth={1.75} />
              <span>Explore Community</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-5 max-w-2xl text-center mx-auto">
            <h1 className="block font-bold text-zinc-800 text-4xl md:text-5xl lg:text-6xl dark:text-zinc-200">
              Lets Build{" "}
              <span className="bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 text-transparent">
                Together
              </span>
            </h1>
          </div>

          <div className="mt-5 max-w-3xl text-center mx-auto">
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Say goodbye to generic resumes and hello to a personalized,
              standout career document that reflects the true essence of your
              professional journey.
            </p>
          </div>

          <div className="mt-8 gap-3 flex justify-center">
            <Button
              asChild
              className="bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 text-white font-semibold space-x-2"
            >
              <Link href="/editor/parse">
                <span>Create new CV</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/parse">
                <span>Get Summary</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
