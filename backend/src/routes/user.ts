import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt';
import { Buffer } from 'buffer';
import { signupInput, signinInput } from '@vveksngh/medium-common';

export async function hashFunction(message: string): Promise<string> {
  const encodedMsg = new TextEncoder().encode(message);
  const msgDigest = await crypto.subtle.digest(
    {
      name: "SHA-256",
    },
    encodedMsg
  );
  const base64String = Buffer.from(msgDigest).toString('base64');
  return base64String;
}




export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>();

userRouter.post('/signup',async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }
  const hashedPass = await hashFunction(body.password);
  try {
    const user = await prisma.user.create({
      data:{
        email : body.email,
        password : hashedPass
      }
    })
    const jwt =await sign({id:user.id},c.env.JWT_SECRET);

  return c.json({
    token:jwt
  })
  }catch(e){
    c.status(403);
    return c.json({error: "error while signing up"});
  }
})


 userRouter.post('/signin',async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
      const body = await c.req.json();
      const { success } = signinInput.safeParse(body);
      if (!success) {
          c.status(411);
          return c.json({
              message: "Inputs not correct"
          })
      }
  
      const user = await prisma.user.findUnique({
        where: {
          email:body.email,
      }
    })
    if(!user){
      c.status(401);
      return c.json({
        message:"Invalid credential"
      })
    }
    const token =await sign({id:user.id},c.env.JWT_SECRET);
    return c.json({
    message:"Welcome to dashboard",
    token: token
  });
  
  })
  
  