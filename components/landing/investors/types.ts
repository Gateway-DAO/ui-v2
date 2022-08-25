export interface Investor {
  name: string;
  url: string;
}

export interface InvestorWithLogos extends Investor {
  logo: {
    url: string;
    width: number;
    height: number;
  };
}

export type InvestorProps = {
  title: string;
  id: string;
  investorsWithLogos: InvestorWithLogos[];
  investorsonlyNames: Investor[];
};
