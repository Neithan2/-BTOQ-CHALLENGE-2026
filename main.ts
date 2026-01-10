import { App, staticFiles } from "fresh";
import { define } from "@/utils.ts";
import "@std/dotenv/load";
import BasicLayout from "@/layout/BasicLayout";
import { MyContext } from "@/utils.ts";
import { changeTheme, getTheme } from "./utils/theme";
export const app = new App<State>();
app.layout("*", BasicLayout);

app.use(staticFiles());

// Pass a shared value from a middleware
app.use(async (ctx: MyContext) => {
  ctx.state.shared = "hello";
  return await ctx.next();
});
app.get("/health", (_: MyContext) => {
  return new Response("OK");
});
app.get("/theme/:name", (ctx: MyContext) => {
  const themeName = ctx.params.name.toLowerCase();
  changeTheme();
  ctx.state.theme = getTheme();
  return new Response(ctx.state.theme);
});
// this is the same as the /api/:name route defined via a file. feel free to delete this!
app.get("/api2/:name", (ctx: MyContext) => {
  const name = ctx.params.name;
  return new Response(
    `Hello, ${name.charAt(0).toUpperCase() + name.slice(1)}!`,
  );
});

// this can also be defined via a file. feel free to delete this!
const exampleLoggerMiddleware = define.middleware((ctx: MyContext) => {
  console.log(`${ctx.req.method} ${ctx.req.url}`);
  return ctx.next();
});
app.use(exampleLoggerMiddleware);

// Include file-system based routes here
app.fsRoutes();
