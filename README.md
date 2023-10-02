Loan calculator with early payoff.

**Stack**: Typescript, Next.js, React, styled-components.

### Run dev mode

```bash
npm i && npm run dev
```

### Deploy

```bash
docker build -t loan-calculator .
docker run --name loan-calculator -p 3000:3000 -d --restart unless-stopped loan-calculator
```
