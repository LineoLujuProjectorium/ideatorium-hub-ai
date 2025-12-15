export type AppState =
  | "draft"
  | "review"
  | "blocked"
  | "approved"
  | "shipped";

export const allowedTransitions: Record<AppState, AppState[]> = {
  draft: ["review"],
  review: ["approved", "blocked"],
  blocked: ["review"],
  approved: ["shipped"],
  shipped: [],
};

export function canTransition(
  from: AppState,
  to: AppState
): boolean {
  return allowedTransitions[from].includes(to);
}
