# UI Inspiration

https://www.chatbot.com/solutions/chatbot-for-support/

# 🧠 Thought Dump

- We provide a wrapper component for their app.
- This wrapper is a block element (div)
- This wrapper renders a floating page-use button + chat bar
- On press, or on first message, the wrapper, moves all the
  content to 65% of the width of the wrapper, and renders chat
  in 35% of the space on the left

- devs will be able to provide context to the AI via `usePageDescription` hook or
  `<PageDescription/>` component.
- both the hook and the component will react to changes to the passed in description
  and update the AI's context for next call

- devs will be able to provide a system prompt via `useSystemPrompt` hook or `<SystemPrompt/>`
- system prompt will be global, and only one possible per `<PageUse>` sub tree (similar to the page description)
- if either PageDescription or SystemPrompt is called twice in a render cycle, show a warning in console
- devs can call the `useTool` hook to expose functions to the AI with zod shapes as input shapes

- we always ask the AI to write valid typescript code using the functions available to it and then we run the
  code, and return any results and or error to it for agentic loop
- we convert the read state and set state to JS code functions that can bee ru as well.
- if the AI wants to agentically explore existing data, it will be encouraged to write code, and console.log with a promise that
  we will pass back the logs to the AI so that it receives back the result of the exploration

# Tech

- KVRocks, Express + tRPC, React
- No trpc subscriptions for now, all conversations will be inserted/updated in kvrocks; mutation will return when the AI model does
- AI Model: Claude Sonnet 4.5

- We start with something not so well packaged, but we will have a solid demo and demo video with the DX; we'll think of the packaging later
- there will be a solid README so that if someone _really_ wanted, they _could_ run it
- we should squat the npm package called `@page-use/react`
-
