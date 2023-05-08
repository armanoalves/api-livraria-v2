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

