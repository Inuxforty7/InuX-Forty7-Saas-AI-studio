export interface PromptItem {
  id: string;
  title: string;
  description: string;
  prompt: string;
  howToUse: string;
  idealModel: string;
  tags: string[];
  outputType?: string;
}

export interface ModelComparison {
  id: string;
  name: string;
  rating: { code: number; design: number; text: number; context: number };
  bestFor: string;
  pros: string[];
  cons: string[];
  metaPrompt: string; // Copy-paste system prompt to train this model
}

export interface CreationGuide {
  id: string;
  type: '3d' | 'mobile' | 'video' | 'animation';
  title: string;
  description: string;
  howToExecute: string;
  promptToCopy: string;
  recommendedWorkflow: string;
}

export interface AutomationTool {
  id: string;
  title: string;
  description: string;
  whereToRun: string; // e.g., "Console do Chrome (F12)", "Terminal Windows/Mac", "n8n / Make"
  steps: string[];
  codeToCopy: string;
  outputFormat: string;
}

export interface ProductivityHack {
  id: string;
  title: string;
  scenario: string;
  framework: string;
  promptToCopy: string;
  expectedResult: string;
}

export interface EcosystemData {
  prompts: PromptItem[];
  models: ModelComparison[];
  creations: CreationGuide[];
  automations: AutomationTool[];
  productivity: ProductivityHack[];
}

