'use client'

import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './ui/button'
import { FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'

interface ContactFormProps {
  validationSubject: string
  validationMessage: string
  validationEmail: string
  submitSuccess: string
  submitError: string
  submitDescriptionError: string
  unknownError: string
  placeholderSubject: string
  placeholderEmail: string
  placeholderMessage: string
  submitButton: string
}

export function ContactForm({
  validationSubject,
  validationEmail,
  validationMessage,
  submitSuccess,
  submitError,
  submitDescriptionError,
  unknownError,
  placeholderSubject,
  placeholderEmail,
  placeholderMessage,
  submitButton,
}: ContactFormProps) {
  const formSchema = z.object({
    subject: z.string().min(2, { message: validationSubject }),
    email: z.string().email({ message: validationEmail }),
    message: z.string().min(1, { message: validationMessage }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      subject: '',
      message: '',
    },
  })

  const { toast } = useToast()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (response.status === 200) {
        form.reset()
        toast({
          description: submitSuccess,
        })
      } else {
        throw new Error(`${response.status}`)
      }
    } catch (error) {
      console.error(submitError, error)
      const errorMessage = error instanceof Error ? error.message : unknownError
      toast({
        description: `${submitDescriptionError} ${errorMessage}`,
      })
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 grid gap-4">
        <FormField
          control={form.control}
          name="subject"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder={placeholderSubject}
                  className="w-full font-normal md:text-base 3xl:text-lg 4xl:text-xl"
                />
              </FormControl>
              {fieldState.error && (
                <FormMessage>{fieldState.error.message}</FormMessage>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder={placeholderEmail}
                  className="w-full font-normal md:text-base"
                />
              </FormControl>
              {fieldState.error && (
                <FormMessage>{fieldState.error.message}</FormMessage>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder={placeholderMessage}
                  className="w-full font-normal md:text-base 3xl:text-lg 4xl:text-xl"
                />
              </FormControl>
              {fieldState.error && (
                <FormMessage>{fieldState.error.message}</FormMessage>
              )}
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="text-center font-semibold md:text-base 3xl:text-lg 4xl:text-xl"
        >
          {submitButton}
        </Button>
      </form>
    </FormProvider>
  )
}
