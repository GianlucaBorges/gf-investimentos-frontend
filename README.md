# GF Investimentos – Frontend

Este é o projeto **frontend** da aplicação **GF Investimentos**, desenvolvido com **Angular 19** e **Angular Material**, utilizando **componentes standalone**.

## ✅ Funcionalidades

O frontend possui as seguintes funcionalidades principais:

- **Cadastro de Usuário:** formulário para registrar novos usuários.
- **Login:** autenticação de usuários com validação de credenciais.
- **Cadastro de Investimentos:** formulário para registrar novos investimentos.
- **Listagem de Investimentos:** tabela com todos os investimentos cadastrados.
- **Edição de Investimentos:** funcionalidade para editar investimentos existentes.
- **Exclusão de Investimentos:** opção para remover investimentos da lista.
- **Navegação com Navbar:** barra de navegação fixa com links para alternar entre páginas.
- **Integração com API:** comunicação com o backend Spring Boot para persistência e leitura dos dados.
- **Design responsivo:** interface adaptável para diferentes tamanhos de tela, com uso de Angular Material.
- **Gráficos:** visualização de dados com gráficos interativos.

## 📁 Estrutura de Pastas

```bash
src/
├── app/
│   ├── core/                       # Módulo core para serviços e interceptores
│   ├── guard/                      # Guardas de rota para proteção de páginas
│   ├── services/                   # Serviços para comunicação com API
├── evironments/                    # Configurações de ambiente
├── pages/                          # Páginas principais da aplicação
├── shared/                         # Componentes compartilhados entre páginas
├── utils/                          # Funções utilitárias
├── app.config.ts                  # Configuração principal do aplicativo
│   └── app.routes.ts           # Rotas com lazy loading
```

> A aplicação utiliza `router-outlet` para exibir dinamicamente as páginas com base nas rotas configuradas.

## 🚀 Como rodar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (recomendado: v18+)
- [Angular CLI](https://angular.io/cli) (versão compatível com Angular 19)

### Instalação

1. Clone o repositório:

```bash
git clone https://github.com/GianlucaBorges/gf-investimentos-frontend.git
cd gf-investimentos-frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Execute o projeto localmente:

```bash
ng serve
```

A aplicação estará disponível em: http://localhost:4200

Certifique-se de que o backend também esteja rodando para permitir a comunicação com a API.

🔗 Comunicação com o Backend
As requisições são feitas via HttpClient para o backend Java/Spring Boot na porta configurada no arquivo `src/environments/environment.ts`. O endpoint padrão é `http://localhost:8080/api`.

🛠️ Tecnologias Utilizadas
Angular 19

Angular Material

TypeScript

RxJS

HTML + SCSS

📃 Licença
Projeto desenvolvido internamente para fins educacionais e profissionais. Uso restrito à equipe da empresa GF, salvo autorização prévia.

Desenvolvido com 💼 por [Gianluca Mendes](https://github.com/GianlucaBorges)
