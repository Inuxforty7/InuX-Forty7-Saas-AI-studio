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
  // CATEGORIA 1: PACK CINEMATOGRÁFICO - 10 ITENS
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
      tags: ['Macros', 'Hardware', 'Estúdio']
    },
    {
      id: 'img-04',
      title: 'Retrato de Personagem Tecnológico (Anfíbio / Cyber-Punk)',
      description: 'Retratos expressivos para avatares, personagens de marca ou imagens promocionais de impacto imediato.',
      prompt: 'Close-up editorial portrait of a street cyber-hacker wearing matte translucent visor reflecting computer code blocks, hyperdetailed skin pores, volumetric amber overhead studio rim light, neon teal specular reflections, detailed mechanical cybernetic ear implant, analog film grain, dramatic high-contrast, beautiful lighting, shot on 35mm film --ar 1:1 --stylize 250',
      howToUse: 'Use no Midjourney v6 para avatares ou imagens de perfil de altíssimo realismo.',
      idealModel: 'Midjourney v6',
      tags: ['Avatares', 'Foco Facial', 'Análogo']
    },
    {
      id: 'img-05',
      title: 'Render Isométrico 3D de Central Holográfica',
      description: 'Imagem isométrica em 3D de alta precisão de uma bancada tecnológica e interface de servidores cibernéticos.',
      prompt: 'Isometric 3D micro scene of a glass-walled data-center server cabinet on an isolated obsidian block, miniature neon green glowing servers, translucent holographic digital maps floating around, intricate detailing, octane render style --ar 4:3 --stylize 180',
      howToUse: 'Insira no Midjourney v6 ou no Flux.1. Excelente para ilustrar de forma esquemática soluções ou features de produtos digitais modernos.',
      idealModel: 'Midjourney v6',
      tags: ['Isométrico', 'Glossy 3D', 'Infográficos']
    },
    {
      id: 'img-06',
      title: 'Background de Fluidos de Obsidiana Líquida',
      description: 'Textura de luxo orgânica de matéria escura de alta viscosidade reflexiva para criar cenários e overlays de altíssimo design.',
      prompt: 'Macrophotography of smooth abstract liquid obsidian waves undulating slowly, sharp metallic silver edges catching studio soft keylights, pitch-black high-gloss organic flows, 3D render depth of field, elegant and futuristic background web asset --ar 16:9',
      howToUse: 'Adequado para preencher fundos de seções ou seções completas de planos de preços em websites premium.',
      idealModel: 'Flux.1 [Dev]',
      tags: ['Fundo Líquido', 'Texturas', 'Luxo Escuro']
    },
    {
      id: 'img-07',
      title: 'Drone Cinematográfico Panorâmico de Alta Altitude',
      description: 'Enquadramento focado em grandes cenários industriais ou edifícios futuristas, com excelente senso de escala física.',
      prompt: 'Extremely high-altitude drone flying slowly, sweeping panoramic view over a colossal hyper-modern titanium server vault built into a Scandinavian snowy fjord, orange ambient interior lighting escaping through glass lines, cinematic sunset --ar 21:9',
      howToUse: 'Use em geradores de vídeo como Runway Gen-3 Alpha ou Luma Dream Machine para gerar introduções incríveis.',
      idealModel: 'Runway Gen-3 ou Luma',
      tags: ['Cinema', 'Escala do drone', 'Vídeo']
    },
    {
      id: 'img-08',
      title: 'Retrato de Estúdio Neo-Noir com Iluminação de Aro',
      description: 'Iluminação artística futurista para representações de marca de startups de inteligência artificial estética.',
      prompt: 'Cinematic raw studio photo portrait of a focused technologist, dramatic high-contrast side lighting in vibrant magenta and cyan, soft skin textures with subtle micro sweat detail, shallow depth of field, high-tech industrial backdrop, shot on Red V-Raptor --ar 16:9',
      howToUse: 'Midjourney ou Flux. Cole para obter representação de profissionais em ambientes realistas sem filtros exagerados de beleza artificial.',
      idealModel: 'Flux.1 Pro',
      tags: ['Luz de Aro', 'Fotorealismo', 'Estúdio Startup']
    },
    {
      id: 'img-09',
      title: 'Packshot Comercial de Produto Minimalista Fosco',
      description: 'Ideal para e-commerce fictício de produtos de design brutalista ou embalagens de hardware elegantes.',
      prompt: 'Premium commercial studio product photography of an abstract matte-black cylindrical smart device, floating weightless above a solid block of raw basalt, ambient volumetric orange glow emerging from the bottom seam, hyperdetailed, commercial grade --ar 4:3',
      howToUse: 'DALL-E 3 ou Flux. Use como gerador conceitual para novas marcas de gadgets modernos.',
      idealModel: 'Flux.1 Pro',
      tags: ['Packshot', 'Destaque de Produto', 'Comercial']
    },
    {
      id: 'img-10',
      title: 'POV em Primeira Pessoa de Carro em Cyber-Cidade',
      description: 'Tomada imersiva de movimento em primeira pessoa que simula um assento de veículo passeando de noite por arranha-céus.',
      prompt: 'A cinematic first-person visual camera loop, sweeping motion going forward inside a stealth neon commuter vehicle driving through ultra-dense cyberpunk skylines with holographic neon signage, rain on premium carbon windshield, 8k resolution --ar 16:9',
      howToUse: 'Utilize nas plataformas modernas de vídeo por IA para criar animações ambientais dinâmicas de fundo.',
      idealModel: 'Luma Dream Machine',
      tags: ['Loop POV', 'Vídeo Dinâmico', 'Cyber Skylines']
    }
  ],

  // CATEGORIA 2: GUIA DA ELITE (I.A. MODELS) - 10 ITENS
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
    },
    {
      id: 'mod-04',
      name: 'DeepSeek Coder v2',
      rating: { code: 95, design: 70, text: 72, context: 88 },
      bestFor: 'Modelagem matemática pesada, algoritmos nativos em C++/Python e otimização de consultas de banco de dados.',
      pros: [
        'Performance em benchmarks de programação comparável ao Claude 3.5 Sonnet.',
        'Custo operacional por token extremamente baixo para integrações de backend.'
      ],
      cons: [
        'Menor proficiência criativa para UI design em comparação com Sonnet.',
        'Gera saídas estritamente técnicas, sem preocupação com harmonia de cores.'
      ],
      metaPrompt: 'Você é um Analista de Segurança e Otimizador de Código C++/C#. Você receberá blocos de código legados. Identifique vazamentos de memória, loops redundantes, condições de concorrência e ineficiências de chamadas de rede. Entregue soluções com foco estrito em tempo de execução e performance pura.'
    },
    {
      id: 'mod-05',
      name: 'Flux.1 Pro',
      rating: { code: 10, design: 98, text: 50, context: 40 },
      bestFor: 'Geração de ativos visuais, UI mockup realism, render de embalagens conceituais de luxo e tipografia renderizada em imagens.',
      pros: [
        'Rederiza palavras e frases curtas dentro das imagens com ortografia 100% perfeita.',
        'Realismo anatômico absurdo (mãos, olhos e fisionomias perfeitas).'
      ],
      cons: [
        'Zero proficiência em codificação.',
        'Demanda prompts descritivos para evitar resultados com visual genérico de estoque 3D.'
      ],
      metaPrompt: 'Generativo focado em fotografia hiper-realista. Descreva o enquadramento usando nomes de câmeras clássicas (Leica, Hasselblad), iluminação de estúdio profissional (rim light, snoot, key light), posicionamento exato dos contrastes e texturas texturizadas. Evite adjetivos genéricos como "fotorealista" ou "lindo" -- deite peso na precisão da descrição física.'
    },
    {
      id: 'mod-06',
      name: 'Llama 3 70B (Meta)',
      rating: { code: 85, design: 75, text: 88, context: 80 },
      bestFor: 'Extração local de dados estruturados em servidores privados e automações de e-mails em massa.',
      pros: [
        'Modelo Open-Source líder; pode ser hospedado localmente no seu hardware gratuitamente.',
        'Velocidade altíssima de processamento via Ollama.'
      ],
      cons: [
        'Limites menores em janelas de contexto comparado aos líderes proprietários.',
        'Pode alucinar em rotas complexas de pacotes npm não documentados.'
      ],
      metaPrompt: 'Aja como um Agente de Redação e Atendimento de Clientes Automatizado. Escreva respostas simples, cordiais, porém pragmáticas, estruturando os prazos declarados em tópicos claros. Não adicione notas fora da persona de suporte corporativo.'
    },
    {
      id: 'mod-07',
      name: 'Mistral Large 2',
      rating: { code: 87, design: 78, text: 85, context: 85 },
      bestFor: 'Multilinguismo estrito, redação de contratos comerciais internacionais e tradução técnica sem perda de gírias funcionais.',
      pros: [
        'Nativo da Europa, com excelente conformidade com leis de dados globais (GDPR).',
        'Fidelidade extrema ao tom e regras ditadas no system instructions.'
      ],
      cons: [
        'Visualização de Web App um pouco datada quando instruído a criar interfaces.',
        'Comunidade menor de suporte a exemplos específicos.'
      ],
      metaPrompt: 'Você é um Consultor Jurídico Comercial Internacional. Seu papel é revisar cláusulas de contratos de prestação de serviços de tecnologia, apontando pontes de ambiguidade que permitam quebras de compromisso não indenizadas. Escreva formalmente, mapeando cada falha detectada com sua respectiva proposta de mitigação.'
    },
    {
      id: 'mod-08',
      name: 'Midjourney v6',
      rating: { code: 5, design: 99, text: 40, context: 30 },
      bestFor: 'Direção de arte abstrata, criação de logotipos estéticos de marcas de tecnologia avant-garde e conceitos ilustrativos ultra-luxuosos.',
      pros: [
        'Qualidade estética imensurável de composição artística.',
        'Vasto repertório histórico de estilos de cinema clássico integrado.'
      ],
      cons: [
        'Interface baseada exclusivamente no Discord.',
        'Dificuldade de renderizar palavras longas ou strings específicas sem erros tipográficos.'
      ],
      metaPrompt: 'Focus on highly conceptual fine art photography and industrial render, 3D brutalist glass shapes, intricate lighting casting caustic patterns, film noir vintage graded look, extreme detailing, sharp textures, award-winning art direction.'
    },
    {
      id: 'mod-09',
      name: 'Gemini 1.5 Flash',
      rating: { code: 80, design: 75, text: 82, context: 95 },
      bestFor: 'Agentes de chat de baixíssima latência que respondem usuários em menos de 1 segundo sobre catálogos imensos.',
      pros: [
        'Respostas em velocidade de pensamento (até 5x mais rápido do que modelos Pro).',
        'Excelente capacidade de varredura rápida de áudio e PDFs medianos.'
      ],
      cons: [
        'Menor profundidade matemática para resolver quebra-cabeças de lógica de código.',
        'Código tende a omitir importações críticas que demandam preenchimento manual.'
      ],
      metaPrompt: 'Você é um Assistente Técnico Operacional de Resposta Rápida. Responda em tópicos concisos de até 3 palavras. Nunca use introduções simpáticas ou floreios de encerramento. Vá direto ao fato técnico focado.'
    },
    {
      id: 'mod-10',
      name: 'Qwen 2.5 Coder',
      rating: { code: 92, design: 70, text: 75, context: 85 },
      bestFor: 'Assistente interno de IDE (like Copilot/Cursor), autocompletar de código em tempo real e scripts rápidos de infraestrutura.',
      pros: [
        'Rendimento impressionante em código para um modelo compacto open-source.',
        'Altamente responsivo para formatação de dados brutos e conversão SQL.'
      ],
      cons: [
        'Fraca compreensão de nuances semânticas e conotações subjetivas em copywriting.',
        'Visual simplório de páginas front-end se solicitado layouts complexos.'
      ],
      metaPrompt: 'Aja como um assistente de terminal Bash de elite. Escreva scripts limpos, comentando apenas o indispensável em cada trecho de alteração. Evite explicações sobre o funcionamento das flags.'
    }
  ],

  // CATEGORIA 3: MÁQUINA DE CRIAÇÃO (3D/APP) - 10 ITENS
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
      description: 'Fórmulas prontas de prompt para usar no Runway Gen-3 Alpha ou Luma Dream Machine para conseguir tomadas de vídeo de computação gráfica de nível estúdio.',
      howToExecute: 'Copie as fórmulas de comandos exatos para controlar a mecânica de renderização física dos geradores de vídeo de IA moderna.',
      promptToCopy: 'Fórmula 1 (Drone Cinematográfico Ultra-Lento): "A slow-motion extreme high-altitude drone tracking shot, passing through thick volumetric fog over a futuristic glass-metal fortress." \n\nFórmula 2 (Foco Seletivo de Lente Macro): "Macro close-up details tracking dynamic water droplets cascading on a glowing organic circuitry device, shallow depth of field, blurred background, volumetric rays."',
      recommendedWorkflow: 'Gere trechos curtos de 4 a 5 segundos e cole no CapCut para dar um corte rápido com a batida sonora do vídeo.'
    },
    {
      id: 'cre-04',
      type: 'animation',
      title: 'Animações de Entrada de Interface (GSAP / Tailwind)',
      description: 'Seus roteiros de animação favoritos para tornar os elementos da página dinâmicos e focados, com efeito fade de elite.',
      howToExecute: 'Cole esses blocos de configuração tática no seu componente React para criar um efeito de entrada escalonado que prende o olhar.',
      promptToCopy: 'gsap.fromTo(".tech-animate-item", { opacity: 0, y: 30, scale: 0.95, filter: "blur(5px)" }, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.8, stagger: 0.1, ease: "power3.out" });',
      recommendedWorkflow: 'Use a dependência gsap e @gsap/react já integradas no repositório.'
    },
    {
      id: 'cre-05',
      type: 'animation',
      title: 'Carrossel Horizontal Infinito Brutalista (Tailwind CSS Only)',
      description: 'Estrutura completa em CSS para exibir marcas parceiras, tecnologias ou depoimentos que deslizam lateralmente de forma contínua.',
      howToExecute: 'Insira esse markup Tailwind puro em seu arquivo React. Ele rodará um laço linear infinito de altíssima suavidade por hardware.',
      promptToCopy: '<div className="w-full overflow-hidden relative"><div className="flex w-[200%] animate-infinite-scroll space-x-8 py-3 whitespace-nowrap"><div className="flex gap-8 justify-around shrink-0 min-w-full text-xs text-white/50 tracking-widest">[ITEM_01] // [ITEM_02] // [ITEM_03]</div><div className="flex gap-8 justify-around shrink-0 min-w-full text-xs text-white/50 tracking-widest">[ITEM_01] // [ITEM_02] // [ITEM_03]</div></div></div>',
      recommendedWorkflow: 'Defina a classe keyframe de marquee no arquivo index.css ou config do tailwind.'
    },
    {
      id: 'cre-06',
      type: '3d',
      title: 'Canvas de Partículas Interativas (Vanilla JS Canvas)',
      description: 'Roteiro de desenho em Canvas 2D acelerado que cria um fundo de constelação estelar que liga linhas pontilhadas ao mover o mouse.',
      howToExecute: 'Copie e insira o código em um hook useEffect mapeando um elemento HTML <canvas> com ref associado.',
      promptToCopy: 'const canvas = canvasRef.current; const ctx = canvas.getContext("2d"); let particles = []; // Loop de physics: draw particles as small circles, and if distance between particles is smaller than 100px, stroke a line with opacity corresponding to closeness. RequestAnimationFrame drives rendering smoothly.',
      recommendedWorkflow: 'Ideal para compor seções de fundo escuro que exijam dinâmica abstrata imersiva.'
    },
    {
      id: 'cre-07',
      type: 'mobile',
      title: 'Feedback de Clique Elástico (Liquid Scale Interaction)',
      description: 'Transforma botões estáticos chatos em botões orgânicos de gel que esticam e encolhem ao clique do dedo.',
      howToExecute: 'Mapeie as classes de active do Tailwind para causar uma deformação rápida de transição elástica.',
      promptToCopy: '<button className="transition-all duration-300 active:scale-95 hover:shadow-[0_0_15px_rgba(255,69,0,0.4)] active:skew-x-2 transform duration-150">CÉLULA LÍQUIDA</button>',
      recommendedWorkflow: 'Aplique em todos os botões primários de chamada para ação (CTA) do seu website corporativo.'
    },
    {
      id: 'cre-08',
      type: 'mobile',
      title: 'Blueprint Bento Grid Dinâmico Inteligente',
      description: 'Layout para seções de destaque baseado na nova estética bento-box dos aparelhos e encartes da Apple.',
      howToExecute: 'Cole o markup contendo grid de spans diferenciados por mídias colunares.',
      promptToCopy: '<div className="grid grid-cols-1 md:grid-cols-12 gap-4"><div className="col-span-12 md:col-span-8 p-6 border border-white/5 bg-black/40">[HIGHLIGHT_LARGE]</div><div className="col-span-12 md:col-span-4 p-6 border border-white/5 bg-black/40">[SIDE_SMALL]</div></div>',
      recommendedWorkflow: 'Insira elementos multimídia dinâmicos e contadores nas caixas menores para dar dinâmica.'
    },
    {
      id: 'cre-09',
      type: 'animation',
      title: 'Acordeão de Cards Expandidos Brutalistas',
      description: 'Lógica React simples sem biblioteca externa para expandir suavemente cards de conteúdo ao focar com cursor.',
      howToExecute: 'Crie um mapeamento de estado "activeId" e atribua classes condicionais de flex-width ou max-height.',
      promptToCopy: '<div className="flex gap-4">{items.map(item => (<div className={`transition-all duration-500 overflow-hidden ${activeId === item.id ? "w-96 text-white" : "w-16 text-white/30"}`} onMouseEnter={() => setActiveId(item.id)}>{item.title}</div>))}</div>',
      recommendedWorkflow: 'Use no preenchimento de seções que explicam pacotes ou camadas de serviços do seu negócio.'
    },
    {
      id: 'cre-10',
      type: 'video',
      title: 'Transição de Tela de Carregamento Glitch Holográfico',
      description: 'Overlay animado com timers que tranca a tela com letras estilo cibernético de hacker desmoronando antes de dar entrada no app.',
      howToExecute: 'Instancie um estado de carregamento de 1500ms usando setInterval para gerar strings aleatórias que decodificam.',
      promptToCopy: 'const letters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"; setProgressText(prev => prev.split("").map(l => letters[Math.floor(Math.random()*letters.length)]).join(""));',
      recommendedWorkflow: 'Cria uma imersão incomparável na primeira abertura de sistemas reservados.'
    }
  ],

  // CATEGORIA 4: COFRE DE AUTOMOTORES - 10 ITENS
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
      codeToCopy: '(function() { const tableRows = document.querySelectorAll("tr, li, .item, .profile-card, [class*=\'card\']"); let extractedBuffer = [["Nome / Título", "Texto de Suporte"]]; tableRows.forEach(row => { const headings = row.querySelectorAll("h1, h2, h3, h4, .title, strong"); const textData = Array.from(headings).map(h => h.innerText.trim()).filter(t => t.length > 0); const paragraphs = row.querySelectorAll("p, span, .desc, .email, [class*=\'email\']"); const supportText = Array.from(paragraphs).map(p => p.innerText.trim()).filter(t => t.length > 0); if (textData.length > 0) { extractedBuffer.push(["\"" + textData[0].replace(/"/g, \'""\') + "\"", "\"" + (supportText[0] || "").replace(/"/g, \'""\') + "\""]); } }); if (extractedBuffer.length <= 1) { alert("Nenhum padrão detectado. Teste em páginas com listas abertas!"); return; } let csvContent = "data:text/csv;charset=utf-8," + extractedBuffer.map(e => e.join(",")).join("\\n"); let encodedUri = encodeURI(csvContent); let downloadLink = document.createElement("a"); downloadLink.setAttribute("href", encodedUri); downloadLink.setAttribute("download", "leads_extraidos_inux47.csv"); document.body.appendChild(downloadLink); downloadLink.click(); document.body.removeChild(downloadLink); })();',
      outputFormat: 'CSV formatado para Excel ou Google Drive de fácil gerenciamento.'
    },
    {
      id: 'aut-02',
      title: 'Auto-Organizador de Arquivos de Midjourney/Flux (Terminal Command)',
      description: 'Seu computador faz o download de centenas de mídias de IA misturadas na pasta Downloads? Rode esse comando para separar tudo em pastas perfeitas por tipo instantaneamente.',
      whereToRun: 'Terminal Powershell Windows na pasta que deseja arrumar',
      steps: [
        'Abra o Powershell ou Terminal direto na pasta Downloads ou onde descarrega imagens.',
        'Se for para Windows (PowerShell), copie a Linha de Comando abaixo marcando os arquivos.',
        'Cole o script e execute. Ele organizará tudo em frações de segundos sem instalar nenhum programa.'
      ],
      codeToCopy: '$images = Get-ChildItem -Path . -File | Where-Object { $_.Extension -match \'(?i)^\\.(jpg|png|webp|jpeg)$\' }; foreach ($file in $images) { $destFolder = "Imagens_IA"; if (-not (Test-Path $destFolder)) { New-Item -ItemType Directory -Path $destFolder }; Move-Item -Path $file.FullName -Destination $destFolder; Write-Host "Organizado: $($file.Name) -> $destFolder" -ForegroundColor Cyan }',
      outputFormat: 'Salva todas as imagens bagunçadas em uma pasta isolada chamada "Imagens_IA".'
    },
    {
      id: 'aut-03',
      title: 'Disparador Inteligente de Webhooks de Teste',
      description: 'Precisa conectar ferramentas, simular pagamentos do Stripe ou testar gatilhos do Make.com/n8n sem registrar na plataforma paga? Copie o script curl direto.',
      whereToRun: 'Git Bash ou Terminal Linux / MacOS',
      steps: [
        'Abra o terminal do seu computador.',
        'Substitua o endereço da URL do webhook no script pela rota criada no Make ou n8n.',
        'Rode o comando. Ele enviará um payload de simulação rico em dados para você estruturar o seu fluxo gratuito.'
      ],
      codeToCopy: 'curl -X POST https://SUA_URL_DO_WEBHOOK.com/inbound -H "Content-Type: application/json" -d \'{"event": "payment.success", "client": {"name": "Cliente Elite", "email": "elite@inux47.com"}, "value": 2997.00, "product": "Ecosystem Elite"}\'',
      outputFormat: 'Resposta imediata HTTP 200 do seu webhook garantindo as conexões corretas.'
    },
    {
      id: 'aut-04',
      title: 'Conversor Automático de Ativos de SVG para React JSX',
      description: 'Script Node.js utilitário que lê um arquivo vetorial plano de imagem e gera o markup limpo higienizado com propriedades CamelCase prontas para uso React.',
      whereToRun: 'Ambiente Node.js / Terminal básico local do projeto',
      steps: [
        'Crie um arquivo chamado renderSvg.js na pasta de ícones.',
        'Cole o script de automação, passe o caminho do arquivo .svg original.',
        'Rode "node renderSvg.js". Copie o resultado do console direto no seu componente.'
      ],
      codeToCopy: 'const fs = require("fs"); const file = fs.readFileSync("./icon.svg", "utf8"); const jsx = file.replace(/(\\w+)-(\\w+)=/g, (m, p1, p2) => p1 + p2.charAt(0).toUpperCase() + p2.slice(1) + "=").replace(/stroke-width=/g, "strokeWidth=").replace(/stroke-linecap=/g, "strokeLinecap="); console.log("JSX CONVERTIDO:", jsx);',
      outputFormat: 'Texto da tag de SVG com atributos corrigidos prontas para encapsular.'
    },
    {
      id: 'aut-05',
      title: 'Download Automático de Imagens por Links em Massa',
      description: 'Cansado de abrir vários links para salvar referências em novas pastas na mão? Insira este array de download direto.',
      whereToRun: 'Navegador Chrome Console (F12)',
      steps: [
        'Organize os links das imagens em uma lista textual separada por vírgula no script.',
        'Abra o assistente de console no seu painel de referência.',
        'Execute para que o navegador force downloads seqüenciais automáticos.'
      ],
      codeToCopy: 'const links = ["url1.jpg", "url2.jpg"]; links.forEach((url, i) => { const a = document.createElement("a"); a.href = url; a.download = "IA_Asset_" + i; document.body.appendChild(a); a.click(); document.body.removeChild(a); });',
      outputFormat: 'Downloads limpos listando os arquivos enumerados sequencialmente.'
    },
    {
      id: 'aut-06',
      title: 'Monitor Prático de Latência de API Básica',
      description: 'Varre e calcula os milissegundos exatos que seu backend ou API de IA demora para retornar payload.',
      whereToRun: 'Console do Navegador Web ou Node.js runtime',
      steps: [
        'Ajuste o endpoint a ser medido.',
        'Execute no console do navegador para testar tempos de resposta e performance.'
      ],
      codeToCopy: 'const t0 = performance.now(); fetch("https://api.github.com").then(() => { const t1 = performance.now(); console.log("Latência do servidor: " + (t1 - t0).toFixed(2) + " milissegundos."); });',
      outputFormat: 'Imprime na tela o relatório numérico de milissegundos brutos de reposta.'
    },
    {
      id: 'aut-07',
      title: 'Extrator de Títulos e Parágrafos para Auditoria de SEO',
      description: 'Lê todos os títulos H2 e H3 de um concorrente de ponta para entender a arquitetura de termos chaves estruturados.',
      whereToRun: 'Console Javascript (DevTools F12)',
      steps: [
        'Entre no post ou site do concorrente de alta indexação no buscador.',
        'Abra o painel Console (F12). Cole o extrator e execute.',
        'Copie e utilize a lista organizada para alimentar sua própria inteligência artificial estruturadora.'
      ],
      codeToCopy: 'const tags = document.querySelectorAll("h1, h2, h3"); const seoList = Array.from(tags).map(t => "[" + t.tagName + "] " + t.innerText.trim()); console.log(seoList.join("\\n"));',
      outputFormat: 'Lista textual linear listando a escada de importância orgânica de títulos.'
    },
    {
      id: 'aut-08',
      title: 'Conversor de Diretórios em Estrutura CSV Rápido',
      description: 'Gera uma árvore textual de arquivos de projeto facilitada para o Gemini ler em caso de upload sem compressão.',
      whereToRun: 'Terminal de Prompt de Comando / Terminal VSCode',
      steps: [
        'Navegue com cd até a pasta raiz de pastas secundárias.',
        'Execute o script. O terminal imprimirá a árvore de arquivos limpa.'
      ],
      codeToCopy: 'node -e "const fs = require(\'fs\'); const list = (dir) => { fs.readdirSync(dir).forEach(f => { const path = dir + \'/\' + f; if(fs.statSync(path).isDirectory()) { if(!path.includes(\'node_modules\')) list(path); } else { console.log(path); } }); }; list(\'.\')" ',
      outputFormat: 'Impressão estruturada de todos os arquivos físicos em formato de caminhos lineares.'
    },
    {
      id: 'aut-09',
      title: 'Limpador de Registros e Lixo LocalStorage / Cache',
      description: 'Destrava travas e estados congelados de desenvolvimento do navegador com um único comando profundo.',
      whereToRun: 'Console do Navegador (F12)',
      steps: [
        'Cole no console do ambiente travado de desenvolvimento.',
        'Enter. Recarregue pressionando Ctrl+F5 para redefinir as conexões zeradas de desenvolvimento.'
      ],
      codeToCopy: 'localStorage.clear(); sessionStorage.clear(); console.log("Mapeamento físico de armazenamento local limpo em 100%."); location.reload();',
      outputFormat: 'Mensagem de confirmação seguida de regravação automática da página ativa.'
    },
    {
      id: 'aut-10',
      title: 'Script de Backup Automático de Arquivos em Zip',
      description: 'Cria uma pasta comprimida de cópia rápida para salvar estados de marcos importantes antes de refatorar.',
      whereToRun: 'Execução de Node.js Terminal',
      steps: [
        'Instale o utilitário leve de compressão se necessário, ou cole o script utilitário.',
        'Execute no console do interpretador para registrar backups.'
      ],
      codeToCopy: 'const fs = require("fs"); const zlib = require("zlib"); const output = fs.createWriteStream("App_Backup.zip"); const archive = zlib.createGzip(); output.on("close", () => console.log("Backup Concluído com Sucesso!"));',
      outputFormat: 'Geração do arquivo "App_Backup.zip" na pasta raiz operacional do ecossistema.'
    }
  ],

  // CATEGORIA 5: HACKS DE PRODUTIVIDADE - 7 ITENS (SOMANDO EXACTAMENTE 47 ENTRE TODAS)
  productivity: [
    {
      id: 'pro-01',
      title: 'Decifrador de Transcrição de Reunião de 1 Hora',
      scenario: 'Você gravou uma reunião de 1 hora no Teams/Zoom ou gravou um áudio de ideias gigantesco e quer extrair as tarefas práticas em 10 segundos sem ler tudo na mão.',
      framework: 'Mapeamento de Ação por Foco Seletivo',
      promptToCopy: 'Aja como o Gerente de Projetos de elite mais eficiente do mundo comercial. Abaixo está a transcrição de áudio crua de uma reunião técnica. Ignore interrupções de assunto secundário e conversas vazias. Extraia em formato Markdown limpo e modular: \n1. [AÇÕES IMEDIATAS] Quem precisa executar o que e com qual prioridade de impacto de negócio. \n2. [DECISÕES CHAVE] Quais foram os acertos definitivos fechados no áudio. \n3. [PRÓXIMOS GARGALOS] Quais os pontos que ficaram abertos ou dependem de resposta subsequente. \n\nRegra: Use frases diretas, evite rodeios de apresentação corporativa. Aqui está a transcrição: \n\n[COLE SUA TRANSCRIÇÃO AQUI]',
      expectedResult: 'Painel estruturado com responsáveis técnicos, prazos lógicos deduzidos e tarefas de negócio ativas.'
    },
    {
      id: 'pro-02',
      title: 'Prospecção Irrecusável de Landing Pages 47x Mais Rápido',
      scenario: 'Você quer que donos de marcas paguem caro pelos seus serviços digitais de IA ou web design sem precisar escrever um email longo genérico ou marcar várias ligações de graça.',
      framework: 'Gatilho de Demonstração por Desconforto',
      promptToCopy: 'Aja como um Redator Comercial sênior e estrategista de prospecção fria por email. Escreva uma mensagem persuasiva curta, direta e com quebra de linha tática, para ser enviada para o dono do site: [NOME DO SITE/MARCA]. \nUse a estrutura de Prospecção por Demonstração: \n1. Aponte calmamente 1 erro gritante na landing page atual deles que faz eles perderem vendas no celular (ex: velocidade lenta, design genérico com template de 2012, falta de contraste no CTA). \n2. Diga que você desenvolveu um protótipo usando inteligência artificial avançada que carrega instantaneamente no celular deles e foca em reter o cliente médio. \n3. Faça um convite exclusivo de 1 frase: "Se quiser darei acesso direto ao protótipo no celular em 1 minuto de bônus, basta responder aqui. Não vou tentar vender nada." \n\nRegra: Sem rodeios clássicos de "Espero que esteja bem". Escreva com tom de profissional requisitado ocupado.',
      expectedResult: 'Um email curto com altíssimo índice de abertura e curiosidade que engatilha respostas voluntárias em menos de 24 horas.'
    },
    {
      id: 'pro-03',
      title: 'Engrenagem Infinita de Roteiro de Vídeo Curto',
      scenario: 'Você precisa produzir 10 roteiros de vídeos dinâmicos de TikTok/Insta para atrair empresários ou desenvolvedores na prática sem precisar criar o conceito do zero toda vez.',
      framework: 'Fila Circular de Retenção de Atenção',
      promptToCopy: 'Aja como Diretor de Engajamento de Redes Sociais com foco em retenção por segundo. Desenvolva um roteiro tático de vídeo curto de até 45 segundos sobre: [INSIRA O TEMA]. \nDivida a estrutura matemática do vídeo assim: \n0-3 segundos [O Gancho de Dissonância]: Faça um corte verbal provocativo de impacto que contraria uma crença comum no nicho. \n3-20 segundos [A Solução Prática Visual]: Explique onde clicar ou o que copiar em até 3 passos sem enrolar. \n20-40 segundos [O Atalho]: Demonstre com fatos como esse atalho poupa cansaço técnico. \n40-45 segundos [Chamada de Desvio]: Peça pro usuário salvar para poder colar depois, que é mais útil do que simplesmente curtir. \n\nEscreva em tom dinâmico com indicações visuais de [Cena / B-Roll] para transição rápida de tela a cada 3 segundos.',
      expectedResult: 'Roteiros organizados com indicações exatas de legendas dinâmicas secundadas por sugestões de B-roll.'
    },
    {
      id: 'pro-04',
      title: 'Gerador de Postagens Bento Carrossel para o LinkedIn',
      scenario: 'Criar autoridade com conteúdo visual atraente de design no LinkedIn sem gastar horas montando pranchetas no Canva do zero.',
      framework: 'Visual Structure Bento-Card Framework',
      promptToCopy: 'Gere um roteiro sequencial de até 5 slides curtos de alta densidade técnica sobre o assunto: [TEMA]. Cada slide deve conter um título provocativo de até 4 palavras em monossilábico, seguido de uma tabela comparativa ou 2 bullets pragmáticos de código. No rodapé, coloque o termo de coordenação: "[20K2_MODEL_NODE] // INUX47".',
      expectedResult: 'Conteúdo fragmentado pronto para alimentar carrosséis de PDF que aumentam visibilidade e audiência qualificada.'
    },
    {
      id: 'pro-05',
      title: 'Converte Código Legado para TypeScript Moderno Sem Erros',
      scenario: 'Você tem funções antigas e bagunçadas de Javascript e quer tipá-las com Generics estritos de forma limpa em TypeScript sem quebras inesperadas de tipo "any".',
      framework: 'Strict Typings Invariant Constructor',
      promptToCopy: 'Aja como uma Inteligência de Análise Estática de Typescript Sênior. Converta a função JavaScript abaixo para TypeScript estrito. Crie interfaces explícitas para todos os parâmetros de objetos de entrada, evite o uso de "any", prefira tipos de Utility (como Record, Partial e Omit) para flexibilidade e use tratamento robusto de erros estruturados com Try/Catch e retornos tipados claros.',
      expectedResult: 'Mapeamento de tipos limpos, livre de alertas do compilador tsc e pronto para compilação estrita.'
    },
    {
      id: 'pro-06',
      title: 'Escrever E-Books Educacionais de Alto Valor Percebido',
      scenario: 'Criar um infoproduto ou livro digital pragmático focado em resolver dores de desenvolvedores e designers para gerar autoridade no mercado digital.',
      framework: 'Sublime Detail Fact-Based Structuring',
      promptToCopy: 'Trabalhe como o maior engenheiro de redação de livros didáticos técnicos globais. Desenvolva um sumário com descrições detalhadas e o conteúdo completo para o capítulo 1 do e-book: [ASSUNTO]. Foque em exemplos prontos, diagramas de código funcionais e caixas de conselhos de atalhos rápidos práticos. Evite longos discursos filosóficos.',
      expectedResult: 'Capítulos estruturados, prontos para comercialização rápida ou distribuição de valor.'
    },
    {
      id: 'pro-07',
      title: 'Sumarizador Cirúrgico de PDFs Científicos de 800 Páginas',
      scenario: 'Você tem que estudar manuais de patentes técnicas, PDFs de APIs complexas ou livros técnicos enormes e precisa extrair as equações e comandos corretos de uso rápido.',
      framework: 'Density Extraction Core Protocol',
      promptToCopy: 'Você é um Analista de Documentação Científica de Alta Velocidade. Leia o conteúdo do PDF anexado. Extraia as fórmulas matemáticas matemáticas cruas, os comandos exatos de terminal e a lista de variáveis críticas de configuração do sistema descritas. Ignore as introduções conceituais dos autores.',
      expectedResult: 'Documento enxuto reunindo apenas tabelas de coordenadas e dados práticos para referência.'
    }
  ]
};
