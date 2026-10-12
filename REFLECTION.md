# Week 1 reflection

Answer each question in 1–3 sentences, in your own words.

1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?
    Imperative UI development (plain DOM code) requires writing step-by-step instructions on how to manually create, update, or remove DOM elements to reflect state changes. In React, simply describe how the UI should look based on the data, and React automatically updates the DOM when the data changes to match the description.

2. Why must a component name start with a capital letter?
    To distinguish custom components from native HTML elements.

3. What does a fragment <>...</> do, and why not just use a <div>?
    A fragment groups multiple elements so that a component can return a single parent element without adding extra HTML to the page. Using a <div> would create an extra wrapper element in the HTML structure, which can sometimes break CSS layouts (like Flexbox or CSS Grid containers) and create an unnecessary DOM element.

4. Name one benefit of splitting the UI into small components.
    Small components make code easier to read, maintain, test, debug, and reuse in different parts of the application without affecting the rest of it.
