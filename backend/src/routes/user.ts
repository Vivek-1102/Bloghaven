import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt';

export const userRouter = new Hono();

 userRouter.post('/signin',async (c) => {
    const prisma = new PrismaClient({
      //  @ts-ignore
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
      const body = await c.req.json();
      const user = await prisma.user.findUnique({
        where: {
          email:body.email,
          password : body.password
      }
    })
    if(!user){
      c.status(401);
      return c.json({
        message:"Invalid credential"
      })
    }
  // @ts-ignore
    const token = sign({id:user.id},c.env.JWT_SECRET);
    return c.json({
    message:"Welcome to dashboard",
    token: token
  });
  
  })
  
  userRouter.post('/signup',async (c) => {
    console.log("0nd");
    const prisma = new PrismaClient({
    //  @ts-ignore
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    console.log("1st");
  
    const body = await c.req.json();
    
  
    try {
      const user = await prisma.user.create({
        data:{
          email : body.email,
          password : body.password
        }
      })
      console.log("2nd");
      // @ts-ignore
      const jwt =await sign({id:user.id},c.env.JWT_SECRET);
  
    return c.json({
      token:jwt
    })
    }catch(e){
      c.status(403);
      return c.json({error: "error while signing up"});
    }
  })