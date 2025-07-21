export type Sale = {
  id: string;
  product: string;
  region: "North" | "South" | "East" | "West";
  date: string;
  amount: number;
};

export const mockSalesData: Sale[] = [
  {
    id: "1",
    product: "Widget A",
    region: "North",
    date: "2024-01-15",
    amount: 150.0,
  },
  {
    id: "2",
    product: "Widget B",
    region: "South",
    date: "2024-01-22",
    amount: 200.5,
  },
  {
    id: "3",
    product: "Widget C",
    region: "North",
    date: "2024-02-01",
    amount: 75.25,
  },
  {
    id: "4",
    product: "Widget A",
    region: "East",
    date: "2024-02-05",
    amount: 155.0,
  },
  {
    id: "5",
    product: "Widget D",
    region: "West",
    date: "2024-02-18",
    amount: 300.0,
  },
  {
    id: "6",
    product: "Widget B",
    region: "South",
    date: "2024-03-10",
    amount: 210.5,
  },
  {
    id: "7",
    product: "Widget C",
    region: "East",
    date: "2024-03-12",
    amount: 80.0,
  },
  {
    id: "8",
    product: "Widget A",
    region: "North",
    date: "2024-03-20",
    amount: 160.0,
  },
  {
    id: "9",
    product: "Widget E",
    region: "West",
    date: "2024-04-02",
    amount: 450.75,
  },
  {
    id: "10",
    product: "Widget B",
    region: "South",
    date: "2024-04-05",
    amount: 220.0,
  },
  {
    id: "11",
    product: "Widget F",
    region: "North",
    date: "2024-04-11",
    amount: 95.5,
  },
  {
    id: "12",
    product: "Widget A",
    region: "East",
    date: "2024-05-01",
    amount: 170.0,
  },
  {
    id: "13",
    product: "Widget D",
    region: "West",
    date: "2024-05-09",
    amount: 320.25,
  },
  {
    id: "14",
    product: "Widget C",
    region: "South",
    date: "2024-05-21",
    amount: 85.0,
  },
  {
    id: "15",
    product: "Widget G",
    region: "North",
    date: "2024-06-04",
    amount: 120.0,
  },
  {
    id: "16",
    product: "Widget B",
    region: "East",
    date: "2024-06-15",
    amount: 230.75,
  },
  {
    id: "17",
    product: "Widget E",
    region: "West",
    date: "2024-06-22",
    amount: 475.0,
  },
  {
    id: "18",
    product: "Widget A",
    region: "South",
    date: "2024-07-01",
    amount: 180.5,
  },
  {
    id: "19",
    product: "Widget F",
    region: "North",
    date: "2024-07-07",
    amount: 105.0,
  },
  {
    id: "20",
    product: "Widget D",
    region: "West",
    date: "2024-07-19",
    amount: 340.0,
  },
];
