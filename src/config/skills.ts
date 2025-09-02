export const skillGroups = {
  core: {
    title: 'Tecnologias Principais',
    skills: [
      {
        name: 'JavaScript',
        level: 'expert',
        description:
          'Linguagem de programação dinâmica para desenvolvimento web. Essencial para criar sites interativos e aplicações web modernas.',
        experience: '4+ anos',
        docs: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
      },
      {
        name: 'TypeScript',
        level: 'expert',
        description:
          'JavaScript com definições de tipos estáticos. Melhora a confiabilidade do código e a experiência do desenvolvedor em aplicações grandes.',
        experience: '3+ anos',
        docs: 'https://www.typescriptlang.org/docs/',
      },
      {
        name: 'Python',
        level: 'expert',
        description:
          'Linguagem de programação versátil usada para desenvolvimento web, análise de dados, automação e serviços backend.',
        experience: '4+ anos',
        docs: 'https://docs.python.org/3/',
      },
      {
        name: 'HTML/CSS',
        level: 'expert',
        description:
          'Tecnologias web fundamentais para estruturar e estilizar páginas web. Base de todo desenvolvimento web.',
        experience: '4+ anos',
        docs: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
      },
      {
        name: 'React',
        level: 'expert',
        description:
          'Biblioteca JavaScript popular para construir interfaces de usuário com arquitetura baseada em componentes e DOM virtual.',
        experience: '4+ anos',
        docs: 'https://react.dev/',
      },
      {
        name: 'Next.js',
        level: 'expert',
        description:
          'Framework React com renderização do lado do servidor, geração estática e capacidades full-stack para aplicações de produção.',
        experience: '3+ anos',
        docs: 'https://nextjs.org/docs',
      },
      {
        name: 'Tailwind CSS',
        level: 'expert',
        description:
          'Framework CSS utility-first para construir rapidamente interfaces de usuário personalizadas com sistemas de design consistentes.',
        experience: '2+ anos',
        docs: 'https://tailwindcss.com/docs',
      },
    ],
  },
  backend: {
    title: 'Backend & Dados',
    skills: [
      {
        name: 'Flask',
        level: 'intermediate',
        description:
          'Framework web Python leve para construir APIs e aplicações web com configuração mínima e máxima flexibilidade.',
        experience: '1+ ano',
        docs: 'https://flask.palletsprojects.com/',
      },
      {
        name: 'Django',
        level: 'intermediate',
        description:
          'Framework web Python de alto nível com interface de administração integrada, ORM e filosofia "baterias incluídas".',
        experience: '2 anos',
        docs: 'https://docs.djangoproject.com/',
      },
      {
        name: 'Spring Boot',
        level: 'learning',
        description:
          'Framework Java que simplifica a construção de aplicações prontas para produção com servidores embarcados e auto-configuração.',
        experience: '3 meses',
        docs: 'https://spring.io/projects/spring-boot',
      },
      {
        name: 'Prisma',
        level: 'intermediate',
        description:
          'Kit de ferramentas de banco de dados moderno com cliente type-safe, migrações e modelagem de dados intuitiva para TypeScript & Node.js.',
        experience: '3+ anos',
        docs: 'https://www.prisma.io/docs',
      },
      {
        name: 'Pandas',
        level: 'intermediate',
        description:
          'Biblioteca Python poderosa para manipulação e análise de dados, fornecendo estruturas de dados e operações para tabelas numéricas.',
        experience: '3+ anos',
        docs: 'https://pandas.pydata.org/docs/',
      },
      {
        name: 'C/C++',
        level: 'intermediate',
        description:
          'Linguagens de programação de baixo nível para programação de sistemas, sistemas embarcados e aplicações críticas de performance.',
        experience: '1+ ano',
        docs: 'https://en.cppreference.com/',
      },
      {
        name: 'C#',
        level: 'intermediate',
        description:
          'Linguagem de programação orientada a objetos desenvolvida pela Microsoft para construir aplicações Windows e serviços web.',
        experience: '1+ ano',
        docs: 'https://docs.microsoft.com/en-us/dotnet/csharp/',
      },
      {
        name: 'Java',
        level: 'intermediate',
        description:
          'Linguagem de programação de nível empresarial conhecida pela filosofia "escreva uma vez, execute em qualquer lugar" e ecossistema robusto.',
        experience: '1+ ano',
        docs: 'https://docs.oracle.com/javase/tutorial/',
      },
    ],
  },
  mobile: {
    title: 'Mobile & Desktop',
    skills: [
      {
        name: 'React Native',
        level: 'intermediate',
        description:
          'Framework de desenvolvimento mobile multiplataforma usando React para construir aplicações nativas iOS e Android.',
        experience: '3+ anos',
        docs: 'https://reactnative.dev/docs/getting-started',
      },
      {
        name: 'Expo',
        level: 'intermediate',
        description:
          'Plataforma para aplicações React universais com ferramentas e serviços para desenvolvimento e deploy React Native.',
        experience: '3+ anos',
        docs: 'https://docs.expo.dev/',
      },
      {
        name: 'Electron',
        level: 'intermediate',
        description:
          'Framework para construir aplicações desktop multiplataforma usando tecnologias web como HTML, CSS e JavaScript.',
        experience: '2+ anos',
        docs: 'https://www.electronjs.org/docs',
      },
      {
        name: 'PySide6/PyQt6',
        level: 'intermediate',
        description:
          'Bindings Python para o framework Qt, permitindo criação de aplicações desktop multiplataforma com aparência nativa.',
        experience: '2+ anos',
        docs: 'https://doc.qt.io/qtforpython/',
      },
      {
        name: 'Tauri',
        level: 'learning',
        description:
          'Framework para construir aplicações desktop leves e seguras com frontend web e backend Rust.',
        experience: '3 meses',
        docs: 'https://tauri.app/v1/guides/',
      },
      {
        name: 'Windows Forms',
        level: 'learning',
        description:
          'Biblioteca de classes GUI para .NET Framework, fornecendo plataforma para desenvolver aplicações desktop Windows.',
        experience: '4 meses',
        docs: 'https://docs.microsoft.com/en-us/dotnet/desktop/winforms/',
      },
      {
        name: 'WinUI3',
        level: 'learning',
        description:
          'Plataforma UI nativa moderna para aplicações Windows com Fluent Design System e desenvolvimento baseado em XAML.',
        experience: '3 meses',
        docs: 'https://docs.microsoft.com/en-us/windows/apps/winui/',
      },
    ],
  },
  learning: {
    title: 'Aprendendo Atualmente',
    skills: [
      {
        name: 'Rust',
        level: 'learning',
        description:
          'Linguagem de programação de sistemas focada em segurança, velocidade e concorrência sem coleta de lixo.',
        experience: '6 meses',
        docs: 'https://doc.rust-lang.org/',
      },
      {
        name: 'Django',
        level: 'learning',
        description:
          'Framework web Python de alto nível com interface de administração integrada, ORM e filosofia "baterias incluídas".',
        experience: '2 anos',
        docs: 'https://docs.djangoproject.com/',
      },
      {
        name: 'Spring Boot',
        level: 'learning',
        description:
          'Framework Java que simplifica a construção de aplicações prontas para produção com servidores embarcados e auto-configuração.',
        experience: '6 meses',
        docs: 'https://spring.io/projects/spring-boot',
      },
      {
        name: 'Tauri',
        level: 'learning',
        description:
          'Framework para construir aplicações desktop leves e seguras com frontend web e backend Rust.',
        experience: '3 meses',
        docs: 'https://tauri.app/v1/guides/',
      },
      {
        name: 'Windows Forms',
        level: 'learning',
        description:
          'Biblioteca de classes GUI para .NET Framework, fornecendo plataforma para desenvolver aplicações desktop Windows.',
        experience: '3 meses',
        docs: 'https://docs.microsoft.com/en-us/dotnet/desktop/winforms/',
      },
      {
        name: 'WinUI3',
        level: 'learning',
        description:
          'Plataforma UI nativa moderna para aplicações Windows com Fluent Design System e desenvolvimento baseado em XAML.',
        experience: '3 meses',
        docs: 'https://docs.microsoft.com/en-us/windows/apps/winui/',
      },
    ],
  },
} as const

export type SkillLevel = 'expert' | 'intermediate' | 'learning'

export const levelColors = {
  expert:
    'bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/30',
  intermediate:
    'bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30',
  learning:
    'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30',
} as const
