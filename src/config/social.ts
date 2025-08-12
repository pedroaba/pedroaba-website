import { Github, Linkedin, Mail } from 'lucide-react'

export const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/pedroaba',
    icon: Github,
    color: 'hover:text-gray-900 dark:hover:text-gray-100',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/pedroaba/',
    icon: Linkedin,
    color: 'hover:text-blue-600 dark:hover:text-blue-400',
  },
  {
    name: 'Email',
    href: 'mailto:pedr.augustobarbosa.aparecido@gmail.com',
    icon: Mail,
    color: 'hover:text-green-600 dark:hover:text-green-400',
  },
] as const
