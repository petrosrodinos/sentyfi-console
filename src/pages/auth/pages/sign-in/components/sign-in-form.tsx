import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import { SignInSchema, type SignInFormValues } from "../../../validation-schemas/auth";
import { useSignin } from "@/features/auth/hooks/use-auth";

interface UserAuthFormProps {
  className?: string;
  props?: any;
}

export function SignInForm({ className, ...props }: UserAuthFormProps) {
  const { mutate, isPending } = useSignin();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: SignInFormValues) {
    mutate({ email: data.email, password: data.password });
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                  </div>
                  <FormControl>
                    <PasswordInput placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button loading={isPending} className="mt-2" disabled={isPending}>
              Login
            </Button>

            {/* <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" className="w-full" type="button" disabled={isPending}>
                <IconBrandGithub className="h-4 w-4" /> GitHub
              </Button>
              <Button variant="outline" className="w-full" type="button" disabled={isPending}>
                <IconBrandFacebook className="h-4 w-4" /> Facebook
              </Button>
            </div> */}
          </div>
        </form>
      </Form>
    </div>
  );
}
