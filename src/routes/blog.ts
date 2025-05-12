import { Hono } from "hono";

export const blogRouter = new Hono();


blogRouter.post('/', (c) => {
  return c.text("Hello blog here post!");
});
blogRouter.put('/', (c) => {
  return c.text("Hello post put here!");
});
blogRouter.get('/', (c) => {
  return c.text("Hello id!");
});

blogRouter.get('/bulk', (c) => {
  return c.text("Hello blog bulk!");
});