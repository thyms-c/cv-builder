export default function MockUp() {
  return (
    <>
      <div className="max-w-4xl mx-auto my-10 shadow-lg rounded-lg">
        <div className="w-full h-11 rounded-t-lg bg-zinc-200 dark:bg-zinc-900 flex justify-start items-center space-x-1.5 px-3">
          <span className="w-3 h-3 rounded-full bg-red-400"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
          <span className="w-3 h-3 rounded-full bg-green-400"></span>
        </div>
        <div className="bg-zinc-100 dark:bg-zinc-900 border-t-0 rounded-b-lg w-full h-[560px]"></div>
      </div>
    </>
  )
}
