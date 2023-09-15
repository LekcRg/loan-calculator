import styled from 'styled-components';

const Aside = styled.div`
  width: 500px;
  max-width: 100%;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.light1};
  font-size: 48px;
  font-weight: 400;
  line-height: 1.1;
  margin-bottom: 12px;
`;

const Text = styled.span`
  font-size: 18px;
  line-height: 1;
`;

const CalculatorAside = () => {
  return (
    <Aside>
      <Title>
        Calculate your loan right now
      </Title>

      <Text>
        And get a detailed schedule and payment details
      </Text>
    </Aside>
  );
};

export default CalculatorAside;