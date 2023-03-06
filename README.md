# Frontend Mentor - Invoice app solution

![Visualização do design para o desafio de codificação - Invoice app](./desktop-preview.jpg)

Esta é uma solução para o [desafio do aplicativo de faturas no Frontend Mentor](https://www.frontendmentor.io/challenges/invoice-app-i7KaLTQjl). Com um Adição a mais por conta própria uma tela de gráficos para você vizualizar as estatísticas de suas faturas. Os desafios do Frontend Mentor ajudam você a melhorar suas habilidades de codificação criando projetos realistas.

## Links

- Solution URL: [Clique aqui](https://github.com/marcoslimaJS/Invoice-App)
- Live Site URL: [Clique aqui](https://invoice-app-six-delta.vercel.app/)

### O desafio

Os usuários devem ser capazes de:

- Veja o layout ideal para o aplicativo, dependendo do tamanho da tela do dispositivo
- Veja o Hover States para todos os elementos interativos na página
- Criar, ler, atualizar e excluir faturas
- Receba as validações do formulário ao tentar criar/editar uma fatura
- Salvar faturas de rascunho e marque as faturas pendentes conforme pago
- Filtrar faturas por status (rascunho/pendente/pago)
- Alterar o modo claro e escuro

### Construído com

- [React](https://reactjs.org/) - JS biblioteca
- [Redux](https://redux.js.org/) - Redux
- [Styled Components](https://styled-components.com/) - Para estilos


### O que eu aprendi

Um dos maiores desafios que enfrentei foi a decisão de não utilizar bibliotecas externas para auxiliar na criação dos componentes, como o de data, por exemplo, e nem na criação dos gráficos. No entanto, isso me permitiu colocar em prática todo o conhecimento que adquiri durante o desenvolvimento da aplicação, Também pude ver na prática os benefícios de salvar os dados em um estado global utilizando o Redux.

Em relação aos gráficos, o maior desafio foi a criação do gráfico de pizza, onde usei a propriedade conic-gradient para fazer a separação das cores. Utilizei a porcentagem de cada status e transformei em degs de 0 a 360. Em seguida, criei uma função para identificar em qual parte do gráfico o usuário está com o mouse em cima, com base nos degs, para mostrar uma tooltip correspondent


## Autor

- Linkedin - [Marcos Paulo Araujo](https://www.linkedin.com/in/marcos-paulo-araujo-684aa8199/)
- Frontend Mentor - [@marcoslimaJS](https://www.frontendmentor.io/profile/marcoslimaJS)