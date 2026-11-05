# AI usage log

Using AI never costs marks; a vague or missing log does.
Add a new section every week, before you tag. Did not use AI? Write "None" under Tool(s).

## Week 1
- Tool(s): None
- What I asked for:
- What I kept, changed or rejected, and why:
- One thing the AI got wrong and how I fixed it:

## Week 2
- Tool(s): None
- What I asked for:
- What I kept, changed or rejected, and why:
- One thing the AI got wrong and how I fixed it:

## Week 3
- Tool(s): Qwen AI
- What I asked for:  I asked to help and guide me in coding and explanation to fetch data using `useEffect`, implement a cart page, and complete the controlled checkout form with validation. I also asked for help implementing my personal feature (Dietary filter using controlled checkboxes).
- What I kept, changed or rejected, and why:  I kept the `useEffect` fetching logic and the "Try again" button because it perfectly satisfied the lab requirements. I also kept some of the code for cart page, checkout form, and dietary filter, and made some changes of the variable names to match with my code.
- One thing the AI got wrong and how I fixed it:  The AI's initial validation logic for the checkout form only checked if the pickup time was within the valid range (07:00-22:00), but didn't check if the field was actually empty. This allows users to submit the form without choosing a time. I fixed this by adding an explicit check for an empty value (`if (!values.pickupTime)`) before checking the time range to ensure the field is strictly required.

## Week 4
- Tool(s): Qwen AI
- What I asked for:
  I asked how to implement Custom Hooks, set up the Context API to stop prop drilling, and configure React Router for dynamic routing (`useParams`). I also asked for help and guidance to implement keeping dietary filter tags in the URL.
- What I kept, changed or rejected, and why:
  I kept the `useLocalStorage` hook for cart persistence and the `useSearchParams` logic for the dietary filter because they perfectly satisfied the lab requirements. Then, the AI initially used `useMemo` for calculating totals and named the order items `items`, but I changed it to calculate totals directly, which is simpler for small carts and used `lines` to match industry-standard database naming.
- One thing the AI got wrong and how I fixed it:
  The AI suggested using `<Link to="/" className="btn">Go Home</Link>` for the 404 page. However, the `.btn` CSS class didn't apply the text color correctly, which cause the "Go Home" text to completely invisible against the button background. I fixed it by adding inline styles (`style={{ color: 'white', textDecoration: 'none' }}`) to force the text to be visible and remove the default link underline, while keeping the semantic `<Link>` component.
