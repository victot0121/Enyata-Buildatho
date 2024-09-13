declare type User = {
  $id: string;
  email: string;
  userId: string;
  dwollaCustomerUrl: string;
  dwollaCustomerId: string;
  firstName: string;
  lastName: string;
  name: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
};


declare interface RightSidebarProps {
    user: User;
    transactions: Transaction[];
    banks: Bank[] & Account[];
  }
  
  
  declare interface SiderbarProps {
    user: User;
  }

  
  declare interface HeaderBoxProps {
    type?: "title" | "greeting";
    title: string;
    subtext: string;
    user?: string;
  }  


  declare interface LogoHeader {
     back: string,
     signInButton: string,
  }

    declare interface FooterProps {
        user: User;
        type?: 'mobile' | 'desktop'
      }