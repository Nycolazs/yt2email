# yt2email
Este é um projeto em Node.js que permite baixar o áudio de um vídeo do YouTube e enviá-lo por e-mail para um destinatário especificado. O projeto utiliza as bibliotecas Googleapis, ytdl-core e nodemailer para autenticar com a API do Google, baixar o áudio do vídeo e enviar o arquivo por e-mail.

## Pré-requisitos
Para executar este projeto, você precisará ter o Node.js e o gerenciador de pacotes npm instalados em sua máquina. Além disso, você precisará criar um arquivo keyFile.json contendo suas credenciais de API do Google, conforme descrito na seção de autenticação abaixo.

## Instalação
1. Clone este repositório em sua máquina:
```
git clone https://github.com/Nycolazs/yt2email.git
```
2. Navegue até a pasta raiz do projeto:
```
cd yt2email
```
3. Instale as dependências do projeto usando o npm:
```
npm install
```
## Autenticação
Para se autenticar com a API do Google, você precisará criar um arquivo keyFile.json contendo suas credenciais. Siga estas etapas para criar o arquivo:

1. Acesse a página de credenciais do Google Cloud Console.
2. Clique no botão "Criar credenciais" e selecione "Chave de conta de serviço".
3. Escolha um nome para a chave e selecione a função "Projeto" e, em seguida, "Editor".
4. Clique no botão "Criar" e o arquivo keyFile.json será baixado automaticamente.
5. Mova o arquivo keyFile.json para a pasta raiz do projeto.

## Uso
Para iniciar o servidor, execute o seguinte comando na pasta raiz do projeto:
```
npm start
```
Isso iniciará o servidor na porta 3000.

Para baixar o áudio de um vídeo do YouTube e enviá-lo por e-mail, envie uma solicitação POST para a rota '/download' com os seguintes parâmetros no corpo da solicitação:

'videoId': o ID do vídeo do YouTube a ser baixado.
'email': o endereço de e-mail para o qual o arquivo deve ser enviado.
Exemplo usando o comando curl:

```sh
curl --location --request POST 'http://localhost:3000/download' \
--header 'Content-Type: application/json' \
--data-raw '{
    "videoId": "dQw4w9WgXcQ",
    "email": "destinatario@email.com"
}'
```
## Contribuição
Este projeto é aberto para contribuições. Se você encontrar um problema ou tiver uma sugestão para melhorias, sinta-se à vontade para abrir uma issue ou enviar uma pull request.

## Licença
Este projeto é licenciado sob a licença MIT. Consulte o arquivo LICENSE para obter mais informações.
