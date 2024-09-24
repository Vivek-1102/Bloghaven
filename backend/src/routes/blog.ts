import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono';
import { verify} from 'hono/jwt';



export const blogRouter = new Hono();

// Middleware..
// @ts-ignore
blogRouter.use('/api/v1/blog/*',async (c,next)=>{
    const authorization = c.req.header('Authorization');
    if(authorization){
      // @ts-ignore
    const token = authorization.split(' ')[1];
    // @ts-ignore
    const payload = await verify(token,c.env.JWT_SECRET);
    if(!payload){
      c.status(401);
      return c.json({error: "unauthorized"});
    }
    // @ts-ignore
    c.set("userId",payload.id);
    await next();
    }
    c.status(401);
    return c.json({
      message : "unauthorized"
    }); 
  })
  
  
  // Routes ...
  
  blogRouter.get('/api/v1/blog/:id',async (c) => {
    // Prisma connection
    const prisma = new PrismaClient({
      //  @ts-ignore
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
    
      const id = c.req.param('id');
      const post = await prisma.post.findFirst({
        where:{
          id : id
        }
      });
      if(!post){
        c.status(404);
        return c.json({
          error : "Invalid request"
        })
      }
      return c.json({
        post
      })
  })
  
  blogRouter.get('/api/v1/blog/bulk',async (c) => {
    const prisma = new PrismaClient({
      //  @ts-ignore
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
      
    const posts = await prisma.post.findMany({});
    if(!posts){
      return c.json({
        message:"No posts"
      })
    }
  
    return c.json({
      posts
    })
  })
  
  blogRouter.post('/api/v1/blog',async (c) => {
    // @ts-ignore
    const userid = c.get('userId');
    const prisma = new PrismaClient({
      //  @ts-ignore
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
  
    const body = await c.req.json();
    
    const post = prisma.post.create({
      data : {
        title : body.title,
        content: body.content,
        // @ts-ignore
        authorid: userid
      }
    })  
   return c.json({
    message:"Successfully posted",
    post
   })
  })
  
  
  
    blogRouter.put('/api/v1/blog', async (c) => {
      // @ts-ignore
      const userId = c.get('userId');
      const prisma = new PrismaClient({
        // @ts-ignore
        datasourceUrl: c.env?.DATABASE_URL	,
      }).$extends(withAccelerate());
    
      const body = await c.req.json();
      prisma.post.update({
        where: {
          id: body.id,
          // @ts-ignore
          authorId: userId
        },
        data: {
          title: body.title,
          content: body.content
        }
      });
    
      return c.text('updated post');
    });