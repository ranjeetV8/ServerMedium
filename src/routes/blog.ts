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

   const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content:body.content,
            autherID: 1
        }
    })
    return c.json({
        id: blog.id
    })
  
});
blogRouter.put('/',async (c) => {

     const body = await c.req.json();
     const prisma = new PrismaClient({
       datasourceUrl: c.env.DATABASE_URL,
     }).$extends(withAccelerate());

     const blog = await prisma.blog.update({
        where:{ 
            id: body.id 
        },
       data: {
         title: body.title,
         content: body.content,
        
       }
     });
     return c.json({
       id: blog.id,
     });
  
 
});
blogRouter.get('/',async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

   try {
    const blog = await prisma.blog.findFirst({
      where: {
        id: body.id,
      },
      
    });
    return c.json({
    blog
    });
} catch(e) {
    c.status(411);
    return c.json({
        message: "error while fetching blog"
    });
}
});

// todo - add pagination here
blogRouter.get('/bulk', async(c) => {
  const prisma = new PrismaCLient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const blog = await prisma.blog.findany();
  return c.json({
    blog
  })
});