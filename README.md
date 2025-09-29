# GGY BOT
Bot para WhatsApp com vários comandos

## Instalação

### Termux
Baixe o Termux:  
[F-Droid](https://f-droid.org/pt_BR/packages/com.termux/) | [MediaFire](https://www.mediafire.com/file/wxpygdb9bcb5npb/Termux_0.118.3_Dev_Gui.apk) | [Play Store](https://play.google.com/store/apps/details?id=com.termux)

Instale dependências:

```bash
pkg upgrade -y && pkg update -y
pkg install git -y
pkg install nodejs-lts -y
pkg install ffmpeg -y
termux-setup-storage 
```

Escolha uma pasta para colocar os arquivos do bot (ex.: /sdcard):
Copiar código
Bash```
cd /sdcard
git clone https://github.com/voidh7/Gregory-BotV1/
cd takeshi-bot
chmod -R 755 ./*
npm start
```
Digite o número do WhatsApp, aguarde o código de pareamento e configure src/config.js:

## ajude-nos 
😎 estamos disposibizando o bot 100% de graça, a única coisa que peço e que me siga no github 