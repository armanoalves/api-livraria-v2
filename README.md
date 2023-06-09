 # <p align="center" > API REST de Livraria </p> 

## Sobre o projeto

O presente projeto visa complementar outro já feito anteriormente, trazendo um sistema de busca, filtros e tratamentos de erros. Com isso criaremos uma API mais bem estrutura e robusta.

## Conhecimentos adquiridos

### Aula 01

- Proteger informações sensíveis com o `dotenv`:

  - Você aprendeu a usar o `dotenv` para configurar variáveis de ambiente no projeto. Criamos um arquivo `.env` para guardar a string de conexão do MongoDB Atlas, que é uma informação sensível, pois não queremos que qualquer pessoa tenha acesso ao banco de dados da aplicação.
- Configurar o ESLint para formatar o código e identificar bugs:

  - O ESLint nos ajuda a manter a padronização de formatação de arquivos, o que favorece equipes que trabalham em um mesmo projeto. Além disso, a extensão ESLint alerta sobre erros de código que normalmente não seriam alertados, auxiliando nosso desenvolvimento.

- Refatorar o código com `async/await`:

  - Removemos o uso de funções callback nos métodos do Mongoose que interagem com o banco de dados e trocamos pelo uso de `async/await`, em conjunto com o `try...catch`. Além do código se tornar mais legível, existem casos em que esse padrão irá nos auxiliar, como por exemplo realizar mais de uma operação no banco de dados no mesmo método de controlador.

- Identificar e tratar erros específicos de uma rota:

  - Na rota de buscar um autor pelo seu ID, identificamos os casos em que: o dado foi fornecido de forma incorreta (código de status 400); o dado foi fornecido de forma correta, mas não havia nenhuma correspondência no banco de dados (código de status 404); e o caso de erro interno de servidor, que é retornado quando o erro não foi identificado como nenhum dos outros casos (código de status 500).

### Aula 02

- Criar e utilizar um middleware de manipulador de erros:

  - Esse middleware é caracterizado por receber quatro parâmetros, convencionalmente chamados de: `erro`, `req`, `res` e `next`. Foi nele que centralizamos o tratamento da maioria dos erros que poderiam acontecer na aplicação, possibilitando a reutilização de código. E, de acordo com o `erro` recebido, ele pode encerrar o fluxo de requisição ao enviar uma resposta de erro padronizada para o cliente, utilizando o objeto `res`.

- Identificar e tratar erros de validação:

  - É possível identificar um erro de validação do Mongoose ao verificar se o erro é uma instância de `mongoose.Error.ValidationError`. Também aprendemos como personalizar as mensagens de validação nos Schemas do Mongoose e como obtê-las no objeto de erro.

- Refatorar o manipulador de erros utilizando classes:

  - Nos aproveitamos dos conceitos da orientação a objetos para criar classes para cada erro, reduzindo o código e tornando-o mais legível.

- Criar um middleware para tratar páginas 404:

  - Esse middleware deve ser registrado após todas as outras rotas da aplicação. Assim, se nenhuma das rotas registradas tiver sido correspondida, o código desse middleware será executado. Em seguida, nele podemos criar um erro (no nosso caso, uma nova instância da classe `NaoEncontrado`) e enviá-lo para o manipulador de erros.

### Aula 03

- Aplicar validações nativas do Mongoose:

  - Você conheceu validadores de números como `min` e `max`, que definem, respectivamente, os valores mínimo e máximo que o número do campo deve ter. Você também conheceu o validador de strings `enum`, que define os valores permitidos para o campo.

- Criar validadores personalizados:

  - Esses validadores permitem que qualquer código JavaScript seja executado para validar ou não o dado recebido, então eles são adequados para realizar verificações mais complexas, como validar um número de CPF ou de telefone.

- Aplicar um validador global:

  - Validadores globais também podem ser criados no Mongoose para realizar verificações de um determinado tipo de dado em todos os Schemas da aplicação. No nosso caso, impedimos que qualquer campo do tipo string de qualquer Schema aceitasse strings vazias, pois não é algo que faz sentido para o nosso banco de dados.

### Aula 04 

- Buscar pelos títulos dos livros de forma dinâmica:

  - Para isso, podemos utilizar expressões regulares (ou regex) para tornar a busca por texto dinâmica. Isso pode ser feito passando diretamente uma expressão regular do JavaScript para o objeto de busca ou podemos utilizar os operadores de busca `$regex` e `$options` do MongoDB. Ambas as formas permitem que o valor a ser buscado venha de uma variável e que a flag `i` seja aplicada para que não haja distinção entre letras maiúsculas e minúsculas na busca.

- Filtrar os livros por número de páginas:

  - Utilizamos os operadores de busca `$gte` (greater than or equal, que significa “maior ou igual que”) e `$lte` (less than or equal, que significa “menor ou igual que”) para definir, respectivamente, o número mínimo de páginas e o número máximo de páginas que um livro deve ter.

- Buscar livros pelo nome do autor:

  - Como o nome do autor não é uma informação presente na coleção de `livros`, foi necessário realizar mais uma consulta para a coleção de `autores`, pois lá é possível obter seu `id` e realizar corretamente o filtro na busca de livros.

### Aula 05

- Paginar uma rota:

  - Para isso, aplicamos o método `skip` para pular a quantidade de registros necessários para a página solicitada e o método `limit` para limitar os resultados exibidos em uma única página.

- Ordenar os resultados:

  - Com o método `sort` podemos ordenar os resultados de acordo com algum campo da coleção. Por exemplo, é possível ordenar o `_id` de forma decrescente para obter primeiro os registros mais recentes ou ordenar um campo de texto de forma crescente para retornar os registros em ordem alfabética.

- Reutilizar a lógica de paginação em um middleware:

  - Mais uma vez utilizamos os middlewares do Express para reutilizar lógica em nossa aplicação. Criamos um middleware chamado `paginar` e o registramos nas rotas `GET /livros`, `GET /livros/busca` e `GET /autores`.

- Compartilhar informações entre middlewares:

  - Para isso, podemos utilizar o objeto de requisição `req`. No nosso caso, guardamos as buscas do Mongoose em req.resultado para que o middleware de paginação pudesse acessá-las. Assim, ele pode aplicar os métodos `sort`, `skip` e `limit` na busca para realizar a paginação e retornar os resultados.

## Como executar
1. Clonar o repositório

  ```
  https://github.com/armanoalves/api-livraria-v2
  ```

2. Localizar e acessar a pasta "api-livraria-v2";

  ```
  cd api-livraria-v2
  ```

## Tecnologias

  * **linguagem:**  
    * JavaScript

## Feito por: 

| [<img src="https://avatars.githubusercontent.com/armanoalves" width=115><br><sub>Armano Barros Alves</sub>](https://github.com/armanoalves) |
| :---: |