export const ecosystemData: EcosystemData = {
  prompts: [
    {
      id: 'img-01',
      title: 'Fotografia Cinematográfica de Alta Costura (Cyber-Noir)',
      description: 'Gera imagens com visual cinematográfico focado em iluminação neon fria, fumaça atmosférica e detalhes ultra-nítidos, perfeitas para banners.',
      prompt: 'Cinematic wide shot, cyber-noir atmospheric aesthetic, model with high-fashion technical gear, dressed in obsidian waterproof textiles, rain droplets sparkling under blue and amber neon highlights, soft haze, industrial concrete background, shot on Leica Noctilux-M 50mm f/0.95, photorealistic, anamorphic lens flare, sharp focus on eyes, 8k resolution, color-graded on DaVinci Resolve --ar 16:9 --style raw',
      howToUse: 'Copie e cole diretamente no Midjourney v6 ou no Flux.1 [Dev]. Use as proporções --ar 16:9 para formato de desktop ou --ar 9:16 para celular.',
      idealModel: 'Flux.1 [Dev] ou Midjourney v6',
      tags: ['Banners', 'Fidelidade 8K', 'Vibe Cyber']
    },
    {
      id: 'img-02',
      title: 'Minimalismo Arquitetônico Brutalista Futurista',
      description: 'Ideal para backgrounds limpos, elegantes e de altíssimo valor percebido em landing pages e capas de projetos.',
      prompt: 'Minimalist brutalist architectural pavilion built inside a cavernous volcanic glass cave, single glowing white LED column illuminating smooth raw concrete walls, reflections on obsidian wet floors, dramatic negative space, architectural photography by Julius Shulman, extremely sharp detail, muted color palette with single neon orange accent, 8k, volumetric light beams --ar 21:9',
      howToUse: 'Insira no Flux.1 ou Midjourney. Funciona muito bem para seções de fundo com sobreposição de texto claro.',
      idealModel: 'Flux.1 Schnel/Dev',
      tags: ['Brutalista', 'Backgrounds', 'Moderno']
    },
    {
      id: 'img-03',
      title: 'Foto Comercial Macro de Componente Tecnológico',
      description: 'Aparência de produto luxuoso de tecnologia de hardware ou gadget high-tech. Excelente para e-commerce fictício ou startups.',
      prompt: 'Commercial macro studio table photography of a translucent solid-glass mechanical microchip, copper and platinum nanofilaments glowing internally with warm light, resting on deep charcoal silk fabric, depth of field extremely shallow, industrial design award, photorealistic, sharpest focus on copper micro-joints, shot on Hasselblad H6D-100c, key lighting --ar 4:3',
      howToUse: 'Cole no Flux.1 ou DALL-E 3. Perfeito para ilustrar inovação tecnológica sólida ou engenharia sofisticada.',
      idealModel: 'Flux.1 Pro / Dev',
      tags: ['Macros', 'Hardware', 'Estúdio comercial']
    },
    {
      id: 'img-04',
      title: 'Retrato de Personagem Tecnológico (Anfíbio / Cyber-Punk)',
      description: 'Retratos expressivos para avatares, personagens de marca ou imagens promocionais de impacto imediato.',
      prompt: 'Close-up editorial portrait of a street cyber-hacker wearing matte translucent visor reflecting computer code blocks, hyperdetailed skin pores, volumetric amber overhead studio rim light, neon teal specular reflections, detailed mechanical cybernetic ear implant, analog film grain, dramatic high-contrast, beautiful lighting, shot on 35mm film --ar 1:1 --stylize 250',
      howToUse: 'Use no Midjourney v6 para avatares ou imagens de perfil de altíssimo realismo.',
      idealModel: 'Midjourney v6',
      tags: ['Avatares', 'Foco Facial', 'Análogo']
    }
  ],
  models: [
    {
      id: 'mod-01',
      name: 'Claude 3.5 Sonnet',
      rating: { code: 98, design: 95, text: 90, context: 85 },
      bestFor: 'Design Web, Código React/Vite completo, animações limpas e lógica avançada sem erros.',
      pros: [
        'Produz designs modernos e respeita o Tailwind CSS melhor que qualquer IA.',
        'Seus componentes vêm estruturados, modulares e prontos para rodar.',
        'Extrema precisão com lógicas complexas e APIs desafiadoras.'
      ],
      cons: [
        'Limite de mensagens mais restrito nas versões gratuitas/pro standard.',
        'Não aceita inputs gigantescos como vídeos nativos de horas.'
      ],
      metaPrompt: 'Você é um Desenvolvedor Front-end Elite focado no design suíço minimalista e tipografia brutalista. Codifique em React + Tailwind CSS sem usar frameworks pesados unificados. Ao escrever o código, garanta espaçamento irregular dinâmico, animações fluidas baseadas em microinterações, bordas finas com subtons de opacidade e layouts de bento-grid. Não dê explicações desnecessárias; entregue sempre o código modular completo e limpo para copiar e colar diretamente.'
    },
    {
      id: 'mod-02',
      name: 'Gemini 1.5 e 2.0 Pro',
      rating: { code: 90, design: 85, text: 92, context: 100 },
      bestFor: 'Leitura de vídeos de 1 hora inteira, livros técnicos de 800 páginas, PDFs monstruosos e buscas em tempo real.',
      pros: [
        'Janela de contexto surreal de até 2 milhões de tokens (você pode subir o projeto inteiro!).',
        'Lê arquivos de áudio e vídeo brutos sem precisar de legendas prontas.',
        'Velocidade instantânea com modelos atualizados.'
      ],
      cons: [
        'O código gerado às vezes precisa de ajustes menores no Tailwind.',
        'Estética das interfaces geradas costuma ser mais conservadora e corporativa.'
      ],
      metaPrompt: 'Aja como um Engenheiro de Sistemas Sênior e Arquiteto de Contexto Absoluto. Você receberá o repositório inteiro em anexo. Analise as dependências, mapeie a lógica dos estados e crie um plano cirúrgico passo-a-passo. Priorize refatorar de forma incremental para não corromper do início as rotas existentes. Use typings estritos de TypeScript e evite anotações globais generisadas.'
    },
    {
      id: 'mod-03',
      name: 'GPT-4o (OpenAI)',
      rating: { code: 88, design: 80, text: 95, context: 80 },
      bestFor: 'Criação rápida de textos de copywriting, estratégias de conteúdo, emails de vendas e scripts de automação rápida.',
      pros: [
        'Linguagem natural extremamente fluida, humana, persuasiva e sem jargões robóticos de IA.',
        'Excelente interpretador de prompts rápidos e excelente para geração estruturada de JSON.',
        'Estabilidade extrema nas respostas.'
      ],
      cons: [
        'Design front-end tende a ser genérico (muito azul e roxo clichê).',
        'Tende a cortar arquivos grandes de código no meio para simular economia de tokens.'
      ],
      metaPrompt: 'Você é o maior Copywriter de Conversão e Diretor de Arte de Lançamentos do Brasil. Escreva em português do Brasil cru, natural, sem as palavras clichê de IA ("mergulhe de cabeça", "revolucionário", "divisor de águas"). Use frases curtas, quebras de linha táticas (Copy Line-Break) e gatilhos mentais que criam urgência imediata de negócios.'
    }
  ],
  creations: [
    {
      id: 'cre-01',
      type: '3d',
      title: 'Blueprint de Landing Page Interativa 3D',
      description: 'Como instruir a inteligência artificial para criar um portfólio ou landing page 3D usando Three.js e CSS avançado em poucos segundos.',
      howToExecute: 'Copie o prompt central abaixo e cole diretamente no Claude 3.5 Sonnet ou v0.dev. Ele criará as conexões do Canvas 3D e renderizará o ambiente completo de forma limpa e otimizada!',
      promptToCopy: 'Crie uma página web autônoma completa em um único arquivo HTML contendo uma cena 3D impressionante usando Three.js por CDN. O background deve ser uma galáxia cibernética com um domo de partículas orbitando de maneira suave. No centro da cena, renderize um cubo ou esfera de vidro float (Glassmorphism de alta refração) que reage ao movimento do cursor do usuário com rotações suaves. Intercale o Three.js com animações de entrada suíças em Tailwind CSS para os textos de cabeçalho: "INUX 47 ENGINE" em Space Grotesk preto e vermelho brilhante, com um botão flutuante futurista tático e interativo que ao passar o mouse faz as partículas acelerarem de velocidade temporariamente.',
      recommendedWorkflow: 'Cole o código gerado no CodePen ou coloque em um arquivo index.html no seu navegador. É carregar e ver rodando instantaneamente.'
    },
    {
      id: 'cre-02',
      type: 'mobile',
      title: 'Prompt-Máquina para Apps de Tela Única (Mobile Native)',
      description: 'Como fazer a IA desenhar interfaces de aplicativos móveis que parecem nativos do iOS/Android na primeira tentativa.',
      howToExecute: 'Abra o Bolt.new, v0.dev ou Cursor. Insira o prompt abaixo para moldar a interface mobile usando as safe-areas e comportamentos precisos do celular.',
      promptToCopy: 'Aja como um designer sênior móvel especialista em interfaces nativas da Apple. Desenvolva uma aplicação web móvel completa estruturada para celular com largura máxima "max-w-md" centralizada em fundo de tela escuro profundo. Garanta safe-area-top e safe-area-bottom para evitar que elementos fiquem debaixo do notch ou barra do iOS. Crie botões de toque com altura mínima de 48px, feedback vibrante com classes de scale ao clicar e navegação de abas inferior fixa com ícones e labels minimalistas. Adicione transições animadas com framer-motion ou classes nativas de transição rápida para alternar as guias sem cintilação de tela.',
      recommendedWorkflow: 'Use v0.dev para obter a UI polidíssima e depois copie o código direto para o seu projeto local.'
    },
    {
      id: 'cre-03',
      type: 'video',
      title: 'Prompts de Movimento de Câmera de Elite (Cinema)',
      description: 'Fórmulas prontas de prompt para usar no Runway Gen-3 Alpha ou Luma Dream Machine para conseguir tomadas de vídeo memoráveis.',
      howToExecute: 'Copie as fórmulas de comandos exatos para controlar a mecânica de renderização física dos geradores de vídeo de IA moderna.',
      promptToCopy: 'Fórmula 1 (Drone Cinematográfico Ultra-Lento): "A slow-motion extreme high-altitude drone tracking shot, passing through thick volumetric dynamic fog over a futuristic glass-metal fortress, epic natural sunset lighting casting deep warm gold rays across clean diagonal structures, super-resolution cinematographic, 4k, cinematic color grade, photorealistic."\n\nFórmula 2 (Foco Seletivo de Lente Macro): "Macro close-up details tracking dynamic water droplets cascading on a glowing organic circuitry device, hyperdetailed texture, slow macro pan left to right, shallow depth of field, blurred background, volumetric rays, 60fps cinematic photorealism."',
      recommendedWorkflow: 'Gere trechos curtos de 4 a 5 segundos e cole no CapCut para dar um corte rápido com a batida sonora do vídeo.'
    },
    {
      id: 'cre-04',
      type: 'animation',
      title: 'Animações de Entrada de Interface (GSAP / Tailwind)',
      description: 'Seus roteiros de animação favoritos para tornar os elementos da página dinâmicos e focados.',
      howToExecute: 'Cole esses blocos de configuração tática no seu componente React para criar um efeito de entrada escalonado que prende o olhar.',
      promptToCopy: '// GSAP Stagged Reveal\ngsap.fromTo(".tech-animate-item",\n  { opacity: 0, y: 30, scale: 0.95, filter: "blur(5px)" },\n  {\n    opacity: 1,\n    y: 0,\n    scale: 1,\n    filter: "blur(0px)",\n    duration: 0.8,\n    stagger: 0.1,\n    ease: "power3.out",\n    scrollTrigger: {\n      trigger: ".tech-animate-container",\n      start: "top 80%",\n    }\n  }\n);',
      recommendedWorkflow: 'Use a dependência gsap e @gsap/react já integradas no repositório.'
    }
  ],
  automations: [
    {
      id: 'aut-01',
      title: 'Capturador de Listas e Leads em 1 Segundo (JavaScript Console)',
      description: 'Extraia dados públicos de tabelas, contatos comerciais, seguidores ou nomes diretos de qualquer site aberto sem usar nenhuma ferramenta instalada externa.',
      whereToRun: 'Console do Navegador Chrome / Safari / Edge (Aperte F12 -> Console)',
      steps: [
        'Acesse a página web que contém a lista ou tabela com os contatos.',
        'Abra o DevTools pressionando F12 (ou botão direito -> Inspecionar) e vá até a aba "Console".',
        'Copie todo o código abaixo, cole lá dentro e aperte ENTER.',
        'Seu navegador baixará de forma instantânea um arquivo "leads_detonados.csv" pronto com os dados!'
      ],
      codeToCopy: `// Script de Extração Rápida de Listas por Seletor Dinâmico
(function() {
  const tableRows = document.querySelectorAll('tr, li, .item, .profile-card, [class*="card"]');
  let extractedBuffer = [['Nome / Título', 'Texto de Suporte / Metadado']];
  
  tableRows.forEach(row => {
    // Busca dados textuais simples
    const headings = row.querySelectorAll('h1, h2, h3, h4, .title, strong');
    const textData = Array.from(headings).map(h => h.innerText.trim()).filter(t => t.length > 0);
    
    // Pega o restante de texto do elemento
    const paragraphs = row.querySelectorAll('p, span, .desc, .email, [class*="email"]');
    const supportText = Array.from(paragraphs).map(p => p.innerText.trim()).filter(t => t.length > 0);
    
    if (textData.length > 0) {
      extractedBuffer.push([
        '"' + textData[0].replace(/"/g, '""') + '"',
        '"' + (supportText[0] || '').replace(/"/g, '""') + '"'
      ]);
    }
  });

  if (extractedBuffer.length <= 1) {
    alert('Erro: nenhum padrão visual foi encontrado nessa página. Tente rodar em uma lista aberta!');
    return;
  }

  let csvContent = "data:text/csv;charset=utf-8," + extractedBuffer.map(e => e.join(",")).join("\\n");
  let encodedUri = encodeURI(csvContent);
  let downloadLink = document.createElement("a");
  downloadLink.setAttribute("href", encodedUri);
  downloadLink.setAttribute("download", "leads_extraidos_inux47.csv");
  document.body.appendChild(downloadLink);
  
  downloadLink.click();
  document.body.removeChild(downloadLink);
  console.log('Extração concluída com sucesso! ' + (extractedBuffer.length - 1) + ' entradas salvas no arquivo CSV.');
})();`,
      outputFormat: 'CSV formatado para Excel ou Google Drive de fácil gerenciamento.'
    },
    {
      id: 'aut-02',
      title: 'Auto-Organizador de Arquivos de Midjourney/Flux (Terminal Command)',
      description: 'Seu computador faz o download de centenas de mídias de IA misturadas na pasta Downloads? Rode esse comando para separar tudo em pastas perfeitas por mês ou tipo instantaneamente.',
      whereToRun: 'Terminal (Mac/Linux) ou PowerShell (Windows) na pasta que deseja arrumar',
      steps: [
        'Abra o Powershell ou Terminal direto na pasta "Downloads" ou onde descarrega imagens.',
        'Se for para Windows (PowerShell), copie a Linha de Comando abaixo marcando os arquivos.',
        'Cole o script e execute. Ele organizará tudo em frações de segundos sem instalar nenhum programa.'
      ],
      codeToCopy: `# Para Powershell (Windows): Filtra mídias geradas por IA e joga para pastas específicas
$images = Get-ChildItem -Path . -File | Where-Object { $_.Extension -match '(?i)^\\.(jpg|png|webp|jpeg)$' }
foreach ($file in $images) {
    $destFolder = "Imagens_IA"
    if (-not (Test-Path $destFolder)) { New-Item -ItemType Directory -Path $destFolder }
    Move-Item -Path $file.FullName -Destination $destFolder
    Write-Host "Organizado: $($file.Name) -> $destFolder" -ForegroundColor Cyan
}`,
      outputFormat: 'Salva todas as imagens bagunçadas em uma pasta isolada chamada "Imagens_IA".'
    },
    {
      id: 'aut-03',
      title: 'Disparador Inteligente de Webhooks de Teste',
      description: 'Precisa conectar ferramentas, simular pagamentos do Stripe ou testar gatilhos do Make.com/n8n sem registrar na plataforma paga? Copie o script curl direto.',
      whereToRun: 'Qualquer sistema operacional com Git, Bash ou terminal terminal básico instalado',
      steps: [
        'Abra o terminal do seu computador.',
        'Substitua o endereço da URL do webhook no script pela rota criada no Make ou n8n.',
        'Rode o comando. Ele enviará um payload de simulação rico em dados para você estruturar o seu fluxo gratuito.'
      ],
      codeToCopy: `curl -X POST https://SUA_URL_DO_WEBHOOK.com/inbound \\
-H "Content-Type: application/json" \\
-d '{
  "event": "payment.success",
  "client": {
    "name": "Cliente de Alta Performance",
    "email": "cliente@altaperformance.com",
    "phone": "+5511999999999"
  },
  "value": 2997.00,
  "currency": "BRL",
  "product": "Pacote Ecossistema Elite - INUX47",
  "unlocked_at": "2026-05-20"
}'`,
      outputFormat: 'Resposta imediata HTTP 200 do seu webhook garantindo as conexões corretas.'
    }
  ],
  productivity: [
    {
      id: 'pro-01',
      title: 'Decifrador de Transcrição de Reunião de 1 Hora',
      scenario: 'Você gravou uma reunião de 1 hora no Teams/Zoom ou gravou um áudio de ideias gigantesco e quer extrair as tarefas práticas em 10 segundos sem ler tudo na mão.',
      framework: 'Mapeamento de Ação por Foco Seletivo',
      promptToCopy: 'Aja como o Gerente de Projetos de elite mais eficiente do mundo comercial. Abaixo está a transcrição de áudio crua de uma reunião técnica. Ignore interrupções de assunto secundário e conversas vazias. Extraia em formato Markdown limpo e modular:\n1. [AÇÕES IMEDIATAS] Quem precisa executar o que e com qual prioridade de impacto de negócio.\n2. [DECISÕES CHAVE] Quais foram os acertos definitivos fechados no áudio.\n3. [PRÓXIMOS GARGALOS] Quais os pontos que ficaram abertos ou dependem de resposta subsequente.\n\nRegra: Use frases diretas, evite rodeios de apresentação corporativa. Aqui está a transcrição:\n\n[COLE SUA TRANSCRIÇÃO AQUI]',
      expectedResult: 'Painel estruturado com responsáveis técnicos, prazos lógicos deduzidos e tarefas de negócio ativas.'
    },
    {
      id: 'pro-02',
      title: 'Prospecção Irrecusável de Landing Pages 47x Mais Rápido',
      scenario: 'Você quer que donos de marcas paguem caro pelos seus serviços digitais de IA ou web design sem precisar escrever um email longo genérico ou marcar várias ligações de graça.',
      framework: 'Gatilho de Demonstração por Desconforto',
      promptToCopy: 'Aja como um Redator Comercial sênior e estrategista de prospecção fria por email. Escreva uma mensagem persuasiva curta, direta e com quebra de linha tática, para ser enviada para o dono do site: [NOME DO SITE/MARCA].\nUse a estrutura de Prospecção por Demonstração:\n1. Aponte calmamente 1 erro gritante na landing page atual deles que faz eles perderem vendas no celular (ex: velocidade lenta, design genérico com template de 2012, falta de contraste no CTA).\n2. Diga que você desenvolveu um protótipo usando inteligência artificial avançada que carrega instantaneamente no celular deles e foca em reter o cliente médio.\n3. Faça um convite exclusivo de 1 frase: "Se quiser darei acesso direto ao protótipo no celular em 1 minuto de bônus, basta responder aqui. Não vou tentar vender nada."\n\nRegra: Sem rodeios clássicos de "Espero que esteja bem". Escreva com tom de profissional requisitado ocupado.',
      expectedResult: 'Um email curto com altíssimo índice de abertura e curiosidade que engatilha respostas voluntárias em menos de 24 horas.'
    },
    {
      id: 'pro-03',
      title: 'Engrenagem Infinita de Roteiro de Vídeo Curto',
      scenario: 'Você precisa produzir 10 roteiros de vídeos dinâmicos de TikTok/Insta para atrair empresários ou desenvolvedores na prática sem precisar criar o conceito do zero toda vez.',
      framework: 'Fila Circular de Retenção de Atenção',
      promptToCopy: 'Aja como Diretor de Engajamento de Redes Sociais com foco em retenção por segundo. Desenvolva um roteiro tático de vídeo curto de até 45 segundos sobre: [INSIRA O TEMA].\nDivida a estrutura matemática do vídeo assim:\n0-3 segundos [O Gancho de Dissonância]: Faça um corte verbal provocativo de impacto que contraria uma crença comum no nicho.\n3-20 segundos [A Solução Prática Visual]: Explique onde clicar ou o que copiar em até 3 passos sem enrolar.\n20-40 segundos [O Atalho]: Demonstre com fatos como esse atalho poupa cansaço técnico.\n40-45 segundos [Chamada de Desvio]: Peça pro usuário salvar para poder colar depois, que é mais útil do que simplesmente curtir.\n\nEscreva em tom dinâmico com indicações visuais de [Cena / B-Roll] para transição rápida de tela a cada 3 segundos.',
      expectedResult: 'Roteiros organizados com indicações exatas de legendas dinâmicas secundadas por sugestões de B-roll.'
    }
  ]
};
