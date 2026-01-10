import { type Context, createDefine } from "fresh";
import { Alias } from "vite";
// This specifies the type of "ctx.state" which is used to share
// data among middlewares, layouts and routes.
export type Theme = "light" | "dark";
interface State {
  shared: string;
  theme: Theme;
}
export type MyContext = Context<State>;
export const define = createDefine<State>();
