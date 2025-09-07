import { Alert, AlertDescription } from '@pedroaba/components/ui/alert'
import { Badge } from '@pedroaba/components/ui/badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@pedroaba/components/ui/card'
import { Separator } from '@pedroaba/components/ui/separator'
import {
  AlertTriangle,
  Bug,
  CheckCircle,
  Code,
  Info,
  Rocket,
  Shield,
  Zap,
} from 'lucide-react'
import type { MDXComponents } from 'mdx/types'

export const components = {
  // Headings with enhanced styling
  h1: ({ children, ...props }) => (
    <h1
      className="text-4xl font-bold text-foreground mb-6 mt-8 first:mt-0 border-b border-border pb-3"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="text-2xl font-semibold text-foreground mb-4 mt-8 flex items-center gap-2"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="text-xl font-medium text-foreground mb-3 mt-6" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 className="text-lg font-medium text-foreground mb-2 mt-4" {...props}>
      {children}
    </h4>
  ),

  // Paragraphs with better spacing
  p: ({ children, ...props }) => (
    <p className="text-muted-foreground leading-relaxed mb-4" {...props}>
      {children}
    </p>
  ),

  // Lists with enhanced styling
  ul: ({ children, ...props }) => (
    <ul className="space-y-2 mb-6 ml-4" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="space-y-2 mb-6 ml-4 list-decimal list-inside" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li
      className="text-muted-foreground leading-relaxed flex items-start gap-2"
      {...props}
    >
      <span className="text-primary mt-2 text-xs">•</span>
      <span>{children}</span>
    </li>
  ),

  // Code blocks with syntax highlighting
  code: ({ children, className, ...props }) => {
    const isInline = !className
    if (isInline) {
      return (
        <code
          className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground"
          {...props}
        >
          {children}
        </code>
      )
    }
    return (
      <code
        className={`${className} block bg-muted p-4 rounded-lg text-sm font-mono text-foreground overflow-x-auto`}
        {...props}
      >
        {children}
      </code>
    )
  },
  pre: ({ children, ...props }) => (
    <pre
      className="bg-muted p-4 rounded-lg overflow-x-auto mb-6 border"
      {...props}
    >
      {children}
    </pre>
  ),

  // Blockquotes
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-4 border-primary pl-4 py-2 mb-6 bg-muted/50 rounded-r-lg italic text-muted-foreground"
      {...props}
    >
      {children}
    </blockquote>
  ),

  // Links
  a: ({ children, href, ...props }) => (
    <a
      href={href}
      className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  ),

  // Tables
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto mb-6">
      <table
        className="w-full border-collapse border border-border rounded-lg"
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-muted" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }) => <tbody {...props}>{children}</tbody>,
  tr: ({ children, ...props }) => (
    <tr className="border-b border-border" {...props}>
      {children}
    </tr>
  ),
  th: ({ children, ...props }) => (
    <th
      className="border border-border px-4 py-2 text-left font-semibold text-foreground"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td
      className="border border-border px-4 py-2 text-muted-foreground"
      {...props}
    >
      {children}
    </td>
  ),

  // Horizontal rule
  hr: ({ ...props }) => <Separator className="my-8" {...props} />,

  // Custom components for changelog sections
  Highlights: ({ children, ...props }) => (
    <Card
      className="mb-6 border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20"
      {...props}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
          <Zap className="size-5" />
          Destaques
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  ),

  NewFeatures: ({ children, ...props }) => (
    <Card
      className="mb-6 border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20"
      {...props}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-blue-700 dark:text-blue-300 flex items-center gap-2">
          <Rocket className="size-5" />
          Novas Funcionalidades
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  ),

  BugFixes: ({ children, ...props }) => (
    <Card
      className="mb-6 border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20"
      {...props}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-red-700 dark:text-red-300 flex items-center gap-2">
          <Bug className="size-5" />
          Correções de Bugs
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  ),

  Improvements: ({ children, ...props }) => (
    <Card
      className="mb-6 border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/20"
      {...props}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-purple-700 dark:text-purple-300 flex items-center gap-2">
          <Code className="size-5" />
          Melhorias
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  ),

  Security: ({ children, ...props }) => (
    <Card
      className="mb-6 border-orange-200 dark:border-orange-800 bg-orange-50/50 dark:bg-orange-950/20"
      {...props}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-orange-700 dark:text-orange-300 flex items-center gap-2">
          <Shield className="size-5" />
          Segurança
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  ),

  // Alert components
  Info: ({ children, ...props }) => (
    <Alert
      className="mb-4 border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20"
      {...props}
    >
      <Info className="size-4 text-blue-600 dark:text-blue-400" />
      <AlertDescription className="text-blue-800 dark:text-blue-200">
        {children}
      </AlertDescription>
    </Alert>
  ),

  Warning: ({ children, ...props }) => (
    <Alert
      className="mb-4 border-yellow-200 dark:border-yellow-800 bg-yellow-50/50 dark:bg-yellow-950/20"
      {...props}
    >
      <AlertTriangle className="size-4 text-yellow-600 dark:text-yellow-400" />
      <AlertDescription className="text-yellow-800 dark:text-yellow-200">
        {children}
      </AlertDescription>
    </Alert>
  ),

  Success: ({ children, ...props }) => (
    <Alert
      className="mb-4 border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20"
      {...props}
    >
      <CheckCircle className="size-4 text-green-600 dark:text-green-400" />
      <AlertDescription className="text-green-800 dark:text-green-200">
        {children}
      </AlertDescription>
    </Alert>
  ),

  // Badge component for tags
  Tag: ({ children, variant = 'default', ...props }) => (
    <Badge variant={variant} className="mr-2 mb-2" {...props}>
      {children}
    </Badge>
  ),
} satisfies MDXComponents

export function useMDXComponents(): MDXComponents {
  return components
}
