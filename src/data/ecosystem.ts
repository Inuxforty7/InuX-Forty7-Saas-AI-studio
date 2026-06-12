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
  prompts: [],
  models: [
    { id: 'm-1', name: 'Gemini 3.1 Pro (Google AI Studio)', rating: { code: 100, design: 100, text: 100, context: 100 }, bestFor: 'Raciocínio Máximo / Alta Fidelidade', pros: ['Pipeline operacional 3D', 'Web Architect'], cons: ['Preço por token'], metaPrompt: 'System Instruction For Gemini 3.1 Pro: Atue como um Desenvolvedor Frontend e Especialista em UI/UX de elite...' },
    { id: 'm-2', name: 'Gemini 3.5 Flash', rating: { code: 95, design: 90, text: 95, context: 95 }, bestFor: 'Protótipos rápidos e Wireframes', pros: ['Velocidade extrema', 'Geração de estrutura'], cons: ['Menor precisão visual em 3D complexo'], metaPrompt: 'System Instruction For Gemini 3.5 Flash: Atue como criador de wireframes estruturais...' },
    { id: 'm-3', name: 'Nano Banana 2 (Flow)', rating: { code: 30, design: 100, text: 50, context: 50 }, bestFor: 'Geração de Imagens/Vídeos Cinematicos', pros: ['Cinematic Lighting', 'Alta fidelidade visual'], cons: ['Não escreve código', 'Apenas Mídia'], metaPrompt: 'System Instruction For Nanonana 2: Renderize elementos visuais isolados com fundo escuro e estilo cyber-noir...' }
  ],
  creations: [],
  automations: [],
  productivity: []
};
