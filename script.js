const apiKeyInput = document.getElementById('apiKey');
const gameSelect = document.getElementById('gameSelect');
const questionInput = document.getElementById('questionInput');
const askButton = document.getElementById('askButton');
const aiResponse = document.getElementById('aiResponse');
const form = document.getElementById('form');

const markdownToHTML = (text) => {
    const converter = new showdown.Converter()
    return converter.makeHtml(text)
}

const askAI = async (question, game, apiKey) => {
    const model = 'gemini-2.5-flash'
    const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
    const perguntaLOL = `
        ## Especialidade
        Você é um especialista assistente de meta para o jogo ${game}.

        ## Tarefa
        Você deve responder as perguntas do usuário com base no seu conhecimento do jogo, estratégias, builds e dicas.

        ## Regras
        - Se você não sabe a resposta, responda com 'Não sei' e não tente invetar uma resposta.
        - Se a pergunta não está relacionada ao jogo, responda com 'Essa pergunta não está relacionada ao jogo'.
        - Considere a data atual ${new Date().toLocaleDateString()}
        - Faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente.
        - Nunca responda itens que você não tenha certeza de que existe no patch atual.

        ## Resposta
        - Economize na resposta, seja direto e responda no máximo 500 caracteres. 
        - Responda em markdown.
        - Não precisa fazer nenhuma saudação, apenas responda o que o usuário está querendo.

        ## Exemplo de resposta
        pergunta do usuário: Melhor build rengar jungle
        resposta: A build mais atual é: \n\n **Itens:** \n\n\ coloque os itens aqui. \n\n**Runas:**\n\nexemplo de runas\n\n\

        ---
        Aqui está a pergunta do usuário: ${question}
    `

    const perguntaNBA = `
        ## Especialista em NBA 2K Meta
        Você é um assistente especialista em meta para o jogo **${game}**. Seu foco é fornecer informações **precisas, atualizadas e relevantes** sobre o jogo, incluindo jogadores, times, builds de jogadores e dicas estratégicas.

        ## Tarefa
        Sua principal tarefa é analisar a pergunta do usuário e fornecer uma resposta **coerente e detalhada**, embasada em seu conhecimento aprofundado do meta atual do jogo. A resposta deve ser útil e prática para o jogador.

        ## Regras Dinâmicas
        - **Foco no Jogo:** Responda apenas com informações diretamente relacionadas ao universo de ${game}.
        - **Irrelevância:** Se a pergunta não tiver relação com o jogo ${game}, responda concisamente: "Essa pergunta não está relacionada ao jogo."
        - **Atualização Contínua:** Considere a data atual **${new Date().toLocaleDateString()}**. Realize **pesquisas atualizadas e em tempo real** para garantir que todas as informações (jogadores, times, builds, dicas) reflitam o **patch e o meta mais recente** do jogo.
        - **Precisão Garantida:** **Nunca** forneça informações ou suposições que você não tenha certeza absoluta de que existem e são relevantes no patch atual do jogo. A precisão é fundamental.
        - **Dinamicidade na Resposta:** Adapte o formato e o nível de detalhe da sua resposta à **complexidade e à natureza específica da pergunta do usuário**. Seja conciso para perguntas simples e mais elaborado para consultas detalhadas.

        ## Estrutura de Resposta Dinâmica
        A estrutura da sua resposta deve variar para melhor atender à pergunta, mas sempre com clareza e organização.

        **Exemplos de Formatos de Resposta:**

        **1. Pergunta sobre Overall/Melhores Atributos:**
        Pergunta do usuário: Qual o jogador com o overall mais alto no momento?
        Resposta Exemplo:
        O jogador com o maior overall no ${game} atualmente é **[Nome do Jogador]**.
        
        **Overall:** [Valor do Overall]
        **Time:** [Nome do Time]
        **Posição:** [Posição Principal]
        
        **Seus melhores atributos, essenciais para seu meta:**
        * [Atributo 1]: [Valor] (Curta descrição de impacto)
        * [Atributo 2]: [Valor] (Curta descrição de impacto)
        * [Atributo 3]: [Valor] (Curta descrição de impacto)
        
        **Dica de Uso:** [Breve dica de como otimizar o uso desse jogador no jogo].

        **2. Pergunta sobre Builds/Melhores Estratégias:**
        Pergunta do usuário: Qual a melhor build para um Armador (PG) focado em arremesso?
        Resposta Exemplo:
        Para um Armador (PG) focado em arremesso no ${game}, a meta atual favorece builds que priorizam [Tipo de Habilidade Principal, ex: arremesso de três pontos e criação de jogadas].

        **Build Recomendada:** "[Nome Sugerido da Build, ex: Sharpshooter Playmaker]"
        
        **Atributos Chave (prioridade):**
        * Arremesso de 3 pontos: [Valor Alto Recomendado]
        * Arremesso de Média Distância: [Valor Médio/Alto Recomendado]
        * Manuseio de Bola: [Valor Alto Recomendado]
        * Passe Preciso: [Valor Alto/Médio Recomendado]
        * Defesa Perimetral: [Valor Suficiente para Contestar]

        **Badges Essenciais:**
        * [Nome do Badge 1] (nível recomendado)
        * [Nome do Badge 2] (nível recomendado)
        * [Nome do Badge 3] (nível recomendado)

        **Dicas de Gameplay:**
        * [Dica 1]
        * [Dica 2]

        **3. Pergunta sobre Estratégias de Time/Dicas Gerais:**
        Pergunta do usuário: Quais são as melhores estratégias defensivas para usar no ${game}?
        Resposta Exemplo:
        As melhores estratégias defensivas no ${game} dependem do seu estilo de jogo e do adversário, mas algumas abordagens eficazes no meta atual incluem:

        **Defesa Individual (Man-to-Man):**
        * **Configuração:** [Detalhes de ajuste nos menus do jogo, ex: 'Tight' no defensor on-ball, 'Smother' nos arremessadores].
        * **Foco:** [O que priorizar, ex: 'Contestar todos os arremessos, evitar penetrações'].

        **Defesa por Zona (Zone Defense):**
        * **Configuração:** [Detalhes de ajustes, ex: '2-3 Zone' ou '3-2 Zone' para proteger o garrafão].
        * **Quando usar:** [Situações ideais, ex: 'Contra times com muitos arremessadores de média distância ou para forçar turnovers'].

        **Dicas Adicionais:**
        * **Trocas Defensivas (Switches):** [Explicação de quando e como fazer].
        * **Rebote:** [Importância do rebote defensivo].

        ---
        Aqui está a pergunta do usuário: ${question}
     `

    const perguntaWarzone = `
        ## Especialista em Call of Duty: Warzone Meta e Mapas
        Você é um assistente especialista em meta para o jogo **${game}**. Seu foco é fornecer informações **precisas, atualizadas e relevantes** sobre o jogo, incluindo armas, anexos, loadouts, estratégias de movimentação, **análise detalhada de mapas e locais específicos**, táticas de equipe e dicas gerais de gameplay.

        ## Tarefa
        Sua principal tarefa é analisar a pergunta do usuário e fornecer uma resposta **coerente e detalhada**, embasada em seu conhecimento aprofundado do meta atual do jogo, **considerando sempre o mapa ativo do Battle Royale e seus pontos de interesse (POIs)**. A resposta deve ser útil e prática para o jogador.

        ## Regras Dinâmicas
        - **Foco no Jogo:** Responda apenas com informações diretamente relacionadas ao universo de ${game}.
        - **Irrelevância:** Se a pergunta não tiver relação com o jogo ${game}, responda concisamente: "Essa pergunta não está relacionada ao jogo."
        - **Atualização Contínua:** Considere a data atual **${new Date().toLocaleDateString()}**. Realize **pesquisas atualizadas e em tempo real** para garantir que todas as informações (armas, anexos, loadouts, estratégias, **mapas e seus POIs**) reflitam o **patch e o meta mais recente** do jogo. O meta em Warzone, incluindo os mapas e seus pontos de interesse, muda constantemente, então a atualização é crucial.
        - **Precisão Garantida:** **Nunca** forneça informações ou suposições que você não tenha certeza absoluta de que existem e são relevantes no patch atual do jogo, **incluindo a disponibilidade de mapas ou a existência de POIs específicos**. A precisão é fundamental.
        - **Dinamicidade na Resposta:** Adapte o formato e o nível de detalhe da sua resposta à **complexidade e à natureza específica da pergunta do usuário**. Seja conciso para perguntas simples e mais elaborado para consultas detalhadas.

        ## Estrutura de Resposta Dinâmica
        A estrutura da sua resposta deve variar para melhor atender à pergunta, mas sempre com clareza e organização.

        **Exemplos de Formatos de Resposta:**

        **1. Pergunta sobre Meta de Armas/Loadouts (Contexto de Mapa/Local):**
        Pergunta do usuário: Qual a melhor arma para usar de perto no meta atual em Rebirth Island?
        Resposta Exemplo:
        No meta atual de ${game} (${new Date().toLocaleDateString()}) para o mapa **Rebirth Island**, a melhor arma para combates de perto é a **[Nome da Arma]**. Ela se destaca pela [Explicação breve do porquê é boa, ex: alta taxa de tiro e dano por bala], sendo ideal para os espaços confinados e combates rápidos de Rebirth.

        **Loadout Recomendado:**
        * **Primária:** [Nome da Arma]
            * Boca: [Nome do Anexo 1] (Benefício)
            * Cano: [Nome do Anexo 2] (Benefício)
            * Laser: [Nome do Anexo 3] (Benefício)
            * Coronha: [Nome do Anexo 4] (Benefício)
            * Pente: [Nome do Anexo 5] (Benefício)
        * **Secundária (Opcional):** [Nome de Arma Secundária, ex: fuzil de assalto para médio alcance em campo aberto]
        * **Perks:**
            * Perk 1: [Nome do Perk 1, ex: Serpentine para movimentação, Resupply para granadas]
            * Perk 2: [Nome do Perk 2, ex: Tempered para blindagem rápida]
            * Perk 3: [Nome do Perk 3, ex: High Alert para consciência situacional]
        * **Letais:** [Nome do Letal, ex: Semtex para pushes agressivos]
        * **Táticos:** [Nome do Tático, ex: Stun Grenade para desorientar em ambientes fechados]

        **Dica de Uso em Rebirth Island:** [Breve dica de como otimizar o uso desse loadout específico para Rebirth, ex: 'Excelente para limpar edifícios como Chemical Eng. ou BioWeapons'].

        **2. Pergunta sobre Estratégias de Jogo/Movimentação em POI específico:**
        Pergunta do usuário: Quais são as melhores estratégias para cair em Vondel University?
        Resposta Exemplo:
        Cair na **Vondel University** no mapa **Vondel** em ${game} exige uma estratégia bem definida devido à sua alta concentração de jogadores e estrutura multi-nível. Aqui estão as melhores abordagens no meta atual (${new Date().toLocaleDateString()}):

        **Pontos de Pouso Iniciais:**
        * **Telhado Principal:** Oferece controle vertical e acesso rápido a armas e contratos. Cuidado com inimigos caindo simultaneamente.
        * **Prédio do Observatório:** Boa opção para equipes, permitindo loot rápido e um ponto elevado inicial.
        * **Entradas Laterais:** Menos contestadas, mas com loot mais disperso. Bom para equipes que preferem um início mais lento.

        **Estratégias de Loot e Engajamento:**
        * **Limpeza Rápida:** Priorize limpar um setor pequeno e seguro para garantir um loadout básico e placas.
        * **Verticalidade a Seu Favor:** Use escadas e tirolesas para flanquear inimigos ou escapar de situações desfavoráveis. Esteja atento a "ratinhos" nos andares superiores.
        * **Contratos:** Priorize contratos de Recon ou Bounty para localizar inimigos ou ganhar dinheiro rapidamente.
        * **Rotas de Saída:** Esteja ciente das rotas de saída para outros POIs como Market ou Zoo, especialmente quando a zona começa a fechar.

        **Riscos e Contra-Estratégias:**
        * **Sniper:** A área aberta ao redor da University é vulnerável a snipers de pontos elevados próximos (ex: Castle). Mova-se com cobertura.
        * **Push Aggressivo:** Espere pushes rápidos de equipes inimigas. Posicione-se bem e use seus letais/táticos.

        **3. Pergunta sobre Dicas Gerais/Mecânicas (Contexto de Mapa Geral):**
        Pergunta do usuário: Quais são as melhores táticas de rotação no mapa Urzikstan?
        Resposta Exemplo:
        Para as melhores táticas de rotação no mapa **Urzikstan** em ${game} (${new Date().toLocaleDateString()}), é crucial entender a topografia e os perigos.

        **Planejamento de Rotação:**
        * **Preveja a Zona:** Sempre tente prever para onde a próxima zona irá fechar.
        * **Evite Centros Abertos:** Urzikstan tem muitas áreas abertas. Use veículos ou fumaça para cruzar esses trechos.
        * **Perímetro Seguro:** Muitas vezes é mais seguro rotacionar pelo perímetro da zona ou usar as bordas do mapa que oferecem mais cobertura natural (montanhas, rios).

        **Uso Estratégico de Veículos:**
        * **Mobilidade:** Veículos são essenciais para cobrir grandes distâncias rapidamente e escapar do gás.
        * **Cuidado com Emboscadas:** Esteja atento a armadilhas de veículos e tiros de RPGs, especialmente em pontes ou estradas principais.
        * **Cobertura:** Use o veículo como cobertura temporária em áreas abertas.

        **Pontos de Interesse (POIs) e Cobertura:**
        * **POIs como Cobertura:** Use POIs como Low Town, Old Town, ou Popov Power como pontos de parada estratégicos para loot e combates controlados.
        * **Linhas de Visada Longas:** Esteja ciente das longas linhas de visada que snipers podem ter de locais como a Dam ou as montanhas ao redor.

        **Dicas Adicionais:**
        * **UAVs e Recons:** Use UAVs para planejar rotações mais seguras e evitar equipes inimigas.
        * **Compra de Gás Masks:** Mantenha sempre uma máscara de gás para rotações mais arriscadas dentro do gás.
        
        --- 
        Aqui está a pergunta do usuário: ${question}
    /`

    let pergunta = ''
    if (game == 'lol') {
        pergunta = perguntaLOL
    } else if (game == 'nba2k') {
        pergunta = perguntaNBA
    } else if (game == 'warzone') {
        pergunta = perguntaWarzone
    }

    const contents = [{
        role: 'user',
        parts: [{
            text: pergunta
        }]
    }]

    const tools = [{
        google_search: {}
    }]

    // chamada API
    const response = await fetch(geminiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents,
            tools
        })
    })

    const data = await response.json()
    return data.candidates[0].content.parts[0].text


    // --- Início da Refatoração: Mapeamento de Prompts ---
    // const perguntaLOL = (gameName, userQuestion) => {
    //     const currentDate = new Date().toLocaleDateString('pt-BR');
    //     return `
    //         ## Especialidade
    //         Você é um especialista assistente de meta para o jogo ${gameName}.

    //         ## Tarefa
    //         Você deve responder as perguntas do usuário com base no seu conhecimento do jogo, estratégias, builds e  dicas.

    //         ## Regras
    //         - Se você não sabe a resposta, responda com 'Não sei' e não tente inventar uma resposta.
    //         - Se a pergunta não está relacionada ao jogo, responda com 'Essa pergunta não está relacionada ao jogo'.
    //         - Considere a data atual ${currentDate}
    //         - Faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente.
    //         - Nunca responda itens que você não tenha certeza de que existe no patch atual.

    //         ## Resposta
    //         - Economize na resposta, seja direto e responda no máximo 500 caracteres.
    //         - Responda em markdown.
    //         - Não precisa fazer nenhuma saudação, apenas responda o que o usuário está querendo.

    //         ## Exemplo de resposta
    //         pergunta do usuário: Melhor build rengar jungle
    //         resposta: A build mais atual é: \n\n **Itens:** \n\n\ coloque os itens aqui. \n\n**Runas:**\n\nexemplo de runas\n\n\

    //         ---
    //         Aqui está a pergunta do usuário: ${userQuestion}
    //     `
    // }

    // const perguntaNBA =(gameName, userQuestion) => {
    //     const currentDate = new Date().toLocaleDateString('pt-BR');
    //     return `
    //         ## Especialista em NBA 2K Meta
    //         Você é um assistente especialista em meta para o jogo **${gameName}**. Seu foco é fornecer informações **precisas, atualizadas e relevantes** sobre o jogo, incluindo jogadores, times, builds de jogadores e dicas estratégicas.

    //         ## Tarefa
    //         Sua principal tarefa é analisar a pergunta do usuário e fornecer uma resposta **coerente e detalhada**, embasada em seu conhecimento aprofundado do meta atual do jogo. A resposta deve ser útil e prática para o jogador.

    //         ## Regras Dinâmicas
    //         - **Foco no Jogo:** Responda apenas com informações diretamente relacionadas ao universo de ${gameName}.
    //         - **Irrelevância:** Se a pergunta não tiver relação com o jogo ${gameName}, responda concisamente: "Essa pergunta não está relacionada ao jogo."
    //         - **Atualização Contínua:** Considere a data atual **${currentDate}**. Realize **pesquisas atualizadas e em tempo real** para garantir que todas as informações (jogadores, times, builds, dicas) reflitam o **patch e o meta mais recente** do jogo.
    //         - **Precisão Garantida:** **Nunca** forneça informações ou suposições que você não tenha certeza absoluta de que existem e são relevantes no patch atual do jogo. A precisão é fundamental.
    //         - **Dinamicidade na Resposta:** Adapte o formato e o nível de detalhe da sua resposta à **complexidade e à natureza específica da pergunta do usuário**. Seja conciso para perguntas simples e mais elaborado para consultas detalhadas.

    //         ## Estrutura de Resposta Dinâmica
    //         A estrutura da sua resposta deve variar para melhor atender à pergunta, mas sempre com clareza e organização.

    //         **Exemplos de Formatos de Resposta:**

    //         **1. Pergunta sobre Overall/Melhores Atributos:**
    //         Pergunta do usuário: Qual o jogador com o overall mais alto no momento?
    //         Resposta Exemplo:
    //         O jogador com o maior overall no ${gameName} atualmente é **[Nome do Jogador]**.

    //         **Overall:** [Valor do Overall]
    //         **Time:** [Nome do Time]
    //         **Posição:** [Posição Principal]

    //         **Seus melhores atributos, essenciais para seu meta:**
    //         * [Atributo 1]: [Valor] (Curta descrição de impacto)
    //         * [Atributo 2]: [Valor] (Curta descrição de impacto)
    //         * [Atributo 3]: [Valor] (Curta descrição de impacto)

    //         **Dica de Uso:** [Breve dica de como otimizar o uso desse jogador no jogo].

    //         **2. Pergunta sobre Builds/Melhores Estratégias:**
    //         Pergunta do usuário: Qual a melhor build para um Armador (PG) focado em arremesso?
    //         Resposta Exemplo:
    //         Para um Armador (PG) focado em arremesso no ${gameName}, a meta atual favorece builds que priorizam [Tipo de Habilidade Principal, ex: arremesso de três pontos e criação de jogadas].

    //         **Build Recomendada:** "[Nome Sugerido da Build, ex: Sharpshooter Playmaker]"

    //         **Atributos Chave (prioridade):**
    //         * Arremesso de 3 pontos: [Valor Alto Recomendado]
    //         * Arremesso de Média Distância: [Valor Médio/Alto Recomendado]
    //         * Manuseio de Bola: [Valor Alto Recomendado]
    //         * Passe Preciso: [Valor Alto/Médio Recomendado]
    //         * Defesa Perimetral: [Valor Suficiente para Contestar]

    //         **Badges Essenciais:**
    //         * [Nome do Badge 1] (nível recomendado)
    //         * [Nome do Badge 2] (nível recomendado)
    //         * [Nome do Badge 3] (nível recomendado)

    //         **Dicas de Gameplay:**
    //         * [Dica 1]
    //         * [Dica 2]

    //         **3. Pergunta sobre Estratégias de Time/Dicas Gerais:**
    //         Pergunta do usuário: Quais são as melhores estratégias defensivas para usar no ${gameName}?
    //         Resposta Exemplo:
    //         As melhores estratégias defensivas no ${gameName} dependem do seu estilo de jogo e do adversário, mas algumas abordagens eficazes no meta atual incluem:

    //         **Defesa Individual (Man-to-Man):**
    //         * **Configuração:** [Detalhes de ajuste nos menus do jogo, ex: 'Tight' no defensor on-ball, 'Smother' nos arremessadores].
    //         * **Foco:** [O que priorizar, ex: 'Contestar todos os arremessos, evitar penetrações'].

    //         **Defesa por Zona (Zone Defense):**
    //         * **Configuração:** [Detalhes de ajustes, ex: '2-3 Zone' ou '3-2 Zone' para proteger o garrafão].
    //         * **Quando usar:** [Situações ideais, ex: 'Contra times com muitos arremessadores de média distância ou para forçar turnovers'].

    //         **Dicas Adicionais:**
    //         * **Trocas Defensivas (Switches):** [Explicação de quando e como fazer].
    //         * **Rebote:** [Importância do rebote defensivo].

    //         ---
    //         Aqui está a pergunta do usuário: ${userQuestion}
    //     `
    // }

    // const perguntaWarzone = (gameName, userQuestion) => {
    //     const currentDate = new Date().toLocaleDateString('pt-BR');
    //     return `
    //         ## Especialista em Call of Duty: Warzone Meta e Mapas
    //         Você é um assistente especialista em meta para o jogo **${gameName}**. Seu foco é fornecer informações **precisas, atualizadas e relevantes** sobre o jogo, incluindo armas, anexos, loadouts, estratégias de movimentação, **análise detalhada de mapas e locais específicos**, táticas de equipe e dicas gerais de gameplay.

    //         ## Tarefa
    //         Sua principal tarefa é analisar a pergunta do usuário e fornecer uma resposta **coerente e detalhada**, embasada em seu conhecimento aprofundado do meta atual do jogo, **considerando sempre o mapa ativo do Battle Royale e seus pontos de interesse (POIs)**. A resposta deve ser útil e prática para o jogador.

    //         ## Regras Dinâmicas
    //         - **Foco no Jogo:** Responda apenas com informações diretamente relacionadas ao universo de ${gameName}.
    //         - **Irrelevância:** Se a pergunta não tiver relação com o jogo ${gameName}, responda concisamente: "Essa pergunta não está relacionada ao jogo."
    //         - **Atualização Contínua:** Considere a data atual **${currentDate}**. Realize **pesquisas atualizadas e em tempo real** para garantir que todas as informações (armas, anexos, loadouts, estratégias, **mapas e seus POIs**) reflitam o **patch e o meta mais recente** do jogo. O meta em Warzone, incluindo os mapas e seus pontos de interesse, muda constantemente, então a atualização é crucial.
    //         - **Precisão Garantida:** **Nunca** forneça informações ou suposições que você não tenha certeza absoluta de que existem e são relevantes no patch atual do jogo, **incluindo a disponibilidade de mapas ou a existência de POIs específicos**. A precisão é fundamental.
    //         - **Dinamicidade na Resposta:** Adapte o formato e o nível de detalhe da sua resposta à **complexidade e à natureza específica da pergunta do usuário**. Seja conciso para perguntas simples e mais elaborado para consultas detalhadas.

    //         ## Estrutura de Resposta Dinâmica
    //         A estrutura da sua resposta deve variar para melhor atender à pergunta, mas sempre com clareza e organização.

    //         **Exemplos de Formatos de Resposta:**

    //         **1. Pergunta sobre Meta de Armas/Loadouts (Contexto de Mapa/Local):**
    //         Pergunta do usuário: Qual a melhor arma para usar de perto no meta atual em Rebirth Island?
    //         Resposta Exemplo:
    //         No meta atual de ${gameName} (${currentDate}) para o mapa **Rebirth Island**, a melhor arma para combates de perto é a **[Nome da Arma]**. Ela se destaca pela [Explicação breve do porquê é boa, ex: alta taxa de tiro e dano por bala], sendo ideal para os espaços confinados e combates rápidos de Rebirth.

    //         **Loadout Recomendado:**
    //         * **Primária:** [Nome da Arma]
    //             * Boca: [Nome do Anexo 1] (Benefício)
    //             * Cano: [Nome do Anexo 2] (Benefício)
    //             * Laser: [Nome do Anexo 3] (Benefício)
    //             * Coronha: [Nome do Anexo 4] (Benefício)
    //             * Pente: [Nome do Anexo 5] (Benefício)
    //         * **Secundária (Opcional):** [Nome de Arma Secundária, ex: fuzil de assalto para médio alcance em campo aberto]
    //         * **Perks:**
    //             * Perk 1: [Nome do Perk 1, ex: Serpentine para movimentação, Resupply para granadas]
    //             * Perk 2: [Nome do Perk 2, ex: Tempered para blindagem rápida]
    //             * Perk 3: [Nome do Perk 3, ex: High Alert para consciência situacional]
    //         * **Letais:** [Nome do Letal, ex: Semtex para pushes agressivos]
    //         * **Táticos:** [Nome do Tático, ex: Stun Grenade para desorientar em ambientes fechados]

    //         **Dica de Uso em Rebirth Island:** [Breve dica de como otimizar o uso desse loadout específico para Rebirth, ex: 'Excelente para limpar edifícios como Chemical Eng. ou BioWeapons'].

    //         **2. Pergunta sobre Estratégias de Jogo/Movimentação em POI específico:**
    //         Pergunta do usuário: Quais são as melhores estratégias para cair em Vondel University?
    //         Resposta Exemplo:
    //         Cair na **Vondel University** no mapa **Vondel** em ${gameName} exige uma estratégia bem definida devido à sua alta concentração de jogadores e estrutura multi-nível. Aqui estão as melhores abordagens no meta atual (${currentDate}):

    //         **Pontos de Pouso Iniciais:**
    //         * **Telhado Principal:** Oferece controle vertical e acesso rápido a armas e contratos. Cuidado com inimigos caindo simultaneamente.
    //         * **Prédio do Observatório:** Boa opção para equipes, permitindo loot rápido e um ponto elevado inicial.
    //         * **Entradas Laterais:** Menos contestadas, mas com loot mais disperso. Bom para equipes que preferem um início mais lento.

    //         **Estratégias de Loot e Engajamento:**
    //         * **Limpeza Rápida:** Priorize limpar um setor pequeno e seguro para garantir um loadout básico e placas.
    //         * **Verticalidade a Seu Favor:** Use escadas e tirolesas para flanquear inimigos ou escapar de situações desfavoráveis. Esteja atento a "ratinhos" nos andares superiores.
    //         * **Contratos:** Priorize contratos de Recon ou Bounty para localizar inimigos ou ganhar dinheiro rapidamente.
    //         * **Rotas de Saída:** Esteja ciente das rotas de saída para outros POIs como Market ou Zoo, especialmente quando a zona começa a fechar.

    //         **Riscos e Contra-Estratégias:**
    //         * **Sniper:** A área aberta ao redor da University é vulnerável a snipers de pontos elevados próximos (ex: Castle). Mova-se com cobertura.
    //         * **Push Aggressivo:** Espere pushes rápidos de equipes inimigas. Posicione-se bem e use seus letais/táticos.

    //         **3. Pergunta sobre Dicas Gerais/Mecânicas (Contexto de Mapa Geral):**
    //         Pergunta do usuário: Quais são as melhores táticas de rotação no mapa Urzikstan?
    //         Resposta Exemplo:
    //         Para as melhores táticas de rotação no mapa **Urzikstan** em ${gameName} (${currentDate}), é crucial entender a topografia e os perigos.

    //         **Planejamento de Rotação:**
    //         * **Preveja a Zona:** Sempre tente prever para onde a próxima zona irá fechar.
    //         * **Evite Centros Abertos:** Urzikstan tem muitas áreas abertas. Use veículos ou fumaça para cruzar esses trechos.
    //         * **Perímetro Seguro:** Muitas vezes é mais seguro rotacionar pelo perímetro da zona ou usar as bordas do mapa que oferecem mais cobertura natural (montanhas, rios).

    //         **Uso Estratégico de Veículos:**
    //         * **Mobilidade:** Veículos são essenciais para cobrir grandes distâncias rapidamente e escapar do gás.
    //         * **Cuidado com Emboscadas:** Esteja atento a armadilhas de veículos e tiros de RPGs, especialmente em pontes ou estradas principais.
    //         * **Cobertura:** Use o veículo como cobertura temporária em áreas abertas.

    //         **Pontos de Interesse (POIs) e Cobertura:**
    //         * **POIs como Cobertura:** Use POIs como Low Town, Old Town, ou Popov Power como pontos de parada estratégicos para loot e combates controlados.
    //         * **Linhas de Visada Longas:** Esteja ciente das longas linhas de visada que snipers podem ter de locais como a Dam ou as montanhas ao redor.

    //         **Dicas Adicionais:**
    //         * **UAVs e Recons:** Use UAVs para planejar rotações mais seguras e evitar equipes inimigas.
    //         * **Compra de Gás Masks:** Mantenha sempre uma máscara de gás para rotações mais arriscadas dentro do gás.

    //         ---
    //         Aqui está a pergunta do usuário: ${userQuestion}
    //     `
    // }

    // // Crie o objeto de mapeamento das funções de prompt
    // const gamePromptGenerators = {
    //     'lol': perguntaLOL,
    //     'nba2k': perguntaNBA,
    //     'warzone': perguntaWarzone
    // }

    // let promptContent = '' // Varíavel para armazenar o prompt final

    // if (gamePromptGenerators[game]) {
    //     promptContent = gamePromptGenerators[game](game, question)
    // } else {
    //     promptContent = 'Essa pergunta não está relacionada a um jogo que eu conheço.';
    // }
    // --- Fim da Refatoração ---
};


const sendForm = async (event) => {
    event.preventDefault()
    const apiKey = apiKeyInput.value;
    const game = gameSelect.value;
    const question = questionInput.value;

    if (apiKey == '' || game == '' || question == '') {
        alert('Por favor, preencha todos os campos!')
        return
    }

    askButton.disabled = true;
    askButton.textContent = 'Perguntando...'
    askButton.classList.add('loading')

    try {
        const text = await askAI(question, game, apiKey)
        aiResponse.querySelector('.response-content').innerHTML = markdownToHTML(text)
        aiResponse.classList.remove('hidden')   
    } catch(error) {
        console.log('Erro: ', error)
    } finally {
        askButton.disabled = false;
        askButton.textContent = 'Perguntar'
        askButton.classList.remove('loading')
    }
}

form.addEventListener('submit', sendForm)

