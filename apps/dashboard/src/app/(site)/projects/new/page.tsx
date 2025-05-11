import { Icons } from '@/components/icons';
import PageContainer from '@/components/layout/page-container';
import { UploadDropzone } from '@/lib/upload';
import { toSlug } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateProjectSchema } from '@repo/database/schema';
import { Button } from '@repo/design-system/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/design-system/components/ui/form';
import { Input } from '@repo/design-system/components/ui/input';
import { Textarea } from '@repo/design-system/components/ui/textarea';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
export default function NewProjectPage() {
  const form = useForm<z.infer<typeof CreateProjectSchema>>({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: {
      name: '',
      description: '',
      slug: '',
      status: 'DRAFT',
    },
  });

  function onSubmit(values: z.infer<typeof CreateProjectSchema>) {
    console.log(values);
  }
  return (
    <PageContainer scrollable={false}>
      <div className="flex w-full flex-col py-8">
        <h3 className="font-bold text-2xl">New Project</h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid w-full max-w-xl grid-cols-2 gap-4 py-10"
          >
            {/* <div className="flex items-center space-x-4"> */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="project name..."
                      {...field}
                      onChange={(e) => {
                        form.setValue('name', e.target.value, {
                          shouldValidate: true,
                        });
                        form.setValue('slug', toSlug(e.target.value), {
                          shouldValidate: true,
                        });
                      }}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              disabled
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="slug..." {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="what you building ?..."
                      {...field}
                      className="resize-none"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="">
              <UploadDropzone endpoint="thumbnail" />
            </div>
            <Button type="submit" className="col-span-2">
              <Icons.project className="mr-1" /> Create Project
            </Button>
          </form>
        </Form>
      </div>
    </PageContainer>
  );
}
