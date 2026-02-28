import { PropsWithChildren, useEffect, useState } from "react";
import { ZodType } from "zod";

export function PageUse({ children }: PropsWithChildren<{}>) {
  return <div>{children}</div>;
}

export function usePageDescription(description: string) {
  return null;
}

export function PageDescription({ children }: { children: string }) {
  return null;
}

export const useAgentState = (initialState: any, share: ZodType) => {
  const stateReturn = useState(initialState);

  useEffect(() => {
    sendFunctionToAI(stateReturn[1]);
  }, [stateReturn[1]]);

  return stateReturn;
};
