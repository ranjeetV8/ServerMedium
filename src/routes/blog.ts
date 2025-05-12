import { Hono } from "hono";

export const blogRouter = new Hono<{
   Bindings: {
    DATABASE_URL : String;
    JWT_SECRET: String;
   } 
}>();


blogRouter.use("/*",(c, next) =>{
    next();
})
blogRouter.post('/', async(c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    await prisma.blog.create({
        data: {
            title: body.title,
            content:body.content,
            autherID: 1
        }
    })
  
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