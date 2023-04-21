import styled from "styled-components";

export default function MenuHomePage({ homeItems }) {

  let sumPositive = 0;
  let sumNegative = 0;

  homeItems.forEach((value) => {
    if (value.status === "entrada") {
      sumPositive += parseFloat(value.price);
    } else {
      sumNegative += parseFloat(value.price);
    }
  });

  const balance = Math.abs(sumPositive - sumNegative);
  const formattedBalance = balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 });

  return (
    <TransactionsContainer>
      {
        homeItems.length === 0 ?
          <ListItemEmpty>
            <p>Não há registros de <br />entrada ou saída</p>
          </ListItemEmpty>
          :
          <ul>
            {homeItems.map((value) => {
              return (
                <ListItemContainer key={value._id}>
                  <div>
                    <span>{value.date}</span>
                    <strong>{value.description}</strong>
                  </div>
                  <Value status={value.status}>{value.price}</Value>
                </ListItemContainer>
              )
            })}

          </ul>
      }
      <article>
        <strong>Saldo</strong>
        <Value status={(sumPositive - sumNegative) > 0 ? "entrada" : ((sumPositive - sumNegative) < 0 ? "saida" : "equal")}>{formattedBalance}</Value>
      </article>
    </TransactionsContainer>
  )
};

const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.status === "entrada" ? "green" : props.status === "saida" ? "red" : "black")};
`;
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`;
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`;

const ListItemEmpty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  p {
    font-size: 22px;
    color: gray;
    text-align: center;
    line-height: 26px;
    align-self: center;
  }
`;