'use client'

import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './ui/button'
import { FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'

export function ContactForm() {
  const formSchema = z.object({
    subject: z
      .string()
      .min(2, { message: 'O assunto deve ter pelo menos 2 caracteres.' }),
    email: z.string().email({ message: 'Por favor, insira um email válido.' }),
    message: z.string().min(1, { message: 'A mensagem é obrigatória.' }),
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
          description: 'Sent successfully!',
        })
      } else {
        throw new Error(`Falha ao enviar o e-mail: Status ${response.status}`)
      }
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error)
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error'
      toast({
        description: `Erro ao enviar o e-mail: ${errorMessage}`,
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
                  placeholder="Assunto"
                  className="w-full"
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
                  placeholder="user@domain.com"
                  className="w-full"
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
                  placeholder="Mensagem"
                  className="w-full"
                />
              </FormControl>
              {fieldState.error && (
                <FormMessage>{fieldState.error.message}</FormMessage>
              )}
            </FormItem>
          )}
        />

        <Button type="submit" className="justify-center">
          Enviar
        </Button>
      </form>
    </FormProvider>
  )
}
