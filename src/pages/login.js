import {useEffect} from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { Layout } from '../components/Layout';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function LoginPage() {

  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;
  console.log("redirect:", redirect)
  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, password }) => {
    
    try {
      
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      
      if (result.error) {
        
        toast.error(result.error);
        
      }
      
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Login">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Login</h1>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {
                ...register('email', {
                    required: 'Please enter an email',
                    pattern: {
                        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                        message: 'Please enter a valid email',
                    },
                })
            }
            className="w-full"
            id="email"
            autoFocus
          ></input>
          {errors.email && (
            <small className="text-red-500">{errors.email.message}</small>
          )}

        </div>

        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register('password', {
              required: 'Please enter password',
              minLength: { value: 6, message: 'password is more than 5 chars' },
            })}
            className="w-full"
            id="password"
            //autoFocus
          ></input>
          {errors.password && (
            <small className="text-red-500 ">{errors.password.message}</small>
          )}
        </div>

        <div className="mb-4 ">
          <button className="primary-button">Login</button>
        </div>

      </form>
    </Layout>
  );
}