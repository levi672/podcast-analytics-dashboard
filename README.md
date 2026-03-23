# Podcast Analytics Dashboard

Dashboard de métricas do podcast "No corre com o Jota".

## Setup

```bash
npm install
npm run dev
```

Acesse http://localhost:3000

## Deploy no Vercel

1. Push este repositório pro GitHub
2. Vá em vercel.com
3. Import o repositório
4. Deploy automático

## Estrutura dos dados

Os dados ficam em `public/data/`:
- `overview.json` - Resumo geral
- `spotify.json` - Dados do Spotify
- `youtube.json` - Dados do YouTube  
- `instagram.json` - Dados do Instagram
- `tiktok.json` - Dados do TikTok

O script de coleta (GCP) atualiza esses arquivos via git push.
