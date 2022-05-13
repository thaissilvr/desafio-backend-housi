<h2>Sistema de gestão de reservas - Desafio Back-end Housi</h2>

Projeto construído utilizando NodeJS e Typescript, envolvendo um sistema de gestão de reservas, onde é possível realizar operações CRUD para /reservas. O objetivo principal é performar a busca por reservas, criação de reservas e atualização delas quando necessário, além de deletá-las.
Além disso, na criação de reservas é possível garantir de que um mesmo apartamento não pode ser reservado na mesmo período por duas pessoas diferentes e também que a quantidade de hóspedes deve estar de acordo com o número de nomes informados pelo usuário.

## Rodando localmente

No terminal de sua escolha, clone o repositório:

```bash
git clone https://github.com/thaissilvr/desafio-backend-housi.git
```

Vá até o diretório do projeto:

```bash
cd desafio-backend-housi
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor local:

```bash
npm run dev
```
Rodando testes:

```bash
npm run test
```
---
<h3>🏁Rotas:</h3>

A seguir, encontram-se as rotas e o serviço que cada uma oferece:

Get:
```bash
/reservas - traz todos os resultados de reserva;
/reservas/:id - traz resultado com base no id informado;
/reservas/dataCheckin/:dataCheckin - filtra as reservas através da data de check-in
/reservas/dataCheckout/:dataCheckout -  filtra as reservas através da data de check-out
```
Post:
```bash
/reservas - cria uma nova reserva no sistema;
```
Put:
```bash
/reservas/:id - atualiza uma reserva com base no id informado;
```
Delete:
```bash
/reservas - deleta todas as reservas do banco;
/reservas/:id - deleta uma reserva com base no id informado;
```

<h3>✈ Tecnologias utilizadas:</h3>
<li> NodeJS + Typescript </li>
<li> Express</li>
<li> MongoDB</li>
<li> Mongoose</li>
<li>MongoDB Memory Server</li>
<li> Jest + Supertest</li>
</ul>


