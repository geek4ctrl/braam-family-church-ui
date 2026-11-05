export type Product = {
  name: string;
  category: string;
  price: number;
  image: string;
  tag?: string;
  desc: string;
  descFr?: string;
  officialUrl?: string;
};

export type CartLine = { product: Product; qty: number };

export type SocialLink = {
  name: string;
  handle: string;
  icon: string;
  class: string;
  href: string;
  text: string;
  textFr?: string;
};

export type Testimony = {
  name: string;
  title: string;
  text: string;
  image: string;
  url: string;
};

export type PreachingCategory = { name: string; url: string };

export type ScheduleEvent = {
  day: string;
  time: string;
  end: string;
  kind: string;
  frequency: string;
  title: string;
  desc: string;
  place: string;
  kindFr?: string;
  titleFr?: string;
  descFr?: string;
};

export type Member = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  occupation: string;
  area: string;
  marital: string;
  bornAgain: string;
  foundUs: string;
  membership: string;
  notes: string;
};
