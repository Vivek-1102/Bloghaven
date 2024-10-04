import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono';
import { verify} from 'hono/jwt';
import { createBlogInput, updateBlogInput } from "@vveksngh/medium-common";


export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	},
	Variables: { userId: string }
}>();

// Middleware..
blogRouter.use("/*", async (c, next) => {
  const token = c.req.header("authorization") || "";
  
  try {
      const user = await verify(token, c.env.JWT_SECRET);
      if (user) {
          c.set("userId", String(user.id));
          await next();
      } else {
          c.status(403);
          return c.json({
              message: "You are not logged in"
          })
      }
  } catch(e) {
      c.status(403);
      return c.json({
          message: "You are not logged in"
      })
  }
});
  
  
  // Routes ...
  
  blogRouter.get('/get/:id',async (c) => {
    // Prisma connection
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
    
      const id = c.req.param('id');
      const post = await prisma.post.findUnique({
        where:{
          id : id
        },select: {
          id: true,
          title: true,
          content: true,
          author: {
              select: {
                  name: true
              }
          }
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
  
  blogRouter.get('/bulk',async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
      
    const posts = await prisma.post.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true
          }
        }
      }
    });
    if(!posts){
      return c.json({
        message:"No posts"
      })
    }
  
    return c.json({
      posts
    })
  })
  
  blogRouter.post('/',async (c) => {
    const userid = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
  
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }
    
    const post =await prisma.post.create({
      data : {
        title : body.title,
        content: body.content,
        authorid: userid
      }
    })  
   return c.json({
    message:"Successfully posted",
    id:post.id
   })
  })
  
  
  
    blogRouter.put('/', async (c) => {
      const userId = c.get('userId');
      const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL	,
      }).$extends(withAccelerate());
    
      const body = await c.req.json();
      const { success } = updateBlogInput.safeParse(body);
      if (!success) {
          c.status(411);
          return c.json({
              message: "Inputs not correct"
          })
      }
      const post = await prisma.post.update({
        where: {
          id: body.id,
          authorid: userId
        },
        data: {
          title: body.title,
          content: body.content
        }
      });
    
      return c.json({
        message :"Updated successfully",
        post
      });
    });