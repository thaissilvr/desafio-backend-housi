<h2>Sistema de gestão de reservas - Desafio Back-end Housi</h2>

Projeto construído utilizando NodeJS e Typescript, envolvendo um sistema de gestão de reservas, onde é possível realizar operações CRUD para /reservas. O objetivo principal é performar a busca por reservas, criação de reservas e atualização delas quando necessário, além de deletá-las.


<h3>✈ Ferramentas utilizadas:</h3>

---


## Rodar localmente

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
npm run tests
```
---
<h3>Rotas:</h3>

A seguir, encontram-se as rotas e o serviço que cada uma oferece:

Get:
~~~
/reservas - traz todos os resultados de reserva;
/reservas/:id - traz resultado com base no id informado;
/reservas/dataCheckin/:dataCheckin:
/reservas/dataCheckout/:dataCheckout:
~~~
Post:
~~~
/reservas - cria uma nova reserva no sistema;
~~~
Put:
~~~
/reservas/:id - atualiza uma reserva com base no id informado;
~~~
Delete:
~~~
/reservas - deleta todas as reservas do banco;
/reservas/:id - deleta uma reserva com base no id informado;
~~~
