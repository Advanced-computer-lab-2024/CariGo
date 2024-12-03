import React from 'react'

export function Card({ children, className = '' }) {
  return (
    <a
      className={`group/card relative h-full max-h-[600px] overflow-hidden rounded-2xl bg-[#033854] p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-[#0f98e0]/80 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-[#0f98e0] after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 after:hover:opacity-20 before:group-hover:opacity-100`}
    >
      <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-[#033854] after:absolute after:inset-0 after:bg-gradient-to-br after:from-[#033854]/50 after:via-[#033854]/25 after:to-[#033854]/50">
        <div
          className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-gray-700/50 bg-gray-800/65 text-gray-200 opacity-0 transition-opacity group-hover/card:opacity-100"
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={9}
            height={8}
            fill="none"
          >
            <path
              fill="#F4F4F5"
              d="m4.92 8-.787-.763 2.733-2.68H0V3.443h6.866L4.133.767 4.92 0 9 4 4.92 8Z"
            />
          </svg>
        </div>
        {children}
      </div>
    </a>
  );
}

export function CardHeader({ children, className = '' }) {
  return <div className={`p-6 ${className}`}>{children}</div>
}

export function CardContent({ children, span }) {
  return <div className="p-6">
  <div className="mb-3">
    <span className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,theme(colors.gray.700/.15),theme(colors.gray.700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60">
      <span className="bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
        {span}
      </span>
    </span>
  </div>
  <p className="text-indigo-200/65">
    {children}
  </p>
</div>
}

export function CardTitle({ children, className = '' }) {
  return <h3 className={`text-lg font-semibold text-white ${className}`}>{children}</h3>
}

