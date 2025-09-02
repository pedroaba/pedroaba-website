import { Cespacc } from '@pedroaba/assets/cespacc'
import { Inspetor } from '@pedroaba/assets/inspetor'

export const clientProjects = [
  {
    name: 'Inspetor Industrial',
    description:
      'Sistema de gestão/criação de relatórios para empresa de inspeções industriais, oferecendo controle completo de clientes, relatórios, manutenções e armazenamento de documentos.',
    url: 'https://inspetorindustrial.com.br',
    technologies: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Prisma',
      'PostgreSQL',
      'Trigger.dev',
    ],
    image: <Inspetor />,
  },
  {
    name: 'Cesspac',
    description:
      'Sistema de gestão escolar onde o usuário pode controlar pagamentos de alunos, gerar boletos e aplicar descontos de forma flexível. A plataforma diferencia valores por turma e nível de ensino, como maternal, fundamental e médio, facilitando o dia a dia da administração escolar com uma interface simples e prática.',
    url: 'https://cespacc.up.railway.app',
    image: <Cespacc />,
    technologies: ['Django', 'Python', 'PostgreSQL', 'Bootstrap', 'jQuery'],
  },
]
