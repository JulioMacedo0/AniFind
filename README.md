# AniFind — Frontend 🎬

![AniFind Preview](https://github.com/JulioMacedo0/AniFind/blob/main/public/anifind-desktop.jpg?raw=true) 

AniFind é uma plataforma que permite identificar **de qual anime é uma cena** com base em **um único frame (print)**.  
Essa é a interface web do AniFind, construída com **Next.js**, que se comunica com a API Python do projeto.

---

## 🚀 O que você pode fazer com o AniFind?

- Fazer upload de uma imagem ou print
- Descobrir o nome do anime, temporada, episódio, minuto e segundo
- Ver nota, descrição, gênero e estúdio do anime
- Botão “Assistir agora” com links oficiais (Crunchyroll, YouTube, etc.)

---

## 📸 Exemplo de uso

📤 Upload de imagem → 🎯 Retorno imediato da cena correspondente.

⚠️ A base atual está treinada com episódios de **Solo Leveling (temporadas 1 e 2)** com **aspect ratio 16:9**.  
Prints nesse formato produzem resultados mais precisos.

---

## 🧰 Tecnologias usadas

- [Next.js 14](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN UI](https://ui.shadcn.com/)
- [Zod](https://zod.dev/) para validação
- [Sonner](https://sonner.emilkowal.ski/) para toasts
- Integração com a [API do AniFind](https://github.com/JulioMacedo0/AniFind-API)
- Consulta de metadados via [AniList GraphQL](https://anilist.co/)

---

## 🧪 Como rodar localmente

```bash
# Clone o projeto
git clone https://github.com/JulioMacedo0/AniFind.git

# Acesse a pasta
cd AniFind

# Instale as dependências
npm install

# Rode o servidor de desenvolvimento
npm run dev
