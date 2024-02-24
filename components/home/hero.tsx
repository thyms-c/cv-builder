import { ChevronRight } from "lucide-react"
import { Button } from "../ui/button"

export default function Hero() {
  return (
    <>
      <div className="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-[1] before:transform before:-translate-x-1/2">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
          <div className="flex justify-center">
            <Button
              variant="outline"
              className="rounded-full space-x-2"
            >
              <span>PRO release - Join to waitlist</span>
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
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit
              perferendis vitae consequatur expedita, nisi dicta iusto pariatur,
              totam nulla facilis itaque eveniet rerum ipsa
            </p>
          </div>

          <div className="mt-8 gap-3 flex justify-center">
            <Button className="bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 text-white font-semibold space-x-2">
              <span>Get started</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline">$ pnpm i cv-builder</Button>
          </div>

          <div className="mt-5 flex justify-center items-center gap-x-1 sm:gap-x-3">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              Package Manager:
            </span>
            <span className="text-sm font-bold text-zinc-900 dark:text-white">
              pnpm
            </span>
            <svg
              className="size-5 text-zinc-300 dark:text-zinc-600"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M6 13L10 3"
                stroke="currentColor"
                stroke-linecap="round"
              />
            </svg>
            <a
              className="inline-flex items-center gap-x-1.5 text-sm dark:text-white text-zinc-900 decoration-2 hover:underline font-medium"
              href="#"
            >
              Installation Guide
              <svg
                className="flex-shrink-0 size-4"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
