This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.


------------------------------------------------------------------------
Notes for me: 

Use will-change in style={{ willChange }} to ptimise transform and opacity transformation - like moving x and y. It will give the information to the browser to optimise it better - avoid CLS 

When the layout of the components will happen, render a new one in the dom, switch components to the dom, reodering list, changing width or position or parent layout or any other layout change use prop "layout" in the motion.element

Even use layout when you change the dimensions if the component is not in absolute positioning itself, if a parant component is layout change but the animated is not, still use layout prop 

I can use more svg components for the Preloader component to animate them at once. but one can have fikter blur  like in there 

<!-- const MyComponent = () => {
  const [isHovered, setHovered] = useState(false)

  // Simplified example
  return (
    <svg>
      <image
        filter="url(#blur)"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
      <filter id="blur">
        <motion.div
          initial={false}
          animate={{ stdDeviation: isHovered ? 0 : 2 }}
        />
      </filter>
    </svg>
  )
} -->


to animate more components you can use their index and animate them by slowing the dalay with index or parrent component can be used with prop delayChildren

<!-- const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.5
    }
  }
}

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
}

return (
  <motion.ul
    variants={container}
    initial="hidden"
    animate="show"
  >
    <motion.li variants={item} />
    <motion.li variants={item} />
  </motion.ul>
) -->



# ProchazkaGroupTemplate
