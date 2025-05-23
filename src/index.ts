import { Hono } from 'hono'
import {PrismaClient} from '@prisma/client/edge'
import{withAccelerate} from '@prisma/extension-accelerate'
import { decode,sign,verify } from 'hono/jwt'
const app = new Hono <{
  Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: String
  }
} >()

app.post('/api/v1/user/signup',async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL,
  }).$extends(withAccelerate())
 try {
   const user = await prisma.user.create({
     data: {
       username: body.username,
       password: body.password,
       name: body.name,
     },
   })
     const jwt = await sign({
      id: user.id
     }, c.env.JWT_SECRET);
   return c.text(jwt);
 } catch (a) {
   console.log(e);
   c.status(411);
   return c.text("Invalid");
 }
})


app.post('/api/v1/user/signin',async (c) => {
   const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL,
  }).$extends(withAccelerate())
 try {
   const user = await prisma.user.findFirst({
     where: {
       username: body.username,
       password: body.password,
      
     }
   })

   if (!user) {
       c.status(411); //user unauthorized 
       return c.json({
        mesaage: "Incorrect credentails"
       })
   }
     const jwt = await sign({
      id: user.id
     }, c.env.JWT_SECRET);
   return c.text(jwt);
 } catch (a) {
   console.log(e);
   c.status(411);
   return c.text("Invalid");
 }
app.post("/api/v1/blog", (c) => {
  return c.text("Hello blog here post!");
})
app.put("/api/v1/blog", (c) => {
  return c.text("Hello post put here!");
})
app.get("/api/v1/blog/:id", (c) => {
  return c.text("Hello id!");
})

app.get("/api/v1/blog/bulk", (c) => {
  return c.text("Hello blog bulk!");
})
export default app
