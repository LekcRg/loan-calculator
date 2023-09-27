import { media } from '@/styles/mixnis';
import styled from 'styled-components';

type Props = {
  className?: string;
}

const Aside = styled.div`
  width: 500px;
  max-width: 100%;

  ${media.pc} {
    width: 100%;
  }
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.light1};
  font-size: 48px;
  font-weight: 400;
  line-height: 1.1;
  margin-bottom: 12px;

  ${media.pc} {
    font-size: 32px;
    margin-bottom: 8px;
  }

  ${media.mobile} {
    margin-bottom: 4px;
    font-size: 24px;
    line-height: 1.2;
  }
`;

const Text = styled.span`
  font-size: 18px;
  line-height: 1;

  ${media.mobile} {
    font-size: 14px;
    line-height: 1.2;
  }
`;

const CalculatorAside = (props: Props) => {
  const { className } = props;

  return (
    <Aside className={className}>
      <Title>
        Calculate your loan right&nbsp;now
      </Title>

      <Text>
        And get a detailed schedule and payment details
      </Text>
    </Aside>
  );
};

export default CalculatorAside;